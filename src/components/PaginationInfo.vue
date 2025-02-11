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
.quantity{
    border-radius: 8px;
    border: 1px solid #D3D3DE;
    padding: 6px 10px;
    width: 73px;
    height: 36px;
}
.pagination-filter{
    display: flex;
    align-items: center;

}
.quantity-pages{
    color:#687588;
    margin-right: 16px;
}
.pagination-text{
    margin-right: 6px;
}
</style>