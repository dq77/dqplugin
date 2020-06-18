# xlsx.js
###  读取本地excel文件
```  
    // 使用方法： 先NPM 安装XLSX
    import { readWorkbookFromLocalFile } from './xlsx.js'

    // 上传钩子
    beforeUpload( file ) {
      readWorkbookFromLocalFile( file, this.readFile )
    }

    // 读取并格式化返回的JSON数据
    readWorkbook(workbook) {
      let sheet = workbook.Sheets[workbook.SheetNames[0]]
      for ( let key in sheet ) {
        sheet[key].v ? console.log(sheet[key].v) : null
      }
    }
```

###  数据导出为excel文件
```  
    // 使用方法： 先NPM 安装XLSX
    import exportExcel from './xlsx.js'

    let json = [
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

    exportExcel(json,'订单.xlsx')
```
