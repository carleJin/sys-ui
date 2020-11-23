import Vue from "vue";
import Vuex from "vuex";
import getters from './getter';

Vue.use(Vuex);

let modules = {};

const modulesFiles = require.context('./modules', false, /\.js$/ );

modulesFiles.keys().forEach(key => { 
    const file = modulesFiles(key).default;
    if(file) {
        const moduleName = key.replace(/^\.\/(.*)\.\w+$/, '$1');
        modules[moduleName]  = file;
    }
})
export default new Vuex.Store({
    modules,
    getters
});
