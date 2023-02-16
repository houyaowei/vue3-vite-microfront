import { createApp } from 'vue'
import { createRouter,createWebHistory} from "vue-router"
import { createPinia } from 'pinia'
import App from './App.vue'
import routes from './router'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import pkg from "../package.json"


let router = null;
let history = null;
let app = null;
const render = ({routerBase } = {}) => {
    console.log("window.__POWERED_BY_QIANKUN__:",qiankunWindow.__POWERED_BY_QIANKUN__)
    app = createApp(App)
    app.use(createPinia())
    const base = qiankunWindow.__POWERED_BY_QIANKUN__ ? '/' + pkg.name + '/' : '/';
    history = createWebHistory(base);
    router = createRouter({
      history,
      routes,
    });
    app.use(router)
    app.mount('#app')
  };
 renderWithQiankun({
    mount(props) {
      console.log("app2 mount");
      render(props);
    },
    bootstrap() {
      console.log('bootstrap');
    },
    unmount(props) {
      console.log("app2 unmount");
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