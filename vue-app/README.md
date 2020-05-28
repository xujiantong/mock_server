# vue-app

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).




### 自适应处理
vue.config.js
```javascript
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');


css: {
    loaderOptions: {
        postcss: {
            plugins: [
                autoprefixer(),
                pxtorem({
                    rootValue: 192,
                    propList: ['*'],
                    unitPrecision: 5,
                    // exclude: /(node_module)/,
                    mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
                    minPixelValue: 0 //设置要替换的最小像素值(3px会被转rem)。 默认 0
                })
            ]
        }
    }
}
```
main.js
```javascript
import 'amfe-flexible';
```