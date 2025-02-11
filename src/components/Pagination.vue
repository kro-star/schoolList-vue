<script setup>

import { useSchoolStore } from '@/store/school';
import PaginationInfo from './PaginationInfo.vue'
import PaginationPages from './PaginationPages.vue'

const schoolStore = useSchoolStore();

</script>

<template>
    <div className="container-fluid">
        <div v-if="schoolStore.schools.length > 0" className="row pb-4">
            <div className="col-12 col-lg-6 order-2 order-lg-1">
                <div className="d-flex justify-content-center justify-content-lg-start align-items-center ">
                    <PaginationPages />
                </div>
            </div>
            <div class="col-12 col-lg-6 order-1 order-lg-2 pb-4">
                <div className="d-flex justify-content-center align-items-center justify-content-lg-end  ">
                    <PaginationInfo />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>