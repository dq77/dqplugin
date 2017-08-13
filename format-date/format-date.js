// format-date.js 

// Auther By diaoqi

/*  将日期格式化的插件，由Date类型的对象调用
 *  var date1 = new Date("sth").format("yyyy-MM-dd");
 * 
 * 接收的参数为字符串，例如 "yyyy.MM.dd"  "yyyy-dd-MM"
 * 返回的结果为字符串，例如 "2017.08.31"  "2018-16-01"
 * 
 */ 

Date.prototype.format =function(format){
  var o = {
    "M+" : this.getMonth()+1, //month
    "d+" : this.getDate(), //day
    "h+" : this.getHours(), //hour
    "m+" : this.getMinutes(), //minute
    "s+" : this.getSeconds() //second
  };
  if(/(y+)/.test(format)){
    format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4- RegExp.$1.length));
  };
  for(var k in o){
    if(new RegExp("("+ k +")").test(format)){
      format = format.replace(RegExp.$1, RegExp.$1.length==1? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    };
  };
  return format;
}

