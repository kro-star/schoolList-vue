<script>
import SelectFederalDistrict from './SelectFederalDistrict.vue';
import SelectRegions from './SelectRegions.vue';
import FilterCalendar from './FilterCalendar.vue';
import ButtonsRun from './ButtonsRun.vue';
import { useSchoolStore } from '@/store/school';
import SelectQuantity from './SelectQuantity.vue';

export default {
  components: {
    SelectFederalDistrict,
    SelectRegions,
    FilterCalendar,
    ButtonsRun,
    SelectQuantity,
  },
  data() {
    const schoolStore = useSchoolStore();
    return {
      dateShow: null,
      selectedColor: 'green',
      textMessage: 'Скачивание сейчас не работает',
      isOpenMessage: false,
      attributes: [
        {
          key: 'today',
          highlight: {
            color: 'green',
            fillMode: 'outline',
          },
          dates: new Date(),
        },
      ],
      isMobileFiltersOpen: false, 
      schoolStore,
    };
  },
  methods: {
    toggleFilters() {
        document.querySelector('.filter-button').classList.toggle('active')
      this.isMobileFiltersOpen = !this.isMobileFiltersOpen;
    },
    download(){
        const schoolStore = useSchoolStore();
        //schoolStore.download(); - сервер не даёт скачивать, поэтому отключила.    
        if (!schoolStore.downloadError){
            //textMessage.value = 'Успешно скачано';
            
            this.textMessage = 'Скачивание сейчас не работает';
        } else {
            this.textMessage = 'Ошибка скачивания';
        }
        this.isOpenMessage = true;
        setTimeout(() => {
            this.isOpenMessage = false;
        }, 3000);
    },
    changeCheckQuantity (checkCount){
        const schoolStore = useSchoolStore();
        schoolStore.checkCount = parseInt(checkCount);
        schoolStore.loadSchools({ region_id: schoolStore.checkRegions, updated_at: schoolStore.checkUpdated, count: schoolStore.checkCount, page: schoolStore.checkPage })

    }
  },
};
</script>

<template>
    <div class="col-12 d-lg-none  d-flex justify-content-between">
        <div class="d-flex">
            <button class="btn-light filter-button d-block me-3 d-flex justify-content-center align-items-center" @click="toggleFilters">
              <img src="../assets/img/filterMobil.png" alt="" class="d-block" >
            </button>
            
            <button class="btn-green download-button-mobile d-block d-flex justify-content-center align-items-center" @click="download">
              <img src="../assets/img/download_icon.png" alt="" class="d-block">
            </button>
            <div v-if="isOpenMessage" class="message">
                {{ textMessage }}
            </div>
        </div>
        <div className="pagination-filter pe-2 d-flex">
            <div className="pagination-text">
            Показывать
            </div>
            <SelectQuantity />
            
        </div>
    </div>

       <div class="mobile-filters-container " :class="{ 'active': isMobileFiltersOpen }">
        <img src="../assets/img/closeButton.png" alt="" class="closeButton" @click="toggleFilters">
        <div class="container ps-0 pe-0  mobile-filters">

            <div class="row">

                <div class="col-12  pb-4 position-relative">
                    <FilterCalendar />
                </div>
            
                <div class="col-12  pb-4">
                    <SelectFederalDistrict />
                </div>
            
                <div class="col-12  pb-4">
                    <SelectRegions />
                </div>
                <div class="col-12 ">
                    <ButtonsRun :isMobileFiltersOpen="isMobileFiltersOpen" :toggleFilters="toggleFilters"/>
                </div>

            </div>
            
        </div>
    </div>
</template>



<style  scoped>

@import '../assets/css/filterEducationMobil.css';

</style>