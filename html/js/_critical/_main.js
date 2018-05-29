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
		Contact map
	-------------------------------------------------- */

	function initMap() {
		var flyingpigs = {lat: 40.433414, lng: -3.686472 };
		var pig = {
			url: 'img/flyingpig-pig-pink.png',
			size: new google.maps.Size(50, 50),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(25, 50)
		};

	 	var BNstyledMapType = new google.maps.StyledMapType([
		    {
		        featureType: "all",
		        elementType: "all",
		        stylers: [
		            { saturation: -100 }
		        ]
		    }
		]);
		var map = new google.maps.Map(document.getElementById('map'), {
		  	zoom: 17,
		  	center: flyingpigs,
		  	mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		map.mapTypes.set('styled_map', BNstyledMapType);
        map.setMapTypeId('styled_map');
		var marker = new google.maps.Marker({
		  	position: flyingpigs,
		  	map: map,
		  	icon: pig
		});
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
