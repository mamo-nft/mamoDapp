import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        web3: null,
        isConnectedWallet: false,
        currentAccount: null,
        currentChainSymbol: null,
        contractAddress: {
            usdt: '0x55d398326f99059fF775485246999027B3197955',
            busd: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
            mamo: '0xc398071075C7715684e67F69CA372201178c6644'
        },
        abiJson: {
            usdt: require("@/abi/usdtAbi.json"),
            busd: require("@/abi/busdAbi.json"),
            mamo: require("@/abi/test.json")
        }
    },
    mutations: {
    },
    actions: {
        setWeb3({commit,state}, val){
            state.web3 = val
        },
        setIsConnectWallet({commit,state}, val){
            state.isConnectedWallet = val
        },
        setCurrentAccount({commit,state}, val){
            state.currentAccount = val
        },
        setCurrentChainSymbol({commit,state}, val){
            state.currentChainSymbol = val
        }
    },
    modules: {
    }
})
