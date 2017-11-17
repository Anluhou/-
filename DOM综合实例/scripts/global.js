function addLoadEvent(func){
  var oldonload = window.onload;
  if(typeof window.onload !='function'){
    window.onload = func;
  }else{
    window.onload = function(){
      oldonload();
      func();
    }
  }
}

function insertAfter(newElement,targetElement){
  var parent = targetElement.parentNode;
  if(parent.lastChild == targetElement){
    parent.appendChild(newElement);
  }else{
    parent.insertBefore(newElement,targetElement.nextSibling);
  }
}

function addClass(element,value){
  if(!element.className){
    element.className = value;
  }else{
    newClassName = element.className;
    newClassName +='';
    newClassName +=value;
    element.className = newClassName;
  }
}

function highlightPage(){
  if(!document.getElementsByTagName)return false;
  if(!document.getElementById)return false;
  var navs = document.getElementsByTagName('nav');
  if(navs.length == 0)return false;
  var links = navs[0].getElementsByTagName('a');
  var linkurl;

  for(var i=0; i<links.length; i++){
    if(links[i].className == 'here'){
      links[i].className = '';
    }//清楚之前的样式。

    linkurl = links[i].getAttribute('href');//indexOf方法用于在字符串中寻找子字符串的位置。如果没有匹配到，将返回-1。如果返回其他值（！=-1），则表示有匹配。
    if(window.location.href.indexOf(linkurl) != -1){
      links[i].className = 'here';
      var linktext = links[i].lastChild.nodeValue.toLowerCase();
      document.body.setAttribute('id',linktext);
    }
  }
}
addLoadEvent(highlightPage);

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

function prepareSildeshow(){
  if(!document.getElementsByTagName)return false;
  if(!document.getElementById)return false;
  if(!document.getElementById('intro'))return false;
  var destination;
  var intro = document.getElementById('intro');
  var slideshow = document.createElement('div');
  slideshow.setAttribute('id','slideshow');
  var frame = document.createElement('img');
  frame.setAttribute('src','images/frame.gif');
  frame.setAttribute('alt','');
  frame.setAttribute('id','frame');
  slideshow.appendChild(frame);
  var preview = document.createElement('img');
  preview.setAttribute('src','images/slideshow.gif');
  preview.setAttribute('alt','a photo');
  preview.setAttribute('id','preview');
  slideshow.appendChild(preview);
  insertAfter(slideshow,intro);
  var links = document.getElementsByTagName('a');
  for (var i=0; i<links.length; i++){
    links[i].onmouseover = function(){
      destination = this.getAttribute('href');
      if(destination.indexOf('index.html') !=-1){
        moveElement('preview',0,0,5);
      }
      if(destination.indexOf('about.html') !=-1){
        moveElement('preview',-150,0,5);
      }
      if(destination.indexOf('photos.html') !=-1){
        moveElement('preview',-300,0,5);
      }
      if(destination.indexOf('live.html') !=-1){
        moveElement('preview',-450,0,5);
      }
      if(destination.indexOf('contact.html') !=-1){
        moveElement('preview',-600,0,5);
      }
    }
  }
}
addLoadEvent(prepareSildeshow);

function showSection(id){
  var sections = document.getElementsByTagName('section');
  for(var i=0; i<sections.length; i++){
    if(sections[i].getAttribute('id') !=id){
      sections[i].style.display = 'none';//与传入ID对应的的那个部分disply为block,其他部分为none。
    }else{
      sections[i].style.display = 'block';
    }
  }
}
function prepareInternalnav(){
  if(!document.getElementsByTagName)return false;
  if(!document.getElementById)return false;
  if(!document.getElementById('nav_sub'))return false;//不写这个检测代码的话，在其他页面将无法找到“nav_sub”这个ID，会报错。

  var navs = document.getElementById('nav_sub').getElementsByTagName('ul');
  if(navs.length == 0)return false;
  var links = navs[0].getElementsByTagName('a');//var links = document.getElementById('nav_sub').getElementsByTagName('ul')[0].getElementsByTagName('a');

  for(var i=0; i<links.length; i++){
    /*split方法：提取每一部分的id值
    这里，想要的是“#”后面的字符串，因此可以以“#”为分隔符，得到的数组中包含两个元素：
    第一个是“#”前面的所有字符（在此是空字符串），第二个元素则是后面的所有字符。
    数组中第一个元素的索引是0，我们想要的是第二个元素，它的索引是1。
    这样就可以把“#”后面的字符串提取出来并保存到sectionId变量中。
     */
    var sectionId = links[i].getAttribute('href').split('#')[1];
     //确保真的存在带有相应id的元素，如果不存在，则继续下一次循坏
    if(!document.getElementById(sectionId))continue;
    //页面加载后，需要默认隐藏所有部分
    document.getElementById(sectionId).style.display = 'none';
    /*
接下来可以给链接添加onclik事件处理函数，以便链接被单击后，把sectionId传给showSection
函数。但这里存在作用域问题，因为变量sectionId是一个局部变量，它只有在prepareInternalnav
执行期间存在，等到事件处理函数执行的时候它就不存在了。 要解决这个问题，可以为每个链接
创建一个自定义的属性。比如把这个属性命名为destination，然后把sectionId的值赋给它。
这个属性的作用域是持久存在的。
 */
    links[i].destination = sectionId;
    links[i].onclick = function(){
      showSection(this.destination);
      return false;
    }
  }
}

addLoadEvent(prepareInternalnav);


function prepareGallery(){
  if(!document.getElementsByTagName) return false;
  if(!document.getElementById) return false;
  if(!document.getElementById('img')) return false;
  var gallery=document.getElementById('img');
  var links=gallery.getElementsByTagName('a');
  for(var i=0;i<links.length;i++){
    links[i].onclick=function(){
        return showPic(this);
    }
  }
}

function showPic(whichpic){
  if(!document.getElementById('placeholder')) return true;
  var source=whichpic.getAttribute("href");
  var placeholder=document.getElementById("placeholder");
  placeholder.setAttribute("src",source);
  if(!document.getElementById("description"))return false;
  if(whichpic.getAttribute('title')){
    var text = whichpic.getAttribute('title');
  }else{
    var text='';
  }
  var description = document.getElementById('description');
  if(description.firstChild.nodeType == 3){
    description.firstChild.nodeValue = text;
  }
  return false;
}
addLoadEvent(prepareGallery);

function foucsLables(){
  if(!document.getElementsByTagName)return false;
  var lables = document.getElementsByTagName('lable');
  for(var i=0; i<lables.length; i++){
    if(!lables[i].getAttribute('for')) continue;
    lables[i].onclick = function(){
      var id = this.getAttribute('for');
      if(!document.getElementById(id))return false;
      var element = document.getElementById(id);
      element.focus();
    }
  }
}
addLoadEvent(foucsLables);



function resetFields(whichform){
    //如果placeholder浏览器支持，则直接return，不再需要执行下面的代码
        if(Modernizr.input.placeholder)return;
        for(var i=0;i<whichform.elements.length;i++){
        var element=whichform.elements[i];
        if(element.type=="submit")continue;
        var check=element.placeholder||element.getAttribute("placeholder");
        if(!check)continue;
        element.onfocus=function(){
            var text=this.placeholder||this.getAttribute("placeholder");
            if(this.value==text){
              this.className="";
              this.value="";
            }
        }
        element.onblur=function(){
            if(this.value==""){
              this.className="placeholder";
              this.value=this.placeholder||this.getAttribute("placeholder");
            }
        }
        element.onblur();
    }
}
function prepareForms(){
    for(var i=0;i<document.forms.length;i++){
        var thisform=document.forms[i];
        resetFields(thisform);
    }
}
addLoadEvent(prepareForms);

new XMLHttpRequest();
