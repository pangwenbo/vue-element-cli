import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
import axios from '@/utils/axiosInterceptors' //axios请求拦截
import Viewer from 'v-viewer'//预览
import 'viewerjs/dist/viewer.css'//预览
import VueParticles from 'vue-particles'//粒子
import UEditor from 'vue-ueditor-wrap' //引入百度编辑器
import '@/permission' // 权限中心
import '@/utils/httpIntercept' //请求拦截
import vHas from '@/utils/vue-directives/v-has.js' //按钮权限指令js
import vNumberInput from '@/utils/vue-directives/v-number-input.js' //按钮权限指令js
import { listPermission } from '@/utils/listPermission'
import "./assets/icon/iconfont.css"
import {
        MessageBox, Message, Loading, Notification,
        Tag, Switch, ColorPicker, Pagination, Dialog, Autocomplete, Dropdown,
        DropdownMenu, DropdownItem, Menu, Submenu, MenuItem, MenuItemGroup,
        Input, InputNumber, Radio, RadioGroup, RadioButton, Checkbox, CheckboxButton,
        CheckboxGroup, Select, Option, OptionGroup, Button, ButtonGroup, Table, TableColumn,
        DatePicker, Form, FormItem, Row, Col, Upload, Cascader, Container, Header, Aside, Main,
        Icon, Tooltip, Breadcrumb, BreadcrumbItem, Footer, Tree, Transfer, Progress, Card, Tabs,
        TabPane, Drawer, Popover
} from 'element-ui'
Vue.use(Viewer)
Vue.use(VueParticles)
//注册自定义指令
Vue.use(vHas) //注册按钮权限
Vue.use(vNumberInput) //数字输入框
Vue.component('u-editor', UEditor)
Vue.use(Tabs).use(Loading.directive).use(Popover).use(TabPane).use(Pagination).use(Drawer)
        .use(Tag).use(Switch).use(ColorPicker).use(Dialog).use(Autocomplete).use(Dropdown)
        .use(DropdownMenu).use(DropdownItem).use(Menu).use(Submenu).use(MenuItem)
        .use(MenuItemGroup).use(Input).use(InputNumber).use(Radio).use(RadioGroup).use(RadioButton)
        .use(Checkbox).use(CheckboxButton).use(CheckboxGroup).use(Select).use(Option).use(OptionGroup)
        .use(Button).use(ButtonGroup).use(Table).use(TableColumn).use(DatePicker).use(Form).use(FormItem)
        .use(Row).use(Col).use(Upload).use(Cascader).use(Container).use(Header).use(Aside).use(Main)
        .use(Tooltip).use(Breadcrumb).use(BreadcrumbItem).use(Icon).use(Footer).use(Tree).use(Transfer)
        .use(Progress).use(Card)
Vue.prototype.$ELEMENT = {
        size: localStorage.getItem("size") || 'mini',
};
Vue.prototype.$listPermission = listPermission
Vue.prototype.$echarts = echarts
//axios请请求
Vue.prototype.$axios = axios
//element提示框
let messageInstance = null;
let mainMessage = function DoneMessage(options) {
        //如果弹窗已存在先关闭
        if (messageInstance) {
                messageInstance.close();
        }
        messageInstance = Message(options);
}
let arr = ['success', 'warning', 'info', 'error'];
arr.forEach(function (type) {
        mainMessage[type] = function (options) {
                if (typeof options === 'string') {
                        options = {
                                message: options
                        };
                }
                options.type = type;
                return mainMessage(options);
        };
});
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = mainMessage;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$notify = Notification;

Vue.prototype.$uploadUrl = 'http://upload-z0.qiniup.com' //上传七牛图片接口url（element-ui action的值）
Vue.prototype.$previewQiniuFile = 'http://py696gbma.bkt.clouddn.com/' //访问上传到七牛的文件的 基础地址
Vue.prototype.$menuSys = 'admin' //全局系统标识
Vue.prototype.$apiUrl = 'http://222.143.52.119/sys' //全局系统标识
window.store = store;
var env = process.env.NODE_ENV
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
        mockXHR()
}


Vue.config.productionTip = false
new Vue({
        router,
        store,
        render: h => h(App)
}).$mount('#app')