import { initGlobalState } from "qiankun";

let state = {
    data: '',
    token: '',
    appsRefresh: false,
}
const actions = initGlobalState(state);

export default actions;