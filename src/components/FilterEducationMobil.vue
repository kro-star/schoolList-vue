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
            console.log('Скачивание сейчас не работает');
            
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



<style lang="scss" scoped>



.pagination-filter {
  display: flex;
  align-items: center;
}

.pagination-text {
  margin-right: 6px;
}

.mobile-filters-container {
  display: none;
  min-width: 360px;
  width: 70vw;
  max-height: calc(100vh - 116px);
  height: auto;
  padding: 48px 24px 24px 24px;
  z-index: 8;
  position: relative;
  top: 20px;
  left: 0;
  background-color: white;
  box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;

  &.active {
    display: block;
  }
}

.closeButton {
  position: absolute;
  top: 24px;
  right: 24px;
}

.filter-button,
.download-button-mobile {
  width: 38px;
  height: 38px;
}

.filter-button {
  &.active {
    background-color: #F0F0F7;
    border: 1px solid #0E0E10;
  }
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

</style>