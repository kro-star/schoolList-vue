<script >
import SelectFederalDistrict from './SelectFederalDistrict.vue'
import SelectRegions from './SelectRegions.vue';
import FilterCalendar from './FilterCalendar.vue';
import ButtonsRun from './ButtonsRun.vue';
import FilterEducationMobil from './FilterEducationMobil.vue';


export default {
  components: {
    SelectFederalDistrict,
    SelectRegions,
    FilterCalendar,
    ButtonsRun,
    FilterEducationMobil,
  },
 
}
</script>

<template>
    <div class="container-fluid">
        <div class="row ">
            <div class="d-none d-lg-block  col-lg-4 pb-lg-0 pb-4 position-relative">
              <FilterCalendar />
              
            </div>
            <div class="d-none d-lg-block  col-lg-4  pb-lg-0 pb-4">
              <SelectFederalDistrict />
            </div>
            <div class="d-none d-lg-block col-lg-4  pb-lg-0 pb-4">   
                
              <SelectRegions />
            </div>
        </div>
        
        <div class="row pt-lg-4 d-none d-lg-flex">
          <div class="col-8"></div>
            <div class="col-4">
              <ButtonsRun />
            </div>
        </div>
        <div class="row d-lg-none position-relative">          
          <FilterEducationMobil />
        </div>
    </div>
</template>

<style scoped>
 @import '../assets/css/filterEducation.css';

</style>
