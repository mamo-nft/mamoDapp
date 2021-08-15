<template>
    <div class="page-con">
        <div class="content-con">
            <self-header></self-header>
            <div class="page-title">
                <div class="title">The Token Sale is Live Soon!</div>
                <div class="brief">
                    The MaMo Experiment is a comprehensive technology innovation project constituting several aspects which are decentralized finance (DeFi), NFT gamification, artificial intelligence technology and distributed computing power network
                </div>
            </div>
            <left-time></left-time>
            <self-footer></self-footer>
        </div>
        <wallet></wallet>
    </div>
</template>

<script>
import SelfHeader from '@/components/header';
import LeftTime from './components/leftTime';
import SelfFooter from './components/footer';
import Wallet from '@/components/wallet';

export default {
    components:{
        SelfHeader,
        SelfFooter,
        LeftTime,
        Wallet
    },
}
</script>

<style lang="less" scoped>
    .page-con{
        width: 100%;
        background-color: #000;
        background-image: url(/static/images/bg-2.jpg);
        background-size: 100% auto;
        background-repeat: no-repeat;
    }
    .content-con{
        width: 100%;
        position: relative;
        z-index: 1;
    }
    .page-title{
        width: 1200px;
        margin: 0 auto;
        color: #fff;
        text-align: center;

        .title{
            font-size: 36px;
            font-weight: bold;
            margin-top: 20px;
            text-shadow: 3px 3px 5px rgba(0,0,0,.8);
        }
        .brief{
            width: 800px;
            margin: 0 auto;
            font-size: 16px;
            line-height: 1.6em;
            margin-top: 15px;
            font-weight: bold;
            text-shadow: 3px 3px 5px rgba(0,0,0,.8);
        }
    }
</style>
