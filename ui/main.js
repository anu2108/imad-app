console.log('Loaded!');
var element = document.getElementById('main text'
);
element.innerHTML = 'Waaaaasssssaaaaaap';

var img = document.getElementById('madi') ;
var marginLeft = 0;
function moveright (){
    marginLeft = marginLeft + 10;
    img.style.marginLeft = marginLeft + 'px';
}

img.onclick = function(){
  var interval = setinterval (moveright, 100);
};
