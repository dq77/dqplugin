import * as XLSX from 'xlsx'


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
  isText_30: /^(\W|\w{1}){0,30}$/, // 匹配30个字符，字符可以使字母、数字、下划线、非字母，一个汉字算1个字符符
  isNotChina: /^[^\u4e00-\u9fa5]{0,}$/, // 不为中文  
  IDcard: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, // 身份证
  imgType: /image\/(png|jpg|jpeg|gif)$/, // 上传图片类型
  isNozeroNumber: /^\+?[1-9]\d*$/, // 大于零的正整数
  float: /^\d+(\.?|(\.\d+)?)$/, // 匹配正整数或者小数 或者0.这个特殊值
  isName: /^[u4e00-u9fa5·0-9A-z]+$/, // 验证姓名
  Email: /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/, // 邮箱验证
};


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
  
  list.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
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
function s2ab(s){ //字符串转字符流
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}
function getCharCol(n){
  let temCol = '',
  s = '',
  m = 0
  while (n > 0) {
    m = n % 26 + 1
    s = String.fromCharCode(m + 64) + s
    n = (n - m) / 26
  }
  return s
}


const readXlsxFile = (file) => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = function(e) {
      var data = e.target.result;
      resolve(XLSX.read(data, {type: 'binary'}))
    };
    reader.readAsBinaryString(file);
  })
}


const remLayout = (designWidth = 750) => {
  resetFont(designWidth)
  window.addEventListener('resize', () => { resetFont(designWidth) }, false);
}
function resetFont(designWidth) {
  const docEl = document.documentElement
  const clientWidth = (docEl.clientWidth > designWidth) ? designWidth : docEl.clientWidth
  docEl.style.fontSize = 100 * (clientWidth / designWidth) + 'px'
}


export default{
  dateFormat,
  getBrowserType,
  regExp,
  exportExcel,
  readXlsxFile,
  remLayout,
}