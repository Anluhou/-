function styleElementSiblings(tag,theclass){
  if(!document.getElementsByTagName)return false;
  var elems = document.getElementsByTagName('tag');
  var elem;
  for(var i=0; i<elems.length; i++){
    elem = getNextElement(elems[i].nextSibling);
    addClass(elem,theclass);
  }
}

//addLoadEvent (function(){
styleElementSiblings('h1','intro');
});
