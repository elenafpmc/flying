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