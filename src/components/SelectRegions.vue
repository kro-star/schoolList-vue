<script setup>

import { ref, computed } from 'vue';
import { useSchoolStore } from '../store/school';
import { onMounted } from 'vue';

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const toggleRegion = (regionId) => {
  if (schoolStore.checkRegions.includes(regionId)) {
    schoolStore.checkRegions = schoolStore.checkRegions.filter((id) => id !== regionId);
  } else {
    schoolStore.checkRegions.push(regionId);
  }
};

const toggleAllRegions = () => {
  if (allRegionsSelected.value) {
    schoolStore.checkRegions = [];
  } else {
    schoolStore.checkRegions = schoolStore.regions.map((region) => region.id);
  }
};

const allRegionsSelected = computed(() => {
  return schoolStore.checkRegions.length === schoolStore.regions.length;
});

const selectedRegionsText = computed(() => {
  if (schoolStore.checkRegions.length === 0) {
    return 'Выберите регионы';
  } else if (allRegionsSelected.value) {
    return 'Все регионы';
  } else {
    return `${schoolStore.checkRegions.length} регионов выбрано`;
  }
});



const schoolStore = useSchoolStore();

onMounted(() => {

  schoolStore.loadRegions(); 

 });


</script>

<template>
    
      <div class="select-container">
        <div class="select-header" @click="toggleDropdown" :class="{ 'open': isOpen }">
          <span>{{ selectedRegionsText }}</span>
        </div>
        <div v-if="isOpen" class="select-dropdown">
          <div class="select-option">
            <label>
              <input
                type="checkbox"
                :checked="allRegionsSelected"
                @change="toggleAllRegions"
              />
              Все регионы
            </label>
          </div>
          <div
            v-for="region in schoolStore.regions"
            :key="region.id"
            class="select-option"
          >
            <label>
              <input
                type="checkbox"
                :value="region.id"
                :checked="schoolStore.checkRegions.includes(region.id)"
                @change="toggleRegion(region.id)"
              />
              {{ region.name }}
            </label>
          </div>
        </div>
      </div>
</template>

<style  scoped>
@import '../assets/css/selectRegions.css';
@import '../style.css';
</style>