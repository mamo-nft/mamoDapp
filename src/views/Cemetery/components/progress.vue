<template>
    <div class="progress-main-con">
        <div class="progress-con">
            <div class="progress" :style="{width: progress + '%'}"></div>
            <img class="progress-icon" src="@/assets/logo-icon.png" :style="{left: progress + '%'}"/>
        </div>
        <div class="brief-con">
            <div class="item">
                <div class="title">Maximun Purchase:</div>
                <div class="sub-title">2000 BUSD/USDT per BSC wallet address</div>
            </div>
            <div class="item">
                <div class="title">Minimun Purchase:</div>
                <div class="sub-title">100 BUSD/USDT per BSC wallet address</div>
            </div>
            <div class="item">
                <div class="title">Target:</div>
                <div class="sub-title">170000 BUSD/USDT</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            progress: 88
        }
    },
    mounted(){

    },
    methods:{

    }
}
</script>

<style lang="less" scoped>
    .progress-main-con{
        width: 80%;
        margin: 0 auto;
    }
    .progress-con{
        height: 30px;
        background-color: #fff;
        position: relative;
        margin: 60px 0 0 0;
        border-radius: 5px;

        .progress{
            width: 100%;
            height: 100%;
            background-image: linear-gradient(135deg, #FFF944, #F8AB31);
            border-radius: 5px;
            box-shadow: 3px 3px 5px rgba(0,0,0,.6);
        }
        .progress-icon{
            width: 80px;
            height: 80px;
            position: absolute;
            top: -25px;
            left: 100%;
            margin-left: -20px;
        }
    }
    .brief-con{
        display: flex;
        flex-direction: row;
        margin-top: 35px;

        .item{
            flex: 1;

            &:last-child{
                flex: none;
            }
            .title{
                color: #fff;
                font-size: 22px;
                font-weight: bold;
                text-shadow: 3px 3px 5px rgba(0,0,0,.6);
            }
            .sub-title{
                color: #fff;
                font-size: 18px;
                font-weight: bold;
                text-shadow: 3px 3px 5px rgba(0,0,0,.6);
                margin-top: 15px;
            }
        }
    }
</style>
