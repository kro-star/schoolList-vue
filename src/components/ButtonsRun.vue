<script setup>

import { useSchoolStore } from '../store/school';

const props = defineProps({
    isMobileFiltersOpen: Boolean,
    toggleFilters: {  
      type: Function,
      required: false,   
    },
})

const schoolStore = useSchoolStore();

const generateTableRow = () => {
    schoolStore.loadSchools({region_id: schoolStore.checkRegions, updated_at: schoolStore.checkUpdated, count:schoolStore.checkCount, page: 1});
    props.toggleFilters();
}
const cancelValues = () =>{
    schoolStore.checkRegions = [];
    schoolStore.checkFederalDistricts =[];
    schoolStore.checkUpdated = null;
}
</script>

<template>
    <div class="row ">
        <div class="col-6">
            <div class="btn-light btn-cancel w-100" @click="cancelValues">
                    Сбросить
                </div>                
        </div>
        <div class="col-6 ">
            <div class="btn-run w-100" @click="generateTableRow">
                    Применить
            </div>
        </div>
    </div>
</template>

<style scoped>
.btn-cancel{
    padding: 16px 24px;
    font-size: 16px;
    font-weight: 600;
    margin-right: 20px;
    text-align: center;
    cursor: pointer;
}
.btn-run{
    padding: 16px 24px;
    border-radius: 10px;
    background-color: #0E0E10;
    color: #F1F4FD;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    cursor: pointer;

}
.btn-run:hover{
    background-color: #24C14E;
}
.btn-run:active{
    background-color: #16B240;
}
</style>