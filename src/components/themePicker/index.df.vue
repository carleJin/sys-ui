<template>
    <el-color-picker
        popper-class="theme-picker-dropdown"
        v-model="theme"
        size="small"
        :predefine="predefineColors">
    </el-color-picker>
</template>

<script>
import variables from '@/assets/styles/element-variables.scss';
const ORIGINAL_THEME = variables.theme;//本地初始主题色
const ONLINE_THEME = "#409EFF";//线上获取cssString主题色
const version = require('element-ui/package.json').version;

export default {
    data() {
        return {
            // theme: ONLINE_THEME,
            theme: localStorage.getItem('theme-color') || ORIGINAL_THEME,
            chalk: '',
            predefineColors: [
                '#025472',
                '#C71585',
                '#FF7800',
                '#90EE90',
                '#00CED1',
                '#1E90FF',
                '#001F3F',
                '#0074D9',
                '#7FDBFF',
                '#39CCCC',
                '#3D9970',
                '#2ECC40',
                '#01FF70',
                '#FFDC00',
                '#FF851B',
                '#FF4136',
                '#85144B',
                '#F012BE',
                '#B10DC9',
                '#111111',
                '#AAAAAA',
                '#DDDDDD'
            ]
        }
    },
    watch: {
        theme(val, oldVal) {
            if (typeof val !== 'string') return;
            this.$store.dispatch('changeSettings', {key: 'theme', value: val}).then(() => {
                localStorage.setItem('theme-color', val)
            });
            
            const themeCluster = this.getThemeCluster(val.replace('#', ''));
            const originalCluster = this.getThemeCluster(oldVal.replace('#', ''));
            
            const getHandler = (variable, id) => {
                return () => {
                    const originalCluster = this.getThemeCluster(ONLINE_THEME.replace('#', ''));
                    let newStyle = this.updateStyle(this[variable], originalCluster, themeCluster);
                    let styleTag = document.getElementById(id);
                    if (!styleTag) {
                        styleTag = document.createElement('style');
                        styleTag.setAttribute('id', id);
                        document.head.appendChild(styleTag);
                    }
                    styleTag.innerText = newStyle;
                };
            };

            const chalkHandler = getHandler('chalk', 'chalk-style');

            if (!this.chalk) {
                const url = `https://unpkg.com/element-ui@${ version }/lib/theme-chalk/index.css`;
                this.getCSSString(url, chalkHandler, 'chalk');
            } else {
                chalkHandler();
            }

            const styles = [].slice.call(document.querySelectorAll('style'))
            .filter(style => {
                const text = style.innerText;
                return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text);
            });

            styles.forEach(style => {
                const { innerText } = style;
                if (typeof innerText !== 'string') return;
                style.innerText = this.updateStyle(innerText, originalCluster, themeCluster);
            });
        }
    },
    methods: {
        updateStyle(style, oldCluster, newCluster) {
            let newStyle = style;
            oldCluster.forEach((color, index) => {
                newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index]);
            });
            return newStyle;
        },
        getCSSString(url, callback, variable) {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '');
                    callback();
                }
            };
            xhr.open('GET', url);
            xhr.send();
        },
        getThemeCluster(theme) {
            const tintColor = (color, tint) => {
                let red = parseInt(color.slice(0, 2), 16);
                let green = parseInt(color.slice(2, 4), 16);
                let blue = parseInt(color.slice(4, 6), 16);
                if (tint === 0) { // when primary color is in its rgb space
                    return [red, green, blue].join(',');
                } else {
                    red += Math.round(tint * (255 - red));
                    green += Math.round(tint * (255 - green));
                    blue += Math.round(tint * (255 - blue));
                    red = red.toString(16);
                    green = green.toString(16);
                    blue = blue.toString(16);
                    return `#${ red }${ green }${ blue }`;
                }
            };
            const shadeColor = (color, shade) => {
                let red = parseInt(color.slice(0, 2), 16);
                let green = parseInt(color.slice(2, 4), 16);
                let blue = parseInt(color.slice(4, 6), 16);
                red = Math.round((1 - shade) * red);
                green = Math.round((1 - shade) * green);
                blue = Math.round((1 - shade) * blue);
                red = red.toString(16);
                green = green.toString(16);
                blue = blue.toString(16);
                return `#${ red }${ green }${ blue }`;
            };
            const clusters = [theme];
            for (let i = 0; i <= 9; i++) {
                clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
            }
            clusters.push(shadeColor(theme, 0.1));
            return clusters;
        }
    }
}
</script>

<style>
.theme-picker-dropdown .el-color-dropdown__btns .el-color-dropdown__link-btn{
    display: none;
}
</style>