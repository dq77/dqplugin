import * as XLSX from 'xlsx'

// 导出表格Excel

/*
 *   使用方法： 先NPM 安装XLSX
 *   import exportExcel from './xlsx.js'
 *   
 *   let json = [
 *    {
 *      '订单号' :123,
 *      '订单金额' :'15元',
 *      '数量' :'3',
 *    },{
 *      '订单号' :456,
 *      '订单金额' :'8元',
 *      '数量' :'28',
 *    }
 *   ]
 *   
 *   exportExcel(json,'订单.xlsx')
 */
export default function exportExcel(json,fileName){
  const type = 'xlsx'//定义导出文件的格式
  var tmpDown;//导出的内容
  var tmpdata = json[0];
  json.unshift({});
  var keyMap = []; //获取keys
  for (var k in tmpdata) {
    keyMap.push(k);
    json[0][k] = k;
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
  saveAs(tmpDown,fileName);
}

function saveAs(obj, fileName){//导出功能实现
  var tmpa = document.createElement("a");
  tmpa.download = fileName || "下载";
  tmpa.href = URL.createObjectURL(obj); //绑定a标签
  tmpa.click(); //模拟点击实现下载
  setTimeout(function () { //延时释放
    URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
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

// 读取本地excel文件
/*
 *   使用方法： 先NPM 安装XLSX
 *   import { readWorkbookFromLocalFile } from './xlsx.js'
 *   
 *   // 上传钩子
 *   beforeUpload( file ) {
 *     readWorkbookFromLocalFile( file, this.readFile )
 *   }
 *   
 *   // 读取并格式化返回的JSON数据
 *   readWorkbook(workbook) {
 *     let sheet = workbook.Sheets[workbook.SheetNames[0]]
 *     for ( let key in sheet ) {
 *       sheet[key].v ? console.log(sheet[key].v) : null
 *     }
 *   }
 */
export function readWorkbookFromLocalFile(file, callback) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var data = e.target.result;
      callback? callback( XLSX.read(data, {type: 'binary'})):''
    };
    reader.readAsBinaryString(file);
}
// 读取 excel数据
function outputWorkbook(workbook) {
  workbook.SheetNames.forEach(name => {
      var worksheet = workbook.Sheets[name]
      for(var key in worksheet) {
          // v是读取单元格的原始值
          console.log(key, key[0] === '!' ? worksheet[key].v : worksheet[key].v);
      }
  });
}