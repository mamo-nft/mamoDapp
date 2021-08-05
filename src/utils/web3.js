import Web3 from "web3";

const init = () => new Promise(async (resolve, reject) => {
    // Modern dapp browsers...
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            const accounts = await window.ethereum.enable();
            // Acccounts now exposed
            resolve(web3);
        } catch (error) {
            reject(error);
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
    }
    // Fallback to localhost; use dev console port by default...
    else {
        const provider = new Web3.providers.HttpProvider(
            "http://127.0.0.1:8545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
    }
});

const loadAbi = async (abiJSON, web3) => {
    web3 = web3 ? web3 : await init();
    const networkId = await web3.eth.net.getId();
    // const networkType = await web3.eth.net.getNetworkType();
    // const isMetaMask = web3.currentProvider.isMetaMask;
    let instance = null;
    if (abiJSON.networks) {
        const deployedNetwork = abiJSON.networks[networkId.toString()];
        if (deployedNetwork) {
            instance = new web3.eth.Contract(
                abiJSON.abi,
                deployedNetwork && deployedNetwork.address,
            );
            console.log('=== instance ===', instance);
        }
    }
    return instance;
}

//导出相应的方法
export default {
    init,
    loadAbi
}
