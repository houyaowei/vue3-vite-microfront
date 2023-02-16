import { createApp } from 'vue'
import { createRouter,createWebHistory} from "vue-router"
import { createPinia } from 'pinia'
import App from './App.vue'
import routes from './router'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import subAppStore from "./app-store"


/**
 * @name 导出微应用生命周期
 */
let router = null;
let history = null
let app = null;
//vue的通用render方法
const render = ({ routerBase,container } = {}) => {
  console.log("render fun")
  app = createApp(App)
  app.use(createPinia())
  const base = qiankunWindow.__POWERED_BY_QIANKUN__ ? routerBase : '/';
  history = createWebHistory(base);

  router = createRouter({
    history,
    routes,
  });
  app.use(router)
  app.mount('#app')
  if( qiankunWindow.__POWERED_BY_QIANKUN__ ) {
    console.log("load in qiankun environment ")
  }
};

 renderWithQiankun({
    mount(props) {
      console.log("app1 mount， props are:", props);
      
      subAppStore(props)
      render(props);
    },
    bootstrap() {
      console.log('bootstrap');
    },
    unmount(props) {
        console.log("app1 unmounted");
        app.unmount();
        app._container.innerHTML = '';
        history.destroy();
        router = null;
        history = null;
        app = null;
    },
  });
 /**
 * @name 单独环境直接实例化vue
 */

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    render();
}