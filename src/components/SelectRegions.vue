<script setup>

import { ref, computed, watch } from 'vue';
import { useSchoolStore } from '../store/school';
import { onMounted } from 'vue';

const isOpen = ref(false);
const selectedRegions = ref([]); 

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

<style lang="scss" scoped>
.select-container {
  position: relative;
  width: 100%;
  font-family: sans-serif;
}

.select-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 16px 24px;
  width: 100%;
  background: white url('../assets/img/down.png') no-repeat right 30px center;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &.open {
    background: white url('../assets/img/up.png') no-repeat right 30px center;
  }
}

.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  height: 60vh;
  overflow-y: scroll;
}

.select-option {
  padding: 8px 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  label {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }
}

.arrow {
  font-size: 0.8em;
}
</style>