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
    http://cdn.mrabit.com/1920.2020-11-02.jpg
    https://api.bingdou.net/pic/bing/
    // 或者
    https://www.bing.com/th?id=OHR.Havasupai_ROW0645721076_1920x1080.jpg&rf=LaDigue_1920x1080.jpg
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
