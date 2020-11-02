### 各种插件
--------

### format-date
#### 将日期格式化的插件，由Date类型的对象调用
```  
    var date1 = new Date("sth").format("yyyy-MM-dd");
```
#### 其他参数请参阅[详情页](https://github.com/dq77/plug-in/tree/master/format-date)
--------

### regExp
#### 常用的正则表达式
```  
    if (regExpConfig.mobile.test('15545457878')) {
      console.log('手机号码不正确')
    }
```
--------

### 浏览器类型
#### 常用浏览器类型判断
```  
    brType = getBrowserType();
    if ( !brType.mobile ) {
        console.log('PC端')
    }
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

### 导入导出Excel
#### 基于xlsx.js
```  
    // 导出
    exportExcel(json,'订单.xlsx')

    // 导入
    readWorkbookFromLocalFile( file, this.readFile )
```
#### 使用方法请参阅[详情页](https://github.com/dq77/plug-in/tree/master/xlsx)
--------
