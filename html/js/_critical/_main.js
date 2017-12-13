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

