<script setup>

import { computed } from 'vue';
import { useSchoolStore } from '../store/school';
import SelectQuantity from './SelectQuantity.vue';

const schoolStore = useSchoolStore();

const changeCheckQuantity = (checkCount) => {
    schoolStore.checkCount = parseInt(checkCount);
    schoolStore.loadSchools({ region_id: schoolStore.checkRegions, updated_at: schoolStore.checkUpdated, count: schoolStore.checkCount, page: schoolStore.checkPage })

}

const startRecord = computed(() => {
  if (schoolStore.totalQuantitySchools === 0) {
    return 0; 
  }
  return (schoolStore.loadPageSchools - 1) * schoolStore.checkCount + 1;
});

const endRecord = computed(() => {
  const end = schoolStore.loadPageSchools * schoolStore.checkCount;
  return end > schoolStore.totalQuantitySchools
    ? schoolStore.totalQuantitySchools
    : end;
});

</script>

<template>
<div className="d-flex align-items-center">
        <div className="quantity-pages">
            {{ startRecord }} - {{ endRecord }} из {{ schoolStore.totalQuantitySchools }} записей
        </div>
        <div className="pagination-filter d-none d-lg-flex">
                <div className="pagination-text">
                Показывать
                </div>
                <SelectQuantity />
        </div>
    </div>
</template>

<style scoped>
@import '../assets/css/paginationInfo.css';
</style>