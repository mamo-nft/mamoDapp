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
                <div class="send-email-btn" @click="doSubscribe">Subscribe</div>
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
import {subscribe} from '@/api/common'
import swal from 'sweetalert';
export default {
    data() {
        return {
            email: null
        }
    },
    methods:{
        doSubscribe(){
            if(!this.email){
                swal({
                    text: "Email cannot be empty!",
                });
                return;
            }
            subscribe({email: this.email}).then(res => {
                swal({
                    text: "Subscribe successful!",
                });
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .main-con{
        width: 1200px;
        margin: 0 auto;
        padding: 80px 0 30px 0;
        display: flex;
        flex-direction: row;
    }

    .footer-left{
        flex: 1;

        .title{
            height: 50px;
            width: 400px;
            line-height: 50px;
            padding:  0 20px;
            background-image: linear-gradient(45deg, #00FFF9, #099DFE);
            border-radius: 25px;
            color: #fff;
            font-size: 24px;
            font-weight: bold;
            margin-top: 20px;
        }
        .brief{
            color: #fff;
            font-size: 18px;
            line-height: 1.6em;
            margin-top: 30px;
            margin-right: 50px;
        }
    }
    .footer-right{
        flex: 1;

        .title{
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            margin-top: 15px;
        }
        .link-con{
            display: flex;
            flex-direction: row;
            padding: 30px 0 30px 0;
            max-width: 400px;

            .link-item{
                flex: 1;
                display: block;

                img{
                    height: 50px;
                }
            }
        }
        .send-email-con{
            display: flex;
            flex-direction: row;
            padding-bottom: 2em;
            width: 450px;
            overflow: hidden;
            margin-top: 15px;
            cursor: pointer;

            input{
                flex: 1;
                padding: 0 15px;
                margin: 0;
                height: 40px;
                font-size: 0.9em;
                color: #000;
                background-color: #fff;
                border: none;
                border-radius: 5px 0 0 5px;
            }
            .send-email-btn{
                width: 120px;
                height: 40px;
                font-size: 0.9em;
                background-color: #1563A6;
                text-align: center;
                line-height: 40px;
                color: #fff;
                border-radius: 0 5px 5px 0;
            }
        }
    }
</style>
