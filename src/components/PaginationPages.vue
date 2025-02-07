<script>

</script>

<template>
 <div className="d-flex">
        <div className="pagination-arrow">
            <img src="../assets/img/backArrow.png" alt="" className='d-block'/>
        </div>
        <div className="pagination-numbers">
            <div className="pagination-number active">1</div>
            <div className="pagination-number ">2</div>
            <div className="pagination-number ">3</div>
            <div className="pagination-number ">...</div>
            <div className="pagination-number ">10</div>
        </div>
        <div className="pagination-arrow">
            <img src="../assets/img/nextArrow.png" alt="" className='d-block'/>
        </div>
    </div>
</template>

<style scoped>
.pagination-arrow{
    border-radius: 8px;
    border: 1px solid #D3D3DE;
    width: 44px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.pagination-arrow:hover{
    background-color: #F1F4FD;
}
.pagination-numbers{
    margin: 0 24px;
    display: flex;
}
.pagination-number{
    width: 36px;
    height: 36px;
    border-radius: 8px;
    margin-right: 2px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.pagination-number:last-child{
    margin-right: 0;
}
.pagination-number.active{
    background-color: #F0F0F7;
}

.pagination-number:hover{
    background-color: #F1F4FD;
}
</style>