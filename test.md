test脚本改成jest

- `babel.config.js`
测试环境为node.js，不支持es6语法，要配置babel，将es6转成es5
``` javascript
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ]
  ],
  plugins: ["transform-es2015-modules-commonjs"]
};
```