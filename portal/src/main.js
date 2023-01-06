
window.Vue2 = window.Vue; 
delete window.Vue

import "../src/core/render"
//子应用配置，注册和启动
import registerApps from "./core/app-register";
registerApps()

