import axueditor from './axueditor'

axueditor.install = Vue => Vue.component(axueditor.name,axueditor);

if(typeof window !== 'undefined' && window.Vue){
    window.Vue.use(axueditor);
}

export default axueditor
