import { defineStore } from 'pinia';

export const useSchoolStore = defineStore('school', {
  state: () => ({
    schools: [],
    regions: [],
    federalDistricts: [],
    loadingFederalDistricts: false,
    federalDistrictsError: null,
    loadingRegions: false,
    regionsError: null,
    checkRegions: [],
    checkFederalDistricts: [],
    checkUpdated: null,
    checkCount: 35,
    checkPage: 1,
    loadingSchools: false,
    schoolError: null,
    totalPagesSchools: 0,
    totalQuantitySchools: 0,
    loadPageSchools: 0,
    downloadHref:'',
    downloadError: null,
    loadingDownload: false,
  }),
  getters: {
    // Можно добавить геттеры, если нужно
  },
  actions: {
    async loadSchools({ region_id = [], updated_at = null, count = 35, page = null } = {}){
      this.schools = [];

    const url = new URL('https://schooldb.skillline.ru/api/schools');
    const params = new URLSearchParams();
    if(count){

      params.append('count', count);
    }
    if(page){

      params.append('page', page);
    }

    if (updated_at) {
      params.append('updated_at', updated_at);
    }

    if (region_id && region_id.length !== this.regions.length) { 
        region_id.forEach(id => {
            params.append('region_id', id); 
        });
    }
      
    url.search = params.toString(); 

    console.log('URL:', url.toString()); 
    

      this.loadingSchools =true;
      this.schoolError =null;
      try{
        const response = await fetch(url.toString());  

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`); 
        }

        
        const data = await response.json();

        if (data.status) {
          this.loadPageSchools = data.data.page;
          this.totalPagesSchools = data.data.pages_count;
          this.totalQuantitySchools = data.data.total_count;
          data.data.list.forEach((item, index) => {
            let infoSchool = {};
            infoSchool.uuid = item.uuid;
            infoSchool.reg_number = item.reg_number;
            infoSchool.short_name = item.edu_org.short_name;
            infoSchool.full_name = item.edu_org.full_name;
            infoSchool.updated_at = item.updated_at;
            infoSchool.post_address = item.edu_org.contact_info.post_address;
            
            if (item.edu_org.region.name) {
              infoSchool.region_name = item.edu_org.region.name;
              infoSchool.region_code = item.edu_org.region.code;
              let region = this.regions.find((reg) => reg.name === item.edu_org.region.name)
              region ?  infoSchool.region_code_real = region.code : infoSchool.region_code_real = item.edu_org.region.code + 1000;
          } else {
              infoSchool.region_name = 'Неизвестно'; 
              infoSchool.region_code = 1000; 
          }
          if(item.edu_org.federal_district){
            
            infoSchool.federal_district_name = item.edu_org.federal_district.name;
            infoSchool.federal_district_code = item.edu_org.federal_district.code;
          } else {
            infoSchool.federal_district_name = 'Неизвестно';
            infoSchool.federal_district_code = 2000;
          }
          
          item.supplements.forEach((sup) => {
            infoSchool.status = sup.status.name;
            if (sup.educational_programs){
              sup.educational_programs.forEach((program) => {
                if (program.edu_level ){
                  if (program.edu_level.code !== null ){

                    if(infoSchool.educational_programs ){
  
                      let programCode = infoSchool.educational_programs.findIndex((el)=> el.code === program.edu_level.code);
    
                      programCode === -1 &&
                      infoSchool.educational_programs.push({name: program.edu_level.short_name, code:  program.edu_level.code});
                    } else {
                      infoSchool.educational_programs = [];
                      infoSchool.educational_programs.push({name: program.edu_level.short_name, code:  program.edu_level.code});
                    }
                  }
                }
                
              })
            }
          })
          
            this.schools.push(infoSchool);
          });
        } else {
          this.regionsError = data.message || 'Unknown error';
          console.error('Ошибка при загрузке образовательных учреждений:', data.message);
        }

      }catch (error) {
        this.schoolError = error.message || 'Network error';
        console.error('Ошибка сети при загрузке образовательных учреждений:', error);
      } finally {
        this.loadingSchools = false;
      }
    },

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
          this.regions = data.data.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          });;
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

    async loadFederalDistrict(){
        this.loadingFederalDistricts = true;
        this.federalDistrictsError = null;
        try{
            const response = await fetch('https://schooldb.skillline.ru/api/federalDistricts');

            if (!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`); 
            }

            const data = await response.json();

            if (data.status){
                this.federalDistricts = data.data.sort((a, b) => {
                    const nameA = a.name.toLowerCase();
                    const nameB = b.name.toLowerCase();
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                  });;
            } else {
                this.federalDistrictsError = error.message || 'Network error';
                console.error('Ошибка сети при загрузке регионов:', error);
            }

        }
        catch (error) {
            this.federalDistrictsError = error.message || 'Network error';
            console.error('Ошибка сети при загрузке регионов:', error);

        }
        finally{
            this.loadingFederalDistricts = false;
        }

    },

    async download(){
      
      this.downloadHref = '';
      const url = new URL('https://schooldb.skillline.ru/api/schools');
      const params = new URLSearchParams();

      params.append('count', this.checkCount);
      params.append('page', this.checkPage);
    if (this.checkUpdated) {
      params.append('updated_at', this.checkUpdated);
    }

    if (this.checkRegions && this.checkRegions.length !== this.regions.length ) { 
        this.checkRegions.forEach(id => {
            params.append('region_id', id); 
        });
    }
    params.append('download', true);
      
    url.search = params.toString(); 

      this.loadingDownload = true;
      this.downloadError = null;
      try{
        const response = await fetch(url.toString());  


        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`); 
        }

        
        const data = await response.json();
        this.downloadHref = data.data;
        console.log(data);

      } catch (error) {
        this.downloadError = error.message || 'Network error';
        console.error('Ошибка сети при загрузке образовательных учреждений:', error);
      } finally {
        this.loadingDownload = false;
      }
    },

    searchRegion(name){
      if (this.regions.length > 0 ){
        const searchTerm = name.toLowerCase(); 
        let findRegion = this.regions.filter((region) => region.name.toLowerCase().includes(searchTerm)
        );
        return findRegion;
      }
      return [];
    },

    sortSchool(sortOrder){
      const sorted = [...this.schools].sort((a, b) => {
        const nameA = a.region_name.toLowerCase();
        const nameB = b.region_name.toLowerCase();
        if (nameA < nameB) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if (nameA > nameB) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
      this.schools = sorted;
    }

  },
});