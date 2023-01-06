import Vue from 'vue';
import VueRouter from 'vue-router';
import App from "@/App.vue";
import store from "@/store";
import routers from '@/router'
//注册子应用通信
import subAppStore  from "./sub-app-store";

Vue.config.productionTip = false;
Vue.use(VueRouter)


let router = null;
let instance = null;
/**
 * @name 注入声明周期函数
 */
 const lifeCycle = () => {
  return {
    async bootstrap(props) {
      console.log('app1 props:', props)
    },
    async mount(props) {
      // 注册store
      subAppStore(props)
      // 注册微应用实例化函数
      render(props);
    },
    async unmount() {
      instance.$destroy?.();
      instance = null;
      router = null;
    },
    async update(props) {
      console.log("update props", props);
    }
  };
};

/**
 * @name 子应用实例化
 *
 */
const render = ({ routes, routerBase, container } = {}) => {
  console.log('app1 render,routerBase:',routerBase, 'routes:', routes)
  // Vue.config.productionTip = false;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/' + routerBase +'/' : '/',
    mode: 'history',
    routes: routers
  });
  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');

};

export { lifeCycle, render };
