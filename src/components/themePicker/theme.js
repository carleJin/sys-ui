import variables from '@/assets/styles/element-variables.scss';
const ORIGINAL_THEME = variables.theme;//本地初始主题色
const ONLINE_THEME = "#409EFF";//线上获取cssString主题色
const version = require('element-ui/package.json').version;

export default class elementTheme {
    constructor() {
        this.url = `https://unpkg.com/element-ui@${ version }/lib/theme-chalk/index.css`;
        this.chalk = '';
        this.myTheme = ORIGINAL_THEME;
    }

    init = (color) => {
        if(color === this.myTheme) return;
        this.myTheme = color;
        if(!this.myTheme) return;

        const themeCluster = this.getThemeCluster(this.myTheme.replace('#', ''));
        const originalCluster = this.getThemeCluster(ONLINE_THEME.replace('#', ''));

        const chalkHandler = this.getHandler('chalk', 'chalk-style', originalCluster, themeCluster);

        if (!this.chalk) {
            this.getCSSString(this.url, chalkHandler, 'chalk');
        } else {
            chalkHandler();
        }

        const styles = [].slice.call(document.querySelectorAll('style'))
        .filter(style => {
            const text = style.innerText;
            return new RegExp(ONLINE_THEME, 'i').test(text) && !/Chalk Variables/.test(text);
        });

        styles.forEach(style => {
            const { innerText } = style;
            if (typeof innerText !== 'string') return;
            style.innerText = this.updateStyle(innerText, originalCluster, themeCluster);
        });
    };

    getHandler = (variable, id, originalCluster, themeCluster) => {
        return () => {
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

    getCSSString = (url, callback, variable) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '');
                callback();
            }
        };
        xhr.open('GET', url);
        xhr.send();
    };

    updateStyle = (style, oldCluster, newCluster) => {
        let newStyle = style;
        oldCluster.forEach((color, index) => {
            newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index]);
        });
        return newStyle;
    };

    getThemeCluster = (theme) => {
        const clusters = [theme];
        for (let i = 0; i <= 9; i++) {
            clusters.push(this.tintColor(theme, Number((i / 10).toFixed(2))));
        }
        clusters.push(this.shadeColor(theme, 0.1));
        return clusters;
    };

    tintColor = (color, tint) => {
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

    shadeColor = (color, shade) => {
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
}