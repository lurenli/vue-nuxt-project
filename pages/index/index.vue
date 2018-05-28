<template>
    <div class="Index" id="Index">
      <Flash/>
      <Brand/>
      <div class="FloorA">
        <div class="p_Section clearfix" v-for="(item,index) in floorData" :key="index">
          <div class="p_Section_left">
            <div class="Section_title" name="floor_0" id="floor_0">
              <div class="name">
                <em>{{item.floorname}}</em>
                <span>{{item.floorsubname}}</span>
              </div>
              <!--<div class="p_link">-->
              <!--<a  style="margin-right: 10px;cursor: pointer" @click="jumpDetail(item)">更多-->
              <!--&lt;!&ndash;<img :src="" class="p_link_msg"/>&ndash;&gt;-->
              <!--</a>-->
              <!--</div>-->
            </div>
            <div class="Section_info clearfix">
              <div class="Section_info_msg">
                <a target="_blank" :href="item.subjectimgurl" style="cursor: pointer;display: block" v-if="item.subjectimgurl.indexOf('IndustrialProducts')!=-1||item.subjectimgurl.indexOf('IndustrialQuality')!=-1||item.subjectimgurl.indexOf('LifeQuality')!=-1">
                  <img :src="$oss.publicUrl(item.subjectimg)" height="391" width="240"/>
                </a>
                <a target="_blank" :href="item.subjectimgurl" style="cursor: pointer;display: block" v-else>
                  <img :src="$oss.publicUrl(item.subjectimg)" height="391" width="240"/>
                </a>
                <!--<a @click="jumpDetail(item.subjectimgurl)" style="cursor: pointer">-->
                  <!--<img :src="$oss.publicUrl(item.subjectimg)" height="391" width="240"/>-->
                <!--</a>-->
              </div>
              <div class="Section_info_msg2">
                <div v-for="(goodsname,index) in item.floorCategories" :key="index" class="Section_info_msg_a">
                  <a target="_blank" :href="'/IndustrialProducts/search'+'-'+'level2'+'_'+goodsname.name" v-if="item.floortype==='紧固件'">
                    {{goodsname.name}}
                  </a>
                  <a target="_blank" :href="'/LifeQuality/search'+'-'+'level2'+'_'+goodsname.name" v-else-if="item.floortype==='生活类'">
                    {{goodsname.name}}
                  </a>
                  <a target="_blank" :href="'/IndustrialQuality/search'+'-'+'level2'+'_'+goodsname.name" v-else>
                    {{goodsname.name}}
                  </a>
                  <!--<a v-for="(goodsname,index) in item.floorCategories" :key="index" class="Section_info_msg_a"-->
                     <!--@click="jumpsearch(goodsname.name,item)">-->
                    <!--{{goodsname.name}}-->
                  <!--</a>-->
                </div>

              </div>
              <div class="Section_info_msg3">
              <div  v-for="(goodsinfo,i) in item.floorProds" :key="i" style="display: inline-block">
                <!--<div class="Section_info_msges" >-->
                <!--<span class="Section_info_msg_title">{{goodsinfo.catename}}<br></span>-->
                <a target="_blank" :href="'/IndustrialProducts/search'+'-'+'level3'+'_'+goodsinfo.catename"  v-if="goodsinfo.type==='紧固件'"><br>
                <img :src="$oss.publicUrl(goodsinfo.img)" class="goodsimg"/>
                  <!--<img v-for="(goodsinfo,i) in item.floorProds" :key="i"-->
                       <!--@click="level3Jump(goodsinfo.catename,goodsinfo.type)" :src="$oss.publicUrl(goodsinfo.img)"-->
                       <!--class="goodsimg"/>-->
                </a>
                <a target="_blank" :href="'/LifeQuality/search'+'-'+'level3'+'_'+goodsinfo.catename"  v-else-if="goodsinfo.type==='生活类'"><br>
                  <img :src="$oss.publicUrl(goodsinfo.img)" class="goodsimg"/>
                  <!--<img v-for="(goodsinfo,i) in item.floorProds" :key="i"-->
                  <!--@click="level3Jump(goodsinfo.catename,goodsinfo.type)" :src="$oss.publicUrl(goodsinfo.img)"-->
                  <!--class="goodsimg"/>-->
                </a>
                <a target="_blank" :href="'/IndustrialQuality/search'+'-'+'level3'+'_'+goodsinfo.catename"  v-else><br>
                  <img :src="$oss.publicUrl(goodsinfo.img)" class="goodsimg"/>
                  <!--<img v-for="(goodsinfo,i) in item.floorProds" :key="i"-->
                  <!--@click="level3Jump(goodsinfo.catename,goodsinfo.type)" :src="$oss.publicUrl(goodsinfo.img)"-->
                  <!--class="goodsimg"/>-->
                </a>
                <!--</div>-->
              </div>
            </div>
            </div>
          </div>
          <div class="HotList">
            <div class="HotList_title">
              <div class="HotList_title_first"></div>
              {{item.rankingname}}
            </div>
            <div class="border_item" v-for="(rankgood,i) in item.rankingprodList" :key="i" v-if="i < 3">
              <div class="HotList_msg" v-for="(HotList_msg,index) in HotList_msges" :key="index">
                <div class="HotList_msg_img">
                  <img v-if="i===index" :src="HotList_msg.msg"/>
                </div>
              </div>
              <div class="HotList_msg_content">
                <div>
                  <a target="_blank" :href="'/IndustrialDetail/' + rankgood.id" v-if="rankgood.producttype == '紧固件'" class="beforeins">
                    <div class="HotList_msg_left">
                      <p class="HotList_floorMsg">{{rankgood.productname}}&nbsp;<span v-if="rankgood.producttype=='紧固件'">{{rankgood.level3}}</span><br>{{rankgood.stand}}{{rankgood.material}}<span
                        v-if="rankgood.cardnum">/</span>{{rankgood.cardnum}}</p>
                      <p class="HotList_floorPrice" v-if="showPrice">￥{{fiexd2(rankgood.prodprice)}}/{{rankgood.unit}}</p>
                      <div style="text-align: left">销量:&nbsp;{{rankgood.salenum}}&nbsp;笔</div>
                    </div>
                    <div class="HotList_msg_right">
                      <img
                        :src="$oss.publicUrl(rankgood.pdpicture&&rankgood.pdpicture.length>0?rankgood.pdpicture[0]:'default/imgs/defaultProductImg.jpg')"
                        width="72" height="72">
                    </div>
                  </a>
                  <a target="_blank" :href="'/FastDetail/' + rankgood.id" v-else class="beforeins">
                    <div class="HotList_msg_left">
                      <p class="HotList_floorMsg">{{rankgood.productname}}&nbsp;<span v-if="rankgood.producttype=='紧固件'">{{rankgood.level3}}</span><br>{{rankgood.stand}}{{rankgood.material}}<span
                        v-if="rankgood.cardnum">/</span>{{rankgood.cardnum}}</p>
                      <p class="HotList_floorPrice" v-if="showPrice">￥{{fiexd2(rankgood.prodprice)}}/{{rankgood.unit}}</p>
                      <div style="text-align: left">销量:&nbsp;{{rankgood.salenum}}&nbsp;笔</div>
                    </div>
                    <div class="HotList_msg_right">
                      <img
                        :src="$oss.publicUrl(rankgood.pdpicture&&rankgood.pdpicture.length>0?rankgood.pdpicture[0]:'default/imgs/defaultProductImg.jpg')"
                        width="72" height="72">
                    </div>
                  </a>
                </div>
                <!--<div class="HotList_msg_left" @click="jumpshopdetail(rankgood.id,rankgood.producttype)">-->
                  <!--<p class="HotList_floorMsg">{{rankgood.productname}}&nbsp;<span v-if="rankgood.producttype=='紧固件'">{{rankgood.level3}}</span><br>{{rankgood.stand}}{{rankgood.material}}<span-->
                    <!--v-if="rankgood.cardnum">/</span>{{rankgood.cardnum}}</p>-->
                  <!--<p class="HotList_floorPrice" v-if="showPrice">￥{{fiexd2(rankgood.prodprice)}}/{{rankgood.unit}}</p>-->
                  <!--<div style="text-align: left">销量:&nbsp;{{rankgood.salenum}}&nbsp;笔</div>-->
                <!--</div>-->
                <!--<div class="HotList_msg_right">-->
                  <!--<img-->
                    <!--:src="$oss.publicUrl(rankgood.pdpicture&&rankgood.pdpicture.length>0?rankgood.pdpicture[0]:'default/imgs/defaultProductImg.jpg')"-->
                    <!--width="72" height="72" @click="jumpshopdetail(rankgood.id,rankgood.producttype)">-->
                <!--</div>-->
              </div>
            </div>
          </div>
        </div>
        <div class="active_banner" v-if="show">
          <a :href="URL" target="_blank">
            <img :src="$oss.publicUrl(imgs)" height="120" width="1200" style="cursor: pointer"/>
          </a>
        </div>
        <div class="xuanfulouceng" v-if="showLD">
          <ul>
            <li class="last" v-for="(name,item) in floorData" :key="item" v-bind:class="{ activeFloor: activeNum===item }"
                @click="activeFl(item)">
              <span class="num" v-if="activeNum!==item">{{name.floorname}}</span>
              <span class="word" v-else>{{name.floorsubname}}</span>
            </li>
            <li class="last last_top" @click="activeFl()">
              <!--<span class="num">{{name.floorname}}</span>-->
              <span class="word2">TOP</span>
            </li>
          </ul>
        </div>
        <div id="bottom"></div>
      </div>
      <div class="FloorB">
        <div class="Industry_information">
          <div class="Industry_information2">
            <div class="Industry_info_title">
              <p class="Industry_info_titlemsg">行业资讯</p>
              <a target="_blank" class="Industry_info_titlemore" :href="'/FastCenter/alerts/'+docid">更多</a>
            </div>
            <div class="Industry_info_content">
              <div class="Industry_info_contents" v-for="(msg,index) in zixunlists" :key="index">
                <a target="_blank" :href="'/FastCenter/alertsDetail/' + msg.id" style="cursor: pointer;display: block">
                  <div class="Industry_infocontent_img">
                    <img :src="$oss.publicUrl(msg.pic) "/>
                  </div>
                  <div class="Industry_infocontent_msg">
                    <p class="Industry_infocontent_title" >{{msg.doctitle}}</p>
                    <p class="Industry_infocontent_titlemsg">{{msg.sketch}}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Flash from "../../components/IndexRelative/Flash"
  // todo
  import Brand from "../../components/IndexRelative/Brand"
  // import FloorA from "../../components/IndexRelative/FloorA"
  import http from '../../plugins/http'

  export default {
    components: {
      Flash, Brand
    },
    name: "Index",
    head(){
      return{
        title: '紧商网-买卖螺丝,就上紧商网',
        titleTemplate: null,
        meta: [
          {vmid: 'keywords',name: 'keywords', content: '紧固件,标准件,螺栓,螺柱,螺钉,螺母,垫圈,挡圈,木螺钉,销,铆钉,自攻钉,焊钉,膨胀件,组合件，紧商网，紧商购物平台'},
          {vmid: 'description',
            name: 'description',
            content: '紧商网，集中行业产品库存，应用互联网+紧固件产业模式，为用户提供紧固件网上交易，物流配送，技术服务，行情资讯，提升在线交易的效率和客户体验度，形成工业品销售结算中心，服务产业上下游用户。打造全球工业品供应链服务优质品牌。'
          }
        ]
      }

    },
    data(){
      return{
        HotList_msges: [
          {msg: require("~/assets/icon/floor.png")},
          {msg: require("~/assets/icon/floor2.png")},
          {msg: require("~/assets/icon/floor3.png")}
        ],
        Section_infoes: [
          {}, {}, {}, {}, {}, {}
        ],
        floorData: [],
        getadsManageInfors: [],
        imgs: '',
        url: '',
        URL: '',
        showPrice: false,
        showLD: false,
        activeNum: 0,
        floorArr: [],
        show: false,

        zixunlists:[],
        docid:"",
      }
    },
    methods:{
      lodingXuanfu() {
        let vue = this;
        window.onscroll = function () {
          var t = (document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop) + 175;
          let arr = [];  //每楼层距页面顶部距离数组
          let lang = document.getElementsByClassName('p_Section');
          for (let i = 0; i < lang.length; i++) {
            let Tlang = lang[i].offsetTop;
            arr.push(Tlang);
            Tlang = ''
          }
          vue.floorArr = arr;
          if (t >= arr[0]) {
            let qujianArr = [];  //楼层距离 区间 数组
            for (let j = 0; j < arr.length - 1; j++) {
              let qujian = [];
              qujian[0] = arr[j];
              qujian[1] = arr[j + 1];
              qujianArr.push(qujian);
            }
            for (let k = 0; k < qujianArr.length; k++) {
              if (t < qujianArr[k][1] && t > qujianArr[k][0]) {
                vue.activeNum = k;
//                console.log(k);
              }
              if (t > qujianArr[qujianArr.length - 1][1]) {
                vue.activeNum = qujianArr.length
              }
            }
//            console.log(qujianArr);
            vue.showLD = true;
          } else {
            vue.showLD = false;
          }
//补一下首页搜索框的滚动悬浮
          var left = document.getElementById("scrollHeader");
          if (left) {
            if (t >= 325) {     //当拖动到距离顶部325px处时，左边导航固定，不随滚动条滚动
              left.style.position = "fixed";
              left.style.top = "0";
            } else {
              left.style.position = "static";
            }
          }
        }

      },

      //点击跳到对应 楼层
      activeFl(index) {
        this.activeNum = index;
        document.documentElement.scrollTop = this.floorArr[index] - 160;
        document.body.scrollTop = this.floorArr[index] - 160;
//        console.log(this.floorArr[index] + 160);
      },

      fiexd2(val) {
        if (val) {
          return val.toFixed(2)
        } else {
          return 0.00
        }
      },

      //     楼层分类跳转搜索
      //        点击目录项，作为关键词，进行页面的跳转
      jumpsearch:function(name,item){
        let SearchURL='';
        if(item.floortype=="紧固件"){
          SearchURL='/IndustrialProducts/search'+'-'+'level2'+'_'+name;
          window.open(window.location.origin+SearchURL);
//          location.href='/IndustrialProducts?level2='+name
//          this.$router.push({path:'IndustrialProducts',query:{level2:val}});
//          this.$store.commit("search", 1);
//          window.open('/IndustrialProducts');
//          localStorage.setItem("searchKey",val);
        }else if(item.floortype=="生活类"){
          SearchURL='/LifeQuality/search'+'-'+'level2'+'_'+name;
          window.open(window.location.origin+SearchURL);
//          location.href='/LifeQuality?level2='+name
//          this.$router.push({path:'LifeQuality',query:{level2:val}});
//          this.$store.commit("search", 1);
//          window.open('/LifeQuality');
//          localStorage.setItem("searchKey",val);
        }else{
          SearchURL='/IndustrialQuality/search'+'-'+'level2'+'_'+name;
          window.open(window.location.origin+SearchURL);
//          location.href='/IndustrialQuality?level2='+name
//          this.$router.push({path:'IndustrialQuality',query:{level2:val}});
        }
      },
//        紧固件列表页----传递该楼层（  查询一个点击的一级分类是否属于紧固件）
      jumpDetail(url) {
        if (url) {
          if(url.indexOf('IndustrialProducts')!=-1 || url.indexOf('IndustrialQuality')!=-1 ||url.indexOf('LifeQuality')!=-1){
            window.open("http:" + "//" + url+'/search');
          }else{
            window.open("http:" + "//" + url);
          }
        }

      },
//
      //     广告位跳转
      jumpsign: function () {
        window.open(this.url, '_blank');
      },
      level3Jump:function(catename,type){
        let SearchURL='';
        if(type=="紧固件"){
          SearchURL='/IndustrialProducts/search'+'-'+'level3'+'_'+catename;
          window.open(window.location.origin+SearchURL);
//          location.href='/IndustrialProducts?level3='+catename
//          this.$router.push({path:'IndustrialProducts',query:{level3:id}});
        }else if(type==="生活类"){
          SearchURL='/LifeQuality/search'+'-'+'level3'+'_'+catename;
          window.open(window.location.origin+SearchURL);
//          location.href='/LifeQuality?level3='+catename
//          this.$router.push({path:'LifeQuality',query:{level3:id}});
        }else{
          SearchURL='/IndustrialQuality/search'+'-'+'level3'+'_'+catename;
          window.open(window.location.origin+SearchURL);
//          location.href='/IndustrialQuality?level3='+catename
//          this.$router.push({path:'IndustrialQuality',query:{level3:id}});
        }
      },
//     紧固件/非紧固件详情页
      jumpshopdetail: function (id, type) {
//          console.log(type)
        if (type == "紧固件") {
//            this.$router.push({name:"IndustrialDetail",params:{id:id}})
          window.open('/IndustrialDetail/' + id);
        } else {
//            this.$router.push({name:"FastDetail",params:{id:id}})
          window.open('/FastDetail/' + id);
        }
      },
      //获取底部活动广告
      getads() {
        let vue = this;
        let param = {};
        param.position = '底部广告位';
        param.count = 1;
        vue.$http.post(
          vue, '/rest/front/adt', param,
          function (vue, data) {
            if (data.data == null) {
              return false
            } else if (data.data != '') {
              vue.getadsManageInfors = data.data;
//              console.log(vue.getadsManageInfors)
              vue.imgs=vue.getadsManageInfors[0].imgs;
                vue.URL=vue.getadsManageInfors[0].url;
              vue.show = data.show;
            }
            else {
              return false
            }
          },
          function (error, data) {

          }
        )
      },

      //获取楼层信息
      getFloorInfo() {
        let vue = this;
        let param = {};
        vue.$http.post(
          vue, '/rest/front/index/listFloor', param,
          function (vue, data) {
            // vue.floorData = data.data.floorList;
            // vue.showPrice =data.data.showPrice;
            vue.floorData = data.data.floorList;
            vue.showPrice = data.data.showPrice;
          },
          function (error, data) {
            console.log(data);
          }
        )
      },

      //        跳到更多行业资讯
      tomore: function () {
        this.$router.replace({name: 'index-FastCenter-alerts-docid', params: {docid: this.docid}});
      },
      //    获取
      zixunlist: function () {
        let vue = this;
        let param = {
          articleCategoryName: "行业资讯",
          num: 4,
        };
        vue.$http.post(
          vue, "/rest/front/ArticeFront/homepage/list", param,
          function (vue, data) {
            // 成功处理
            vue.zixunlists = data.data;
            vue.docid = (data.data)[0].docid;
          }, function (error, data) {
            // 错误处理
          });
      },
      clickzixun: function (data) {
        window.open('/FastCenter/alertsDetail/' + data.id);
        // this.$router.replace({ name:'index-FastCenter-alertsDetail-id',params:{ id:data.id}});
      },
    },
    mounted() {
      this.lodingXuanfu();
      // this.getFloorInfo();
      this.getads();
      // this.zixunlist();
    },
    async asyncData ({ params }) {
      let data={};
      let ret = await http.post4s(data, "/rest/front/ArticeFront/homepage/list", {
        articleCategoryName: "行业资讯",
        num: 4,
      });
      if(ret.status===200 && ret.data.result===1){
        data.zixunlists = ret.data.data;
        data.docid = (ret.data.data)[0].docid;
      }
      // 楼层信息
      ret = await http.post4s(data, '/rest/front/index/listFloor', {})
      if(ret.status===200 && ret.data.result===1){
        data.floorData = ret.data.data.floorList;
        data.showPrice = ret.data.data.showPrice;
      }
      return data;
    }
  }
</script>

<style scoped>
  .beforeins:hover{
    color: #666;
  }
  .border_item {
    /*border-bottom: 1px solid #f2f2f2;*/
  }

  .goodsimg {
    cursor: pointer;
    width: 181px !important;
    height: 191px !important;
    margin: 2px !important;
  }

  .activeFloor {
    background-color: #e8000e;
    color: #fff;
  }

  .num {
    display: inline-block;
    width: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    color: #e8000e;
  }

  .word2 {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    text-align: center;
    width: 50px;
  }

  .word {
    display: inline-block;
    width: 50px;
    overflow: hidden;
    text-align: center;
    font-size: 14px;
    line-height: 50px;
    padding: 0 5px;
    color: #fff;
  }

  .last {
    cursor: pointer;
    border-bottom: 1px solid #f9f9f9;
    overflow: hidden;
  }

  .last_top {
    cursor: pointer;
    border-bottom: 1px solid #f9f9f9;
    overflow: hidden;
    color: #e8000e;
    background-color: #f7e0e1;
  }

  .xuanfulouceng {
    position: fixed;
    left: 50%;
    top: 160px;
    background-color: #fff;
    z-index: 99;
    margin-left: -680px;
  }

  .xuanfulouceng .last {
    width: 50px;
    height: 50px;
  }

  .p_Section {
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 30px;
  }

  .p_Section_left {
    float: left;
    overflow: hidden;
    background-color: #fff;
  }

  .FloorA .Section_title, .FloorA .Section_info {
    width: 936px;
    border: 1px solid #f2f2f2;
  }

  .FloorA .Section_info {
    border-top: none;
  }

  .FloorA {
    clear: both;
  }

  .p_link_msg {
    vertical-align: unset;
    margin-left: 3px;
    margin-right: 16px;
  }

  .Section_info_msg {
    overflow: hidden;
    clear: both;
    float: left;
  }

  .Section_info_msg2 {
    float: left;
    width: 139px;
    font-size: 14px;
    line-height: 14px;
    border-left: 1px solid #f2f2f2;
    border-right: 1px solid #f2f2f2;
    height: 389px;
    overflow: hidden;
  }

  .Section_info_msg_a {
    cursor: pointer;
    display: block;
    margin-bottom: 15px;
    margin-left: 17px;
  }

  .Section_info_msg_a:first-child {
    margin-top: 20px;
  }

  .Section_info_msg3 {
    font-size: 0;
    padding: 0;
    margin: 0;
    float: left;
    background-color: #f9f9f9;
    width: 555px;
    height: 391px;
    overflow: hidden;
  }

  .Section_info_msges {
    width: 33%;
    height: 50%;
    margin: 0px;
    padding: 0px;
    float: left;
    cursor: pointer;
  }

  .Section_info_msges > img {
    margin: 3px 3px 0 3px;
  }

  .Section_info_msg_title {
    font-size: 14px;
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    margin-top: 10px;
    text-align: left;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .Section_info_msg_price {
    color: #e8000e;
    font-size: 14px;
    line-height: 14px;
    margin-left: 8px;
    margin-top: 4px;
  }

  .active_banner {
    clear: both;
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 30px;
  }

  .total_nun {
    font-size: 12px;
    color: #808080;
    line-height: 12px;
    margin-left: 15px;
  }

  .HotList {
    width: 234px;
    height: 441px;
    float: right;
    overflow: hidden;
    border: 1px solid #f2f2f2;
    background-color: #fff;
  }

  .HotList_msg_content {
    overflow: hidden;
    width: 218px;
    margin: 5px auto 0;
    padding: 2px;

  }

  .HotList_title {
    height: 48px;
    line-height: 48px;
    font-size: 14px;
    border-bottom: 1px solid #f2f2f2;
  }

  .HotList_title_first {
    width: 3px;
    font-size: 0;
    display: inline-block;
    background-color: #e8000e;
    height: 16px;
    margin: -2px 10px;
  }

  .HotList_msg {
    overflow: hidden;
    /*margin-bottom: 5px;*/
  }

  .HotList_floorMsg {
    width: 122px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .HotList_floorPrice {
    font-size: 14px;
    color: #e8000e;
    /*margin-top: 5px;*/
  }

  .HotList_msg_img {
  }

  .HotList_msg_img > img {
    margin-left: 16px;
    margin-top: 9px;
  }

  .HotList_msg_left {
    width: 136px;
    float: left;
    padding-left: 10px;
    cursor: pointer;
  }

  .HotList_msg_right {
    width: 72px;
    height: 72px;
    background: #e8000e;
    float: right;
    cursor: pointer;
  }
  .rcd_list > h4 {
    font-size: 14px;
    color: #434343;
    border-left: 3px solid #E60012;
    margin-left: 15px;
    margin-top: 12px;
    padding-left: 10px;
    float: left;
  }

  .rcd_list > a {
    float: right;
    font-size: 12px;
    line-height: 44px;
    margin-right: 15px;
    color: #666;
  }

  .standardul > li:first-child {
    color: #111;
    font-size: 16px;
    line-height: 16px;
    margin-bottom: 13px;
    margin-top: 10px;
  }

  .standardul > li {
    font-size: 14px;
  }

  .Industry_information {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }

  .Industry_information2 {
    width: 1200px;
    border: 1px solid #f2f2f2;
    float: left;
    overflow: hidden;
    background-color: #fff;
  }

  .Industry_info_title {
    height: 45px;
    overflow: hidden;
    line-height: 45px;
    padding-right: 15px;
    border-bottom: 1px solid #F2F2f2;
  }

  .Industry_info_titlemsg {
    float: left;
    font-size: 18px;
    color: #333;
    line-height: 18px;
    margin-top: 15px;
    border-left: 3px solid #e80008;
    margin-left: 16px;
    padding-left: 10px;
  }

  .Industry_info_titlemore {
    float: right;
    font-size: 12px;
    color: #666;
    cursor: pointer;
  }

  .Industry_info_content {
    margin-top: 10px;
    overflow: hidden;
  }

  .Industry_info_contents {
    width: 290px;
    float: left;
    overflow: hidden;
    margin-right: 8px;
  }

  .Industry_infocontent_img {
    margin-left: 20px;
    width: 270px;
    height: 186px;
    background-color: #e8000e;
  }

  .Industry_infocontent_img > img {
    width: 270px;
    height: 186px;
  }

  .Industry_infocontent_msg {
    width: 290px;
    padding-left: 20px;
  }

  .Industry_infocontent_title {
    font-size: 16px;
    color: #111;
    line-height: 21px;
    margin-top: 20px;
    cursor: pointer;
    font-weight: 600;
  }

  .Industry_infocontent_titlemsg {
    width: 250px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #333;
    line-height: 14px;
    margin-top: 10px;
    margin-bottom: 15px;
  }
</style>
