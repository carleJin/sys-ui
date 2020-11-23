
//elemnet-ui 语言包
import elEnLocale from 'element-ui/lib/locale/lang/en';
import elZhCNLocale from 'element-ui/lib/locale/lang/zh-CN';

//本地语言包
import zhCN from '@/lang/zh-CN';
import en from '@/lang/en';

export const langs = [
    {
        label: '中文',
        value: 'zhCN'
    },{
        label: 'English',
        value: 'en'
    }
];

const i18nMessages = {
    zhCN: {
        ...zhCN,
        ...elZhCNLocale
    },
    en: {
        ...en,
        ...elEnLocale
    }
}

export default i18nMessages