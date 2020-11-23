//动态加载 font 文件夹下的 iconfont.css 文件，省去手动引入。
const all = require.context('./font', true, /iconfont\.css$/ );

all.keys().forEach(path => {
    path = path.replace('./', './font/')
    import(`${path}`)
})
