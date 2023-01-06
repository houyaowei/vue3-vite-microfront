import { createApp } from 'vue'
import { createRouter,createWebHistory} from "vue-router"
import { createPinia } from 'pinia'
import App from './App.vue'
import routes from './router'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

const app = createApp(App)
app.use(createPinia())

/**
 * @name 导出微应用生命周期
 */
let router = null;
let history = null

//vue的通用render方法
const render = ({ routerBase } = {}) => {
  console.log("render fun")
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
    },
  });
 /**
 * @name 单独环境直接实例化vue
 */

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    render();
}