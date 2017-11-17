function moveElement(elementID,final_x,final_y,interval){ //解释 http://blog.csdn.net/ysc612/article/details/48766875
  if(!document.getElementById) return false;
  if(!document.getElementById(elementID)) return false;
  var elem = document.getElementById(elementID);
  if(elem.movement){
    clearTimeout(elem.movement);
  }
  if(!elem.style.left){
    elem.style.left =  '0px';
  }
  if(!elem.style.top){
    elem.style.top = '0px';
  }
  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);
  var dist = 0;
  if(xpos == final_x && ypos == final_y){
    return true;
  }
  if(xpos < final_x){
    dist = Math.ceil((final_x-xpos)/10);
    xpos = xpos+dist;
  }
  if(xpos > final_x){
    dist = Math.ceil((xpos-final_x)/10);
    xpos = xpos-dist;
  }
  if(ypos < final_y){
    dist = Math.ceil((final_y - ypos)/10);
    ypos = ypos+dist;
  }
  if(ypos > final_y){
    dist = Math.ceil((ypos-final_y)/10);
    ypos = ypos-dist;
  }
  elem.style.left = xpos + 'px';
  elem.style.top = ypos + 'px';
  var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";//setTimeout()函数的第一个参数是一个字符串，Javascript用引号表示字符串，用 “+”号连接字符串
  elem.movement = setTimeout(repeat,interval);
}
