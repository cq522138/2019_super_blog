
require('./bootstrap');
window.Vue = require('vue');
//trinh soan thao van ban
import 'v-markdown-editor/dist/index.css';
import Editor from 'v-markdown-editor'
// global register
Vue.use(Editor);

//ho tro vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import storeData from "./store/index"
const store = new Vuex.Store (
    storeData
)
//support moment js
import {filter} from './filter'
//vue router
import VueRouter from 'vue-router'

Vue.use(VueRouter)



Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('admin-main',require('./components/admin/AdminMaster.vue').default);

//v-form

import { Form, HasError, AlertError } from 'vform'
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
window.Form = Form;
//sweet alert(hien ra 1 box)
import Swal from 'sweetalert2'
window.swal = Swal;
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

window.Toast = Toast

import {routes} from './routes'



const router = new VueRouter({
    routes,
    mode : 'hash'
})


const app = new Vue({
    el: '#app',
    router,
    store
});
