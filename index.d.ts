/**
 * 将日期格式化的方法
 * @param {Date} date 需转换的日期对象
 * @param {String} format 接收的参数为字符串，例如 "yyyy.MM.dd"  "yyyy-dd-MM"
 * @return {String} 返回的结果为字符串，例如 "2017.08.31"  "2018-16-01"
 * @protected
 * @final
 */
export function dateFormat(date: Date, format: String): String;


interface BrowserType {
    trident: Boolean,
    webKit: Boolean,
    mobile: Boolean,
    android: Boolean,
    iPhone: Boolean,
    weixin: Boolean,
    alipay: Boolean
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
export function getBrowserType(): BrowserType ;

interface regExpObj {
    IDcard: RegExp,
    mobile: RegExp,
    telephone: RegExp,
    num: RegExp,
    phoneNo: RegExp,
    policeNo: RegExp,
    pwd: RegExp,
    isNumAlpha: RegExp,
    isAlpha: RegExp,
    isNumAlphaCn: RegExp,
    isPostCode: RegExp,
    isNumAlphaUline: RegExp,
    isNumAndThanZero: RegExp,
    isNormalEncode: RegExp,
    isTableName: RegExp,
    isInt: RegExp,
    isText_30: RegExp,
    isNotChina: RegExp,
    IDcard: RegExp,
    imgType: RegExp,
    isNozeroNumber: RegExp,
    float: RegExp,
    isName: RegExp,
    Email: RegExp
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
export const regExp: regExpObj;


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
export function exportExcel(list: any[], fileName?: String): null;


/**
 * 导入xlsx文件并转换为list，支持Promise
 * @param {File} file 上传的文件
 *
 * **示例代码：**
 *
 ```javascript
    const workbook = await dqPlugin.readXlsxFile(file)
    let sheet = workbook.Sheets[workbook.SheetNames[0]]
    for ( let key in sheet ) {
      console.log(sheet[key].v || null)
    }
 ```
 */
export function readXlsxFile(file: File): Promise<T>;


/**
 * 移动端等比例缩放布局,1rem:100px比例
 * @param {Number} designWidth 设计稿宽度，默认750
 *
 * **示例代码：**
 *
 ```javascript
    dqPlugin.remLayout()
 ```
 */
export function remLayout(designWidth?: Number): null;



