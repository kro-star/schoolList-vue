<script>
import { Calendar } from 'v-calendar';
import 'v-calendar/style.css';
import { useSchoolStore } from '../store/school';

export default {
  components: {
    VCalendar: Calendar,
  },
  data() {
    return {
      isOpenCalendar: false,
      dateShow: null,
      selectedColor: 'green',
      attributes: [
        {
          key: 'today',
          highlight:  {
          color: 'green',
          fillMode: 'outline',
        },
          dates: new Date(),
        },
      ],
    }
  },

  methods: {
    onDayClick(day) {
      const schoolStore = useSchoolStore(); 
      schoolStore.checkUpdated = this.formatDate(day.date);
      console.log(schoolStore.checkUpdated)
      this.isOpenCalendar = false;
      this.showDate();
      
    },
    showDate(){
      const schoolStore = useSchoolStore(); 
      if (schoolStore.checkUpdated) {
        this.dateShow = schoolStore.checkUpdated;
      } else {
        this.dateShow = '';
      }
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    showCalendar() {
      this.isOpenCalendar = true;
      document.addEventListener('click', this.handleClickOutside);
    },
    handleClickOutside(event) {
      const calendarElement = document.querySelector('.position-calendar').parentElement;
      const dropdownElement = document.querySelector('.mobile-filters');
      if  (
    (!calendarElement || !calendarElement.contains(event.target)) &&
    (!dropdownElement || !dropdownElement.contains(event.target))
  ) {
        this.isOpenCalendar = false;
        document.removeEventListener('click', this.handleClickOutside);
      }
    },
    
  },
 
}
</script>

<template>
    <div class="filter-calendar">

        <input type="text" class="data-select" :value="dateShow" placeholder="ГГГГ-ММ-ДД" @focus="showCalendar" @blur="hideCalendar" />
          <div class="position-calendar">
            <v-calendar
            v-if="isOpenCalendar"
            :attributes="attributes"
            :color="selectedColor"
            @dayclick="onDayClick"
          ></v-calendar>
          </div>
    </div>
</template>

<style lang="scss" scoped>
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

.data-select{
  padding: 16px 24px;
  border: 1px solid #D3D3DE;
  border-radius: 10px;
  width: 100%;
  background: white url('../assets/img/calendar-icon.png') no-repeat right 30px center;
  -webkit-appearance: none; 
  -moz-appearance: none;    
  appearance: none; 
  cursor: pointer;
}
.position-calendar{
  position: absolute;
  top:51px;
  left: 10px;
  z-index: 10;
}
</style>
