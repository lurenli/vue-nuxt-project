<template>
    <div>
      <div style="width: 100%;" class="flashmain" id='flashmain'>
        <div ref="mySwiper" v-swiper:mySwiper="swiperOption" style="width: 100%;" >
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(lunbo,index) in getadsManageInfors" :key="lunbo.id" @click="jump(index)"><div style="width: 100%;text-align: center"><img :src="$oss.publicUrl(lunbo.imgs)"   height="382" width="100%"></div></div>
          </div>
          <div class="swiper-pagination"  slot="pagination" v-if="getadsManageInfors.length!==1"></div>
        </div>
      </div>
    </div>
</template>

<style scoped>
  .user_loginDown_msg>span{
    color: #908e8e;
    margin-left: 10px;
    font-size: 14px;
  }
  .user_loginDown_content>span{
    color: #808080;
    margin-right:15px;
  }
  .flashmain img{
    cursor: pointer;
  }
  /*background:url(111.jpg) no-repeat center;*/
</style>

<script>
    export default {
        name: "Flash",
        data: function () {
          return {
            // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
            // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
            swiperOption: {
              // swiper options 所有的配置同swiper官方api配置 http://www.swiper.com.cn/api/pagination/362.html
              autoplay: {
                delay: 5000,
                stopOnLastSlide: false,
                disableOnInteraction: false,
              },
              autoHeight:true,
              initialSlide :0,
              pagination: {
                el: '.swiper-pagination',
                clickable :true,
              },
//              loop: true,
//              observer: true, // 修改swiper自己或子元素时，自动初始化swiper
            },
            getadsManageInfors:[],
            imgs:"",
            img2s:"",
            img3s:"",
            url:"",
            url2:"",
            url3:"",
        }
    },
      computed: {
//        swiper() {
//          return this.$refs.mySwiper.swiper;
//        }

      },
      methods:{
//            添加轮播图点击事件
        jump:function(index){
          let Url=this.getadsManageInfors[index].url;
          if(Url.indexOf('http://')===-1&&Url!=='/'){
            window.open('http://'+Url,'_blank');
//            console.log(1111)
          }else{
            window.open(Url,'_blank');
//            console.log(2222)
          }
        },
        changeState:function () {
          let state = window.localStorage.getItem('loginState');
          if(state){
            this.loginState = state
          }else{
            this.loginState = 0;
          }
        },
        //获取轮播广告
        getads(){
          let vue = this;
          let param = {};
          param.position='轮播图广告位';
          param.count=100;
          vue.$http.post(
            vue, '/rest/front/adt ', param,
            function (vue, data) {
              if(data.data!=''){
                vue.getadsManageInfors = data.data;
                if(vue.getadsManageInfors.length===1){
                  vue.swiperOption= {
                    watchOverflow: true,
                    autoHeight:true,
                  };
                }
              }else{
                return false
              }
            },
            function (error, data) {
              console.log(error)
            }
          )
        }
      },
      mounted() {
        this.changeState();
        this.getads();
      }
    }

</script>
