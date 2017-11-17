function stripeTables(){
  if(!document.getElementsByTagName) return false;
  var tables = document.getElementsByTagName('table');
  var odd, rows;
  for(var i=0; i<tables.length; i++){
    var odd=false;//初始化odd为false
    rows = tables[i].getElementsByTagName('tr');
    for(var j=0; j<rows.length; j++){
      if(odd == true){//如果odd为true，给当前行的背景色设置为#ffc
        addClass(rows[j],'odd');
        odd = false//因为当前行已经设置了背景色了，下一行不设置背景色，那么就要让odd=false
      }else{
        odd = true;//因为初始化odd为false，因为要给下一行设置背景色，而给下一行设置背景色的条件为odd=true，所以下面的语句使odd=true;
      }
    }
  }
}

function highlightRows(){
  if(!document.getElementsByTagName)return false;
  var rows = document.getElementsByTagName('tr');
  for(var i=0; i<rows.length; i++){
    rows[i].onmouseover = function(){
      this.style.fontWeight = 'bold';
    }
    rows[i].onmouseout = function(){
      this.style.fontWeight = 'normal';
    }
  }
}

  addLoadEvent(stripeTables);
  addLoadEvent(highlightRows);
