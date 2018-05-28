<template>
  <div class="LiveBroadcast">
    <My-Header/>
    <New-NavBar/>
    <My-Footer/>
  </div>
</template>

<style>
  @import "../../assets/css/fonts/iconfont.css";
  @import "../../assets/css/commonality.css";
  @import "../../assets/css/head.css";
  .hd_allsort_out_box_new{
    display: none;
  }
  #allSortOuterbox:hover .hd_allsort_out_box_new{
    display: block;
  }
</style>

<script>
  import MyHeader from "../../components/Header/Header"
  import NewNavBar from "../../components/IndexRelative/NewNavBar"
  import MyFooter from "../../components/Footer/Footer"
  export default{
    components: {
      MyHeader,NewNavBar,MyFooter
    },
    name:"LiveBroadcast",
    data:function(){
      return{

      }
    }
  }
</script>
