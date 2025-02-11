<script setup>

import { useSchoolStore } from '../store/school';
import { ref, computed } from 'vue';

const schoolStore = useSchoolStore();

const isOpenMessage = ref(false);
const textMessage = ref('Успешно скачано');
const searchFinish = ref(false);

const downloadRow = () => {
   // schoolStore.download(); // сервер не даёт скачивать, поэтому отключила.
    
    if (!schoolStore.downloadError){
        //textMessage.value = 'Успешно скачано';
        textMessage.value = 'Скачивание сейчас не работает';
    } else {
        textMessage.value = 'Ошибка скачивания';
    }
    isOpenMessage.value = true;

    setTimeout(() => {
        isOpenMessage.value = false;
    }, 3000);

}

const searchQuery = ref('');

const searchResults = computed(() => {
  if (!searchQuery.value) {
    searchFinish.value = false;
    return []; 
  }
  if(searchQuery.value.length > 1){
    searchFinish.value = false;
      return schoolStore.searchRegion(searchQuery.value);
  }
  searchFinish.value = false;
  return [];
});


const selectRegion = (regionId) => {
    if(!schoolStore.checkRegions.includes(parseInt(regionId))){        
        schoolStore.checkRegions.push( parseInt(regionId));
      }
      
  searchQuery.value = '';   
  searchFinish.value = true;
  
}



</script>

<template>
    <div class="container-fluid position-relative">
        <div class="row">
            <div class="col-12 col-lg-6 d-flex align-items-center">
                    <div class="logo-text text-center text-lg-start pb-4 pt-4 w-100">
                        Таблица учреждений
                    </div>
            </div>
            <div class="d-none d-lg-block col-lg-6 pb-4 pt-lg-4">
                <div class="active d-flex justify-content-end">
                    <div class="position-relative">
                        <input
                            type="text"
                            class="search"
                            placeholder="Поиск"
                            v-model="searchQuery"
                        />
                        <img
                            src="../assets/img/search.png"
                            alt=""
                            class='search-img'
                        />
                        <div v-if="searchResults.length > 0" class="search-results">
                            <div
                            v-for="result in searchResults"
                            :key="result.id"
                            class="search-result-item"
                            @click="selectRegion(result.id)"
                            >
                            {{ result.name }}
                            </div>
                        </div>
                        <div v-else-if="searchFinish" class="search-results">
                          <div class="search-result-item">
                            Регионы не найдены
                          </div>
                        </div>
                    </div>
                    <div class="btn-download">
                        <img src="../assets/img/iconButton.png" alt="" />
                        <span class='btn-text' @click="downloadRow">Скачать</span>
                    </div>
                </div>
                <div v-if="isOpenMessage" class="message">
                    {{ textMessage }}
                </div>
                
            </div>
        </div>
    </div>
</template>


<style scoped>
@import '../assets/css/headerEducation.css';
</style>