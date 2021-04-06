### 方便调用的小工具
--------

### dateFormat
#### 将日期格式化的插件，由Date类型的对象调用
```  
    const dateStr = dqPlugin.dateFormat(new Date(), "yyyy-MM-dd");
```
--------

### regExp
#### 常用的正则表达式
```  
    if (!dqPlugin.regExp.mobile.test('15545457878')) {
        console.log('手机号码不正确')
    }
```
--------

### getBrowserType
#### 常用浏览器类型判断
```  
    brType = dqPlugin.getBrowserType();
    if ( !brType.mobile ) {
        console.log('PC端')
    }
```
--------

### exportExcel
#### 导入导出excel
```  
    // 导出
    dqPlugin.exportExcel(list,'订单.xlsx')

    // 导入
    readXlsxFile(file, readFile)
```
--------

### remLayout
#### 移动端等比例缩放布局,1rem:100px比例,参数为设计稿宽度,默认750
```  
    dqPlugin.remLayout()
```
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

编译过程
```  
babel index.js --out-dir lib
```
