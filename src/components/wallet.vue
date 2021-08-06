<template>
    <div>
        <div class="mask animate__animated animate__fadeIn" @click="hideWallet" v-if="show"></div>
        <div class="wallet-con" :class="show ? 'active animate__animated animate__slideInRight' : 'animate__animated animate__slideOutRight'">
            <div class="current-account">
                <span class="title">Current Account</span>
                <span class="address">{{currentAccount || '--'}}</span>
            </div>
            <div class="no-connected" v-if="!isConnected">
                Wallet is not connected!
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Wallet',
    data() {
        return {
            show: false,
            web3: null,
            isConnected: false,
            currentAccount: null,
            balance: 0,
            toAddress: null,
            txHash: null,
        }
    },
    mounted () {
        const that = this;

        that.$emitBus.$on('SHOW_WALLET', res=>{
            that.show = true;
        });
        that.$emitBus.$on('HIDE_WALLET', res=>{
            that.show = false;
        });

        const web3 = that.$web3;
        if(web3 && web3.isConnected()){
            // that.isConnected = true;
            // that.initAccount(web3);
        }
    },
    methods: {
        hideWallet(){
            this.show = false;
            this.$emitBus.$emit('WALLET_HIDED');
        },
        async initAccount(web3){
            const that = this;
            if(!that.isConnected){
                return;
            }
            console.log(web3)
            web3.eth.getAccounts(res=>{
                console.log(res)
            });
            that.currentAccount = accounts && accounts.length > 0 ? accounts[0] : null;
            if(that.currentAccount){
                // 返回指定地址账户的余额
                const balance = await web3.eth.getBalance(that.currentAccount);
                that.balance = web3.utils.fromWei(balance, 'ether');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .wallet-con{
        width: 450px;
        position: fixed;
        right: -450px;
        top: 0;
        bottom: 0;
        background-color: #fff;
        z-index: 99999;
        padding: 0 15px;
        box-shadow: -3px 3px 5px rgba(0,0,0,.6);

        &.active{
            right: 0;
        }
    }
    .mask{
        position: fixed;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: 99999;
        background-color: rgba(0,0,0,.6);
    }
    .current-account{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        border-bottom: 1px solid #ddd;

        .title{
            font-weight: bold;
            color: #000;
            font-size: 16px;
        }
        .address{
            flex: 1;
            font-size: 14px;
            color: rgba(0,0,0,.8);
            text-align: right;
            padding-left: 20px;
        }
    }
    .no-connected{
        text-align: center;
        font-size: 20px;
        padding-top: 200px;
    }
</style>
