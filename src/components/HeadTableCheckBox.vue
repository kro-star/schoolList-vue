<template>
    <div
      class="tri-state-checkbox"
      :class="display"
      @click="handleClick"
    >
      <span v-if="display === 'checked'">✓</span>
      <span v-if="display === 'indeterminate'">-</span>
    </div>
  </template>
  
  <script>
  import { ref, watch, computed } from 'vue';
  
  export default {
    name: 'HeadTableCheckBox',
    props: {
      checked: {
        type: Boolean,
        default: false,
      },
      onChange: {
        type: Function,
        default: null,
      },
      indeterminate: {
        type: Boolean,
        default: false,
      },
    },
    setup(props, { emit }) {
      const localChecked = ref(props.checked);
      const localIndeterminate = ref(props.indeterminate);
  
      // Watch for changes in the props and update the local state
      watch(
        () => [props.checked, props.indeterminate],
        ([newChecked, newIndeterminate]) => {
          localChecked.value = newChecked || false;
          localIndeterminate.value = newIndeterminate || false;
        }
      );
  
      const handleClick = () => {
        localIndeterminate.value = false; // Always clear indeterminate state on click
  
        const newChecked = !localChecked.value;
        localChecked.value = newChecked;
  
        if (props.onChange) {
           emit('change', newChecked); // Use emit to trigger the event
        }
      };
  
      const display = computed(() => {
        if (localIndeterminate.value) {
          return 'indeterminate';
        } else if (localChecked.value) {
          return 'checked';
        } else {
          return 'empty';
        }
      });
  
      return {
        localChecked,
        localIndeterminate,
        handleClick,
        display,
      };
    },
  };
  </script>
  
  <style scoped>
  .tri-state-checkbox {
    width: 20px;
    height: 20px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none; /* Prevent text selection on click */
  }
  
  .tri-state-checkbox.checked {
    background-color: #f0f0f0;
  }
  
  .tri-state-checkbox.indeterminate {
    background-color: #f0f0f0;
  }
  
  .tri-state-checkbox span {
    font-size: 16px;
  }
  
  </style>