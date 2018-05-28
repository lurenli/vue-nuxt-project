<template>
  <div class="wuyiWrap">
    <div class="wuyiActive">
      <div style="height:712px"></div>
      <div class="content_item one">
        <div class="titleBG">
          <div class="title">. . . <span>秒杀专场</span> . . . </div>
        </div>

        <div class="content_detail">
           <ul>
             <li>
               <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/15508/110"><img src="../assets/images/1.png" alt=""></a>
             </li>
             <li>
               <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/15509/119"><img src="../assets/images/2.png" alt=""></a>
             </li>
             <li>
               <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/10049/111"><img src="../assets/images/3.png" alt=""></a>
             </li>
           </ul>
        </div>
      </div>


      <div class="content_item">
        <div class="titleBG">
          <div class="title">. . . <span>促销专场</span> . . . </div>
        </div>
        <div class="content_detail">
          <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/8940/113"><img src="../assets/images/4.png" alt=""></a>
          <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/8936/112"><img src="../assets/images/5.png" alt=""></a>
        </div>
      </div>

      <div class="content_item">
        <div class="titleBG shopsale">
          <div class="left"><h2>SHOP SALE</h2><p>人气推荐</p></div>
          <div class="right"><a href="http://www.jinshang9.com/FlashSell">更多商品 ></a></div>
        </div>
        <div class="content_detail">
          <a target="_blank"  class="saleimg" href="http://www.jinshang9.com/industrialXianshi/10035/121">
            <img src="../assets/images/6.png" alt="">
          </a>
          <a target="_blank" class="saleimg"  href="http://www.jinshang9.com/industrialXianshi/10052/115">
            <img src="../assets/images/7.png" alt="">
          </a>
          <a target="_blank"  class="saleimg"  href="http://www.jinshang9.com/industrialXianshi/10044/116">
            <img src="../assets/images/8.png" alt="">
          </a>
          <a target="_blank"  class="saleimg" href="http://www.jinshang9.com/industrialXianshi/9626/117">
            <img src="../assets/images/9.png" alt="">
          </a>
          <a target="_blank"  href="http://www.jinshang9.com/industrialXianshi/9637/118">
            <img src="../assets/images/10.png" alt="">
          </a>
          <a target="_blank"  href="http://www.jinshang9.com/industrialXianshi/9784/120">
            <img src="../assets/images/11.png" alt="">
          </a>
        </div>
      </div>


      <div class="backBtn" @click="TopFn">
        <h2>返回顶部</h2>
        <p>BACK TO THE TOP</p>
        <div></div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data:function () {
      return{
        textInfo:''
      }
    },
    methods:{
      TopFn(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    }
  }</script>

<style scoped>
  .wuyiWrap{
    background-color: #fff;
  }
  .wuyiActive{
    position: relative;
    width:1200px ;
    height: 5200px;
    margin: 0 auto;
    font-size: 0;
    background:url(../assets/images/wyactivebg.png) left top no-repeat;
    background-size: 1200px 5200px;
  }
  .backBtn{
    cursor: pointer;
    width: 215px;
    height: 230px;
    line-height: 230px;
    text-align: center;
    color:#fff;
    position: absolute;
    left:466px;
  }
  .backBtn h2{font-size:50px;line-height:70px;margin-top:70px;}
  .backBtn p{font-size:16px;line-height:36px;font-weight:700;}
  .backBtn div{width:97px;height:8px;background:#fe0000;margin-top:10px;margin-left:60px;}
  .content_item{
    position: relative;
  }
  .one{margin-top:360px}
  .content_item .title{
    height: 224px;
    font-size: 38px;
    line-height: 224px;
    text-align: center;
    color: #fff500;
    width: 1000px;
    margin-left: 100px;
  }
  .content_item .shopsale{
    background-color: rgba(0,0,0,.1);
    width: 1000px;
    height:230px;
    margin-top:30px;
    margin-left: 100px;
  }
  .content_item .shopsale .left{width:449px;padding-left:22px;color:#fff;float:left;height:118px;margin-left:51px;margin-top:56px;border-left:7px solid #ff0101}
  .content_item .shopsale .left h2{font-size:40px;line-height:68px;font-weight:600;}
  .content_item .shopsale .left p{font-size:34px;line-height:36px;}
  .content_item .shopsale .right{height:100%;width:500px;text-align:right;float:right;}
  .content_item .shopsale .right a{font-size:32px;line-height:196px;color:#fff;margin-right:10px;}
  .content_item .title span{color:#fff;}
  .content_detail{
    margin-left: 100px;
    margin-top: 20px;
    display: flex;
    width: 1000px;
    justify-content:space-between;
    flex-wrap:wrap;
  }
  .content_detail img {
    background-color: #fff;
  }
  .content_detail .saleimg{margin-bottom:35px}
  .content_detail ul li{margin-top:40px}
  .content_detail ul li img{
    width: 982px;
    height: 478px;
  }
</style>
