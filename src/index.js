
import axueditor from './components/axueditor'



const install = function (vue, opts = {}) {

    vue.component(axueditor.name, axueditor);
}

const API = {
    install,
    axueditor,




};
module.exports.default = module.exports = API;



