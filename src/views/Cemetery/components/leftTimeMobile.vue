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
                    PUBLIC SALES PHASE 1 LAUNCH DAY<br/><span>AUGUST 28,2021</span>
                </div>
                <div class="sub-brief">
                    1% of total supply (2 billion MaMo)<br/>is available for sale soon!
                </div>
                <div style="clear: both;height:20px;"></div>
                <self-progress></self-progress>
            </section>
        </div>
        <div class="left-time-pic" @click="purchase">
            <img class="pointer animate__animated animate__heartBeat animate__infinite" src="@/assets/pointer.png"/>
            <img class="btn" src="@/assets/mamo-icon.png"/>
        </div>
        <div class="card-con">
            <div class="item">
                <div class="tab">
                    <div class="title" :class="activeTab==0 ? 'active' : ''" @click="activeTab=0">PHASE 2</div>
                    <div class="title" :class="activeTab==1 ? 'active' : ''" @click="activeTab=1">PHASE 3</div>
                    <div class="title" :class="activeTab==2 ? 'active' : ''" @click="activeTab=2">LAUNCHING DAY</div>
                </div>
                <div v-if="activeTab == 0">
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
                <div v-if="activeTab == 1">
                    <div class="row">
                        <label>Begin</label>
                        <span style="font">{{phase3.begin}}</span>
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
                <div v-if="activeTab == 2">
                    <div class="row">
                        <label style="color:#F8AB31;font-weight: bold;">Date = {{launchDay.date}}</label>
                    </div>
                    <div class="row">
                        <label style="line-height: 30px;color:#F8AB31;font-weight: bold;">Unsold MaMo will thus aliocate add on to reward pool (Tokenomic {{launchDay.tokenomic}}%)</label>
                    </div>
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
import SelfProgress from './progressMobile';
import EthereumTx from 'ethereumjs-tx';
import swal from 'sweetalert';

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
                gas: 100975
            },
            // 数据
            activeTab: 0,
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
        }, 1000)

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
                text: "Please input purchase num",
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
                    console.log('请输入目标地址');
                    return;
                } else if(this.toAddress == state.currentAccount){
                    console.log('不能转给自己');
                    return;
                } else if(!this.purchaseForm.num){
                    console.log('数量不能为空');
                    return;
                }
                const web3 = state.web3;
                const contractAddress = '0xc398071075C7715684e67F69CA372201178c6644';
                const fromAddress = state.currentAccount;
                const toAddress = "0x55d398326f99059ff775485246999027b3197955";
                let num = this.purchaseForm.num;
                num = web3.utils.toWei(num + '', 'ether');
                const count = await web3.eth.getTransactionCount(fromAddress);
                const gasPrice = web3.eth.gasPrice;
                const gasLimit = that.purchaseForm.gas;
                const mamoAbiJson = require("@/abi/test.json");
                const mamoContract = new web3.eth.Contract(mamoAbiJson, contractAddress);
                const data = mamoContract.methods.transfer(toAddress, num);// get hash
                const rawTransaction = {
                    "from": fromAddress,
                    "nonce": web3.utils.numberToHex(count),
                    "gasPrice": web3.utils.numberToHex(gasPrice),
                    "gasLimit": web3.utils.numberToHex(gasLimit),
                    "to": contractAddress,
                    "value": num,
                    //"data": data,
                };
                const privateKey = Buffer.from(
                    'ae54a68c9029be2cdfecb03b1b661ac9840a4dc87942b9303f77cea74d495053',
                    'hex',
                );
                const tx = new EthereumTx(rawTransaction);
                tx.sign(privateKey);
                const serializedTx = tx.serialize();
                // 发送交易
                web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), (err, hash) => {
                    if (!err){
                        console.log(hash);
                        const txHash = hash
                        swal({
                            title: 'Purchase successful!',
                            text: "TxHash:" + txHash,
                        });
                    } else {
                        console.log("Error:" + err)
                        swal({
                            title: 'Failed purchase!'
                        });
                    }
                });
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
        margin: 50px 20px 0 20px;
    }
    .time-con{
        position: relative;
    }
    .left-time-pic{
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: -45px;
        z-index: 999;

        .pointer{
            height: 40px;
            margin-left: 0;
            margin-right: 10px;
        }
        .btn{
            height: 80px;
        }
    }
    .left-time-con{
        flex: 1;
        height: 380px;
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
        flex-direction: column;
        position: relative;
        z-index: 9;
        margin-top: 20px;

        .item{
            flex: 1;
            background-color: #141414;
            display: flex;
            flex-direction: column;
            border-radius: 10px;
            padding-bottom: 10px;

            .tab{
                display: flex;
                flex-direction: row;
                background-color: #282828;
                width: 100%;
                height: 40px;
                border-radius: 10px 10px 0 0;
                overflow: hidden;
                margin-bottom: 10px;

                .title{
                    color: #fff;
                    font-size: 15px;
                    font-weight: bold;
                    line-height: 40px;
                    height: 40px;
                    text-align: center;
                    padding: 0 10px;
                    flex: 1;

                    &:last-child{
                        flex: none;
                        padding: 0 15px;
                    }
                    &.active{
                        background-color: #F8AB31;
                    }
                }
            }
            .row{
                display: flex;
                flex-direction: row;
                padding: 5px 15px;

                label{
                    color: #a0a0a0;
                    flex: 1;
                    display: block;
                    font-size: 14px;
                }
                span{
                    display: block;
                    color: #F8AB31;
                    font-size: 14px;
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
                width: 40px;
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
