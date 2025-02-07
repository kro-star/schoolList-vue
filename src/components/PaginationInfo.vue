<script>

</script>

<template>
<div className="d-flex align-items-center">
        <div className="quantity-pages">
            1-8 из 50 записей
        </div>
        <div className="pagination-filter">
                <div className="pagination-text">
                Показывать
                </div>
                <select name="quantity" id="" className="quantity">
                    <option value="10" selected>10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
        </div>
    </div>
</template>

<style scoped>
.quantity{
    color: #687588;
    border-radius: 8px;
    border: 1px solid #D3D3DE;
    padding: 6px 10px;
    width: 73px;
    height: 36px;
}
.pagination-filter{
    color: #687588;
    display: flex;
    align-items: center;

}
.quantity-pages{
    color:#687588;
    margin-right: 16px;
}
.pagination-text{
    margin-right: 6px;
}
</style>