<script>
import { ref } from 'vue';
import HeadTableCheckBox from './HeadTableCheckBox.vue';

export default {
  components: {
    HeadTableCheckBox,
  },
  setup() {
    const isChecked = ref(false);
    const isIndeterminate = ref(false);

    const handleCheckboxChange = (newChecked) => {
      isChecked.value = newChecked;
      // You can also update isIndeterminate here if needed based on the newChecked value
    };

    return {
      isChecked,
      isIndeterminate,
      handleCheckboxChange,
    };
  },
};
</script>

<template>
    <div className="container-fluid">
        <div className="row pt-4">
            <div className="col-12 d-flex">
                    <div className="d-flex align-items-center table-head">
                        <HeadTableCheckBox :checked="isChecked" :indeterminate="isIndeterminate" @change="handleCheckboxChange"/>
                        <div className="table-head-text">Регион</div>
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
        </div>
    </div>
</template>

<style scoped>
.table-head{
    padding: 20px 16px;
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

</style>