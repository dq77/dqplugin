import * as XLSX from 'xlsx'



/**
 * 将日期格式化的方法
 * @param {Date} date 需转换的日期对象
 * @param {String} format 接收的参数为字符串，例如 "yyyy.MM.dd"  "yyyy-dd-MM"
 * @return {String} 返回的结果为字符串，例如 "2017.08.31"  "2018-16-01"
 * @protected
 * @final
 */
const dateFormat = (date, format) => {
  var o = {
    "M+" : date.getMonth()+1, //month
    "d+" : date.getDate(), //day
    "h+" : date.getHours(), //hour
    "m+" : date.getMinutes(), //minute
    "s+" : date.getSeconds() //second
  };
  if(/(y+)/.test(format)){
    format=format.replace(RegExp.$1,(date.getFullYear()+"").substr(4- RegExp.$1.length));
  };
  for(var k in o){
    if(new RegExp("("+ k +")").test(format)){
      format = format.replace(RegExp.$1, RegExp.$1.length==1? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    };
  };
  return format;
}

/**
 * 客户端浏览器信息
 * 
 ```javascript
 * {
 *    trident: false, // IE内核
 *    webKit: true, // 苹果、谷歌内核
 *    mobile: true, // 是否为移动终端
 *    android: false, // android终端或者uc浏览器
 *    iPhone: true, // 是否为iPhone或者QQHD浏览器
 *    weixin: false, // 微信内置浏览器
 *    alipay: false // 支付宝内置浏览器
 * }
 ```
 */
const getBrowserType = () => {
  // 客户端浏览器信息
  var u = navigator.userAgent;
  return {
      
      trident: u.indexOf('Trident') > -1,
      // 
      webKit: u.indexOf('AppleWebKit') > -1,
      // 
      mobile: !!u.match(/AppleWebKit.*Mobile.*/),
      // 
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
      // 
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
      // 
      weixin: u.match(/MicroMessenger/i) == 'MicroMessenger',
      // 
      alipay: u.match(/AlipayClient/i) == 'AlipayClient'
  }
}

/**
 * 常用正则判断
 *
 * **示例代码：**
 *
 ```javascript
  if (!dqPlugin.regExp.mobile.test('15545457878')) {
    console.log('手机号码不正确')
  }
  ```
  */
const regExp = {
  IDcard: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, // 身份证
  mobile: /^1([3|4|5|7|8|])\d{9}$/, // 手机号码
  telephone: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/, // 固定电话
  num: /^[0-9]*$/, // 数字
  phoneNo: /(^1([3|4|5|7|8|])\d{9}$)|(^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$)/, // 电话或者手机
  policeNo: /^[0-9A-Za-z]{4,10}$/, // 账号4-10位数字或字母组成
  pwd: /^[0-9A-Za-z]{6,16}$/, // 密码由6-16位数字或者字母组成
  isNumAlpha: /^[0-9A-Za-z]*$/, // 字母或数字
  isAlpha: /^[a-zA-Z]*$/, // 是否字母
  isNumAlphaCn: /^[0-9a-zA-Z\u4E00-\uFA29]*$/, // 是否数字或字母或汉字
  isPostCode: /^[\d-]*$/i, // 是否邮编
  isNumAlphaUline: /^[0-9a-zA-Z_]*$/, // 是否数字、字母或下划线
  isNumAndThanZero: /^([1-9]\d*(\.\d+)?|0)$/, // 是否为整数且大于0/^[1-9]\d*(\.\d+)?$/
  isNormalEncode: /^(\w||[\u4e00-\u9fa5]){0,}$/, // 是否为非特殊字符（包括数字字母下划线中文）
  isTableName: /^[a-zA-Z][A-Za-z0-9#$_-]{0,29}$/, // 表名
  isInt: /^-?\d+$/, // 整数
  isText_30: /^(\W|\w{1}){0,30}$/, // 匹配30个字符，字符可以使字母、数字、下划线、非字母，一个汉字算1个字符
  isText_50: /^(\W|\w{1}){0,50}$/, // 匹配50个字符，字符可以使字母、数字、下划线、非字母，一个汉字算1个字符
  isText_20: /^(\W|\w{1}){0,20}$/, // 匹配20个字符，字符可以使字母、数字、下划线、非字母，一个汉字算1个字符
  isText_100: /^(\W|\w{1}){0,100}$/, // 匹配100个字符，字符可以使字母、数字、下划线、非字母，一个汉字算1个字符
  isText_250: /^(\W|\w{1}){0,250}$/, // 匹配250个字符，字符可以使字母、数字、下划线、非字母，一个汉字算1个字符
  isNotChina: /^[^\u4e00-\u9fa5]{0,}$/, // 不为中文  
  IDcard: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, // 身份证
  IDcardAndAdmin: /^(([1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X))|(admin))$/, // 身份证或者是admin账号
  IDcardTrim: /^\s*(([1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3})|([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X))|(admin))\s*$/, // 身份证
  num1: /^[1-9]*$/, // 数字
  imgType: /image\/(png|jpg|jpeg|gif)$/, // 上传图片类型
  isNozeroNumber: /^\+?[1-9]\d*$/, // 大于零的正整数
  float: /^\d+(\.?|(\.\d+)?)$/, // 匹配正整数或者小数 或者0.这个特殊值
  isName: /^[u4e00-u9fa5·0-9A-z]+$/, // 验证姓名
  Email: /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/, // 邮箱验证
  specialStrFilterReg: /[^A-Za-z0-9_\-\u4e00-\u9fa5\~\`\!\@\#\$\%\^\&\*\(\)\-\+\=\[\{\]\}\;\:\,\.\?\<\>\/\·\~\！\￥\……\&\*\（\）\——\「\【\】\」\|\、\|\；\’\：\“\《\》\？\，\。\、\\\'\"]+/g, // 过滤表情包和特殊字符
};


/**
 * 导出数据为xlsx格式文件
 * @param {Array} list 需保存的列表
 * @param {String} fileName 文件名，如"订单.xlsx"
 *
 * **示例代码：**
 *
 ```javascript
    let list = [
     {
       '订单号' :123,
       '订单金额' :'15元',
       '数量' :'3',
     },{
       '订单号' :456,
       '订单金额' :'8元',
       '数量' :'28',
     }
    ]
    dqPlugin.exportExcel(list,'订单.xlsx')
 ```
 */
const exportExcel = (list, fileName = 'download.xlsx') => {
  const type = 'xlsx'//定义导出文件的格式
  var tmpDown;//导出的内容
  var tmpdata = list[0];
  list.unshift({});
  var keyMap = []; //获取keys
  for (var k in tmpdata) {
    keyMap.push(k);
    list[0][k] = k;
  }
  var tmpdata = [];//用来保存转换好的json 
  
  json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
    v: v[k],
    position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
  }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
    v: v.v
  });
  var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
  var tmpWB = {
    SheetNames: ['mySheet'], //保存的表标题
    Sheets: {
      'mySheet': Object.assign({},
        tmpdata, //内容
        {
          '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
        }
      )
    }
  };
  tmpDown = new Blob([s2ab(XLSX.write(tmpWB, 
    {bookType: (type == undefined ? 'xlsx':type),bookSST: false, type: 'binary'}//这里的数据是用来定义导出的格式类型
    ))], {
    type: ""
  }); //创建二进制对象写入转换好的字节流

  //导出功能实现
  var tmpa = document.createElement("a");
  tmpa.download = fileName;
  tmpa.href = URL.createObjectURL(tmpDown); //绑定a标签
  tmpa.click(); //模拟点击实现下载
  setTimeout(function () { //延时释放
    URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
  }, 100);
}


/**
 * 导入xlsx文件并转换为list
 * @param {File} file 上传的文件
 * @param {Function} callback 解析后的回调
 *
 * **示例代码：**
 *
 ```javascript
    readFile = (workbook) => {
      let sheet = workbook.Sheets[workbook.SheetNames[0]]
      for ( let key in sheet ) {
        sheet[key].v ? console.log(sheet[key].v) : null
      }
    }
    dqPlugin.readXlsxFile(file, readFile)
 ```
 */
const readXlsxFile = (file, callback) => {
  var reader = new FileReader();
  reader.onload = function(e) {
    var data = e.target.result;
    callback? callback( XLSX.read(data, {type: 'binary'})):''
  };
  reader.readAsBinaryString(file);
}


export default{
  dateFormat,
  getBrowserType,
  regExp,
  exportExcel,
  readXlsxFile,
}