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

<style scoped>
.quantity-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border-radius: 8px;
    border: 1px solid #D3D3DE;
    padding: 6px 10px;
    width: 73px;
    height: 36px;
    background: white url('../assets/img/down.png') no-repeat right 16px center;
    appearance: none;
    -webkit-appearance: none; 
    -moz-appearance: none;    
    
}
.quantity-container {
  position: relative;
  width: 100%;
  font-family: sans-serif;

}

.quantity-header.open{
  background: white url('../assets/img/up.png') no-repeat right 16px center;
}

.quantity-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 73px;
  border: 1px solid #55555C;
  border-radius: 5px;
  background-color: #fff;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.quantity-dropdown.up{  
  bottom: 100%; 
  top: auto;
}

.quantity-option {
  padding: 8px 10px;
  cursor: pointer;
}

.quantity-option:hover {
  background-color: #F1F4FD;
}

.quantity-option:active {
  background-color: #D3D3DE;
}

.arrow {
  font-size: 0.8em;
}

</style>