
import Vue from 'vue'

import {
  Select, Pagination,
  Option,Rate,Tag,Message,Button,Loading,
  InputNumber,Radio,RadioGroup,RadioButton,Dialog,Form,Input,FormItem
} from 'element-ui'
Vue.prototype.$message = Message;//消息弹框（不要加vue.use(message),否则会报错）
Vue.use(Select);
Vue.use(Pagination);//分页
Vue.use(Option);
Vue.use(Rate);//评分
Vue.use(Tag);//标签
Vue.use(Button);//按钮
Vue.use(InputNumber);//计数器
Vue.use(Radio);//单选框
Vue.use(RadioGroup);//单选框组
Vue.use(RadioButton);//单选框组
Vue.use(Dialog);//弹出框
Vue.use(Form);//表单
Vue.use(Input);//输入框
Vue.use(FormItem) //表单元素
Vue.use(Loading)//数据加载效果

import http from './http';
import utils from './common';
// hot后 Cannot redefine property: $http
// if(Vue.$http===undefined) Vue.use(http);
Vue.prototype.$http = http
Vue.prototype.$utils = utils
// Vue.use(utils);
import oss from './oss';
Vue.prototype.$oss = oss
// Vue.use(oss);

if (process.browser) {
  // 浏览器时才加载
  const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
  Vue.use(VueAwesomeSwiper)
}


// todo
import '../assets/css/common.css';
import '../assets/css/commonality.css';
import '../assets/css/head.css';
import '../assets/css/fonts/iconfont.css';
import '../assets/css/style.css';
import '../assets/css/lrtk0.css';
// import 'swiper/dist/css/swiper.css'
import '../assets/css/city.css';
