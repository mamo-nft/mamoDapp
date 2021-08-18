import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        web3: null,
        isConnectedWallet: false,
        currentAccount: null,
        currentChainSymbol: null
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
