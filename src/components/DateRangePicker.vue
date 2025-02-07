<template>
    <div class="date-range-input">
      <input
        type="text"
        class="date-input"
        :value="displayValue"
        readonly
        @click="showCalendar = true"
      />
      <img
        src="../assets/img/calendar-icon.png"  
        alt="Calendar"
        class="calendar-icon"
        @click="showCalendar = true"
      />
  
      <div v-if="showCalendar" class="calendar-container">
        <button @click="goToPreviousMonth" class="month-nav">
          &lt;
        </button>
        <span>{{ currentMonthName }} {{ currentYear }}</span>
        <button @click="goToNextMonth" class="month-nav">
          &gt;
        </button>
  
        <div class="calendar">
          <div class="day-names">
            <div v-for="day in dayNames" :key="day">{{ day }}</div>
          </div>
          <div class="days">
            <div
              v-for="day in daysInMonth"
              :key="day.date"
              :class="{
                'day': true,
                'today': isToday(day.date),
                'selected-start': isSameDate(day.date, startDate),
                'selected-end': isSameDate(day.date, endDate),
                'selected-range': isInRange(day.date),
                'disabled': day.isOutside
              }"
              @click="selectDate(day.date)"
              :disabled="day.isOutside"
            >
              {{ day.day }}
            </div>
          </div>
        </div>
  
        <button @click="confirmDates" class="confirm-button">Confirm</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  
  export default {
    name: 'DateRangeInput',
    data() {
      return {
        startDate: null,
        endDate: null,
        showCalendar: false,
        currentDate: new Date(),
      };
    },
    computed: {
      currentYear() {
        return this.currentDate.getFullYear();
      },
      currentMonth() {
        return this.currentDate.getMonth();
      },
      currentMonthName() {
        return new Date(this.currentYear, this.currentMonth, 1).toLocaleString('default', { month: 'long' });
      },
      dayNames() {
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      },
      daysInMonth() {
        const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
        const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
        const numberOfDays = lastDayOfMonth.getDate();
        const startingDay = firstDayOfMonth.getDay();
  
        let days = [];
  
        // Add leading days from previous month
        for (let i = 0; i < startingDay; i++) {
          const previousMonthLastDay = new Date(this.currentYear, this.currentMonth, -i);
          days.unshift({
            date: previousMonthLastDay,
            day: previousMonthLastDay.getDate(),
            isOutside: true
          });
        }
  
  
        // Add days of current month
        for (let day = 1; day <= numberOfDays; day++) {
          days.push({
            date: new Date(this.currentYear, this.currentMonth, day),
            day: day,
            isOutside: false
          });
        }
  
        // Add trailing days from next month
        let trailingDays = 1;
        while (days.length % 7 !== 0) {
          const nextMonthDay = new Date(this.currentYear, this.currentMonth + 1, trailingDays);
          days.push({
            date: nextMonthDay,
            day: trailingDays,
            isOutside: true
          });
          trailingDays++;
        }
  
  
        return days;
      },
      displayValue() {
        if (this.startDate && this.endDate) {
          return this.formatDate(this.startDate) + ' - ' + this.formatDate(this.endDate);
        } else if (this.startDate) {
          return this.formatDate(this.startDate);
        } else {
          return '';
        }
      },
    },
    methods: {
      selectDate(date) {
        if (!this.startDate) {
          this.startDate = date;
          this.endDate = null; // Reset end date when starting selection
        } else if (!this.endDate) {
          if (date > this.startDate) {
            this.endDate = date;
          } else {
            this.endDate = this.startDate;
            this.startDate = date;
          }
  
        } else {
          // Reset selection
          this.startDate = date;
          this.endDate = null;
        }
      },
      isToday(date) {
        const today = new Date();
        return this.isSameDate(date, today);
      },
      isSameDate(date1, date2) {
        if (!date1 || !date2) return false;
        return (
          date1.getFullYear() === date2.getFullYear() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getDate() === date2.getDate()
        );
      },
      isInRange(date) {
        if (!this.startDate || !this.endDate) {
          return false;
        }
        return date > this.startDate && date < this.endDate;
      },
      goToPreviousMonth() {
        this.currentDate = new Date(this.currentYear, this.currentMonth - 1, 1);
      },
      goToNextMonth() {
        this.currentDate = new Date(this.currentYear, this.currentMonth + 1, 1);
      },
      formatDate(date) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);  // Adjust locale as needed
      },
      confirmDates() {
        this.showCalendar = false;
  
        // Emit the selected dates, or use them internally as needed
        this.$emit('date-range-selected', {
          startDate: this.startDate,
          endDate: this.endDate,
        });
      },
    },
    mounted() {
       // Initialize with today's date (or any default you want)
      this.startDate = new Date();
      this.endDate = new Date();
    }
  };
  </script>
  
  <style scoped>
  .date-range-input {
    position: relative;
    display: inline-block;
  }
  
  .date-input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 200px;
    cursor: pointer; /* indicate clickability */
  }
  
  .calendar-icon {
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  
  .calendar-container {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 10; /* Ensure it's on top of other elements */
    padding: 10px;
    width: 300px; /* Adjust as needed */
  }
  
  .month-nav {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    margin: 0 5px;
  }
  
  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }
  
  .day-names {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    font-weight: bold;
    padding-bottom: 5px;
  }
  
  .days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
  }
  
  .day {
    text-align: center;
    padding: 5px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .day:hover {
    background-color: #f0f0f0;
  }
  
  .today {
    font-weight: bold;
  }
  
  .selected-start {
    background-color: #007bff;
    color: white;
  }
  
  .selected-end {
    background-color: #007bff;
    color: white;
  }
  
  .selected-range {
    background-color: #cce5ff;
  }
  
  .disabled {
    color: #ccc;
    cursor: not-allowed;
  }
  
  .disabled:hover {
      background-color: transparent;
  }
  
  .confirm-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .confirm-button:hover {
    background-color: #0056b3;
  }
  </style>