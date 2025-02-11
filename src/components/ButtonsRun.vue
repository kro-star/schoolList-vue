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
    if(props.toggleFilters){

        props.toggleFilters();
    }
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

<style  scoped>
@import '../assets/css/buttonRun.css';
</style>