<template>
  <div class="limitWrap">
    <div class="limitActive">
      <div style="height: 650px"></div>
      <div class="timeInfo">活动时间：4月16日-4月20日</div>

      <div class="content_item">
        <div class="titleBG">
          <div class="title">螺栓</div>
        </div>

        <div class="content_detail">
          <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/8938/105"><img src="../assets/images/1_1.png" alt=""></a>
          <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/8946/106"><img src="../assets/images/1_2.png" alt=""></a>
          <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/8939/107"><img src="../assets/images/1_3.png" alt=""></a>
          <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/8936/108"><img src="../assets/images/1_4.png" alt=""></a>
        </div>
      </div>


      <div class="content_item">
        <div class="titleBG">
          <div class="title">螺母</div>
        </div>
        <div class="content_detail">
          <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/9784/89"><img src="../assets/images/2_1.png" alt=""></a>
          <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/9785/90"><img src="../assets/images/2_2.png" alt=""></a>
          <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/9931/91"><img src="../assets/images/2_3.png" alt=""></a>
          <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/9932/92"><img src="../assets/images/2_4.png" alt=""></a>
        </div>
      </div>

      <div class="content_item">
        <div class="titleBG">
          <div class="title">螺钉</div>
        </div>
        <div class="content_detail">
          <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/10131/93"><img src="../assets/images/3_1.png" alt=""></a>
          <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/10132/94"><img src="../assets/images/3_2.png" alt=""></a>
          <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/10139/95"><img src="../assets/images/3_3.png" alt=""></a>
          <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/10140/96"><img src="../assets/images/3_4.png" alt=""></a>
        </div>
      </div>

      <div class="content_item">
        <div class="titleBG">
          <div class="title">平垫圈</div>
        </div>
        <div class="content_detail">
          <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/10049/97"><img src="../assets/images/4_1.png" alt=""></a>
          <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/10052/98"><img src="../assets/images/4_2.png" alt=""></a>
          <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/10055/99"><img src="../assets/images/4_3.png" alt=""></a>
          <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/10037/100"><img src="../assets/images/4_4.png" alt=""></a>
        </div>
      </div>

      <div class="content_item">
        <div class="titleBG">
          <div class="title">其他</div>
        </div>
        <div class="content_detail">
          <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/9625/101"><img src="../assets/images/5_1.png" alt=""></a>
          <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/9626/102"><img src="../assets/images/5_2.png" alt=""></a>
          <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/9637/103"><img src="../assets/images/5_3.png" alt=""></a>
          <a target="_blank" href="http://www.jinshang9.com/industrialXianshi/9643/104"><img src="../assets/images/5_4.png" alt=""></a>
        </div>
        <div class="content_detail">
          <a target="_blank" href="http://www.jinshang9.com/FastXianshi/4459/78"><img src="../assets/images/6_1.png" alt=""></a>
          <a target="_blank" href="http://www.jinshang9.com/FastXianshi/4459/78"><img src="../assets/images/6_2.png" alt=""></a>
          <a target="_blank" href="http://www.jinshang9.com/FastXianshi/873/79"><img src="../assets/images/6_3.png" alt=""></a>
          <a target="_blank" href="http://www.jinshang9.com/FastXianshi/872/80"><img src="../assets/images/6_4.png" alt=""></a>
        </div>
      </div>

      <div class="backBtn" @click="TopFn">返回顶部</div>
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
  .limitWrap{
    background-color: red;
  }
  .limitActive{
    position: relative;
    width:1200px ;
    height: 4200px;
    margin: 0 auto;
    font-size: 0;
    background:url(../assets/images/activeBGimg.png) left top no-repeat;
    background-size: 1200px 4300px;
  }
  .timeInfo{
    background-color: #ffdcb2;
    width: 600px;
    height: 64px;
    margin-left:300px;
    margin-bottom: 80px;
    color: red;
    font-size: 44px;
    line-height: 60px;
    text-align: center;
  }
  .backBtn{
    cursor: pointer;
    width: 268px;
    height: 64px;
    line-height: 60px;
    text-align: center;
    font-size: 32px;
    color: red;
    background-color: #fff;
    border: 2px solid #fff;
    border-radius: 8px;
    position: absolute;
    bottom:150px;
    left:466px;
  }
  .content_item{
    position: relative;
    margin-bottom: 105px;
  }
  .titleBG{
    background:url(../assets/images/activeLimitTitle.png) no-repeat left top;
    background-size:1200px 91px ;
  }
  .content_item .title{
    background-color: rgba(0,0,0,.1);
    height: 100px;
    font-size: 56px;
    line-height: 94px;
    text-align: center;
    color: #fff;
    width: 1000px;
    margin-left: 100px;
  }
  .content_detail{
    margin-left: 100px;
    margin-top: 20px;
    display: flex;
    width: 1000px;
    justify-content:space-between;
    flex-wrap:wrap;
  }
  .content_detail img{
    background-color: #fff;
    width: 240px;
    height: 330px;
  }
</style>
