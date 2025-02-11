<script>
import HeadTableCheckBox from './HeadTableCheckBox.vue';

import { useSchoolStore } from '../store/school';
import { ref } from 'vue';

export default {
  components: {
    HeadTableCheckBox,
  },
  data() {
    return {
      schoolStore: useSchoolStore(),
      isLgWidht: true,
      isVisibleInfo: true,
      hiddenSchools: [],
      educationTypeMap: {
        'Basic': "общеобразовательный",
        'Medium': "cреднеспециальный",
        'High': "высшее",
        'PostHigh': "высшее", // ????? дополнительное высшее?

      },
    };
  },
  methods: {
    getEducationType(code) {
      return this.educationTypeMap[code] || "Не указано";
    },
    getwidthWindow(){
      
      const wightWin = window.innerWidth;
      if (wightWin >= 992){
        this.isLgWidht = true;
      } else {
        this.isLgWidht = false;
      }
    },
    toggleShowInformation(schoolUuid) {
      if (this.hiddenSchools.includes(schoolUuid)) {
        this.hiddenSchools = this.hiddenSchools.filter((uuid) => uuid !== schoolUuid);
      } else {
        this.hiddenSchools.push(schoolUuid);
      }
    },
  },
  mounted() {    
    this.getwidthWindow();
    window.addEventListener('resize', this.getwidthWindow); 
    this.schoolStore.loadSchools();
  },
  beforeUnmount(){
    window.removeEventListener('resize', this.getwidthWindow);
  }
}


</script>

<template>
    <div class="container-fluid">
        <div class="row pb-4">
            <div v-if="isLgWidht" class="col-12">
                <div>
                    <p v-if="schoolStore.loadingSchools">Загрузка данных...</p>
                    <p v-if="schoolStore.schoolError" class="message-error">Ошибка загрузка данных: {{ schoolStore.schoolError }}</p>
                    <p v-if="schoolStore.schools.length === 0 && schoolStore.loadingSchools === false && schoolStore.schoolError === null" class="message-error">По вашему запросу ничего не найдено</p>
                </div>
                <div v-for="school in schoolStore.schools" :key="school.uuid" class="d-flex table-body-row">
                <div class="table-body-item">
                    <div class="d-flex">
                    <div class="table-body-text">
                        {{ school.region_name }}  
                    </div>
                    </div>
                </div>
                <div class="table-body-item">
                    <template v-if="school.short_name && school.short_name != '-' && school.short_name != 'нет' ">
                        {{ school.short_name }}
                    </template>
                    <template v-else>
                        {{ school.full_name }}
                    </template>
                </div>
                <div class="table-body-item">
                    {{ school.post_address }}
                </div>
                <div class="table-body-item">
                    <div class="d-flex flex-wrap">
                        <template v-if="school.educational_programs">

                            <div v-for="education in school.educational_programs" :key="education.code" class="type-education">
                                <template v-if="education.name">
                                {{ education.name }}
                                </template>
                                <template v-else>
                                {{ getEducationType(education.code) }}
                                </template>
                            </div>
                        </template>
                        <template v-else>
                            <div class="type-education">
                                не указано
                            </div>

                        </template>
                    </div>
                </div>
                </div>
                
            </div>
            <div v-else class="col-12">
                <div class="message-info">
                    <p v-if="schoolStore.loadingSchools">Загрузка данных...</p>
                    <p v-if="schoolStore.schoolError" class="message-error">Ошибка загрузка данных: {{ schoolStore.schoolError }}</p>
                    <p v-if="schoolStore.schools.length === 0 && schoolStore.loadingSchools === false && schoolStore.schoolError === null" class="message-error">По вашему запросу ничего не найдено</p>
                </div>
                <div v-for="school in schoolStore.schools" :key="school.uuid" >
                    <div class="d-flex justify-content-between border-bottom-grey p-4">

                        <div class="body-h4-text">
                            {{ school.region_name }}
                        </div>
                        <div class="button-open pe-2" @click="toggleShowInformation(school.uuid)"  >
                            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg" class="table-body-arrow-up" :class="{ 'd-none': hiddenSchools.includes(school.uuid) }">
                                <path d="M13 8L6.99469 2L1 8" stroke="#55555C" stroke-width="1.5" stroke-miterlimit="10"/>
                            </svg>
                            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg"  :class="{ 'd-none': !hiddenSchools.includes(school.uuid) }">
                                <path d="M0.999999 0.999999L7.0053 7L13 1" stroke="#55555C" stroke-width="1.5" stroke-miterlimit="10"/>
                                </svg>
   
                        </div>
                    </div>
                    <div class="row pe-3 table-row-info" :data-id="school.uuid" :class="{ 'd-none': hiddenSchools.includes(school.uuid) }">
                        <div class="col-1 d-none d-md-block"></div>
                        <div class="col-12 col-md-7 border-bottom-grey pt-3 pb-3 ps-4 pe-4 ps-md-0 pe-md-0 ">
                                <div class="table-body-item-small mb-3">
                                    <template v-if="school.short_name && school.short_name != '-' && school.short_name != 'нет' ">
                                        {{ school.short_name }}
                                    </template>
                                    <template v-else>
                                        {{ school.full_name }}
                                    </template>
                                </div>
                                <div class="table-body-item-small">
                                    {{ school.post_address }}
                                </div>
                                
                        </div>
                        <div class="col-12 col-md-4 border-bottom-grey pt-3 pb-3 ps-4 pe-4 ps-md-0 pe-md-0 ms-2 me-2 ms-md-0 me-md-0" >
                            <div class="table-body-item-small">
                                    <div class="d-flex flex-wrap">
                                        <template v-if="school.educational_programs">

                                            <div v-for="education in school.educational_programs" :key="education.code" class="type-education">
                                                <template v-if="education.name">
                                                {{ education.name }}
                                                </template>
                                                <template v-else>
                                                {{ getEducationType(education.code) }}
                                                </template>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class="type-education">
                                                не указано
                                            </div>

                                        </template>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style  scoped>
@import '../assets/css/bodyTableEducation.css';
</style>