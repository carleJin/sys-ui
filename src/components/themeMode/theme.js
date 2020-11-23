import theme from '@/assets/styles/theme-color.less';

export const themeGroup = [
    {
        label: '暗色',
        value: 'dark',
        color: theme.themeDark
    },{
        label: '明亮',
        value: 'bright',
        color: theme.themeBright
    },{
        label: '蓝色',
        value: 'blue',
        color: theme.themeBlue
    }
];

export const asideGroup = [
    {
        label: '左侧滚动',
        value: 'left'
    },{
        label: '左侧固定',
        value: 'left-fixed'
    }
];

export const headerGroup = [
    {
        label: '顶部滚动',
        value: 'top'
    },{
        label: '顶部固定',
        value: 'top-fixed'
    }
];