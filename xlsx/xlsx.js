import * as XLSX from 'xlsx'

// 导出表格Excel




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