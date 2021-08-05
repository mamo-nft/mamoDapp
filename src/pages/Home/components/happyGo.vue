<template>
    <section class="section-con">
        <div class="left-con">
            <div class="happy-go-lucky linear-border">
                <div class="title">Happy Go Lucky</div>
                <div class="sub-title">Round #20 Contract Drained in</div>
                <div class="countdown">{{secondToTime(countdownTime)}}</div>
                <div class="active-pot">Active Pot (Mamo)</div>
                <div class="active-pot-num">554845741.658</div>
            </div>
            <div class="purchase">
                <img src="@/assets/purchase.png"/>
            </div>
            <div class="lucky-con">
                <div class="lucky-mamo">
                    <img src="@/assets/lucky-pic.png"/>
                </div>
                <div class="lucky-one-con">
                    <img class="lucky-title" src="@/assets/lucky-title.png"/>
                    <div class="lucky-one linear-border">
                        <div class="address">
                            0x6e321536eCb4AdE7186f9680701C4A7eAb3919Bf
                        </div>
                        <div class="account">
                            <label>Buy Account</label>
                            <span>58954959.93 BUSD</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="right-con">
            <div class="how-to-play">
                <img src="@/assets/how-to-play.png"/>
            </div>
            <div class="reward-pool-con">
                <div class="title">
                    <img src="@/assets/reward-pool.png"/>
                </div>
                <div class="contract-address-con">
                    <div class="top">
                        <div class="title">CONTRACT ADDRESS</div>
                        <div class="copy-btn">COPY</div>
                    </div>
                    <div class="address">
                        0x6e321536eCb4AdE7186f9680701C4A7eAb3919Bf
                    </div>
                </div>
            </div>
            <div style="height: 50px;"></div>
            <trade-log></trade-log>
        </div>
    </section>
</template>

<script>
import TradeLog from './tradeLog';

export default {
    components: {
        TradeLog
    },
    data () {
        return {
            // 倒计时
            countDownTimer: null,
            countdownTime: 60*15
        }
    },
    async mounted () {
        const that = this;
        // 倒计时
        clearInterval(this.countDownTimer);
        this.countDownTimer = setInterval(() => {
            that.countdownTime--
            if (that.countdownTime === 0) {
                clearInterval(this.countDownTimer)
            }
        }, 1000)
    },
    methods: {
        // 秒转时间
        secondToTime(second){
            let s = Math.floor(second%60);
            s = s < 10 ? '0' + s : s;
            let m = Math.floor((second / 60) % 60);
            m = m < 10 ? '0' + m : m;
            let h = Math.floor((second / 3600) % 24);
            h = h < 10 ? '0' + h : h;
            let d = Math.floor((second / 3600) / 24);

            return h + ":" + m + ":" + s;
        }
    }
}
</script>

<style scoped>
    .section-con{
        display: flex;
        flex-direction: row;
        width: 1200px;
        margin: 0 auto;
        margin-top: 50px;
    }
    .section-con .left-con{
        flex: 1;
    }
    .section-con .right-con{
        flex: 1;
        margin-left: 50px;
    }

    .how-to-play{
        text-align: right;
        margin-bottom: 20px;
    }
    .how-to-play img{
        height: 30px;
    }
    .happy-go-lucky{
        border-radius: 10px;
        background-image: linear-gradient(135deg, #FFF944, #F8AB31);
        padding: 40px 20px;
    }
    .happy-go-lucky:before{
        background-color: #000;
        margin: 10px;
    }
    .happy-go-lucky div{
        position: relative;
        z-index: 1;
    }
    .happy-go-lucky .title{
        font-size: 28px;
        color: #fff;
        text-align: center;
        font-weight: bold;
    }
    .happy-go-lucky .sub-title{
        font-size: 28px;
        color: #fff;
        text-align: center;
        font-weight: bold;
        margin-top: 20px;
    }
    .happy-go-lucky .countdown{
        font-size: 56px;
        text-align: center;
        font-weight: bold;
        margin-top: 20px;
        background-image: linear-gradient(135deg, #9FFD00, #00FF68);
        -webkit-background-clip: text;
        color: transparent;
    }
    .happy-go-lucky .active-pot{
        font-size: 22px;
        text-align: center;
        font-weight: bold;
        margin-top: 25px;
        background-image: linear-gradient(45deg, #9FFD00, #00FF68);
        -webkit-background-clip: text;
        color: transparent;
    }
    .happy-go-lucky .active-pot-num{
        font-size: 26px;
        text-align: center;
        font-weight: bold;
        margin-top: 10px;
        color: #fff;
    }

    .purchase{
        margin-top: -40px;
        position: relative;
        z-index: 3;
    }
    .purchase img{
        height: 180px;
    }
    .lucky-con{
        display: flex;
        flex-direction: row;
    }
    .lucky-con .lucky-mamo{
        margin-left: -50px;
    }
    .lucky-con .lucky-mamo img{
        max-width: 100%;
    }
    .lucky-con .lucky-one-con{
        width: 420px;
        margin-left: -50px;
    }
    .lucky-con .lucky-one-con .lucky-title{
        width: 100%;
        position: relative;
        z-index: 9;
    }
    .lucky-con .lucky-one-con .lucky-one{
        border-radius: 10px;
        overflow: hidden;
        background-image: linear-gradient(-90deg, #FD00FB, #FA00EC);
        padding: 40px 20px 30px 20px;
        margin-top: -20px;
        margin-left: 19.5%;
        position: relative;
    }
    .lucky-con .lucky-one-con .lucky-one:before{
        margin: 6px;
    }
    .lucky-con .lucky-one-con .lucky-one div{
        position: relative;
        z-index: 2;
    }
    .lucky-con .lucky-one-con .lucky-one .address{
        color: #fff;
        max-width: 100%;
        margin-bottom: 15px;
        word-wrap: break-word;
        word-break: normal;
        text-align: center;
        line-height: 1.4em;
    }
    .lucky-con .lucky-one-con .lucky-one .account label{
        color: rgba(255, 255, 255, .6);
        font-size: 15px;
        padding-right: 20px;
    }
    .lucky-con .lucky-one-con .lucky-one .account span{
        color: #fff;
        font-size: 15px;
    }

    .reward-pool-con{

    }
    .reward-pool-con .title{
        font-size: 30px;
        color: #fff;
        font-weight: bold;
    }
    .reward-pool-con .title img{
        height: 50px;
    }
    .contract-address-con{
        background-color: #fff;
        padding: 2px;
    }
    .contract-address-con .top{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .contract-address-con .top .title{
        flex: 1;
        font-size: 28px;
        color: #fff;
        background-color: #FF395F;
        height: 50px;
        line-height: 50px;
        padding-left: 15px;
    }
    .contract-address-con .top .copy-btn{
        width: 150px;
        font-size: 28px;
        font-weight: bold;
        text-align: center;
        background-color: #FF00FF;
        color: #fff;
        height: 50px;
        line-height: 50px;
        border-left: 2px solid #fff;
        cursor: pointer;
    }
    .contract-address-con .address{
        height: 50px;
        line-height: 50px;
        color: #FF395F;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
    }
</style>
