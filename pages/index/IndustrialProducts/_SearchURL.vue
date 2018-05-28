<template>
  <div class="IndustrialProducts" v-loading="dataloading">
    <div class="keywords_content">
      <div class="keywords_title">
        <p class="keywords_titlecontent left">关键词：{{this.searchmsg.searchKey}}</p>
        <p class="keywords_titlelist right">条件搜出{{Total}}件商品</p>
      </div>
      <div class="mytag">
        <span>所选分类：<span @click="clearall" style=" color: #e8000e;cursor: pointer">（清空全部搜索条件）</span></span>
        <div class="mysearch">
          <el-tag :key="tag" v-for="tag in dynamicTags"
                  closable :disable-transitions="false" type="info" size="small"
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
      <div class="keywords_content2">
        <div class="keywords_content2_title">
          <ul class="keywords_content2_ul left" v-if="searchmsg.sorttype===null">
            <!--<li><a href="">综合</a><img src="../../assets/icon/down.png"/></li>-->
            <!--<li><a href="">销量</a><img src="../../assets/icon/down2.png"/></li>-->
            <li @click="havesort" style="background-color: #d6d6d6;">
              <span>规格</span>
              <img src="../../../assets/icon/down.png"/>
            </li>
            <li><input type="checkbox" @click="changself" v-model="self"/>自营</li>
            <li><input type="checkbox" @click="changhave" v-model="have"/>有库存</li>
            <li><input type="checkbox" @click="changtime" v-model="time"/>有远期</li>
          </ul>
          <ul class="keywords_content2_ul left" v-else>
            <li @click="changsort" style="background-color: #e8000e;">
              <span>规格</span>
              <img src="../../../assets/icon/down.png" v-if="searchmsg.sorttype==='1'"/>
              <img src="../../../assets/icon/sortup.png" v-else-if="searchmsg.sorttype==='0'"/>
            </li>
            <li><input type="checkbox" @click="changself" v-model="self"/>自营</li>
            <li><input type="checkbox" @click="changhave" v-model="have"/>有库存</li>
            <li><input type="checkbox" @click="changtime" v-model="time"/>有远期</li>
          </ul>
          <div class="keywords_shopcar right" @click="adds">
            <img src="../../../assets/icon/shop_car.png"/>
            <span>批量加入购物车</span>
          </div>
        </div>
        <div class="goodslist">
          <table class="keywords_content_tbd2" style="width: 100%; border-color: #d9d9d9">
            <thead>
            <th><input type="checkbox" @click="selectAll" v-model="checked">全选</th>
            <th>品名</th>
            <th>品牌印记</th>
            <th>包装方式</th>
            <th>单价</th>
            <th>库存</th>
            <th>仓库</th>
            <th>发货时间</th>
            <th>订购量</th>
            <th>总价/预定价</th>
            <th>操作</th>
            </thead>
            <tbody>
            <!--<template v-for="(data,i) in keywords_tbds">-->
            <tr v-for="(item,i) in keywords_tbds" :key="i" class="checkBox2">
              <td class="keywords_tbd2_one">
                <input type="checkbox" :value="i" v-model="selectArr" class="checkBox"/>
                <img class="checkimg" :src="$oss.publicUrl(item.pdpicture)" @click="click_ipt(i,item.id)"
                     style="cursor: pointer"/>
              </td>
              <td class="keywords_tbd2_two" style="cursor: pointer">
              <!--<td class="keywords_tbd2_two" @click="click_ipt(i,item.id)" style="cursor: pointer">-->
                <a target="_blank" :href="'/IndustrialDetail/' + item.id" :title="item.productname+item.level3+item.stand+item.material+'/'+item.cardnum">
                  <img src="../../../assets/images/self.png" height="16" width="34" style="vertical-align: middle"
                       v-if="item.selfsupport==true"/>
                  <span>{{item.productname}}</span>
                  <span>{{item.level3}}</span>
                  <span>{{item.stand}}</span>
                  <span>{{item.material}}/{{item.cardnum}}/{{item.surfacetreatment}}</span>
                </a>
              </td>
              <td>
                <div class="check_logoimg" v-if="item.brandpic"><img :src="$oss.publicUrl(item.brandpic)"/></div>
                {{item.brand}}<br/>
                {{item.mark}}
              </td>
              <td>{{item.packagetype}}</td>
              <td>
                <span v-if="item.showprice">￥{{item.marketprice}}／{{item.unit}}</span>
                <span style="color: #0e90d2;cursor:pointer;" v-else @click="goToLogin">会员专属价</span>
              </td>
              <td>{{item.pdstorenum}}{{item.storeunit}}</td>
              <td>
                <!--<select v-model="item.storename.value" @change="selectStore(i,item.storename)" style="width:100px;">-->
                <!--<option v-for="option in item.storeNames" :value="option.value">-->
                <!--{{ // option.text }}-->
                <!--</option>-->
                <!--</select>-->
                {{item.storename}}
              </td>
              <td>
                <select v-model="item.time" @change="selectTime(i,item.time.price)" style="width: 87px;height:26px;">
                  <option v-for="(time,i) in item.prices" :key="i" :value="time">
                    {{time.name}}
                  </option>
                </select>
              </td>
              <td class="keywords_tbd2_nine">
                <div class="num_decreae left" @click="handleReduce(i,item.packageChild)" :disabled="item.startnum === item.num">-</div>
                <input type="number" class="num_input left" v-model="item.num"
                       v-on:input="inputFunc(i,item.num)"
                       v-on:blur="inputBlur(i,item.num)">
                <div class="num_increas left" @click="handleAdd(i,item.packageChild)" :disabled="item.pdstorenum === item.num">+</div>
                <select class="num_danwei" v-model="item.packageChild" @change="selectUnit(i,item.packageChild.unit)">
                  <option v-for="(child,i) in item.packages" :key="i" :value="child">{{child.unit}}</option>
                </select>
                <div style="display: inline-block;height: 26px;line-height: 26px;padding-left: 15px">{{item.pagetypeStr}}</div>
              </td>
              <td v-if="item.showprice">
                <button v-bind:class="isActive(item.paytype,0)" @click="choosePay(item,0)">￥{{item.totalPrice}}</button>
                <button v-bind:class="isActive(item.paytype,1)" @click="choosePay(item,1)"
                        v-show="item.time.name!=='立即发货'"
                        style="margin-left: 5px">￥{{item.deposit}}
                </button>
              </td>
              <td v-else><span style="color: #0e90d2;cursor:pointer;" @click="goToLogin">会员专属价</span></td>
              <td>
                <button v-if="item.pdstorenum>=item.num" :disclick="disabledclick" class="red_button" @click="addOne(i)">加入购物车</button>
                <span v-if="item.pdstorenum<item.num||item.pdstorenum<0">联系客服组货</span>
              </td>
            </tr>
            <!--</template>-->
            </tbody>
          </table>
          <el-pagination :page-sizes="[10, 20, 50, 100]" @size-change="SizeChange"
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
    </div>
    <ul class="list-group">
      <li class="list-group-item" v-for="(item,i) in items" :key="i" style="float: left">{{ item.name }}</li>
    </ul>
  </div>
</template>
<script>
  import http from '../../../plugins/http'

  export default {
    name: "IndustrialProducts",
    head() {
      return {
        title: this.titleInfo,
        meta: [
          {
            name: 'keywords',
            content: this.keywordsInfo,
          },
          {
            name: 'description',
            content: this.descriptionInfo,
          }
        ]
      }
    },
    data: function () {
      return {
        UrlArr:[],
        disabledclick:false,
        titleInfo: '不锈钢螺栓批发_价格_供应商_生产厂家-紧商网',
        keywordsInfo: '螺丝批发,螺丝价格,螺丝供应商,螺丝生产厂家',
        descriptionInfo: '紧商网提供最新不锈钢螺丝批发、价格、供应商、生产厂家等相关信息，螺丝质量好，规格全，批发价格低，一件代发。买卖螺丝，就上紧商网',
        dataloading: true,//数据加载
        title: "",
        keywords: "",
        description: "",
        Total: 0,
        value: "",
        productIndex: [0],
        items: [],
        checked: false,
        selectArr: [],
        keywords_tbds: [],
        allData: [],
//        搜索的展示列表
        keycontent: [],
//        标签
        dynamicTags: [],
        key: "",
//        搜索的条件接口
        searchmsg: {
          pageNo: 1,
          pageSize: 10,
          level1: "",
          level2: "",
          level3: "",
          productname: "",
          brand: "",
          cardnum: "",
          material: "",
          surfacetreatment:"",
          searchJson: [],
          sorttype:null,
          selfsupport: "0",
          havestore: "0",
          forwardtime: "0",
          searchKey: "",
        },
        self: false,
        have: false,
        time: false,
        searchkey: {attr: "", value: ""},
        searchkeys: [],
        depositRate: 1,
//        路径中获取的参数
        getparam: "",
        getparam2: "",
        getquery: "",
        getquery2: "",
        totalpage:1
      }
    },
    methods: {
      getTitle(level) {//wy:暂时没用到
        switch (level) {
          case 2://2级分类
            break;
          case 3://3级分类
            break;
        }
      },
      //        点击会员专属价--跳到登录页面
      goToLogin: function () {
        this.$router.push({path: '/Login'});
      },
//        改变排序方式
      changsort: function () {
        if (this.searchmsg.sorttype === "1") {
          this.searchmsg.sorttype = "0";
        } else {
          this.searchmsg.sorttype = "1";
        }
        this.getUrl();
      },
//      为了不影响自营的。默认初始是null。。。
      havesort: function () {
        if (this.searchmsg.sorttype === null) {
          this.searchmsg.sorttype = "1";
        } else {
          this.searchmsg.sorttype =null;
        }
        this.getUrl();
      },
      changself: function () {
        if (this.searchmsg.selfsupport === "1") {
          this.searchmsg.selfsupport = "0";
        } else {
          this.searchmsg.selfsupport = "1";
        }
        this.getUrl();
      },
      changhave: function () {
        if (this.searchmsg.havestore === "1") {
          this.searchmsg.havestore = "0";
        } else {
          this.searchmsg.havestore = "1";
        }
        this.getUrl();
      },
      changtime: function () {
        if (this.searchmsg.forwardtime === "1") {
          this.searchmsg.forwardtime = "0";
        } else {
          this.searchmsg.forwardtime = "1";
        }
        this.getUrl();
      },
      more: function (index) {
        if (this.keycontent[index].styles == "beforeheight") {
          this.keycontent[index].styles = "afterheight";
          this.keycontent[index].word = "收起";
        } else {
          this.keycontent[index].styles = "beforeheight";
          this.keycontent[index].word = "更多";
        }
      },
//      点击分页--自营 价格等排序直接生成url
      getUrl: function () {
          this.getparam="";
          this.getquery="";
        for (let xx in this.searchmsg) {
          if (xx != "searchJson" && this.searchmsg[xx] != "" && this.searchmsg[xx] && this.searchmsg[xx] != null) {
            if(xx=='level3'){
              //转译标签中的'/'
              let aaa= this.searchmsg.level3.replace('/','%2F');
              this.searchmsg[xx]=aaa;
              this.getparam = this.getparam + "-" + xx + "_" + this.searchmsg[xx];
            }
           else if(xx=='cardnum'){
              //转译标签中的'#'
              let bbb= this.searchmsg.cardnum.replace('#','%23');
              this.searchmsg[xx]=bbb;
              this.getparam = this.getparam + "-" + xx + "_" + this.searchmsg[xx];
            }
           else{
              this.getparam = this.getparam + "-" + xx + "_" + this.searchmsg[xx];
            }
          }
        }
        let SearchURL="";
        if(this.searchkeys.length>0){
          for (var yy = 0; yy < this.searchkeys.length; yy++) {
//            //转译标签中的'#'
            this.getquery = this.getquery +"&"+ this.searchkeys[yy].attr + "=" + this.searchkeys[yy].value.replace('#','%23');
          }
           SearchURL = "/IndustrialProducts/search" + this.getparam + "?" + this.getquery ;
        }else{
           SearchURL = "/IndustrialProducts/search" + this.getparam;
        }
        window.open(window.location.origin + SearchURL, "_self");
      },

      //分页a标签
      getUrlA(num){
        let data = this.searchmsg;
        let newobj = {};
        for ( let attr in data) {
          newobj[attr] = data[attr];
        }
        newobj.pageNo =num;
        this.getparam2 = '';
        this.getquery2 = '';
        for (let xx in newobj) {
          if (xx != "searchJson" && newobj[xx] != "" && newobj[xx] && newobj[xx] != null) {
//            console.log(data.level3.replace('/','%2F'))
            if(xx=='level3'){
              //转译标签中的'/'
              let aaa= newobj.level3.replace('/','%2F');
              newobj[xx]=aaa;
              this.getparam2 = this.getparam2 + "-" + xx + "_" + newobj[xx];
            }
            else if(xx=='cardnum'){
              //转译标签中的'#'
              let bbb= newobj.cardnum.replace('#','%23');
              newobj[xx]=bbb;
              this.getparam2 = this.getparam2 + "-" + xx + "_" + newobj[xx];
            }
            else{
              this.getparam2 = this.getparam2 + "-" + xx + "_" + newobj[xx];
            }
          }
        }
         let SearchURL="";
        if(this.searchkeys.length>0){
          for (var yy = 0; yy < this.searchkeys.length; yy++) {
//            //转译标签中的'#'
            this.getquery2 = this.getquery2 + this.searchkeys[yy].attr + "=" + this.searchkeys[yy].value.replace('#','%23');
          }
           SearchURL = "/IndustrialProducts/search" + this.getparam2 + "?" + this.getquery2 ;
        }else{
           SearchURL = "/IndustrialProducts/search" + this.getparam2;
        }
        return SearchURL
      },

//      标签(关闭标签)
      handleClose(tag) {
        let aa = "";
        for (aa in this.searchmsg) {
          if (this.searchmsg[aa] === tag) {
            this.searchmsg[aa] = "";
            this.searchmsg.pageNo = 1;
            break;
          } else if (aa === "searchJson") {
            for (let w = 0; w < this.searchkeys.length; w++) {
              if (this.searchkeys[w].value === tag) {
                this.searchkeys.splice(w, 1);
                this.searchmsg.pageNo = 1;
              }
            }
          }
        }
        this.searchmsg.searchJson = (JSON.stringify(this.searchkeys));
        this.getUrl();
      },
//      清空所有搜索条件
      clearall: function () {
        let key = this.searchmsg.searchKey;
        this.searchmsg = {
          pageNo: 1,
          pageSize: 10,
          level1: "",
          level2: "",
          level3: "",
          productname: "",
          brand: "",
          cardnum: "",
          material: "",
          surfacetreatment:"",
          searchJson: [],
          sorttype:null,
          searchKey: key
        };
        this.searchkeys = [];
        this.getUrl();
      },
      //        页码的变化
      SizeChange(val) {
        this.searchmsg.pageSize = val;
        this.selectArr = [];
        this.getUrl();

      },
      CurrentChange(val) {
        this.searchmsg.pageNo = val;
        this.selectArr = [];
        this.getUrl();
      },
      checkState(storeNum, num) {
        let result = "购买";
        if (storeNum === 0 || num > storeNum) {
          result = "联系客服组货";
        }
        return result;
      },
      selectUnit(i, unit) {
        //选单位
//        let packageList = this.keywords_tbds[i].packages;
//        let preUnit = this.keywords_tbds[i].preUnit;
//        let newNum = this.keywords_tbds[i].num;
//        let num_qian = (packageList[0].num);
//        let num_he = (packageList[1].num);
        //价格计算
//        if (unit === "千") {
//          if (preUnit === "盒") {
//            newNum = Math.ceil(newNum / num_qian);
//          } else if (preUnit === "箱") {
//            newNum = Math.ceil(newNum / num_qian / num_he);
//          }
//
//        } else if (unit === "盒") {
//          if (preUnit === "千") {
//            newNum = Math.ceil(newNum * num_qian);
//          } else if (preUnit === "箱") {
//            newNum = Math.ceil(newNum / num_he);
//          }
//        } else if (unit === "箱") {
//          if (preUnit === "千") {
//            newNum = Math.ceil(newNum * num_he * num_qian);
//          } else if (preUnit === "盒") {
//            newNum = Math.ceil(newNum * num_he);
//          }
//        }
        this.keywords_tbds[i].preUnit = unit;
        this.keywords_tbds[i].marketprice = this.keywords_tbds[i].price;
        let discount = (this.keywords_tbds[i].time.name === "立即发货") ? 1 : 0.99;
        if (this.checkNumber(i, this.keywords_tbds[i].num) < this.keywords_tbds[i].startnum) {
          this.keywords_tbds[i].num = this.getNumber(i, this.keywords_tbds[i].startnum, this.keywords_tbds[i].preUnit);
          this.keywords_tbds[i].marketprice = singlePrice(this.keywords_tbds[i].price, this.keywords_tbds[i].startnum, this.keywords_tbds[i].intervalprice);
          this.keywords_tbds[i].totalPrice = totalPrice(this,this.keywords_tbds[i].startPrice, this.keywords_tbds[i].startnum, this.keywords_tbds[i].intervalprice, discount,i);
          this.keywords_tbds[i].deposit = depositPrice(this, this.keywords_tbds[i].startPrice, this.keywords_tbds[i].pdstorenum, this.keywords_tbds[i].intervalprice);
        } else if (this.checkNumber(i, this.keywords_tbds[i].num) > this.keywords_tbds[i].pdstorenum) {
          this.keywords_tbds[i].num = this.getNumber(i, this.keywords_tbds[i].pdstorenum, this.keywords_tbds[i].preUnit);
          this.keywords_tbds[i].marketprice = singlePrice(this.keywords_tbds[i].price, this.keywords_tbds[i].pdstorenum, this.keywords_tbds[i].intervalprice);
          this.keywords_tbds[i].totalPrice = totalPrice(this,this.keywords_tbds[i].startPrice, this.keywords_tbds[i].pdstorenum, this.keywords_tbds[i].intervalprice, discount,i);
          this.keywords_tbds[i].deposit = depositPrice(this, this.keywords_tbds[i].startPrice, this.keywords_tbds[i].pdstorenum, this.keywords_tbds[i].intervalprice);
        } else {

          this.updatePrice(this.keywords_tbds, i, null, this.getNumber(i, this.keywords_tbds[i].num), null, unit);
        }
//        console.log(this.keywords_tbds[i].marketprice);
//let nunber=this.getNumber(i,this.keywords_tbds[i].num,unit);
//        this.updatePrice(this.keywords_tbds, i, null, null, null, unit);
      },
      //数量的减少
      handleReduce(i,unit) {
        //        如果选中的单位是 千、千支，则按照加购量加减；否则+-1
        if((unit.unit==="千支"||unit.unit==="千")&&this.keywords_tbds[i].minplus>0){
          if (this.keywords_tbds[i].num > this.keywords_tbds[i].startnum && this.keywords_tbds[i].num > 1) {
            let nownum2 = this.keywords_tbds[i].num;
            nownum2 =(Number(nownum2 )-Number(this.keywords_tbds[i].minplus)).toFixed(3);
            this.keywords_tbds[i].num = nownum2 ;
            this.updatePrice(this.keywords_tbds, i, null, this.keywords_tbds[i].num);
          }
        }else{
          if (this.keywords_tbds[i].num > this.keywords_tbds[i].startnum && this.keywords_tbds[i].num > 1) {
            let num2 = this.keywords_tbds[i].num + ".00";
            let fval2 = num2.toString().split(".")[0];
            fval2--;
            let sval2 = num2.toString().split(".")[1];
            let numStr2 = fval2 + "." + sval2;
            this.keywords_tbds[i].num = numStr2;
            this.updatePrice(this.keywords_tbds, i, null, this.keywords_tbds[i].num);
          }
        }
      },
//      数量的增加
      handleAdd(i,unit) {
//        如果选中的单位是 千、千支，则按照加购量加减；否则+-1
        if((unit.unit==="千支"||unit.unit==="千")&&this.keywords_tbds[i].minplus>0){
          if (this.keywords_tbds[i].num < this.keywords_tbds[i].pdstorenum) {
            let nownum1 = this.keywords_tbds[i].num;
            nownum1=(Number(nownum1)+Number(this.keywords_tbds[i].minplus)).toFixed(3);
            this.keywords_tbds[i].num = nownum1;
            this.updatePrice(this.keywords_tbds, i, null, this.keywords_tbds[i].num);
          }
        }else{
          if (this.keywords_tbds[i].num < this.keywords_tbds[i].pdstorenum) {
            let num1 = this.keywords_tbds[i].num + ".00";
            let fval1 = num1.toString().split(".")[0];
            fval1++;
            let sval1 = num1.toString().split(".")[1];
            let numStr1 = fval1 + "." + sval1;
            this.keywords_tbds[i].num = numStr1;
            this.updatePrice(this.keywords_tbds, i, null, this.keywords_tbds[i].num);
          }
        }
      },
      inputFunc(i, val) {
        // let intValue = parseFloat(val) ? parseFloat(val) : 0;
//        console.log(val);
        let intValue = 0;
        if (val != null && !isNaN(val)) {
          //检查小数点后是否对于两位
          intValue = val;
          if (val.toString().split(".").length > 1 && val.toString().split(".")[1].length > 3) {
            // alert("小数点后不能多于两位！");
            intValue = parseFloat(val).toFixed(3);
          }
        }
        this.keywords_tbds[i].num = intValue;
        this.updatePrice(this.keywords_tbds, i, null, intValue);

      },
      inputBlur(i, val) {
        let discount = (this.keywords_tbds[i].time.name === "立即发货") ? 1 : 0.99;
        if (this.checkNumber(i, val) < this.keywords_tbds[i].startnum) {
          this.keywords_tbds[i].num = this.getNumber(i, this.keywords_tbds[i].startnum, this.keywords_tbds[i].preUnit);
          this.keywords_tbds[i].marketprice = singlePrice(this.keywords_tbds[i].startPrice, this.keywords_tbds[i].startnum, this.keywords_tbds[i].intervalprice);
          this.keywords_tbds[i].totalPrice = totalPrice(this,this.keywords_tbds[i].startPrice, this.keywords_tbds[i].startnum, this.keywords_tbds[i].intervalprice, discount,i);
          this.keywords_tbds[i].deposit = depositPrice(this, this.keywords_tbds[i].startPrice, this.keywords_tbds[i].pdstorenum, this.keywords_tbds[i].intervalprice);
        } else if (this.checkNumber(i, val) > this.keywords_tbds[i].pdstorenum) {
          this.keywords_tbds[i].num = this.getNumber(i, this.keywords_tbds[i].pdstorenum, this.keywords_tbds[i].preUnit);
          this.keywords_tbds[i].marketprice = singlePrice(this.keywords_tbds[i].startPrice, this.keywords_tbds[i].pdstorenum, this.keywords_tbds[i].intervalprice);
          this.keywords_tbds[i].totalPrice = totalPrice(this,this.keywords_tbds[i].startPrice, this.keywords_tbds[i].pdstorenum, this.keywords_tbds[i].intervalprice, discount,i);
          this.keywords_tbds[i].deposit = depositPrice(this, this.keywords_tbds[i].startPrice, this.keywords_tbds[i].pdstorenum, this.keywords_tbds[i].intervalprice);
        }
      },
      selectTime(i, price) {
        this.keywords_tbds[i].startPrice = price;
        this.keywords_tbds[i].paytype = 0;//默认第一项
        this.updatePrice(this.keywords_tbds, i, price);
      },
      updatePrice(list, index, newP, newNum, intervalPrice, newUnit) {//更新价格
//        let newPrice = newP ? newP : list[index].startPrice;
        let num = newNum ? newNum : list[index].num;
        let rangePrice = intervalPrice ? intervalPrice : list[index].intervalprice;
        if(rangePrice==='[]'|| rangePrice === null){
          rangePrice=''
        }
        let newPrice = newP ? newP : rangePrice ? list[index].startPrice : list[index].price;
        let unit = newUnit ? newUnit : list[index].preUnit;
        let discount = (list[index].time.name === "立即发货") ? 1 : 0.99;
        let smallNum = this.checkNumber(index, num, unit);
        list[index].marketprice = singlePrice(newPrice, smallNum, rangePrice);
//        console.log(list[index].marketprice);
        list[index].totalPrice = totalPrice(this,newPrice, smallNum, rangePrice, discount,index);
        list[index].deposit = depositPrice(this, newPrice, smallNum, rangePrice);
      },
      getNumber(i, num, unit) {
        let packageList = this.keywords_tbds[i].packages;
        for (let i = 0; i < packageList.length; i++) {
          if (packageList[i].unit === unit) {
            return num;
          } else {
            let numRate = packageList[i].num === 0 ? 1 : packageList[i].num;
            num = (num / numRate).toFixed(2);
          }
        }
      },
      checkNumber(i, numb, newUnit) {//判断num 转化成最小单位计算价格
        let num = numb;
        let unit = newUnit ? newUnit : this.keywords_tbds[i].preUnit;
        let storeUnit = this.keywords_tbds[i].storeunit;
        let packageList = this.keywords_tbds[i].packages;
//        let num_qian = packageList[0].num;
//        let num_he = packageList[1].num;
        //默认单位为最小单位packageList[0].unit
        for (let i = 0; i < packageList.length; i++) {
          if (packageList[i].unit === unit) {
            return num;
          } else {
            let numRate = packageList[i].num === 0 ? 1 : packageList[i].num;
            num = num * numRate;
          }
        }
//        if (unit === packageList[0].unit && packageList[0].unit) {
//          if (storeUnit === packageList[1].unit && packageList[1].unit) {
//            num = num / num_qian;
//          } else if (storeUnit === packageList[2].unit && packageList[2].unit) {
//            num = num / num_qian / num_he;
//          }
//
//        } else if (unit === packageList[1].unit && packageList[1].unit) {
//          if (storeUnit === packageList[0].unit && packageList[0].unit) {
//            num = num * num_qian;
//          } else if (storeUnit === packageList[2].unit && packageList[2].unit) {
//            num = num / num_he;
//          }
//        } else if (unit === packageList[2].unit && packageList[2].unit) {
//          if (storeUnit === packageList[0].unit && packageList[0].unit) {
//            num = num * num_he * num_qian;
//          } else if (storeUnit === packageList[1].unit && packageList[1].unit) {
//            num = num * num_he;
//          }
//        }
        return num;
      },
      isActive(type, index) {
        let check = false;
        if (type === index) {
          check = true;
        }
        return {
          unchecked: true,
          checked: check,
        }
      },
      choosePay(item, type) {//付款方式
        item.paytype = type;
      },
      selectStore(i, val) {
        //新数据带入
        let indexs = this.productIndex;
        indexs[i] = val.value;
        this.keywords_tbds = configData(this.allData, indexs);
      },
      //获取定金比率
      getRate() {
        let vue = this;
        let param = {};
        vue.$http.post(
          vue, '/rest/transaction/loadAllTransactionSetting', param,
          function (vue, data) {
            vue.depositRate = data.data.transactionSettings.remotepurchasingmargin;

          },
          function (error, data) {
            vue.$message({
              showClose: true,
              message: data.message,
              type: 'error'
            })
          }
        )
      },
      selectAll(event) {
        var _this = this;
        if (_this.checked) {
          _this.selectArr = [];
        } else { //实现全选
          _this.selectArr = [];
          _this.keywords_tbds.forEach(function (keywords_tbd, i) {
            _this.selectArr.push(i);
          });
          return _this.selectArr;
        }
        return _this.selectArr;
      },
      jump: function (MyName) {
        this.$router.push({name: MyName})
      },
      //点击产品图片跳转详情
      click_ipt($index, id) {
        // this.$router.push({name: "IndustrialDetail", params: {id: id}});
        window.open(window.location.origin + '/IndustrialDetail/' + id);//open new window
      },
      addOne(index) {
//        this.selectArr.push(index);//add this pd
        this.$store.commit("newNum", 1);//update
        let selectItem = this.keywords_tbds[index];
        let protype = 0;
        if (selectItem.time.name === "立即发货") {
          protype = 0;
        } else {
          if (selectItem.paytype === 0) {
            protype = 1;
          } else {//==1
            protype = 2;
          }
        }
        let param = {
          "saleid": selectItem.memberid,
          "pdid": selectItem.id,
          "pdno": selectItem.pdno,
          "pdnumber": selectItem.num,
          "storeid": selectItem.storeid,
          "delivertime": selectItem.time.name,
          "unit": selectItem.preUnit,
          "protype": protype,
        };
        this.disabledclick = true;
        let vue = this;
        vue.$http.post(
          vue, '/rest/buyer/shopcar/insertShopCar', param,
          function (vue, data) {
            vue.$message({
              showClose: true,
              message: "已加入购物车",
              type: 'success'
            })
            vue.disabledclick = false;
          },
          function (error, data) {
            vue.$message({
              showClose: true,
              message: data.message,
              type: 'error'
            })
            vue.disabledclick = false;
          }
        )

      },
      adds() {
        this.$store.commit("newNum", 1);
        let shopCarList = [];
        if (this.selectArr.length > 0) {//有货物
          for (let i = 0; i < this.selectArr.length; i++) {
            let selectIndex = this.selectArr[i];
            let selectItem = this.keywords_tbds[selectIndex];
            let protype = 0;
            if (selectItem.time.name === "立即发货") {
              protype = 0;
            } else {
              if (selectItem.paytype === 0) {
                protype = 1;
              } else {//==1
                protype = 2;
              }
            }
            let item = {
              "saleid": selectItem.memberid,
              "pdid": selectItem.id,
              "pdno": selectItem.pdno,
              "producttype": selectItem.producttype,
              "pdnumber": selectItem.num,
              "storeid": selectItem.storeid,
              "delivertime": selectItem.time.name,
              "unit": selectItem.preUnit,
              "protype": protype,
            };
            shopCarList.push(item);
          }
          let vue = this;
          let param = {shopCarList: JSON.stringify(shopCarList)};
          vue.$http.post(
            vue, '/rest/buyer/shopcar/batchInsertShopCar', param,
            function (vue, data) {
              vue.$message({
                showClose: true,
                message: "添加成功",
                type: 'success'
              })
              // alert("添加成功");
              vue.$router.push({name: "ShopCar"});

            },
            function (error, data) {
              vue.$message({
                showClose: true,
                message: data.message,
                type: 'error'
              })
            }
          )
        } else {
//          alert("请先勾选您需要的商品")
          this.$message({
            showClose: true,
            message: "请先勾选您需要的商品",
            type: 'warning'
          })
        }
      },
    },
    watch: {
      "selectArr": function () {
        if (this.selectArr.length === this.productIndex.length) {
          this.checked = true
        } else {
          this.checked = false
        }
      },
    },
    mounted() {
      this.getRate();
      this.$store.commit('savetijiao', '');
      let ids='';
      for(let i = 0;i<this.keywords_tbds.length;i++){
        if(i===this.keywords_tbds.length-1){
          ids=ids + this.keywords_tbds[i].id
        } else {
          ids=ids + this.keywords_tbds[i].id + ',';
        }
      }
      let vue = this;
      let param = {pids:ids};
      vue.$http.post(
        vue, '/rest/front/product/prodRatePrice', param,
        function (vue,data) {
          let priceArr = data.data.list;
          if(priceArr){
            for(let i = 0;i<vue.keywords_tbds.length;i++){
              vue.keywords_tbds[i].price = priceArr[i].prices[0].price;
//              显示的单价，取立即发货的价格。并且在发货时间选择过滤掉价格为0 的数据
              vue.keywords_tbds[i].marketprice=priceArr[i].prices[0].price;
              vue.keywords_tbds[i].prices=[];
              vue.keywords_tbds[i].time=priceArr[i].prices[0];
              for(let j=0;j<priceArr[i].prices.length;j++){
                  if(priceArr[i].prices[j].price>0){
                    vue.keywords_tbds[i].prices.push(priceArr[i].prices[j])
                  }
              }
              vue.keywords_tbds[i].marketprice=vue.keywords_tbds[i].prices[0].price;
              vue.keywords_tbds[i].startPrice=vue.keywords_tbds[i].prices[0].price;
              vue.keywords_tbds[i].totalPrice=totalPrice(vue.keywords_tbds,vue.keywords_tbds[i].marketprice, vue.keywords_tbds[i].startnum, vue.keywords_tbds[i].intervalprice);
              vue.keywords_tbds[i].showprice = true;
            }
          } else {
            for(let i = 0;i<vue.keywords_tbds.length;i++){
              //修改之前是true
              vue.keywords_tbds[i].showprice = false;
            }
          }

        },
        function (error,data) {
//          for(let i = 0;i<vue.keywords_tbds.length;i++){
//            vue.keywords_tbds[i].showprice = false;
//          }
        }
      )
    },
    async asyncData(context) {
      let data = {
        titleInfo: '不锈钢螺栓批发_价格_供应商_生产厂家-紧商网',
        keywordsInfo: '螺丝批发,螺丝价格,螺丝供应商,螺丝生产厂家',
        descriptionInfo: '紧商网提供最新不锈钢螺丝批发、价格、供应商、生产厂家等相关信息，螺丝质量好，规格全，批发价格低，一件代发。买卖螺丝，就上紧商网',
        dataloading: false,//数据加载
        title: "",
        keywords: "",
        description: "",
        Total: 0,
        value: "",
        productIndex: [0],
        items: [],
        checked: false,
        selectArr: [],
        keywords_tbds: [],
        allData: [],
//        搜索的展示列表
        keycontent: [],
//        标签
        dynamicTags: [],
        key: "",
//        搜索的条件接口
        searchmsg: {
          pageNo: 1,
          pageSize: 10,
          level1: "",
          level2: "",
          level3: "",
          productname: "",
          brand: "",
          cardnum: "",
          material: "",
          surfacetreatment:"",
          searchJson: [],
          sorttype:null,
          selfsupport: "0",
          havestore:"0",
          forwardtime:"0",
          searchKey: "",
        },
        self: false,
        have: false,
        time: false,
//        关键词
        searchkey: {attr: "", value: ""},
        searchkeys: [],
        depositRate: 1,
        totalpage:1,
        UrlArr:[]
      };
      let params=context.params;
      let query = context.query;
      init(params,query, data);
      SEOsearch(query, data);
      let param = data.searchmsg;
//      console.log(param);
      let ret = await http.post4s(data, '/rest/front/product/list', param);
//      console.log(ret.data.data)
      if(ret.status===200 || ret.data.result===1){
        data.Total = ret.data.data.pageInfo.totalRows;
        data.totalpage = ret.data.data.pageInfo.totalPages;
        getUrlA(data);
        if (data.Total !== 0) {
////                   处理数据添加新的属性
          for (let i = 0; i < ret.data.data.keyValues.length; i++) {
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
          //数据初始化配置
          let indexs = [];
          for (let item in ret.data.data.pageInfo.list) {
            let num = 0;
            indexs.push(num)
          }
          data.productIndex = indexs;
          data.allData = ret.data.data.pageInfo.list;
          data.keywords_tbds = configData(ret.data.data.pageInfo.list, indexs);
        } else {
          data.keycontent = [];
          data.allData = [];
          data.keywords_tbds = [];
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
      let SearchURL="";
      if(vue.searchkeys.length>0){
        for (var yy = 0; yy < vue.searchkeys.length; yy++) {
//            //转译标签中的'#'
          getquery2 = getquery2 + '&'+ vue.searchkeys[yy].attr + "=" + vue.searchkeys[yy].value.replace('#','%23');
        }
         SearchURL = "/IndustrialProducts/search" + getparam2 + "?" + getquery2 ;
      }else{
        SearchURL = "/IndustrialProducts/search" + getparam2 ;
      }
      vue.UrlArr.push(SearchURL);
    }
  }

  function init(params, query, data) {
    //        将路径中获取的数据----保存在页面数据中
    let urlparam = params.SearchURL;//获取？前的数据放置在页面中，调取搜索方法获取新数据
    let testGroup=["-pageNo_","-pageSize_","-level1_","-level2_","-level3_","-productname_","-brand_","-cardnum_","-material_","-surfacetreatment_","-sorttype_","-selfsupport_","-havestore_","-forwardtime_","-searchKey_"];
    for(let q=0;q<testGroup.length;q++){
      if(urlparam.indexOf(testGroup[q]) != -1){
        let a=testGroup[q];
        a=a.replace("-","***");
        a=a.replace("_","###");
        urlparam=urlparam.replace(testGroup[q],a)
      }
    }
    let paramone = urlparam.split("***");
    let group = [];
    for (let i = 1; i < paramone.length; i++) {
      let item = {name: "", value: ""};
      let son = paramone[i].split("###");
      item.name = son[0];
      item.value = son[1];
      group.push(item);
    }
    for (let w = 0; w < group.length; w++) {
      for (let v in data.searchmsg) {
        if (group[w].name === v) {
          if (group[w].name === "pageNo" || group[w].name === "pageSize") {
            data.searchmsg[v] = Number(group[w].value);
          } else {
            data.searchmsg[v] = group[w].value;
          }
          if (v === "level1" || v === "level2" || v === "level3" || v === "productname" || v === "brand" || v === "cardnum" || v === "material" || v === "surfacetreatment") {
            data.dynamicTags.push(group[w].value);
          }
        }
      }
    }
    let urlquery = query;//获取？后的数据放置在页面中，调取搜索方法获取新数据（attrJson的数据）
//      切割掉后面的html
    for (let r in urlquery) {
        data.searchkey = {attr: "", value: ""};
        data.searchkey.attr = r;
        data.searchkey.value = urlquery[r];
        data.searchkeys.push(data.searchkey);
        data.searchmsg.searchJson = (JSON.stringify(data.searchkeys));
        data.dynamicTags.push(urlquery[r]);
    }
    if (data.searchmsg.selfsupport === "1") {
      data.self = true;
    }
    if (data.searchmsg.havestore === "1") {
      data.have = true;
    }
    if (data.searchmsg.forwardtime === "1") {
      data.time = true;
    }
  }
  ////      列表框点击的搜索
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
      if (xx !== "searchJson" && mysearchmsg[xx] !=="" && mysearchmsg[xx] && mysearchmsg[xx] !== null) {
        if(xx==='level3'){
          //转译标签中的'/'
          let aaa= mysearchmsg.level3.replace('/','%2F');
          mysearchmsg[xx]=aaa;
          myparam = myparam + "-" + xx + "_" + mysearchmsg[xx];
        }else if(xx==='cardnum'){
          //转译标签中的'#'
          let bbb= mysearchmsg.cardnum.replace('#','%23');
          mysearchmsg[xx]=bbb;
          myparam = myparam + "-" + xx + "_" + mysearchmsg[xx];
        }else{
          myparam =myparam + "-" + xx + "_" + mysearchmsg[xx];
        }
      }
    }
    let SearchURL="";
    if(mysearchkeys.length>0){
      for (var yy = 0; yy < mysearchkeys.length; yy++) {
//            //转译标签中的'#'
        myquery = myquery +"&"+ mysearchkeys[yy].attr + "=" + mysearchkeys[yy].value.replace('#','%23');
      }
      SearchURL = "/IndustrialProducts/search" + myparam+ "?" + myquery ;
    }else{
      SearchURL = "/IndustrialProducts/search" + myparam;
    }
    return SearchURL;
  }

  function SEOsearch(query, data) {
    let level1 = '不锈钢螺栓';
    let level2 = '';
    let level3 = '';
    let productname = '';
    let brand = '';
    let cardnum = '';
    let material = '';
    let jsonT ='';
    let attr = Object;
    let attrStr = '';
    if (data.searchmsg.level1) {
      level1 = data.searchmsg.level1
    }
    if (data.searchmsg.level2) {
      level2 = data.searchmsg.level2
    }
    if (data.searchmsg.level3) {
      level3 = data.searchmsg.level3
    }
    if (data.searchmsg.productname) {
      productname = data.searchmsg.productname
    }
    if (data.searchmsg.brand) {
      brand = data.searchmsg.brand
    }
    if (data.searchmsg.cardnum) {
      cardnum = data.searchmsg.cardnum
    }
    if (data.searchmsg.material) {
      material = data.searchmsg.material
    }
    if(data.searchmsg.searchJson.length>2){
      attr = JSON.parse(data.searchmsg.searchJson);
      for(let i = 0;i<attr.length;i++){
        attrStr = attrStr + attr[i].attr +attr[i].value +'_'
      }
      jsonT = attrStr
    }


    data.titleInfo = level1 + brand + material + cardnum + productname + level2 + level3 + jsonT + '批发_价格_供应商_生产厂家-紧商网';
    data.keywordsInfo = level1 + brand + material + cardnum + productname + level2 + level3 + jsonT  + '批发,' + level1 + brand + material + cardnum + productname + level2 + level3 + jsonT  + '价格,' + level1 + brand + material + cardnum + productname + level2 + level3 + jsonT  + '供应商,' + level1 + brand + material + cardnum + productname + level2 + level3 + jsonT  + '生产厂家';
    data.descriptionInfo = '紧商网提供最新' + level1 + brand + material + cardnum + productname + level2 + level3 + jsonT  + '批发、价格、供应商、生产厂家等相关信息，' + level1 + brand + material + cardnum + productname + level2 + level3 + jsonT  + '质量好，规格全，批发价格低，一件代发。买卖' + level1 + brand + material + cardnum + productname + level2 + level3 + jsonT  + '，就上紧商网'
  }

  function totalPrice(vue,price, num, intervalprice, discount,item) {//单价，数量，区间,远期折扣
    num = parseFloat(num);
    let rate = 100;
    if (intervalprice) {
      let range = JSON.parse(intervalprice);
      if (range.length > 0) {
        if (num <= range[0].start) {
          rate = 100;
        } else if (range[0].start < num && num <= range[0].end) {
          rate = range[0].rate;
        } else if (range[1].start < num && num <= range[1].end) {
          rate = range[1].rate;
        } else if (num > range[1].end) {
          rate = range[2].rate;
        }
      }
      range = [];
    }
    if (rate === "" || rate === undefined) {
      rate = 100;
    }
    let total_price = ((price * num * parseInt(rate) / 100) + 0.000001).toFixed(2);
    if (discount) {
      total_price = ((price * num * parseInt(rate) * discount / 100) + 0.000001).toFixed(2);
    }
    if(parseInt(item)>-1){
      vue.keywords_tbds[item].pagetypeStr= transPackagetype(vue.keywords_tbds[item].packages,num,vue.keywords_tbds[item].unit);
    }
    return total_price;
  }

  //包装方式转换
  function transPackagetype(type,num,unit){
    if(type&&num&&unit){
      let pagetypeStr = '';
      let first = '';
      let second = '';
      let third = '';
      let c_one = Math.floor(num/type[0].num);  //向上取整（盒）
      let c_two = 0;
      if(type[1]){
        c_two = Math.floor(c_one/type[1].num);  //向上取整（箱）
      }
      let l_one = Math.floor((num * 1000)%(type[0].num * 1000));  //余数（千）
      let l_two = 0;
      if(type[1]){
        l_two = c_one%type[1].num; //余数（盒）
      }
      if(type[2]){
        if(c_two>0){
          first = c_two +type[2].unit
        }
      }
      if(type[1]){
        if(type[1].num ===0){
          if(c_one){
            second = c_one + type[1].unit
          } else {
            second = ''
          }

        } else {
          if(c_one>0&&c_one<type[1].num){
            second = c_one + type[1].unit
          } else if(c_one >type[1].num){
            second = l_two + type[1].unit
          } else if(c_one === 0){
            second = ''
          }
        }
      }


      if(type[0].num===0){
        third = num + type[0].unit
      } else {
        if(num>0&&num<type[0].num){
          third = num + type[0].unit
        } else if(num>type[0].num){
          if(l_one===0){
            third =''
          } else {
            third = (l_one * 0.001).toFixed(3) + type[0].unit
          }

        }
      }

      pagetypeStr = first + second + third;
      //        console.log(pagetypeStr)
      return pagetypeStr
    } else {
      return ' '
    }
  }

  function singlePrice(price, num, intervalprice) {//计算单价
    num = parseFloat(num);
    let rate = 100;
    if (intervalprice) {
      let range = JSON.parse(intervalprice);
      if (range.length > 0) {
        if (num <= range[0].start) {
          rate = 100;
        } else if (range[0].start < num && num <= range[0].end) {
          rate = range[0].rate;
        } else if (range[1].start < num && num <= range[1].end) {
          rate = range[1].rate;
        } else if (num > range[1].end) {
          rate = range[2].rate;
        }
      }
      range = [];
    }
    if (rate === "" || rate === undefined) {
      rate = 100;
    }
    let single_price = deleteZero((price * parseInt(rate) / 100).toFixed(5));
    return single_price;
  }
  function depositPrice(vue, price, num, intervalprice) {
    num = parseFloat(num);
    let rate = 100;
    if (intervalprice) {
      let range = JSON.parse(intervalprice);
      if (range.length > 0) {
        if (num <= range[0].start) {
          rate = 100;
        } else if (range[0].start < num && num <= range[0].end) {
          rate = range[0].rate;
        } else if (range[1].start < num && num <= range[1].end) {
          rate = range[1].rate;
        } else if (num > range[1].end) {
          rate = range[2].rate;
        }
      }
      range = [];
    }
    if (rate === "" || rate === undefined) {
      rate = 100;
    }
//        console.log(this.depositRate);
    let deposit_price = (price * num * parseInt(rate) / 100);
    if (vue.depositRate) {
      deposit_price = (price * num * parseInt(rate) * vue.depositRate / 10000).toFixed(2);
    }
    return deposit_price;
  }
  function configData(data, indexs) {//更新数据
    let list = [];
    let id, selectIndex, productname, level3, mark, brand, brandpic, packagetype, prodprice, unit, pdstorenum,
      storeunit,minplus,
      storename, stand, material, cardnum, selfsupport,pagetypeStr,surfacetreatment,
      subtitle, startnum, memberid, pdno, storeid, pdpicture,
      marketprice, prices, intervalprice, packages, producttype, showprice;
    for (let i = 0; i < data.length; i++) {
      let d = data[i];
      id = d.id;
      // selectIndex = j;
      selfsupport = d.selfsupport;
      minplus=d.minplus;
      productname = d.productname;
      level3 = d.level3;
      stand = d.stand;
      material = d.material;
      surfacetreatment=d.surfacetreatment;
      cardnum = d.cardnum;
      mark = d.mark;
      brand = d.brand;
      brandpic = d.brandpic;
      packagetype = d.packagetype;
      prodprice = d.prodprice;
      unit = d.unit;
      pdstorenum = d.pdstorenum;
      storeunit = d.storeunit;
      storename = d.storename;
      subtitle = d.subtitle;
      startnum = d.startnum;
      marketprice = d.prices[0].price;
      prices = d.prices;
      intervalprice = d.intervalprice;
      packages = d.packages;
      memberid = d.memberid;
      pdno = d.pdno;
      storeid = d.storeid;
      pdpicture = d.pdpicture && d.pdpicture.length > 0 ? d.pdpicture[0] : "default/imgs/defaultProductImg.jpg";
      producttype = d.producttype === "紧固件" ? 1 : 2;
      showprice = d.showprice;
      pagetypeStr = transPackagetype(d.packages,d.startnum,d.unit);
      let item = {
        "id": id,
        "selectIndex": selectIndex,
        "productname": productname,
        "level3": level3,
        "selfsupport": selfsupport,
        "stand": stand,
        "material": material,
        "surfacetreatment":surfacetreatment,
        "cardnum": cardnum,
        "mark": mark,
        "brand": brand,
        "brandpic": brandpic,
        "packagetype": packagetype,
        "prodprice": prodprice,
        "unit": unit,
        "pdstorenum": pdstorenum,
        "storeunit": storeunit,
        "storename": storename,
        "subtitle": subtitle,
        "startnum": startnum,
        "num": startnum,
        "intervalprice": intervalprice,
        "packages": packages,
        "packageChild": packages[0],
        "preUnit": packages[0].unit,
        "time": prices[0],
        "marketprice": singlePrice(marketprice, startnum, intervalprice),//单价prices[0].price
        "prices": prices,
        "startPrice": marketprice,//prices[0].price
        "totalPrice": totalPrice(data,marketprice, startnum, intervalprice),
        "deposit": depositPrice(data, marketprice, startnum, intervalprice),
        "memberid": memberid,
        "pdno": pdno,
        "storeid": storeid,
        "pdpicture": pdpicture,
        "producttype": producttype,
        "showprice": showprice,
        "paytype": 0,
        "pagetypeStr":pagetypeStr,
        "minplus":minplus
      };
      list.push(item);
    }
    return list;
  }
  function deleteZero(number) {
    let first = number.toString().split(".")[0];
    let second = number.toString().split(".")[1];
    let newNumber = "";
    let arr = [];
    // 删除0
    for (let i = second.length - 1; i > -1; i--) {
      if (second[i] === 0) {
      } else {
        arr.push(second[i]);
      }
    }
    arr.reverse();
    if (arr.length > 0) {
      newNumber = first + "." + arr.join('');
    } else {
      newNumber = first;
    }
    newNumber = parseFloat(newNumber);
    return newNumber;
  }
</script>
<style scoped>
  .unchecked {
    min-width: 80px;
    height: 26px;
    border: 1px solid #666;
    color: #666;
  }

  .checked {
    border: 1px solid #e8000e;
    color: #e8000e;
    background: none;
  }

  /*页码的编辑*/
  .goodslist .el-pagination {
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

  /**/
  .keywords_content_list table tr {
    overflow: hidden;
    border-bottom: solid 1px #d9d9d9;
  }

  .keywords_content_list table tr:last-child {
    border-bottom: none;
  }

  .keywords_list_two {
    line-height: 36px;
    display: flex;
    flex-wrap: wrap;
    width: 960px;
    overflow: hidden;
    padding: 0 20px;
    color: #424242;
  }

  .beforeheight {
    height: 36px;
  }

  .afterheight {
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

  .keywords_content_tbd {
    width: 100%;
    position: relative;
    border: solid 1px #d9d9d9;
  }

  /*商品排序*/
  .keywords_content2 {
    overflow: hidden;
    margin: 15px 0;
    background-color: #fff;
  }

  .keywords_content2_ul {
    overflow: hidden;
    padding: 7px 0;
    margin-left: 18px;
  }

  .keywords_content2_ul li {
    float: left;
    margin: 0 12px;
    height: 26px;
    line-height: 26px;
  }

  .keywords_content2_ul li input {
    vertical-align: middle;
    margin: 0 5px;
  }

  .keywords_content2_ul li:first-child {
    width: 54px;
    text-align: center;
    color: #fff;
    border: 1px solid #d9d9d9;
    cursor: pointer;
  }

  .keywords_content2_ul li img {
    float: right;
    margin-top: 7px;
    margin-right: 7px;
  }

  .keywords_shopcar {
    padding: 10px 0;
    cursor: pointer;
  }

  .keywords_shopcar span {
    color: #424242;
    margin: 0 10px 0 5px;
  }

  .keywords_content2_title {
    background-color: #f0f0f0;
    overflow: hidden;
    border: 1px solid #d9d9d9;
    border-bottom: none;
  }

  /*第二个表格*/
  .keywords_content_tbd2 {
    text-align: center;
    border: 1px solid #d9d9d9;
  }

  .keywords_content_tbd2 thead th {
    text-align: center;
  }

  .keywords_content_tbd2 thead th:first-child {
    text-align: left;
  }

  .keywords_content_tbd2 thead {
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid #d9d9d9;
  }

  .keywords_content_tbd2 tbody tr td {
    font-weight: normal;
  }

  .keywords_content_tbd2 thead th input {
    vertical-align: middle;
    margin: 0 9px 0 20px;
  }

  .checkimg {
    width: 64px;
    height: 64px;
    background-color: #e8000e;
    float: left;
    cursor: pointer
  }

  .keywords_content_tbd2 tbody tr td input {
    float: left;
    margin: 28px 9px 0 20px;
  }

  .keywords_tbd2_two {
    width: 130px;
    text-align: left;
  }

  .check_logoimg {
    width: 30px;
    height: 20px;
    margin: 0 auto;
  }

  .check_logoimg > img {
    width: 30px;
    height: 20px;
  }

  /*数量加减*/
  .num_decreae {
    width: 14px;
    height: 26px;
    background-color: #f0f0f0;
    border: solid 1px #d9d9d9;
    line-height: 26px;
    cursor: pointer;
  }

  .num_increas {
    width: 14px;
    height: 26px;
    background-color: #f0f0f0;
    border: solid 1px #d9d9d9;
    line-height: 26px;
    cursor: pointer;
  }

  .keywords_content_tbd2 tbody tr td input.num_input {
    width: 41px;
    height: 26px;
    background-color: #ffffff;
    border: solid 1px #d9d9d9;
    margin: 0;
    border-left: none;
    border-right: none;
    padding-left: 5px;
  }

  .keywords_content_tbd2 tbody tr {
    border-bottom: 1px solid #d9d9d9;
  }

  .keywords_content_tbd2 tbody tr:last-child {
    border-bottom: none;
  }

  .num_danwei {
    height: 26px;
    vertical-align: top;
  }

  .keywords_tbd2_nine {
    min-width: 80px;
  }

  .keywords_tbd2_one {
    padding-bottom: 14px;
    padding-top: 20px;
    width: 120px;
  }

  .el-pager li {
    width: auto;
    border: none;
  }

  nav {
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 30px;
    overflow: hidden;
  }

  .active {
    border-bottom: 0;
  }

  .red_button {
    padding: 3px 5px;
    background: none;
    border: 1px solid #e8000e;
    color: #e8000e;
  }
</style>
