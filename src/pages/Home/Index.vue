<template>
    <div class="page-con">
        <bg></bg>
        <div class="content-con">
            <self-header></self-header>

            <div class="page-title">
                <img class="mamo-experiment" src="@/assets/page-title.png"/>
            </div>
            <div class="menu-con">
                <div class="menu-item" @click="goAnchor('#puzzle')">
                    <img class="btn" src="@/assets/card-btn-1.png" />
                </div>
                <div class="menu-item" @click="goAnchor('#hub')">
                    <img class="btn" src="@/assets/card-btn-2.png" />
                </div>
                <div class="menu-item" @click="goAnchor('#feast')">
                    <img class="btn" src="@/assets/card-btn-3.png" />
                </div>
                <div class="menu-item">
                    <img class="btn" src="@/assets/card-btn-4.png" />
                </div>
                <div class="menu-item">
                    <img class="btn" src="@/assets/card-btn-5.png" />
                </div>
            </div>

            <div id="puzzle"></div>
            <happy-go></happy-go>
            <div id="feast"></div>
            <feast></feast>
            <div id="hub"></div>
            <stake></stake>
            <self-footer></self-footer>

<!--            <div>当前账户：{{currentAccount}}</div>-->
<!--            <div>余额：{{balance}} ETH</div>-->
<!--            <div>-->
<!--                <input type="text" v-model="toAddress" placeholder="目标地址"/>-->
<!--                <button @click="transfer">转账</button>-->
<!--            </div>-->
<!--            <button @click="getPhotos">获取图片</button>-->
        </div>
    </div>
</template>

<script>
import Bg from '@/components/bg';
import SelfHeader from '@/components/header';
import HappyGo from './components/happyGo';
import Feast from './components/feast';
import Stake from './components/stake';
import SelfFooter from './components/footer';

export default {
    name: 'Index',
    components:{
        Bg,
        SelfHeader,
        HappyGo,
        Feast,
        Stake,
        SelfFooter
    },
    data () {
        return {
            web3: null,
            currentAccount: null,
            balance: 0,
            toAddress: null,
            txHash: null,
            // 倒计时
            countDownTimer: null,
            countdownTime: 60*15
        }
    },
    async mounted () {
        const that = this;


        const web3 = that.$web3;
        const accounts = await web3.eth.getAccounts(res=>{
            console.log(res)
        });
        that.currentAccount = accounts && accounts.length > 0 ? accounts[0] : null;
        if(that.currentAccount){
            // 返回指定地址账户的余额
            const balance = await web3.eth.getBalance(that.currentAccount);
            that.balance = web3.utils.fromWei(balance, 'ether');
        }
    },
    methods: {
        // mark
        goAnchor(selector) {
            document.querySelector(selector).scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
        },
        // 转账测试
        transfer(){
            if(!this.$web3){
                console.log('web3不可用');
                return;
            }
            if(!this.toAddress){
                console.log('请输入目标地址');
                return;
            } else if(this.toAddress == this.currentAccount){
                console.log('不能转给自己');
                return;
            }
            const web3 = this.$web3;
            let value = web3.utils.toWei('1', 'ether')
            var message = {from: this.currentAccount, to: this.toAddress, value:value};
            web3.eth.sendTransaction(message, (err, res) => {
                var output = "";
                if (!err) {
                    output += res;
                    this.txHash = res
                } else {
                    output = "Error"+err;
                }
            })
        },
        // 本地测试ABI
        async getPhotos(){
            const PhotoNFTDataAbi = require("@/abi/PhotoNFTData.json");
            const web3 = this.$web3;
            const instance = await NCWeb3.loadAbi(PhotoNFTDataAbi, web3);// 加载ABI通用方法
            if(instance){
                const allPhotos = await instance.methods.getAllPhotos().call();// 调用ABI接口
                console.log(allPhotos);
            }
        },
    }
}
</script>

<style scoped>
    .page-con{
        background-color: #000;
    }
    .content-con{
        position: relative;
        z-index: 1;
    }

    .page-title{
        padding: 20px 0;
        text-align: center;
    }
    .page-title .mamo-experiment{
        height: 120px;
    }

    .menu-con{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .menu-con .menu-item{
        padding: 0 20px;
    }
    .menu-con .menu-item .btn{
        height: 200px;
    }
</style>
