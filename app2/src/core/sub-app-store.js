/**
 * 子应用消息通信
 * @param props
 */
import { useCounterStore } from '../stores/counter'

//保存qiankun setGlobalState方法的引用，供应用调用
let _qiankunGlobalStateRef = {}
const subAppStore = (props) => {
    const store = useCounterStore()
    props.onGlobalStateChange((state, prev) => {
        console.log('子应用app1通信')
        if('data' in state) {
            store.dispatch('appstore/setData', state)
        }
        console.log(state, prev);
    });
    _qiankunGlobalStateRef['setGlobalState'] = props.setGlobalState
    props.setGlobalState({
        from: props.name,
        data: `来自${props.name}动态设定的消息`,
    });
}
const setState = (data) => {
    //TODO,增加data为Object的判断
    _qiankunGlobalStateRef.setGlobalState({
        form: 'app1',
        ...data
    })
}
export {
    setState
}
export default subAppStore
