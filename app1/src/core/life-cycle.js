import { createApp } from 'vue'
import { createRouter,createWebHistory} from "vue-router"
import { createPinia } from 'pinia'
import App from '../App.vue'
import routers from '../router'
import '../assets/main.css'

const app = createApp(App)
app.use(createPinia())

//注册子应用通信
import subAppStore  from "./sub-app-store";

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
      console.log("app2 mount")
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
  history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/app1' : '/');
  router = createRouter({
    history,
    routes,
  });
  app.use(router)
  app.mount('#app')
};

export { lifeCycle, render };
