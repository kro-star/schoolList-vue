<script setup>

import { ref, computed } from 'vue';
import { useSchoolStore } from '../store/school';
import { onMounted } from 'vue';

const isOpen = ref(false);
const selectedFederalDistricts = ref([]); 

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const togglefederalDistrict = (federalDistrictId) => {
  if (schoolStore.checkFederalDistricts.includes(federalDistrictId)) {
    schoolStore.checkFederalDistricts = schoolStore.checkFederalDistricts.filter((id) => id !== federalDistrictId);
  } else {
    schoolStore.checkFederalDistricts.push(federalDistrictId);
  }
};

const toggleAllFederalDistricts = () => {
  if (allFederalDistrictsSelected.value) {
    schoolStore.checkFederalDistricts = [];
  } else {
    schoolStore.checkFederalDistricts = schoolStore.federalDistricts.map((federalDistrict) => federalDistrict.id);
  }
};

const allFederalDistrictsSelected = computed(() => {
  return schoolStore.checkFederalDistricts.length === schoolStore.federalDistricts.length;
});

const selectedFederalDistrictsText = computed(() => {
  if (schoolStore.checkFederalDistricts.length === 0) {
    return 'Выберите федер. округ';
  } else if (allFederalDistrictsSelected.value) {
    return 'Все федеральные округа';
  } else {
    return `${schoolStore.checkFederalDistricts.length} округов выбрано`;
  }
});




const schoolStore = useSchoolStore();

onMounted(() => {

  schoolStore.loadFederalDistrict()

 });


</script>

<template>
    
      <div class="select-container">
        <div class="select-header" @click="toggleDropdown" :class="{ 'open': isOpen }">
          <span>{{ selectedFederalDistrictsText }}</span>
        </div>
        <div v-if="isOpen" class="select-dropdown">
          <div class="select-option">
            <label>
              <input
                type="checkbox"
                :checked="allFederalDistrictsSelected"
                @change="toggleAllFederalDistricts"
              />
              Все федеральные округа
            </label>
          </div>
          <div
            v-for="federalDistrict in schoolStore.federalDistricts"
            :key="federalDistrict.id"
            class="select-option"
          >
            <label>
              <input
                type="checkbox"
                :value="federalDistrict.id"
                :checked="schoolStore.checkFederalDistricts.includes(federalDistrict.id)"
                @change="togglefederalDistrict(federalDistrict.id)"
              />
              {{ federalDistrict.name }}
            </label>
          </div>
        </div>
      </div>
</template>

<style scoped>
@import '../assets/css/selectRegions.css';
@import '../style.css';

</style>