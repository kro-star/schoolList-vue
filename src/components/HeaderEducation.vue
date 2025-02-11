<script setup>

import { useSchoolStore } from '../store/school';
import { ref, computed } from 'vue';

const schoolStore = useSchoolStore();

const isOpenMessage = ref(false);
const textMessage = ref('Успешно скачано');
const searchFinish = ref(false);

const downloadRow = () => {
    //schoolStore.download(); - сервер не даёт скачивать, поэтому отключила.
    
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
    return []; 
  }
  if(searchQuery.value.length > 3){
      return schoolStore.searchRegion(searchQuery.value);
  }
  return [];
});


const selectRegion = (regionId) => {
  schoolStore.checkRegions.push( parseInt(regionId));
  searchQuery.value = ''; 
  
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
.logo-text{
    font-size: 32px;
    font-weight: 700;
    color: #111827;
    line-height: 38.4px;
}

.message {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #F1F4FD; 
  color: #111827;
  padding: 15px;
  border-radius: 5px;
  z-index: 1000; 
}

.search{
    padding: 17.5px 24px;
    width: 300px;
    margin-right: 20px;

}
.search-img{
    position: absolute;
    top: 18px;
    right: 50px;
}
.btn-download{
    padding: 16px 24px;
    background-color: #33D35E;
    border-radius: 10px;
    cursor: pointer;
}
.btn-download:hover{
    background-color: #24C14E;
}
.btn-download:active{
    background-color: #16B240;
}

.btn-text{
    line-height: 20.8px;
    font-size: 16px;
    margin-left: 11px;
}
.search-results {
  position: absolute; 
  top: 100%; 
  left: 0;
  width: 300px;

  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10; 
}

.search-result-item {
  padding: 8px;
  cursor: pointer;
}

.search-result-item:hover {
  background-color: #f0f0f0;
}
</style>