/**
 * global store
 * 子应用通过在mount声明周期方法中的props获得
 */
import { useCounterStore } from '../stores/counter'
import { initGlobalState } from 'qiankun'
const store = useCounterStore()

const setGlobalState = {}

const appStore = ()=>{
    let state = {
        data: '',
        token: '',
        appsRefresh: false,
    }
    const { onGlobalStateChange, setGlobalState } = initGlobalState(state);
    //监听数据变化
    onGlobalStateChange((value, prev) => {
        console.log('全局state发生变化,前一个值：',prev,',当前值:', value)
        if ('data' in value ){
            // store.dispatch('appstore/setData',value.data)
        }
        if('token' in value){
            // store.dispatch('app/setToken',value.token)
        }
    });
    //设置全局状态，参数自定义
    setGlobalState({
        from: 'portal',
        user: {
            name: 'admin',
        }
    });
    setGlobalState = setGlobalState
}
export {
    appStore,
    setGlobalState
} ;
