<template>
    <div class="main-con">
        <div class="brief-con">
            <div class="item">
                <div class="title">Maximun Purchase:</div>
                <div class="sub-title">10000 BUSD/USDT<br/>per BSC wallet address</div>
            </div>
            <div class="item">
                <div class="title">Minimun Purchase:</div>
                <div class="sub-title">50 BUSD/USDT<br/>per BSC wallet address</div>
            </div>
        </div>
        <div class="progress-con">
            <div class="progress" :style="{width: progress + '%'}"></div>
            <img class="progress-icon" src="@/assets/logo-icon.png" :style="{left: progress + '%'}"/>
        </div>

        <div class="target-item">
            <div class="sub-title">Target: 510000 BUSD/USDT</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            progress: 88
        }
    }
}
</script>

<style lang="less" scoped>
    .main-con{
        margin: 0 20px;
    }
    .progress-con{
        height: 20px;
        background-color: #fff;
        position: relative;
        margin: 20px 0 0 0;
        border-radius: 10px;

        .progress{
            width: 100%;
            height: 100%;
            background-image: linear-gradient(135deg, #FFF944, #F8AB31);
            border-radius: 10px;
            box-shadow: 3px 3px 5px rgba(0,0,0,.6);
        }
        .progress-icon{
            width: 40px;
            height: 40px;
            position: absolute;
            top: -10px;
            left: 100%;
            margin-left: -15px;
        }
    }
    .brief-con{
        display: flex;
        flex-direction: row;
        margin-top: -20px;

        .item{
            flex: 1;

            &:last-child{
                text-align: right;
            }
            .title{
                color: #fff;
                font-size: 12px;
                font-weight: bold;
                text-shadow: 3px 3px 5px rgba(0,0,0,.6);
            }
            .sub-title{
                color: #fff;
                font-size: 12px;
                font-weight: bold;
                text-shadow: 3px 3px 5px rgba(0,0,0,.6);
                margin-top: 5px;
            }
        }
    }
    .target-item{
        margin-top: 15px;

        .sub-title{
            color: #fff;
            font-size: 12px;
            font-weight: bold;
            text-shadow: 3px 3px 5px rgba(0,0,0,.6);
            margin-top: 5px;
        }
    }
</style>
