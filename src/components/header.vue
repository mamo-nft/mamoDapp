<template>
    <div class="header-con">
        <div class="logo">
            <img src="@/assets/logo.png" />
        </div>
        <div style="flex: 1;"></div>
        <div class="right-con">
            <img class="btn" src="@/assets/header-btn-1.png" />
            <img class="btn" src="@/assets/header-btn-2.png" />
        </div>
    </div>
</template>

<style scoped>
    .header-con{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 1200px;
        margin: 0 auto;
        height: 150px;
    }
    .header-con .logo{
        height: 100px;
    }
    .header-con .logo img{
        height: 100%;
    }
    .header-con .right-con{
        width: auto;
    }
    .header-con .right-con .btn{
        height: 40px;
        margin-left: 50px;
    }
</style>
