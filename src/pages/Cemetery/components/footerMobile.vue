<template>
    <div class="main-con">
        <div class="footer-left">
            <div class="title">How to Participate</div>
            <div class="brief">
                1. Buy BUSD/USDT from Binance;<br/>
                2. Transfer BUSD/USDT to your BSC address;<br/>
                3. Enter current webpage and click "PURCHASE TOKEN";<br/>
                4. Enter your purchase amount;<br/>
                5. Complete your transaction and done!
            </div>
        </div>
        <div class="footer-right">
            <div class="title">
                Nitify Me When It`s Ready
            </div>
            <div class="send-email-con">
                <input type="email" v-model="email" placeholder="Your Email Address"/>
                <div class="send-email-btn" @click="subscribe">Subscribe</div>
            </div>

            <div class="title">MaMo Community Channels</div>
            <div class="link-con">
                <a href="#" target="_blank" class="link-item">
                    <img src="@/assets/link-icon-1.png"/>
                </a>
                <a href="#" target="_blank" class="link-item">
                    <img src="@/assets/link-icon-2.png"/>
                </a>
                <a href="#" target="_blank" class="link-item">
                    <img src="@/assets/link-icon-3.png"/>
                </a>
                <a href="#" target="_blank" class="link-item">
                    <img src="@/assets/link-icon-4.png"/>
                </a>
                <a href="#" target="_blank" class="link-item">
                    <img src="@/assets/link-icon-5.png"/>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: null
        }
    },
    methods:{
        subscribe(){
            // TODO
        }
    }
}
</script>

<style lang="scss" scoped>
    .main-con{
        padding: 30px 0 0 0;
        display: flex;
        flex-direction: column;
    }

    .footer-left{
        flex: 1;

        .title{
            height: 30px;
            line-height: 30px;
            padding: 0 20px;
            background-image: linear-gradient(45deg, #00FFF9, #099DFE);
            border-radius: 20px;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            text-align: center;
            width: 160px;
            margin: 20px auto 0 auto;
        }
        .brief{
            color: #fff;
            font-size: 12px;
            line-height: 1.6em;
            margin-top: 20px;
            text-align: center;
        }
    }
    .footer-right{
        flex: 1;
        margin-top: 20px;
        padding: 20px 20px 0 20px;
        background-color: #eea044;

        .title{
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            margin-top: 15px;
            text-align: center;
        }
        .link-con{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 30px 0 30px 0;

            .link-item{
                flex: 1;
                display: block;
                text-align: center;

                img{
                    height: 40px;
                }
            }
        }
        .send-email-con{
            display: flex;
            flex-direction: row;
            padding-bottom: 2em;
            overflow: hidden;
            margin-top: 15px;

            input{
                flex: 1;
                padding: 0 15px;
                margin: 0;
                height: 36px;
                font-size: 0.9em;
                color: #000;
                background-color: #fff;
                border: none;
                border-radius: 5px 0 0 5px;
            }
            .send-email-btn{
                width: 120px;
                height: 36px;
                font-size: 0.9em;
                background-color: #379aff;
                text-align: center;
                line-height: 36px;
                color: #fff;
                border-radius: 0 5px 5px 0;
            }
        }
    }
</style>
