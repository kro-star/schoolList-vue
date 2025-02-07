<script>

import PaginationInfo from './PaginationInfo.vue'
import PaginationPages from './PaginationPages.vue'

export default {
  components: {
    PaginationInfo,
    PaginationPages
  },
}

</script>

<template>
    <div className="container-fluid">
        <div className="row pb-4">
            <div className="col-12">
                <div className="d-flex justify-content-between">
                    <PaginationPages />
                    <PaginationInfo />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>