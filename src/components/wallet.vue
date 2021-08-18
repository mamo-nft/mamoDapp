<template>
    <div>
        <div class="mask animate__animated animate__fadeIn" @click="hideWallet" v-if="show"></div>
        <div class="wallet-con" :class="show ? 'active animate__animated animate__slideInRight' : ''">
            <div class="current-account">
                <img class="avatar" src="@/assets/logo-icon.png"/>
                <span class="title">Current Account</span>
                <span class="address">{{selectAccount || '--'}}</span>
            </div>
            <div class="wallet-content" v-if="isConnect">
                <div class="chain-title">当前连接到：{{networkName}}</div>
                <div class="grid-con">
                    <div class="row">
                        <div class="label">{{chainSymbol}} Balance</div>
                        <div class="val">${{balanceData.balance}}</div>
                    </div>
                    <div class="row">
                        <div class="label">BUSD Balance</div>
                        <div class="val">${{balanceData.usdtBalance}}</div>
                    </div>
                    <div class="row">
                        <div class="label">USDT Balance</div>
                        <div class="val">${{balanceData.busdBalance}}</div>
                    </div>
                    <div class="row">
                        <div class="label">MAMO Balance</div>
                        <div class="val">${{balanceData.mamoBalance}}</div>
                    </div>
                    <div class="row">
                        <div class="label">LP Balance</div>
                        <div class="val">${{balanceData.lpBalance}}</div>
                    </div>
                </div>
                <div class="disconnect-btn" @click="onDisconnect">
                    Disconnect
                </div>
            </div>
            <div v-else>
                <div class="no-connected">
                    Wallet is not connected!
                </div>
                <div class="connect-btn" @click="onConnect">Connect</div>
                <vue-element-loading
                    :active="isLoading"
                    spinner="spinner"
                    color="#FF6700"
                />
            </div>
        </div>
    </div>
</template>

<script>
import swal from 'sweetalert';
import VueElementLoading from 'vue-element-loading'
import Func from '../utils/func'
// web3
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import NCWeb3 from "@/utils/web3";
// Web3modal instance
let web3Modal
// Chosen wallet provider given by the dialog window
let provider;
// Address of the selected account
let selectedAccount;
// web3
let web3;

const EvmChains = window.evmChains;
const Fortmatic = window.Fortmatic;
const Torus = window.Torus;
import Authereum from "authereum";
import { Bitski } from "bitski";

export default {
    name: 'Wallet',
    components: {
        VueElementLoading
    },
    data() {
        return {
            show: false,
            isConnect: false,
            toAddress: null,
            txHash: null,
            isLoading: false,
            //////////////
            networkName: "",
            chainSymbol: "",
            selectAccount: "",
            balanceData: {
                address: "",
                balance: "",
                busdBalance: 0,
                usdtBalance: 0,
                mamoBalance: 0,
                lpBalance: 0
            },
            totalMamo: 0
        }
    },
    async mounted () {
        const that = this;
        that.initWallet()
        that.isConnect = that.$store.state.isConnectedWallet
        console.log(that.$store.state)

        that.$emitBus.$on('SHOW_WALLET', res=>{
            that.show = true;
        });
        that.$emitBus.$on('HIDE_WALLET', res=>{
            that.show = false;
        });
    },
    methods: {
        hideWallet(){
            this.show = false;
            this.$emitBus.$emit('WALLET_HIDED');
        },
        initData(){
            const that = this;
            // 清空数据
            this.balanceData = {
                address: "",
                balance: "",
                busdBalance: 0,
                usdtBalance: 0,
                mamoBalance: 0,
                lpBalance: 0
            };
            this.totalMamo = 0;
            this.isConnect = false;
            this.selectAccount = null;
            that.$store.dispatch("setCurrentAccount", that.selectAccount);
            that.$store.dispatch("setIsConnectWallet", that.isConnect);
        },
        initWallet() {
            // 初始化
            const providerOptions = {
                /* See Provider Options Section */
                walletconnect: {
                    package: WalletConnectProvider, // required
                    options: {
                        infuraId: "943ef55ba08a4eea81f50566f11263ec" // required
                    }
                },
                torus: {
                    package: Torus
                },
                fortmatic: {
                    package: Fortmatic,
                    options: {
                        key: ''
                    }
                },
                authereum: {
                    package: Authereum
                },
                bitski: {
                    package: Bitski,
                    options: {
                        clientId: '',
                        callbackUrl: window.location.href + "bitski-callback.html"
                    }
                }
            };

            web3Modal = new Web3Modal({
                network: "mainnet", // optional
                cacheProvider: false, // optional
                disableInjectedProvider: false,
                providerOptions // required
            });
        },
        /**
         * Connect wallet button pressed.
         */
        async onConnect() {
            const that = this;
            try {
                if (provider == null){
                    provider = await web3Modal.connect();
                    // Get a Web3 instance for the wallet
                    web3 = new Web3(provider);
                    that.$store.dispatch("setWeb3", web3);
                }
                console.log("provider=====", "connect");
            } catch (e) {
                console.log("Could not get a wallet connection", e);
                return;
            }

            // 监听切换账户
            provider.on("accountsChanged", (accounts) => {
                console.log("accountsChanged=====", "changed");
                web3Modal.clearCachedProvider()
                this.fetchAccountData();
            });

            // 监听chain改变
            provider.on("chainChanged", (chainId) => {
                console.log("===========", "chainChanged");
                this.fetchAccountData();
            });

            // // Subscribe to networkId change
            // provider.on("networkChanged", (networkId) => {
            //   console.log("===========", "networkChanged");
            //   //fetchAccountData();
            // });

            // 监听连接成功
            provider.on("connect", (info) => {
                console.log("===========", "connect");
                console.log(info);
            });

            // 监听断开连接
            provider.on("disconnect", (error) => {
                console.log("===========", "disconnect");
                this.onDisconnect();
            });

            await this.refreshAccountData();
        },
        /**
         * Kick in the UI action after Web3modal dialog has chosen a provider
         */
        async fetchAccountData() {
            const that = this;
            if(!web3){
                return;
            }
            // Get connected chain id from Ethereum node
            const chainId = await web3.eth.getChainId();
            if(chainId != 56){
                swal({
                    title: "错误的网络",
                    text: "请连接到BSC主网!",
                });
                that.onDisconnect();
                return;
            }
            that.isLoading = true;
            // Load chain information over an HTTP API
            const chainData = await EvmChains.getChain(chainId);
            // 给networkName赋值
            this.networkName = chainData.name;
            this.chainSymbol = chainData.nativeCurrency.symbol
            that.$store.dispatch("setCurrentChainSymbol", that.chainSymbol);
            // Get list of accounts of the connected wallet
            const accounts = await web3.eth.getAccounts();
            console.log("Got accounts", accounts);
            selectedAccount = accounts[0];
            // 给选择的账号赋值
            this.selectAccount = selectedAccount;
            that.$store.dispatch("setCurrentAccount", that.selectAccount);

            // Go through all accounts and get their ETH balance
            console.log("accounts-----------", accounts);
            // const rowResolvers = accounts.map(async (address) => {
            //
            // });
            // await Promise.all(rowResolvers);
            const balance = await web3.eth.getBalance(this.selectAccount);
            // ethBalance is a BigNumber instance
            const ethBalance = web3.utils.fromWei(balance, "ether");
            const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
            console.log("balance:" + humanFriendlyBalance);
            this.balanceData.address = this.selectAccount;
            this.balanceData.balance = humanFriendlyBalance;

            this.isConnect = true;
            that.$store.dispatch("setIsConnectWallet", that.isConnect);

            // 调用合约查询账户资产
            that.getAccountDataFromContract(this.selectAccount);
        },
        /**
         * Fetch account data for UI when
         * - User switches accounts in wallet
         * - User switches networks in wallet
         * - User connects wallet initially
         */
        async refreshAccountData() {
            const that = this;
            this.isConnect = false;
            that.$store.dispatch("setIsConnectWallet", that.isConnect);
            await this.fetchAccountData(provider);
        },
        /**
         * Disconnect wallet button pressed.
         */
        async onDisconnect() {
            const that = this;
            if (provider != null) {
                console.log("Killing the provider connection", "provider off");
                await web3Modal.clearCachedProvider();
                provider = null;
                web3 = null;
                that.$store.dispatch("setWeb3", that.web3);
            }

            selectedAccount = null;
            this.initData();
        },

        async getAccountDataFromContract(address){
            const that = this;
            // get USDT
            const usdtAbiJson = require("@/abi/usdtAbi.json");
            const usdtContract = new web3.eth.Contract(usdtAbiJson, '0x55d398326f99059fF775485246999027B3197955');
            const usdt = await usdtContract.methods.balanceOf(address).call();
            console.log('usdt:'+usdt)
            that.balanceData.usdtBalance = usdt;
            // get BUSD
            const busdAbiJson = require("@/abi/busdAbi.json");
            const busdContract = new web3.eth.Contract(busdAbiJson, '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56');
            const busd = await busdContract.methods.balanceOf(address).call();
            that.balanceData.busdBalance = busd;
            // get MAMO
            const mamoAbiJson = require("@/abi/test.json");
            const mamoContract = new web3.eth.Contract(mamoAbiJson, '0xc398071075C7715684e67F69CA372201178c6644');
            const mamo = await mamoContract.methods.balanceOf(address).call();
            that.balanceData.mamoBalance = mamo;
            // get LP
            that.balanceData.lpBalance = 0;

            that.isLoading = false;
        },
    }
}
</script>

<style lang="less" scoped>
    .wallet-con{
        width: 400px;
        position: fixed;
        right: -400px;
        top: 0;
        bottom: 0;
        background-color: #fff;
        z-index: 3;
        padding: 0 15px;
        box-sizing: border-box;
        box-shadow: -3px 3px 5px rgba(0,0,0,.6);

        &.active{
            right: 0;
        }
    }
    @media(max-width:720px){
        .wallet-con{
            width: 80%;
            right: -90%;
        }
    }
    .mask{
        position: fixed;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: 2;
        background-color: rgba(0,0,0,.6);
    }
    .current-account{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        border-bottom: 1px solid #ddd;

        .avatar{
            width: 26px;
            margin-right: 10px;
        }
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
            padding-left: 100px;
            overflow: hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
        }
    }
    .wallet-content{
        .chain-title{
            font-size: 16px;
            margin-top: 15px;
            font-weight: bold;
        }
        .grid-con{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            border: 1px solid #ddd;
            margin-top: 15px;
            border-radius: 6px;
        }
        .row{
            width: 50%;
            border-bottom: 1px solid #ddd;
            box-sizing: border-box;
            padding: 18px 15px;
            text-align: center;

            &:last-child{
                border-bottom: none;
            }
            &:nth-child(2n){
                border-left: 1px solid #ddd;
            }
            &:last-child{
                width: 100%;
            }
            .label{
                font-size: 15px;
                flex: 1;
                color: #aaa;
            }
            .val{
                font-size: 18px;
                font-weight: bold;
                padding-top: 6px;
            }
        }
    }

    .no-connected{
        text-align: center;
        font-size: 20px;
        padding-top: 200px;
    }
    .connect-btn{
        border: 1px solid #ddd;
        padding: 10px 20px;
        border-radius: 6px;
        width: 100px;
        text-align: center;
        font-size: 14px;
        margin: 15px auto 0 auto;
        cursor: pointer;
        color: #ccc;
    }
    .disconnect-btn{
        padding: 10px 20px;
        border-radius: 6px;
        text-align: center;
        margin: 15px auto 0 auto;
        cursor: pointer;
        background-color: #efa344;
        color: #fff;
        font-size: 16px;
    }
</style>
