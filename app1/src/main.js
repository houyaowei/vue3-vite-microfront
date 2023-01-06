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
//  const { bootstrap, mount, unmount } = lifeCycle();
//  export { bootstrap, mount, unmount };
let router = null;
const render = ({container } = {}) => {
    console.log("window.__POWERED_BY_QIANKUN__:",qiankunWindow.__POWERED_BY_QIANKUN__)
    const base = qiankunWindow.__POWERED_BY_QIANKUN__ ? '/app1' : '/';
    router = createRouter({
      history:createWebHistory(base),
      routes,
    });
    app.use(router)
    app.mount('#app')
  };
 renderWithQiankun({
    mount(props) {
        console.log("vite app mount");
        render(props);
    },
    bootstrap() {
      console.log('bootstrap');
    },
    unmount(props) {
        console.log("vite被卸载了");
        app.unmount();
        a[[]]._container.innerHTML = '';
        history.destroy();
    },
  });
 /**
 * @name 单独环境直接实例化vue
 */

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    render();
}