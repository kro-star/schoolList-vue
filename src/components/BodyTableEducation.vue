<script>
import HeadTableCheckBox from './HeadTableCheckBox.vue';

import { useSchoolStore } from '../store/school';
import { onMounted } from 'vue';

export default {
    components: {
       HeadTableCheckBox,
    },
    setup() {
        const schoolStore = useSchoolStore();

        onMounted(() => {
        schoolStore.loadRegions(); // Загружаем регионы при монтировании компонента
        });
    return { schoolStore }
  },
/* <div className="d-flex table-body-row">
                    <div className="table-body-item">
                        <div className="d-flex">

                                <HeadTableCheckBox  />
                            <div className="table-body-text">
                                Белгородская область
                            </div>
                        </div>
                    </div>
                    <div className="table-body-item">
                    МБОУ Средняя общеобразовательная школа №2
                    </div>
                    
                    <div className="table-body-item">
                    ул. Николая Гондатти, д. 13 ул. Н. Гондатти 13 ; ул. Н. Зелинского 22
                    </div>
                    
                    <div className="table-body-item">
                    <div className="d-flex flex-wrap">
                        <div className="type-education">
                            Среднее
                        </div>
                        <div className="type-education">
                        Высшее
                        </div>
                        <div className="type-education">
                        Специальное
                        </div>
                        <div className="type-education">
                        Проф
                        </div>
                        <div className="type-education">
                        Бакалавр
                        </div>
                    </div>
                    </div>

                </div>
                <div className="d-flex table-body-row">
                    <div className="table-body-item">
                        <div className="d-flex">

                                <HeadTableCheckBox  />
                            <div className="table-body-text">
                                Белгородская область
                            </div>
                        </div>
                    </div>
                    <div className="table-body-item">
                    МБОУ Средняя общеобразовательная школа №2
                    </div>
                    
                    <div className="table-body-item">
                    ул. Николая Гондатти, д. 13 ул. Н. Гондатти 13 ; ул. Н. Зелинского 22
                    </div>
                    
                    <div className="table-body-item">
                    <div className="d-flex flex-wrap">
                        <div className="type-education">
                            Среднее
                        </div>
                        <div className="type-education">
                        Высшее
                        </div>
                        <div className="type-education">
                        Специальное
                        </div>
                        <div className="type-education">
                        Проф
                        </div>
                        <div className="type-education">
                        Бакалавр
                        </div>
                    </div>
                    </div>

                </div>
                <div className="d-flex table-body-row">
                    <div className="table-body-item">
                        <div className="d-flex">

                                <HeadTableCheckBox  />
                            <div className="table-body-text">
                                Белгородская область
                            </div>
                        </div>
                    </div>
                    <div className="table-body-item">
                    МБОУ Средняя общеобразовательная школа №2
                    </div>
                    
                    <div className="table-body-item">
                    ул. Николая Гондатти, д. 13 ул. Н. Гондатти 13 ; ул. Н. Зелинского 22
                    </div>
                    
                    <div className="table-body-item">
                        <div className="d-flex flex-wrap">
                            <div className="type-education">
                                Среднее
                            </div>
                            <div className="type-education">
                            Высшее
                            </div>
                            <div className="type-education">
                            Специальное
                            </div>
                            <div className="type-education">
                            Проф
                            </div>
                            <div className="type-education">
                            Бакалавр
                            </div>
                        </div>
                    </div>

                </div> */
}


</script>

<template>
    <div className="container-fluid">
        <div className="row pb-4">
            <div className="col-12">
                <div>
                    <p v-if="schoolStore.loadingRegions">Загрузка регионов...</p>
                    <p v-if="schoolStore.regionsError" style="color: red;">Ошибка: {{ schoolStore.regionsError }}</p>
                </div>
                <div v-for="region in schoolStore.regions" :key="region.id" className="d-flex table-body-row">
                <div className="table-body-item">
                    <div className="d-flex">
                    <HeadTableCheckBox />
                    <div className="table-body-text">
                        {{ region.name }}  <!-- Вставляем название региона -->
                    </div>
                    </div>
                </div>
                <div className="table-body-item">
                    МБОУ Средняя общеобразовательная школа №2  <!-- Заглушка -->
                </div>
                <div className="table-body-item">
                    ул. Николая Гондатти, д. 13 ул. Н. Гондатти 13 ; ул. Н. Зелинского 22  <!-- Заглушка -->
                </div>
                <div className="table-body-item">
                    <div className="d-flex flex-wrap">
                    <div className="type-education">
                        Среднее <!-- Заглушка -->
                    </div>
                    <div className="type-education">
                        Высшее <!-- Заглушка -->
                    </div>
                    <div className="type-education">
                        Специальное <!-- Заглушка -->
                    </div>
                    <div className="type-education">
                        Проф <!-- Заглушка -->
                    </div>
                    <div className="type-education">
                        Бакалавр <!-- Заглушка -->
                    </div>
                    </div>
                </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<style scoped>
.table-body-row{
    border-bottom: 1px solid #D3D3DE;
}
.table-body-item{
    padding: 4px 16px;
    box-sizing: border-box;
    flex: 1;
    display: flex;
    align-items: center;
}
.table-body-item:last-child{
    flex: none;
    width: 265px;    
    padding: 4px 16px 0px 16px;
}
.table-body-text{
    margin-left: 10px;
}
.type-education{
    border: 1px solid rgba(14,14,16,0.1);
    border-radius: 8px;
    padding: 4px 6px;
    font-size: 12px;
    margin-bottom: 4px;
    margin-right: 4px;
}
.type-education:last-child{
    margin-right: 0;
}
</style>