<script>
import { ref } from 'vue';
import HeadTableCheckBox from './HeadTableCheckBox.vue';
import { useSchoolStore } from '@/store/school';

export default {
  components: {
    HeadTableCheckBox,
  },
  setup() {
    const isChecked = ref(false);
    const isIndeterminate = ref(false);

    const handleCheckboxChange = (newChecked) => {
      isChecked.value = newChecked;
    };

    return {
      isChecked,
      isIndeterminate,
      handleCheckboxChange,
    };
  },
  data() {
    return {
      searchQuery: ref(''),
      searchFinish: true,
    };
  },
  computed:{
    searchResults () {      
      const schoolStore = useSchoolStore();
      if (!this.searchQuery) {
        this.searchFinish = false;
        return []; 
      }
      if(this.searchQuery.length ){
        this.searchFinish = false;
          return schoolStore.searchRegion(this.searchQuery);
      }
      this.searchFinish = false;
      return [];
    },

  },
  methods: {
    sortAscending(){
      const schoolStore = useSchoolStore();
      schoolStore.sortSchool('asc');
      const svg = document.querySelector('.asc-sort');      
      const path = svg.querySelector('path');
      path.classList.remove('active')
      const svgD = document.querySelector('.decs-sort');      
      const pathD = svgD.querySelector('path');
      pathD.classList.add('active')
    },
    sortDescending(){
      const schoolStore = useSchoolStore();
      schoolStore.sortSchool('desc');
      const svgA = document.querySelector('.asc-sort');      
      const pathA = svgA.querySelector('path');
      pathA.classList.add('active')
      const svgD = document.querySelector('.decs-sort');      
      const pathD = svgD.querySelector('path');
      pathD.classList.remove('active')
    },
    selectRegion(regionId) {
      const schoolStore = useSchoolStore();
      schoolStore.checkRegions.push( parseInt(regionId));
      searchQuery.value = '';       
      this.searchFinish = true;
    },
    toggleShowSearch(){
      document.querySelector('.search-container-mobile').classList.toggle('d-none');
    }

    

  },
 
};
</script>

<template>
    <div class="container-fluid">
        <div class="row pt-4">
            <div  class="d-none d-lg-flex col-lg-12 ">
                    <div className="d-flex align-items-center table-head">
                      <div class="d-flex justify-content-between w-100">
                        <div className="table-head-text">Регион</div>
                          <div class="sort">
                            <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg" @click="sortDescending" class="d-block mb-1 button-sort asc-sort">
                              <path d="M9 6L4.99646 2L1 6" stroke="#0E0E10" stroke-width="1.5" stroke-miterlimit="10"/>
                            </svg>
                            <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg"  @click="sortAscending" class="d-block mb-1 button-sort decs-sort">
                              <path d="M1 1L5.00354 5L9 1" stroke="#0E0E10" stroke-width="1.5" stroke-miterlimit="10"/>
                            </svg>


                          </div>

                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center table-head">
                        <div className="table-head-text">Название</div>
                    </div>
                    
                    <div className="d-flex align-items-center table-head">
                        <div className="table-head-text">Адрес</div>
                    </div>
                    <div className="d-flex align-items-center table-head">
                        <div className="table-head-text">Уровень образования</div>
                    </div>
                
            </div>
            <div  class="col-12 d-flex d-lg-none ps-3 pe-3">
              <div class="d-flex table-head w-100 justify-content-between">
                <div class="d-flex align-items-center">

                  <div class="sort">
                    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg" @click="sortDescending" class="d-block mb-1 button-sort asc-sort">
                      <path d="M9 6L4.99646 2L1 6" stroke="#0E0E10" stroke-width="1.5" stroke-miterlimit="10"/>
                    </svg>
                    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg"  @click="sortAscending" class="d-block mb-1 button-sort decs-sort">
                      <path d="M1 1L5.00354 5L9 1" stroke="#0E0E10" stroke-width="1.5" stroke-miterlimit="10"/>
                    </svg>
                  </div>
                  <div class="ps-3 ">
                    Сортировка по регионам
                  </div>
                </div>
                <div class="search">
                  <img src="../assets/img/search.png" alt="" @click="toggleShowSearch">
                </div>
              </div>
            </div>
            <div class="col-12 d-flex d-none ps-3 pe-3 search-container-mobile">
              <div class="position-relative w-100 pt-4">
                        <input
                            type="text"
                            class="search-mobile"
                            placeholder="Поиск"
                            v-model="searchQuery"
                        />
                        <div v-if="searchResults.length > 0" class="search-results-mobile">
                            <div
                            v-for="result in searchResults"
                            :key="result.id"
                            class="search-result-item-mobile"
                            @click="selectRegion(result.id)"
                            >
                            {{ result.name }}
                            </div>
                        </div>
                        <div v-else-if="searchFinish" class="search-results-mobile">
                          <div class="search-result-item-mobile">
                            Регионы не найдены
                          </div>
                        </div>

                    </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.search-mobile{
  padding: 17.5px 24px;
    width: 100%;
    margin-right: 20px;
}

.search-img-mobile{
    position: absolute;
    top: 42px;
    right: 24px;
}
.search-results-mobile {
  position: absolute; 
  top: 100%; 
  left: 0;
  width: 100%;

  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10; 
}

.search-result-item-mobile {
  padding: 8px;
  cursor: pointer;
}

.search-result-item-mobile:hover {
  background-color: #f0f0f0;
}
.table-head{
    padding: 24px;
    background-color: #F0F0F7;
    flex: 1;
    box-sizing: border-box;
}
.table-head:last-child{
    flex: none;
    width: 265px;
}
.table-head-text{
    margin-left: 10px;
    color: #55555C;
    font-weight: bold;
    font-size: 16px;
}
.button-sort{
  cursor: pointer;
}
.sort svg path {
  stroke: #93939B;
}

.sort svg:hover path {
  stroke: #55555C; 
}

.sort svg:active path {
  stroke: #0E0E10; 
}
.sort .active{
  stroke: #0E0E10; 
}
</style>