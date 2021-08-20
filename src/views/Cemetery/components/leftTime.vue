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
                    PUBLIC SALES PHASE 1 LAUNCH DAY<span>AUGUST 28,2021</span>
                </div>
                <div class="sub-brief">
                    1% of total supply (2 billion MaMo) is available for sale soon!
                </div>

                <self-progress></self-progress>
            </section>
            <div class="left-time-pic" @click="purchase">
                <img class="pointer animate__animated animate__heartBeat animate__infinite" src="@/assets/pointer.png"/>
                <img class="btn" src="@/assets/mamo-icon.png"/>
            </div>
        </div>
        <div class="card-con">
            <div class="item">
                <div class="title">PHASE 2</div>
                <div class="row">
                    <label>Begin</label>
                    <span>{{phase2.begin}}</span>
                </div>
                <div class="row">
                    <label>End</label>
                    <span>{{phase2.end}}</span>
                </div>
                <div class="row">
                    <label>Total MaMo</label>
                    <span>{{phase2.totalMamo}}</span>
                </div>
                <div class="row">
                    <label>MaMo Price</label>
                    <span>{{phase2.mamoPrice}}</span>
                </div>
            </div>
            <div class="item">
                <div class="title">PHASE 3</div>
                <div class="row">
                    <label>Begin</label>
                    <span>{{phase3.begin}}</span>
                </div>
                <div class="row">
                    <label>End</label>
                    <span>{{phase3.end}}</span>
                </div>
                <div class="row">
                    <label>Total MaMo</label>
                    <span>{{phase3.totalMamo}}</span>
                </div>
                <div class="row">
                    <label>MaMo Price</label>
                    <span>{{phase3.mamoPrice}}</span>
                </div>
            </div>
            <div class="item">
                <div class="title">LAUNCHING DAY</div>
                <div class="row">
                    <label style="color:#F8AB31;font-weight: bold;">Date = {{launchDay.date}}</label>
                </div>
                <div class="row">
                    <label style="line-height: 30px;color:#F8AB31;font-weight: bold;">Unsold MaMo will thus aliocate add on to reward pool (Tokenomic {{launchDay.tokenomic}}%)</label>
                </div>
            </div>
        </div>

        <div style="display: none">
            <div id="purchaseForm" class="purchase-form">
                <div class="form-item">
                    <label>Coin:</label>
                    <div class="coin-tag" :class="purchaseForm.coin == 'BUSD' ? 'active' : ''" @click="purchaseForm.coin = 'BUSD'">BUSD</div>
                    <div class="coin-tag" :class="purchaseForm.coin == 'USDT' ? 'active' : ''" @click="purchaseForm.coin = 'USDT'">USDT</div>
                </div>
                <div class="form-item">
                    <label>From:</label>
                    <input type="number" class="purchase-num" v-model="purchaseForm.num" @input="onPurchaseNumInput" />
                    <span>{{purchaseForm.coin}}</span>
                </div>
                <div class="form-item">
                    <label>To:</label>
                    <div class="val">{{purchaseForm.targetMamo}} MAMO</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import swal from 'sweetalert';
import SelfProgress from './progress'
import EthereumTx from 'ethereumjs-tx';

export default {
    components:{
        SelfProgress
    },
    data() {
        return {
            price: '83833.95',
            nextReward: '254875',
            countDown: [],
            timer: null,
            // purchase
            elPurchaseForm: null,
            toAddress: '0x3f7734094f272A42868b66BB910cc53542cF34df',
            purchaseForm:{
                coin: 'BUSD',// default BUSD
                num: 10,
                targetMamo: parseInt(10/0.000085),
                gasLimit: 100975
            },
            // 数据
            phase2:{
                begin: '01/09/21 00:00 UTC+0',
                end: '05/09/21 23:59 UTC+0',
                totalMamo: '4 Billion',
                mamoPrice: '0.000095 BUSD'
            },
            phase3:{
                begin: '06/09/21 00:00 UTC+0',
                end: '11/09/21 23:59 UTC+0',
                totalMamo: '4 Billion',
                mamoPrice: '0.000105 BUSD'
            },
            launchDay:{
                date: '15th September,2021 00:00 UTC+0',
                tokenomic: 29
            }
        }
    },
    mounted(){
        const time = Date.parse(new Date('2021-08-25'));
        this.timer = setInterval(() => {
            this.countDown = this.parseTime((time - Date.parse(new Date()))/1000);
        }, 1000);

        this.elPurchaseForm = document.getElementById('purchaseForm')
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
            const that = this;
            const state = this.$store.state;
            if(!state.web3){
                console.log('web3不可用');
                if(!state.isConnected){
                    swal({
                        text: "Wallet is not connected!",
                    });
                    return;
                }
            }
            swal({
                title: "Please input purchase num",
                content: that.elPurchaseForm,
                buttons: {
                    cancel: true,
                    confirm: true,
                }
            }).then(async (ok) => {
                if(!ok){
                    return;
                }
                if(!this.toAddress){
                    swal({
                        text: "Please enter the destination address!",
                    });
                    return;
                } else if(this.toAddress == state.currentAccount){
                    swal({
                        text: "Can't transfer to myself!",
                    });
                    return;
                } else if(!this.purchaseForm.num){
                    swal({
                        text: "Quantity cannot be empty!",
                    });
                    return;
                } else if(this.purchaseForm.num < 10){
                    swal({
                        text: "The quantity cannot be less than 10!",
                    });
                    return;
                }
                const web3 = state.web3;
                let num = this.purchaseForm.num;
                num = 0.000001;// #TODO 测试用，发布时删除
                num = web3.utils.toWei(num + '', 'ether');
                swal({
                    text: "Transaction in progress, please wait...",
                });
                if(that.purchaseForm.coin == 'BUSD'){
                    const busdContract = new web3.eth.Contract(state.abiJson.busd, state.contractAddress.busd);
                    busdContract.methods.approve(state.contractAddress.mamo, num).send({from: state.currentAccount}).then(async (res)=>{
                        console.log(res)
                        if(res){
                            const mamoContract = new web3.eth.Contract(state.abiJson.mamo, state.contractAddress.mamo);
                            mamoContract.methods.crowdSaleWithBusd(num).send({from: state.currentAccount}).then(async res=>{
                                console.log('sale result:')
                                console.log(res)
                                swal.close()
                                if(res){
                                    swal({
                                        text: "Successful transaction!",
                                        icon: "success"
                                    });
                                } else {
                                    swal({
                                        text: "Transaction failed!",
                                    });
                                }
                            });
                        } else {
                            swal({
                                text: "Transaction failed!",
                            });
                        }
                    }).catch(err => {
                        console.log(err)
                    });
                } else if(that.purchaseForm.coin == 'USDT'){
                    const usdtContract = new web3.eth.Contract(state.abiJson.usdt, state.contractAddress.usdt);
                    usdtContract.methods.approve(state.contractAddress.mamo, num).send({from: state.currentAccount}).then(async (res)=>{
                        console.log(res)
                        if(res){
                            const mamoContract = new web3.eth.Contract(state.abiJson.mamo, state.contractAddress.mamo);
                            mamoContract.methods.crowdSaleWithUsdt(num).send({from: state.currentAccount}).then(async res=>{
                                console.log('sale result:')
                                console.log(res)
                                swal.close()
                                if(res){
                                    swal({
                                        text: "Successful transaction!",
                                        icon: "success"
                                    });
                                } else {
                                    swal({
                                        text: "Transaction failed!",
                                    });
                                }
                            });
                        } else {
                            swal({
                                text: "Transaction failed!",
                            });
                        }
                    }).catch(err => {
                        console.log(err)
                    });
                }
            });
        },
        onPurchaseNumInput(e){
            let v = e.target.value;
            v = v ? parseInt(v) : 0;
            if(this.purchaseForm.coin == 'BUSD'){
                this.purchaseForm.targetMamo = parseInt(v/0.000085)
            } else if(this.purchaseForm.coin == 'USDT'){
                this.purchaseForm.targetMamo = parseInt(v/0.000085)
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .main-con{
        width: 1200px;
        margin: 50px auto 0 auto;
    }
    .time-con{
        position: relative;
        padding-bottom: 100px;
    }
    .left-time-pic{
        width: 480px;
        height: 200px;
        margin-left: -240px;
        position: absolute;
        left: 50%;
        bottom: 10px;
        z-index: 9;
        overflow: hidden;
        display: flex;
        align-items: center;

        .pointer{
            height: 90px;
            margin-left: 30px;
        }
        .btn{
            width: 200px;
            height: 200px;
            margin-left: 30px;
            cursor: pointer;
        }
    }
    .left-time-con{
        flex: 1;
        height: 700px;
        margin-top: 100px;
        border-radius: 10px;
        background-image: linear-gradient(45deg, #00FFF9, #099DFE);

        &::before{
            margin: 10px;
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
            margin: -80px auto 20px auto;
            width: 680px;

            .item{
                width: 120px;
                height: 120px;
                border-radius: 10px;
                background-image: linear-gradient(135deg, #FFF944, #F8AB31);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-shadow: 3px 3px 5px rgba(0,0,0,.8);

                span{
                    color: #fff;
                    display: block;
                    font-size: 50px;
                    font-weight: bold;
                }
                label{
                    color: #fff;
                    display: block;
                    font-size: 15px;
                    font-weight: bold;
                }
            }
        }
        .brief{
            font-size: 30px;
            font-weight: bold;
            color: #fff;
            text-align: center;
            text-shadow: 3px 3px 5px rgba(0,0,0,.8);
            padding-top: 35px;

            span{
                color: #F8AB31;
                padding-left: 10px;
            }
        }
        .sub-brief{
            font-size: 18px;
            color: #fff;
            text-align: center;
            padding-top: 20px;
        }

    }
    .left-time-con .title-con{
        width: 700px;
        height: 200px;
        overflow: hidden;
        position: relative;
        z-index: 999;
        left: -20px;
        top: -120px;
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
        margin: 50px -20px 0 -20px;

        .item{
            flex: 1;
            background-color: #141414;
            display: flex;
            flex-direction: column;
            border-radius: 10px;
            margin: 0 20px 0 20px;
            padding-bottom: 10px;

            .title{
                color: #fff;
                font-size: 26px;
                font-weight: bold;
                background-color: #282828;
                width: 100%;
                height: 50px;
                line-height: 50px;
                text-align: center;
                margin-bottom: 10px;
                border-radius: 10px 10px 0 0;
            }
            .row{
                display: flex;
                flex-direction: row;
                padding: 5px 15px;

                label{
                    color: #a0a0a0;
                    flex: 1;
                    display: block;
                }
                span{
                    display: block;
                    color: #F8AB31;
                    font-weight: bolder;
                }
            }
        }
    }
    .purchase-form{

        .form-item{
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-top: 15px;

            label{
                font-size: 15px;
                font-weight: bold;
                width: 100px;
                text-align: right;
                padding-right: 10px;
            }
            input{
                border: 1px solid #ddd;
                border-radius: 5px;
                height: 36px;
                flex: 1;
                padding: 0 15px;
            }
            span{
                padding-left: 10px;
                padding-right: 20px;
                font-size: 15px;
            }
            .coin-tag{
                border: 1px solid #ddd;
                border-radius: 5px;
                height: 36px;
                line-height: 36px;
                width: 60px;
                text-align: center;
                font-size: 15px;
                margin-right: 20px;
                cursor: pointer;

                &.active{
                    border: 1px solid #F8AB31;
                    color: #F8AB31;
                }
            }
        }
    }
</style>
