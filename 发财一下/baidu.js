window.onload = function (){
  var times = document.createElement('div');
  times.setAttribute('id','time');
  var tops = document.getElementsByClassName('top')[0];//insertBefore只能插入ID。
  var d = new Date();
  var t = document.createTextNode(d.getFullYear() + "年" +(d.getMonth() + 1) + "月" + d.getDate() + "日"+' 星期'+'日一二三四五六'.charAt(new Date().getDay()));//从 Date 对象返回月份 (0 ~ 11)
  times.appendChild(t);
  tops.parentNode.insertBefore(times,tops);
}
