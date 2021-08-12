<template>
    <div class="page-con">
        <bg></bg>
        <div class="content-con">
            <self-header></self-header>
            <div class="page-title">
                <div class="title">The Token Sale is Live Soon!</div>
                <div class="brief">
                    The MaMo Experiment is a comprehensive technology innovation project constituting several aspects which are decentralized finance (DeFi), NFT gamification, artificial intelligence technology and distributed computing power network
                </div>
            </div>
            <left-time></left-time>
            <self-progress></self-progress>
            <self-footer></self-footer>
        </div>
    </div>
</template>

<script>
import Bg from '@/components/bgMobile';
import SelfHeader from '@/components/header';
import LeftTime from './components/leftTimeMobile';
import SelfProgress from './components/progressMobile';
import SelfFooter from './components/footerMobile';

export default {
    components:{
        Bg,
        SelfHeader,
        LeftTime,
        SelfProgress,
        SelfFooter
    },
}
</script>

<style lang="less" scoped>
    .page-con{
        width: 100%;
        background-color: #000;
        /*background-image: url(/static/images/bg-2.jpg);*/
        background-size: 100% auto;
        background-repeat: no-repeat;
    }
    .content-con{
        position: relative;
        z-index: 1;
    }
    .page-title{
        margin: 0 30px;
        color: #fff;
        text-align: center;

        .title{
            font-size: 18px;
            font-weight: bold;
            margin-top: 20px;
            text-shadow: 3px 3px 5px rgba(0,0,0,.8);
        }
        .brief{
            margin: 0 10px;
            font-size: 12px;
            line-height: 1.6em;
            margin-top: 15px;
            font-weight: bold;
            text-shadow: 3px 3px 5px rgba(0,0,0,.8);
        }
    }
</style>
