<template>
    <div class="main-con">
        <div class="time-con">
            <section class="left-time-con linear-border">
                <div class="title-con">
                    <img src="@/assets/cemetery-title.png"/>
                </div>
                <div class="timer" v-if="countDown.length >= 4">
                    <div class="item">
                        <span>{{countDown[0]}}</span>
                        <label>Days</label>
                    </div>
                    <div class="item">
                        <span>{{countDown[1]}}</span>
                        <label>Hours</label>
                    </div>
                    <div class="item">
                        <span>{{countDown[2]}}</span>
                        <label>Minutes</label>
                    </div>
                    <div class="item">
                        <span>{{countDown[3]}}</span>
                        <label>Seconds</label>
                    </div>
                </div>
                <div class="brief">
                    PRESALE LAUNCH DAY<br/><span>AUGUST 25,2021</span>
                </div>
                <div class="sub-brief">
                    3% of total supply (5 billion MaMo)<br/>is available for sale soon!
                </div>
            </section>
        </div>
        <div class="card-con">
            <div class="item">
                <span>FUNDED {{fundedRate}}%</span>
                <span>= ${{fundedPrice}}</span>
            </div>
            <div class="left-time-pic" @click="purchase">
                <img class="animate__animated animate__heartBeat animate__infinite" src="@/assets/purchase-mobile-btn.png"/>
            </div>
            <div class="item">
                <span>{{mamoPrice}} BUSD</span>
                <span>Per MaMo</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            price: '83833.95',
            nextReward: '254875',
            countDown: [],
            timer: null,
            // 数据
            fundedRate: 50,
            fundedPrice: 294823.85,
            mamoPrice: 0.000085
        }
    },
    mounted(){
        const time = Date.parse(new Date('2021-08-25'));
        this.timer = setInterval(() => {
            this.countDown = this.parseTime((time - Date.parse(new Date()))/1000);
        }, 1000)
    },
    beforeDestroy(){
        this.timer && clearInterval(this.timer)
    },
    methods:{
        parseTime(time){
            let DD = parseInt(time/(3600*24));
            time = time%(3600*24);
            let hh = parseInt(time/3600);
            time = time%3600;
            let mm = parseInt(time/60);
            time = time%60;
            let ss = time;

            DD = DD < 10 ? '0' + DD : DD;
            hh = hh < 10 ? '0' + hh : hh;
            mm = mm < 10 ? '0' + mm : mm;
            ss = ss < 10 ? '0' + ss : ss;

            return [DD, hh, mm, ss];
        },
        purchase(){
            // TODO
        }
    }
}
</script>

<style lang="less" scoped>
    .main-con{
        margin: 50px 20px 0 20px;
    }
    .time-con{
        position: relative;
    }
    .left-time-pic{
        width: 120px;
        text-align: center;
        position: relative;

        img{
            width: 100px;
            height: auto;
            margin-left: 0;
        }
    }
    .left-time-con{
        flex: 1;
        height: 250px;
        margin-top: 30px;
        border-radius: 10px;
        background-image: linear-gradient(45deg, #00FFF9, #099DFE);

        &::before{
            margin: 8px;
            border-radius: 10px;
        }
        div{
            position: relative;
            z-index: 999;
        }
        .timer{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: -20px 25px 20px 25px;

            .item{
                width: 60px;
                height: 60px;
                border-radius: 10px;
                background-image: linear-gradient(135deg, #eeb644, #F8AB31);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-shadow: 3px 3px 5px rgba(81,49,10,.8);

                span{
                    color: #fff;
                    display: block;
                    font-size: 30px;
                    font-weight: bold;
                }
                label{
                    color: #fff;
                    display: block;
                    font-size: 11px;
                    font-weight: bold;
                }
            }
        }
        .brief{
            font-size: 14px;
            font-weight: bold;
            color: #fff;
            text-align: center;
            text-shadow: 3px 3px 5px rgba(0,0,0,.8);
            padding-top: 5px;

            span{
                color: #F8AB31;
                padding-left: 10px;
            }
        }
        .sub-brief{
            font-size: 12px;
            color: #fff;
            text-align: center;
            padding-top: 10px;
        }

    }
    .left-time-con .title-con{
        width: 260px;
        height: 70px;
        overflow: hidden;
        position: relative;
        z-index: 999;
        left: -3px;
        top: -35px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-size: 100% 100%;
        background-repeat: no-repeat;

        img{
            height: 100%;
            width: 100%;
        }
    }
    .left-time-con .title-con .title{
        color: #fff;
        text-align: center;
        font-size: 26px;
        font-weight: bold;
        padding-right: 10px;
    }

    .card-con{
        display: flex;
        flex-direction: row;
        position: relative;
        z-index: 9;
        margin-top: 20px;

        .item{
            flex: 1;
            background-color: #3c3c3c;
            height: 60px;
            color: #fff;
            font-size: 13px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            border-radius: 10px;
            font-weight: bold;
            line-height: 1.4em;

            span{
                display: block;
            }
        }
    }
</style>
