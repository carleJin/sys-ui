import Vue from 'vue';

import SvgIcon from './svgIcon/index.vue';
import IconFont from './iconFont/index.vue';
import Popup from './popup/index.vue';

const components = [
    SvgIcon,
    IconFont,
    Popup
]

const install = (vue) => {
    components.forEach(component => {
        vue.component(component.name, component)
    })
}

install(Vue)