### 方便调用的小工具
### 使用方式
`npm install dqplugin --save`

--------

### dateFormat
#### 将日期格式化的插件
```js
    const dateStr = dqPlugin.dateFormat(new Date(), "yyyy-MM-dd");
```
--------

### regExp
#### 常用的正则表达式
```js
    if (!dqPlugin.regExp.mobile.test('15545457878')) {
        console.log('手机号码不正确')
    }
```
--------

### getBrowserType
#### 常用浏览器类型判断
```js
    brType = dqPlugin.getBrowserType();
    if ( !brType.mobile ) {
        console.log('PC端')
    }
```
--------

### exportExcel
#### 导入导出excel
```js
    // 导出
    dqPlugin.exportExcel(list,'订单.xlsx')

    // 导入
    dqPlugin.readXlsxFile(file).then(workbook => {
        let sheet = workbook.Sheets[workbook.SheetNames[0]]
        for ( let key in sheet ) {
            sheet[key].v ? console.log(sheet[key].v) : null
        }
    })
```
--------

### remLayout
#### 移动端等比例缩放布局,1rem:100px比例,参数为设计稿宽度,默认750
```js
    dqPlugin.remLayout()
```
如果你根本就没有设计稿，则默认750的设计稿，项目内应该这么改：
15px -> 0.3rem
24px -> 0.48rem
--------

### 常用网址
#### POST请求地址
```  
    https://httpbin.org/post
```
#### 必应背景图片地址
```  
    https://api.dujin.org/bing/1920.php // css中使用 固定url获取每日图片
    http://cdn.mrabit.com/1920.2020-11-02.jpg // JS中使用 可变使用时期
    https://api.bingdou.net/pic/bing/ // 每次随机图片 刷新即变
```
#### 图片占位符生成地址
```  
    https://fakeimg.pl/166x188/4164ff/00a4ff/
```
--------

## 本项目编译过程
```
babel index.js --out-dir lib
```
