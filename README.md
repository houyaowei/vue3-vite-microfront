# vue3-vite-microfront
基于qiankun的微前端，基座和子应用技术栈保持一致(vue3+vite)
portal 为基座
app1和app2为子应用

### 应用启动

```javascript

yarn install 
yarn dev

```


## 部署nginx测试

#### 目录文件：(推荐)portal, app1和 app2同级部署，此项不加限制。同级目录更新包的时候方便。

#### 本实例采用了history模式

#### nginx映射配置，

> /portal ->映射到portal文件目录
> /app1 ->映射到app1文件目录
> /app2 ->映射到app2文件目录

#### 注意
在vite中的base需要和nginx的映射保持一致