<script setup>
import { ref, computed, onBeforeUnmount } from 'vue';
import { useSchoolStore } from '../store/school';
import { onMounted } from 'vue';

const isOpen = ref(false);
const quantityArr = [35, 20, 10];
const dropdownDirection = ref('down'); 
const container = ref(null);

const schoolStore = useSchoolStore();

const toggleDropdown = () => {
  updateDropdownDirection();
  isOpen.value = !isOpen.value;
};

const toggleQUantity = (quantity) => {
  console.log(quantity)
    schoolStore.checkCount = quantity;
    isOpen.value = false;
    schoolStore.loadSchools({region_id: schoolStore.checkRegions, updated_at: schoolStore.checkUpdated, count:schoolStore.checkCount, page: 1})
};

const updateDropdownDirection = () => {
  if (container.value) {
    const rect = container.value.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.bottom + 120 > windowHeight) {
      dropdownDirection.value = 'up';
    } else {
      dropdownDirection.value = 'down';
    }
  }
};

    onMounted(() => {
      window.addEventListener('scroll', updateDropdownDirection); 
      updateDropdownDirection(); 
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', updateDropdownDirection);
    });


</script>

<template>
    <div class="quantity-container" ref="container">
        <div class="quantity-header" @click="toggleDropdown" :class="{ 'open': isOpen }">
          <span>{{ schoolStore.checkCount }}</span>
        </div>
        <div v-if="isOpen" class="quantity-dropdown" :class="{ 'up': dropdownDirection === 'up' }">
          <div class="quantity-all-option" >
          <div
            v-for="quantity in quantityArr"
            :key="quantity + 11"
            class="quantity-option"            
            @click="toggleQUantity(quantity)">
              {{ quantity }}
          </div>
        </div>
      </div>
    </div>
</template>

<style  scoped>
@import '../assets/css/selectQuantity.css';
@import '../style.css';
</style>