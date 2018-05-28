<template>
    <div class="Service">
       <div class="head_img">
         <!--<img src="../assets/icon/server_banner.png"/>-->
       </div>
      <div class="server_title">
        <span class="server_stitle">我们的 <span class="server_diff">优势</span></span>
      </div>
      <div class="server_content">
         <div class="server_contents">
           <a>
             <img src="../assets/icon/server_step1.png" height="366" width="262"/>
           </a>
           <a>
             <img src="../assets/icon/server_step2.png" height="366" width="262"/>
           </a>
           <a>
             <img src="../assets/icon/server_step3.png" height="366" width="262"/>
           </a>
           <a>
             <img src="../assets/icon/server_step4.png" height="366" width="262"/>
           </a>
         </div>
      </div>
      <div class="server_title">
        <span class="server_stitle">商家 <span class="server_diff">填写资料</span></span>
      </div>
      <div class="server_content">
        <img src="../assets/icon/server_write2.png" height="202" width="1200"/>
      </div>
      <div class="server_title">
        <span class="server_stitle">联系 <span class="server_diff">我们</span></span>
      </div>
      <div class="server_title3">
         <span >
           招商热线：
         </span>
        <span class="left_diff">
          <a href="javascript:;">4001002897</a>
          <br>
          <a href="javascript:;" style="margin-left: 205px">0571-57173777</a>
        </span>
      </div>
      <My-Footer/>
    </div>
</template>
<script>
  import MyFooter from "../components/Footer/Footer"
    export default {
        components: {MyFooter},
        name: "",
        data: function () {
            return {}
        }
    }
</script>
<style scoped>
  .head_img{
  background: url("../assets/icon/server_banner.png") center center no-repeat;
    width: 100%;
    height: 540px;
  }
  .Service{
    overflow: hidden;
  }
 .server_title{
   width: 1200px;
   margin: 25px auto;
   text-align: center;
   color: #333;
   font-size: 50px;
 }
 .server_stitle{
   border-bottom: 2px solid #0079f5;
   padding: 25px 0;
 }
  .server_diff{
    color: #0079f5;
  }
  .server_content{
    width: 1200px;
    margin: 125px auto;
  }
  .server_contents{
    overflow: hidden;
  }
 .server_contents>a{
   display: block;
   float: left;
   margin-right: 50px;
 }
 .server_contents>a:last-child{
   margin-right: 0;
 }
  .server_title3{
    width: 1200px;
    margin: 125px auto;
    overflow: hidden;
    font-size: 30px;
    color: #666;
    text-align: center;
  }
  .left_diff>a{
    color: #0079f5;
  }
</style>
