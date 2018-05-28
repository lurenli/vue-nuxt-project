<template>
  <div class="LifeQuality" v-loading="dataloading">
    <div class="keywords_content">
      <div class="keywords_title">
        <p class="keywords_titlecontent left">关键词：{{this.searchmsg.searchKey}}</p>
        <p class="keywords_titlelist right">条件搜出{{Total}}件商品</p>
      </div>
      <div class="mytag">
        <span>所选分类：<span @click="clearall" style=" color: #e8000e;cursor: pointer">（清空全部搜索条件）</span></span>
        <div class="mysearch">
          <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" type="info" size="small"
                  @close="handleClose(tag)">
            {{tag}}
          </el-tag>
        </div>
      </div>
      <div class="keywords_content_list">
        <table class="keywords_content_tbd">
          <tr v-for="(keys,index) in keycontent" :key="index">
            <td class="keywords_list_one">{{keys.name}}</td>
            <td class="keywords_list_two" :class="keys.styles">
              <a  :href="son.url" v-for="(son,sonindex) in keys.value" :key="sonindex" class="keywords_list_sec"
              >{{son.sonname}}</a>
            </td>
            <td class="keywords_list_thr" @click="more(index)">{{keys.word}}</td>
          </tr>
        </table>
      </div>
      <div class="keywords_content2" >
        <div class="keywords_content2_title">
          <ul class="keywords_content2_ul left">
            <!--<li><a href="">综合</a><img src="../../assets/icon/down.png"/></li>-->
            <!--<li><a href="">销量</a><img src="../../assets/icon/down2.png" /></li>-->
            <!--<li><a href="">规格</a><img src="../../assets/icon/down2.png"/></li>-->
            <li @click="changsort"><a>价格</a>
              <img src="../../../assets/icon/down.png" v-if="searchmsg.sorttype==2"/>
              <img src="../../../assets/icon/sortup.png" v-else/>
            </li>
          </ul>
        </div>
        <div class="MyBrand_section" v-for="(MyBrand,i) in MyBrands" :key="i">
          <a target="_blank" :href="'/FastDetail/'+MyBrand.id" style="display: block" :title="MyBrand.productname">
            <div class="MyBrand_icon">
              <img :src="$oss.publicUrl(MyBrand.pdpicture)">
            </div>
              <!--<div class="MyBrand_icon">-->
                <!--<img :src="$oss.publicUrl(MyBrand.pdpicture)" @click="clickdetail(MyBrand.id)">-->
              <!--</div>-->
            <p class="MyBrand_detail">
              <span>{{MyBrand.productname}}&nbsp;&nbsp;{{MyBrand.productalias}}&nbsp;&nbsp;{{MyBrand.subtitle}}</span>
            </p>
            <p class="MyBrand_price">
              <span class="MyBrand_price_red">￥{{MyBrand.minprice}}/{{MyBrand.unit}}</span>
            </p>
          </a>
        </div>
      </div>
      <el-pagination :page-sizes="[20, 40, 100]" @size-change="SizeChange"
                     @current-change="CurrentChange"
                     :page-size="searchmsg.pageSize" :current-page.sync="searchmsg.pageNo"
                     layout="total,sizes, prev, pager, next, jumper" :total="Total">
      </el-pagination>
      <ul style="display: none">
        <li>
          <span :key="n" v-for=" n in totalpage"><a :href="UrlArr[n-1]" ></a></span>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
  /*页码的编辑*/
  .LifeQuality .el-pagination {
    margin: 30px 10px;
    float: right;
  }
  /*标签*/
  .mytag {
    margin: 12px 5px;
  }
  .mysearch {
    margin: 12px 5px;
  }
  .mytag .el-tag {
    margin: 0 6px;
  }
  /*created by fastfan*/
  /*关键词*/
  .keywords_content {
    width: 1200px;
    margin: auto;
    /*font-weight: 700;*/
    overflow: hidden;
    padding-top: 20px;
  }

  .keywords_title {
    overflow: hidden;
    /*background-color: #fff;*/
  }

  .keywords_titlecontent {
    margin: 29px 0 19px 0;
    font-size: 16px;
    color: #e8000e;
  }

  .keywords_titlelist {
    color: #666;
    margin: 30px 0 22px 0;
  }

  .keywords_content_list {
    overflow: hidden;
    background-color: #fff;
  }

  /*商品属性*/
  .keywords_list_one {
    line-height: 36px;
    background-color: #f0f0f0;
    color: #666;
    width: 112px;
    text-align: center;
  }
  /*商品搜索的更多*/
  .keywords_list_two {
    line-height: 36px;
    display:flex;
    flex-wrap: wrap;
    width: 960px;
    overflow: hidden;
    padding: 0 20px;
    color: #424242;
  }
  .beforeheight{
    height: 36px;
  }
  .afterheight{
    height: auto;
  }
  .keywords_list_thr {
    line-height: 36px;
    background-color: #f0f0f0;
    color: #666;
    cursor: pointer;
    width: 126px;
    text-align: center;
  }

  .keywords_list_sec {
    margin: 0 28px 0 0px;
    cursor: pointer;
  }

  .keywords_list_sec:hover {
    color: #e8000e;
  }

  .keywords_content_list table tr {
    overflow: hidden;
    border-bottom: solid 1px #d9d9d9;
  }

  .keywords_content_list table tr:last-child {
    border-bottom: none;
  }

  .keywords_content_tbd {
    width: 100%;
    position: relative;
    border: solid 1px #d9d9d9;
  }

  /*商品表格排序*/
  .keywords_content2 {
    overflow: hidden;
    margin: 30px 0;
    /*background-color: #fff;*/
  }

  .keywords_content2_ul {
    overflow: hidden;
    width: 224px;
    padding: 7px 0;
    margin-left: 18px;
  }
  .keywords_content2_ul li {
    width: 54px;
    height: 26px;
    line-height: 26px;
    color: #424242;
    text-align: center;
    float: left;
    border: 1px solid #d9d9d9;
    border-right: none;
    cursor: pointer;
  }

  .keywords_content2_ul li a {
    margin-top: 4px;
    color: #424242;
    /*display: block;*/
    /*float: left;*/
    margin-left: 9px;
  }

  .keywords_content2_ul li img {
    float: right;
    margin-top: 7px;
    margin-right: 7px;
  }

  .keywords_content2_ul li:first-child {
    background-color: #e8000e;
    color: #fff;
    border: none;
    width: 56px;
    height: 26px;
  }

  .keywords_content2_ul li:last-child {
    border-right: 1px solid #d9d9d9;
  }

  .keywords_content2_ul li:first-child a {
    color: #fff;
  }

  .keywords_shopcar span {
    color: #424242;
    margin: 0 10px 0 5px;
  }

  .keywords_content2_title {
    background-color: #f0f0f0;
    overflow: hidden;
    border: 1px solid #d9d9d9;
  }
/*商品的列表展示*/
  .MyBrand_section {
    width: 285px;
    border: 1px solid #f2f2f2;
    float: left;
    margin: 10px 20px 20px 0;
  }
  /*nth-child匹配其父元素的第几个子元素（父元素包含了标题子元素）*/
  .keywords_content2  .MyBrand_section:nth-child(4n+1){
    margin-right: 0;
  }
  .MyBrand_icon > img {
    cursor: pointer;
    width: 283px;
    height: 283px;
  }
  .MyBrand_detail {
    font-size: 14px;
    color: #424242;
    line-height: 26px;
    margin-left: 17px;
  }
  /*问下过长--出现省略号*/
  .MyBrand_detail span{
    display: inline-block;
    width:250px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .MyBrand_price {
    margin: 14px 0 15px 15px;
  }
  .MyBrand_price_red {
    color: #e8000e;
    font-size: 16px;
    margin-right: 15px;
    font-weight: normal;
  }
</style>

<script>
  import http from '../../../plugins/http'
  export default {
    name: "LifeQuality",
    head(){
      return{
        title: '生活辅材区商品 - 紧商网',
        meta: [
          {name: 'keywords', content: '生活辅材区商品 - 紧商网'},
          {
            name: 'description',
            content: '生活辅材区商品 - 紧商网'
          }
        ]
      }

    },
    data: function () {
      return {
        dataloading:true,//数据加载
        //        搜索的条件接口
        searchmsg: {
          pageNo: 1,
          pageSize: 20,
          level1: "",
          level2: "",
          level3: "",
          brand: "",
          productname: "",
          searchKey: "",
          searchJson: [],
          sorttype:"1"
        },
        //        搜索的展示列表
        keycontent: [],
        searchkey: {attr: "", value: ""},
        searchkeys: [],
        //        标签
        dynamicTags: [],
//        商品列表
        MyBrands: [],
        Total: 0,
        //        路径中获取的参数
        getparam:"",
        getquery:"",
      }
    },
    methods: {
      //        改变排序方式
      changsort:function(){
          if(this.searchmsg.sorttype==="1"){
            this.searchmsg.sorttype="2";
          }else{
            this.searchmsg.sorttype="1";
          }
        this.getUrl();
      },
      more:function(index){
        if (this.keycontent[index].styles==="beforeheight") {
          this.keycontent[index].styles="afterheight";
          this.keycontent[index].word = "收起";
        } else {
          this.keycontent[index].styles="beforeheight";
          this.keycontent[index].word = "更多";
        }
      },
      //        页码的变化
      SizeChange(val) {
        this.searchmsg.pageSize = val;
        this.getUrl();
      },
      CurrentChange(val) {
        this.searchmsg.pageNo = val;
        this.getUrl();
      },
      getList: function () {
        let vue = this;
        let param = vue.searchmsg;
        param.type = 2;
        vue.$http.post(
          vue, '/rest/front/product/otherProdList', param,
          function (vue, data) {
            // 成功处理
//              处理搜索列表数据
            localStorage.removeItem('FsearchKey');
            vue.dataloading=false;
            vue.Total = data.data.pageInfo.totalRows;
            if (vue.Total != 0) {
//                   处理数据添加新的属性
              for (var i = 0; i < data.data.keyValues.length; i++) {
//                data.data.keyValues[i]["morelength"] = "10";
                data.data.keyValues[i]["styles"] = "beforeheight";
                data.data.keyValues[i]["word"] = "更多";
              }
              vue.keycontent = data.data.keyValues;
              ////          为了渲染，直接拼接好url,
              for(let w=0;w<vue.keycontent.length;w++){
                let group=[];
                for(let v=0;v<vue.keycontent[w].value.length;v++){
                  let arr={sonname:vue.keycontent[w].value[v],url:wordsearch(vue.keycontent[w].key,vue.keycontent[w].value[v],vue.searchmsg,vue.searchkeys)};
                  group.push(arr);
                }
                vue.keycontent[w].value=group;
              }

              vue.MyBrands = data.data.pageInfo.list;
              for (var i = 0; i < vue.MyBrands.length; i++) {
                vue.MyBrands[i].pdpicture = vue.MyBrands[i].pdpicture&&vue.MyBrands[i].pdpicture.length>0?vue.MyBrands[i].pdpicture[0]:'default/imgs/defaultProductImg.jpg';
              }
            } else {
              vue.keycontent = [];
              vue.MyBrands = [];
              vue.$message({
                message: "没有符合条件的商品",
                type: 'warning'
              });
            }
          }, function (error, data) {
            // 错误处理
            console.log(error);
          });
      },
      //      点击分页--自营 价格等排序直接生成url
      getUrl:function(){
        this.getparam="";
        this.getquery="";
        for(let xx in this.searchmsg){
          if(xx!="searchJson"&&this.searchmsg[xx]!=""&&this.searchmsg[xx]&&this.searchmsg[xx]!=null){
            this.getparam=this.getparam+"-"+xx+"_"+this.searchmsg[xx];
          }
        }
        let SearchURL="";
        if(this.searchkeys.length>0){
          for (var yy = 0; yy < this.searchkeys.length; yy++) {
            this.getquery=this.getquery+"&"+this.searchkeys[yy].attr+"="+this.searchkeys[yy].value;
          }
           SearchURL="/LifeQuality/search"+this.getparam+"?"+this.getquery;
        }else{
          SearchURL="/LifeQuality/search"+this.getparam;
        }
        window.open(window.location.origin+SearchURL,"_self");
      },
//      标签(关闭标签)
      handleClose(tag) {
        let aa = "";
        for (aa in this.searchmsg) {
          if (this.searchmsg[aa] === tag) {
            this.searchmsg[aa] = "";
            this.searchmsg.pageNo =1;
            break;
          } else if (aa === "searchJson") {
//            console.log(this.searchmsg.searchJson)
            for (var w = 0; w < this.searchkeys.length; w++) {
              if (this.searchkeys[w].value === tag) {
                this.searchkeys.splice(w, 1);
                this.searchmsg.pageNo =1;
              }
            }
          }
        }
        this.searchmsg.searchJson = (JSON.stringify(this.searchkeys));
        this.getUrl();
      },
//      清空所有搜索条件
      clearall: function () {
        let key=this.searchmsg.searchKey;
        this.searchmsg = {
          pageNo: 1,
          pageSize: 20,
          level1: "",
          level2: "",
          level3: "",
          productname: "",
          brand: "",
          searchJson: [],
          sorttype:"1",
          searchKey:key
        };
        this.searchkeys = [];
        this.getUrl();
      },
//      去往详情页
      clickdetail: function (id) {
        window.open(window.location.origin +'/FastDetail/'+id);
      },
    },
    created() {

    },
    mounted() {
        this.getList();
    },
    async asyncData({query,params}) {
      let data = {
        dataloading:true,//数据加载
        //        搜索的条件接口
        searchmsg: {
          pageNo: 1,
          pageSize: 20,
          level1: "",
          level2: "",
          level3: "",
          brand: "",
          productname: "",
          searchKey: "",
          searchJson: [],
          sorttype:"1"
        },
        //        搜索的展示列表
        keycontent: [],
        searchkey: {attr: "", value: ""},
        searchkeys: [],
        //        标签
        dynamicTags: [],
//        商品列表
        MyBrands: [],
        Total: 0,
        //        路径中获取的参数
        getparam:"",
        getquery:"",
        totalpage:1,
        UrlArr:[]
      };
      init(params,query, data);

      let param = data.searchmsg;
      param.type = 2;
      let ret = await http.post4s(data, '/rest/front/product/otherProdList', param);
      if(ret.status===200 || ret.data.result===1){
        data.dataloading=false;
        data.Total = ret.data.data.pageInfo.totalRows;
        data.totalpage = ret.data.data.pageInfo.totalPages;
        getUrlA(data);
        if (data.Total !== 0) {
//                   处理数据添加新的属性
          for (var i = 0; i < ret.data.data.keyValues.length; i++) {
//                ret.data.data.keyValues[i]["morelength"] = "10";
            ret.data.data.keyValues[i]["styles"] = "beforeheight";
            ret.data.data.keyValues[i]["word"] = "更多";
          }
          data.keycontent = ret.data.data.keyValues;
          ////          为了渲染，直接拼接好url,
          for(let w=0;w<data.keycontent.length;w++){
            let group=[];
            for(let v=0;v<data.keycontent[w].value.length;v++){
              let arr={sonname:data.keycontent[w].value[v],url:wordsearch(data.keycontent[w].key,data.keycontent[w].value[v],data.searchmsg,data.searchkeys)};
              group.push(arr);
            }
            data.keycontent[w].value=group;
          }
          data.MyBrands = ret.data.data.pageInfo.list;
          for (var i = 0; i < data.MyBrands.length; i++) {
            data.MyBrands[i].pdpicture = data.MyBrands[i].pdpicture&&data.MyBrands[i].pdpicture.length>0?data.MyBrands[i].pdpicture[0]:'default/imgs/defaultProductImg.jpg';
          }
        } else {
          data.keycontent = [];
          data.MyBrands = [];
          // data.$message({
          //   message: "没有符合条件的商品",
          //   type: 'warning'
          // });
        }
      }
      return data;
    }
  }

  function getUrlA(vue){
    let data = vue.searchmsg;
    let newobj ={};
    for ( let attr in data) {
      newobj[attr] = data[attr];
    }
    for(let i = 0;i<vue.totalpage;i++){
      newobj.pageNo = i + 1;
      console.log(newobj.pageNo);
      let getparam2 = '';
      let getquery2 = '';
      for (let xx in newobj) {
        if (xx != "searchJson" && newobj[xx] != "" && newobj[xx] && newobj[xx] != null) {
//            console.log(data.level3.replace('/','%2F'))
          if(xx=='level3'){
            //转译标签中的'/'
            let aaa= newobj.level3.replace('/','%2F');
            newobj[xx]=aaa;
            getparam2 = getparam2 + "-" + xx + "_" + newobj[xx];
          }
          else if(xx=='cardnum'){
            //转译标签中的'#'
            let bbb= newobj.cardnum.replace('#','%23');
            newobj[xx]=bbb;
            getparam2 = getparam2 + "-" + xx + "_" + newobj[xx];
          }
          else{
            getparam2 = getparam2 + "-" + xx + "_" + newobj[xx];
          }
        }
      }
      for (var yy = 0; yy < vue.searchkeys.length; yy++) {
//            //转译标签中的'#'
        getquery2 = getquery2 + '&'+ vue.searchkeys[yy].attr + "=" + vue.searchkeys[yy].value.replace('#','%23');
      }
      let SearchURL = "/IndustrialQuality/search" + getparam2 + "?" + getquery2 ;
      vue.UrlArr.push(SearchURL);
    }
  }

  function init(params, query, data){
    //        将路径中获取的数据----保存在页面数据中
    let urlparam=params.SearchURL;//获取？前的数据放置在页面中，调取搜索方法获取新数据
    let paramone=urlparam.split("-");
    let group=[];
    for(let i=1;i<paramone.length;i++){
      let item={name:"",value:""};
      let son=paramone[i].split("_");
      item.name=son[0];
      item.value=son[1];
      group.push(item);
    }
    for(let w=0;w<group.length;w++){
      for(let v in data.searchmsg){
        if(group[w].name===v){
          if(group[w].name==="pageNo"||group[w].name==="pageSize"){
            data.searchmsg[v]=Number(group[w].value);
          }else{
            data.searchmsg[v]=group[w].value;
          }
          if(v==="level1"||v==="level2"||v==="level3"||v==="productname"||v==="brand"){
            data.dynamicTags.push(group[w].value);
          }
        }
      }
    }
    let urlquery=query;//获取？后的数据放置在页面中，调取搜索方法获取新数据（attrJson的数据）
    for( let r in urlquery) {
        data.searchkey = {attr: "", value: ""};
        data.searchkey.attr = r;
        data.searchkey.value =urlquery[r];
        data.searchkeys.push(data.searchkey);
        data.searchmsg.searchJson = (JSON.stringify(data.searchkeys));
        data.dynamicTags.push(urlquery[r]);
    }

  }
  //      列表框点击的搜索
  function wordsearch(key, son,searchmsg,searchkeys) {
    let myparam="",myquery="",midsearchmsg=searchmsg,midsearchkeys=searchkeys,mysearchmsg="",mysearchkeys=[];
    //为了防止只是简单的赋值，指向同一个对象，数据累计+
    for(let q=0;q<midsearchkeys.length;q++){
      mysearchkeys.push(midsearchkeys[q])
    }
    let newobj = {};
    for ( let attr in midsearchmsg) {
      newobj[attr] = midsearchmsg[attr];
    }
    mysearchmsg=newobj;
//
    let aa = "";
    for (aa in mysearchmsg) {
      if (aa ===key) {
        mysearchmsg[aa] =son;
        break;
      } else if (aa === "searchJson") {
        let repeat=0;
//          生成url，后面的属性要进行值的替换
        for (let d = 0; d <searchkeys.length; d++) {
          if (searchkeys[d].attr === key) {
            searchkeys[d].value.replace(searchkeys[d].value, son);
          }else{
            repeat++;
          }
        }
        if(repeat===searchkeys.length){
          let mysearchkey = {attr: "", value: ""};
          mysearchkey.attr =key;
          mysearchkey.value =son;
          mysearchkeys.push(mysearchkey);
        }
      }
    }
    for (let xx in mysearchmsg) {
      if (xx !== "searchJson" && mysearchmsg[xx] !== "" && mysearchmsg[xx] && mysearchmsg[xx] !== null) {
        myparam =myparam + "-" + xx + "_" + mysearchmsg[xx];
      }
    }
    let SearchURL="";
    if(mysearchkeys.length>0){
      for (var yy = 0; yy < mysearchkeys.length; yy++) {
//            //转译标签中的'#'
        myquery = myquery +"&"+ mysearchkeys[yy].attr + "=" + mysearchkeys[yy].value.replace('#','%23');
      }
      SearchURL = "/LifeQuality/search" + myparam+ "?" + myquery ;
    }else{
      SearchURL = "/LifeQuality/search" + myparam;
    }
    return SearchURL;
  }
</script>
