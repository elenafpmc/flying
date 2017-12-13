/*doc
---
title: fakeJQ 1.0
name: fakeJQ
category: Helpers JS
---
Simulamos el selector de jQuery, sin jQuery

```js_example
$('selector')

```
*/ 

var $ = function(el) {
	return document.querySelectorAll(el);
};



//.removeClass


//.next
//.nextAll

//is


//.attr


//.remove



//.removeAttr


//.hasClass


//.height


//.width


//.offset


//.position


//.clone


//.wrap


//.append


//.appendTo


//.html


//.preppend


//.prependTo


//.text


//.after


//.before


//.is


//.each


//.children


//.closest


//.find


//.parent


//.prev


//.prevAll


//.siblings


//.resize


//.scroll


//.ready


//.on


//.off


//.trigger


//.change


//.focus


//.submit


//.keydown
//.keypress
//.keyup

//.toggle

//.hover

//.click









/*doc
---
title: Modernizr 2.8.3
name: modernizr
category: Plugins Modernizr
---

Detector de funcionalidades HTML5, CSS3

url: <http://modernizr.com/download/#-canvas-canvastext-draganddrop-audio-video-inlinesvg-svg-touch-cssclasses-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load>

*/ 
;window.Modernizr=function(a,b,c){function B(a){j.cssText=a}function C(a,b){return B(m.join(a+";")+(b||""))}function D(a,b){return typeof a===b}function E(a,b){return!!~(""+a).indexOf(b)}function F(a,b){for(var d in a){var e=a[d];if(!E(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function G(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:D(f,"function")?f.bind(d||b):f}return!1}function H(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return D(b,"string")||D(b,"undefined")?F(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),G(e,b,c))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={svg:"http://www.w3.org/2000/svg"},r={},s={},t={},u=[],v=u.slice,w,x=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},y=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=D(e[d],"function"),D(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),z={}.hasOwnProperty,A;!D(z,"undefined")&&!D(z.call,"undefined")?A=function(a,b){return z.call(a,b)}:A=function(a,b){return b in a&&D(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=v.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(v.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(v.call(arguments)))};return e}),r.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},r.canvastext=function(){return!!e.canvas&&!!D(b.createElement("canvas").getContext("2d").fillText,"function")},r.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:x(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},r.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},r.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},r.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},r.svg=function(){return!!b.createElementNS&&!!b.createElementNS(q.svg,"svg").createSVGRect},r.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==q.svg};for(var I in r)A(r,I)&&(w=I.toLowerCase(),e[w]=r[I](),u.push((e[w]?"":"no-")+w));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)A(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},B(""),i=k=null,e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.hasEvent=y,e.testProp=function(a){return F([a])},e.testAllProps=H,e.testStyles=x,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+u.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
/*--------------------------------------------------
	JS crítico para pintar la página,
	helpers con hacks imposibles de hacer por CSS.		
	NO MODIFICAR, añadir nuevos scripts al critical/main.js
-------------------------------------------------- */


/*	--------------------------------------------------
	Declaración de variables
-------------------------------------------------- */
xsBreak = 767;
smBreak = 991;
mdBreak = 1199;

/*	--------------------------------------------------
	Declaración de funciones,
	creamos todo con funciones para poder meterlo
	dentro del initMainCritical para poder llamarlas
	en caso de evento resize o cambio del DOM
-------------------------------------------------- */


/*doc
---
title: Calculate Window
name: calculatewun
category: Helpers JS
---
Calcula el ancho de la ventana

```js_example
calculateWindowWidth()

```
*/ 

function calculateWindowWidth(){
	windowWidth = window.innerWidth;
}


/*doc
---
title: isRetina 1.0
name: isretina
category: Helpers JS
---
Detecta si el device tiene soporte retina

```js_example
is_retina_device()

```
*/ 
function is_retina_device() {
   return  window.devicePixelRatio > 1;
}

/*doc
---
title: domTransplant 2.0.1
name: domtransplant
category: Helpers JS
---
Movemos bloques según vista responsive

```js_example
[data-transplant]
```

```html_example
[data-transplant]
```


*/ 

function domTransplant(){

	elements = $('[data-transplant-id][data-transplant]');
	
	if (elements !== null){
		
		Array.prototype.forEach.call(elements, function(el, i){
			//Reseteamos $ a un único selector dentro de un bucle.
			var $ = function(el) {
				return document.querySelector(el);
			};
		
			elementID = el.getAttribute('data-transplant-id');
			elementObject = el;
			
			//Determinamos el destino del transplante
			if (windowWidth > mdBreak){
				elementDestination = $('[data-transplant-id='+elementID+'][data-transplant-lg]');
			}
			
			if (windowWidth <= mdBreak){
				elementDestination = $('[data-transplant-id='+elementID+'][data-transplant-md]');
			}
			
			if (windowWidth <= smBreak){
				elementDestination = $('[data-transplant-id='+elementID+'][data-transplant-sm]');
			}
			
			if (windowWidth <= xsBreak){
				elementDestination = $('[data-transplant-id='+elementID+'][data-transplant-xs]');
			}
	
			//Lo transplantamos		
			 elementDestination.appendChild(
			    elementObject
			 );		
		
		});			
		
		
	}
	
	
}

/*	--------------------------------------------------
	SameHeight : Iguala altura de elementos
	v:2.1.1	
-------------------------------------------------- */
function sameHeight(){
	
	elements = $('.js-same-height');

	if (elements !== null){
	
		Array.prototype.forEach.call(elements, function(el, i){
			
			//Reset de altura
			var maxHeight = 0;
			
			//Cual es la altura más alta?		
			elements = el.querySelectorAll('.js-same');
			
			
			Array.prototype.forEach.call(elements, function(el, i){
				
				el.removeAttribute('style');
				
				maxHeightNew = el.offsetHeight;
				
				if (maxHeight < maxHeightNew){
					maxHeight = maxHeightNew;
				}

			});

			Array.prototype.forEach.call(elements, function(el, i){
				
				//Ponemos la altura segun los cortes
				if (el.classList.contains('no-xs') && windowWidth < xsBreak ){
					el.style.minHeight = 0+'px';
				}else if (el.classList.contains('no-sm') && windowWidth < smBreak ){
					el.style.minHeight = 0+'px';
				}else if (el.classList.contains('no-md') && windowWidth < mdBreak ){
					el.style.minHeight = 0+'px';
				}else{
					el.style.minHeight = maxHeight+'px';
				}
					
				
			});
	
			
		});
	}
	
	
}

/*	--------------------------------------------------
	makeSquare: Crea cuadrados perfectos
	v:2.0		
-------------------------------------------------- */
function makeSquare(){
	elements = $('.js-square');
	
	if (elements !== null){
	
		Array.prototype.forEach.call(elements, function(el, i){
			el.style.height = el.offsetWidth+'px';
		});
	}
}

/*	—————————————————————————
	autoHeigh: Calcula la altura, muy util para hacer absolutos centrados
	v:2.0
————————————————————————— */
function autoHeight(){

	elements = $('.js-auto-height');

	if (elements !== null){		
		Array.prototype.forEach.call(elements, function(el, i){
			el.style.height = el.offsetHeight+'px';
		});
	}
}

/*--------------------------------------------------
	insertBG: Inserta imágenes como background
	v:2.0		
-------------------------------------------------- */
function insertBG(){
	
	elements = $('[data-background]');
	
	if (elements !== null){
		
		Array.prototype.forEach.call(elements, function(el, i){
	
			if (is_retina_device() === true){
				backgroundBox = el.getAttribute('data-background-2x') || el.getAttribute('data-background'); //si no tenemos background 2x metemos el 1x
			}
			else {
				backgroundBox = el.getAttribute('data-background'); 
			}
				
			el.style.backgroundImage = 'url('+ backgroundBox +')';
				
		});	
	}
	
}




/*	--------------------------------------------------
	Llamada de funciones
-------------------------------------------------- */

function initCriticalHelpers(){
	calculateWindowWidth();
	domTransplant();
	sameHeight();
	makeSquare();
	autoHeight();
	insertBG();
}


//Esperamos a que el DOM este cargado para poder ejecutar el JS con el DOM completo...
document.addEventListener("DOMContentLoaded", function(event) { 

	initCriticalHelpers();

});

//Recalculamos si hacemos Resize
window.addEventListener("resize", initCriticalHelpers);
/*	----------------------------------------------------------------------------------------------------
	 JS crítico global con hacks que por CSS no es posibles hacer. NO ABUSAR. NO USAR JQUERY
------------------------------------------------------------------------------------------------------ */

/*	--------------------------------------------------
	Declaración de funciones,
	creamos todo con funciones para poder meterlo
	dentro del initMainCriticalpara poder llamarlas
	en caso de evento resize o cambio del DOM
-------------------------------------------------- */

/*	--------------------------------------------------
	ejemploTemplate
	Descripcion de lo que hace.
	1.0
-------------------------------------------------- */

function ejemploTemplate(){

	
}
	
	
	
/*	--------------------------------------------------
	Llamada de funciones
-------------------------------------------------- */
function initMainCritical(){
	//Añadimos aqui las funciones declaradas arriba
	ejemploTemplate();	
}
//Esperamos a que el DOM este cargado...
document.addEventListener("DOMContentLoaded", function(event) { 

	initMainCritical();
	
	//Recarga si Resize
	window.addEventListener("resize", initMainCritical);			

});

