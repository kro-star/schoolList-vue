import { defineStore } from 'pinia';

export const useSchoolStore = defineStore('school', {
  state: () => ({
    school: [],
    regions: [],
    loadingRegions: false,
    regionsError: null,
  }),
  getters: {
    // Можно добавить геттеры, если нужно
  },
  actions: {
    async loadRegions() {
      this.loadingRegions = true;
      this.regionsError = null;
      try {
        const response = await fetch('https://schooldb.skillline.ru/api/regions');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`); 
        }

        const data = await response.json();

        if (data.status) {
          this.regions = data.data;
        } else {
          this.regionsError = data.message || 'Unknown error';
          console.error('Ошибка при загрузке регионов:', data.message);
        }
      } catch (error) {
        this.regionsError = error.message || 'Network error';
        console.error('Ошибка сети при загрузке регионов:', error);
      } finally {
        this.loadingRegions = false;
      }
    },
  },
});