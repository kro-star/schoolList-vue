<script setup>
import { useSchoolStore } from '@/store/school';

const schoolStore = useSchoolStore();

import { ref } from "vue";

  const onClickHandler = (page) => {
    schoolStore.checkPage = page;
    schoolStore.loadSchools({ region_id: schoolStore.checkRegions, updated_at: schoolStore.checkUpdated, count: schoolStore.checkCount, page: schoolStore.checkPage });
  };

  const currentPage = ref(schoolStore.loadPageSchools || 1);

  
</script>

<template>
    <div className="d-flex">
        <div v-if="schoolStore.loadPageSchools !== 0" className="pagination-numbers">
            <vue-awesome-paginate
                :total-items="schoolStore.totalQuantitySchools"
                :items-per-page="schoolStore.checkCount"
                :max-pages-shown="5"
                v-model="currentPage"
                @click="onClickHandler"
            >
                <template #prev-button>
                    <span >
                        <img src="../assets/img/backArrow.png" alt="" className='d-block'/>    
                    </span>

                </template>
                <template #next-button>
                    <span >
                        <img src="../assets/img/nextArrow.png" alt="" className='d-block'/>    
                    </span>

                </template>
            </vue-awesome-paginate>            
        </div>
    </div>
</template>

<style scoped>
 
.paginate-buttons{
    border-radius: 8px;
    border: 1px solid #D3D3DE;
    width: 44px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.paginate-buttons:hover{
    background-color: #F1F4FD;
}
.pagination-numbers{
    margin: 0 24px;
    display: flex;
}
.pagination-number{
    width: 36px;
    height: 36px;
    border-radius: 8px;
    margin-right: 2px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.pagination-number:last-child{
    margin-right: 0;
}
.pagination-number.active{
    background-color: #F0F0F7;
}

.pagination-number:hover{
    background-color: #F1F4FD;
}
</style>