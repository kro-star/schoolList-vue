<script>
import { ref } from 'vue';
const date = ref(new Date());

/*export default {
  components: {
    DateRangeInput,
  },
  setup() {
    const selectedStartDate = ref(null);
    const selectedEndDate = ref(null);

    const handleDateRangeSelected = (dateRange) => {
      selectedStartDate.value = dateRange.startDate;
      selectedEndDate.value = dateRange.endDate;
    };

    return {
      selectedStartDate,
      selectedEndDate,
      handleDateRangeSelected,
    };
  },
};*/
</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-md-4">
                <input type="date" class="filter-select"/>
            </div>
            <div class="col-12 col-md-4">
                <select name="types" id="" class="filter-select">
                <option value="all" selected>Все виды</option>
                    <option value="1">type 1</option>
                    <option value="2">type 2</option>
                    <option value="3">type 3</option>
                </select>
            </div>
            <div class="col-12 col-md-4">
                <select name="status" id="" class="filter-select">
                <option value="all" selected>Все статусы</option>
                    <option value="1">status 1</option>
                    <option value="2">status 2</option>
                    <option value="3">status 3</option>
                </select>

            </div>
        </div>
    </div>
</template>

<style scoped>
    


    .filter-select{
padding: 16px 24px;
border: 1px solid #D3D3DE;
border-radius: 10px;
width: 100%;
background: white url('../assets/img/down.png') no-repeat right 30px center;
-webkit-appearance: none; 
-moz-appearance: none;    
appearance: none; 
}


</style>
