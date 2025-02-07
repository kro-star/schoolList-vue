<script setup>

</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="d-flex justify-content-between p-4">
                    <div class="logo-text">
                        Таблица учереждений
                    </div>
                    <div class="active d-flex">
                        <div class="position-relative">
                            <input type="text" class="search" placeholder = "Поиск" />
                            <img src="../assets/img/search.png" alt="" class='search-img'/>
                        </div>
                        <div class="btn-download">
                            <img src="../assets/img/iconButton.png" alt="" />
                            <span class='btn-text'>Скачать</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.logo-text{
    font-size: 32px;
    font-weight: 700;
    color: #111827;
    line-height: 38.4px;
}

.search{
    padding: 17.5px 24px;
    width: 300px;
    border-radius: 10px;
    border: 1px solid #D3D3DE;
    margin-right: 20px;
    background-color: white;

}
.search::placeholder{
    color: #55555C;
    font-size: 16px;
    line-height: 20.8px;
}
.search-img{
    position: absolute;
    top: 18px;
    right: 50px;
}
.btn-download{
    padding: 16px 24px;
    background-color: #33D35E;
    border-radius: 10px;
}
.btn-download:hover{
    background-color: #24C14E;
}
.btn-download:active{
    background-color: #16B240;
}

.btn-text{
    line-height: 20.8px;
    font-size: 16px;
    margin-left: 11px;
}
</style>