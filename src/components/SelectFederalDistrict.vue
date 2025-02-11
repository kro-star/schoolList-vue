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