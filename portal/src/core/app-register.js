/**
 * 注册应用
 */
//子应用挂载点,子应用会挂载到这个DOM节点上
const appContainer = "#sub-app-viewport";

import {
    start,
    registerMicroApps,
    setDefaultMountApp,
    runAfterFirstMounted,
    initGlobalState
} from 'qiankun'
import { config } from '../../config/config'
// import { appStore } from './app-store'
import actions from "./shareActions"

// 主应用渲染函数
let app = null;
// 默认app，只能有一个，如果设置了多个只取第一个
let defaultApp = null
//需要传递给子应用
const msg = {}

function registerApps(){
    const apps = config && config.map(i => {
        return {
            name: i.name,
            entry: i.url,
            container: appContainer,
            activeRule: i.name,
            props: {
                routerBase: i.name
            }
        }
    })

    const _defaultApps = config.filter(item => item.defaultLoad == true)
    defaultApp = _defaultApps.length > 0 ? _defaultApps[0].name: null
    console.log('apps: ',apps)
    registerMicroApps(apps, {
        beforeLoad: [
            async app => {
                console.log("main before load", app);
            }
        ],
        beforeMount: [
            async app => {
                console.log("main before mount", app);
            }
        ],
        afterUnmount: [
            async app => {
                console.log("main after unload", app);
            }
        ]
    })
    //设置默认应用
    if (defaultApp) {
        setDefaultMountApp(defaultApp + '/')
    }
    //启动应用
    start({ prefetch: true });
    //启用消息通信
    appStore()

    runAfterFirstMounted((app) => {
        console.log('runAfterFirstMounted:', app)
    });
}
export default registerApps
