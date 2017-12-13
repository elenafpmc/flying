/*	----------------------------------------------------------------------------------------------------
	 Helpers Bootstrap asincronos
------------------------------------------------------------------------------------------------------ */
/*	--------------------------------------------------
	Funciones y variables globales helpers
-------------------------------------------------- */


/*	--------------------------------------------------
	jQuery Ready
-------------------------------------------------- */

$(function() { // DOM Ready


	/*	--------------------------------------------------
		fixJumpyAffix: Arregla saltos de los afixes
		v:1.0
	-------------------------------------------------- */

	$(window).on('load', function(){
		//Si hay affixes...
		if ( $('[data-spy="affix"]').length !== 0 ){

			// Vamos uno por uno creando contenedores para evitar saltos al hacer scroll
			$('[data-spy="affix"]').each(function(){

				//Aplicamos altura al holder con ID construido segun el ID original
				affixHolderHeight = $(this).outerHeight();
				affixID = $(this).attr('id');
				$(this).wrap('<div id="'+affixID+'-holder" class="affix-holder"></div>');
				$(this).parent().height(affixHolderHeight);

				//Determinamos la altura a la que se hará fixed y se la indicamos
				affixHolderOffset = $(this).offset().top - affixHolderHeight;
				$(this).attr('data-offset-top',affixHolderOffset);

			});
		}

	});

	/*	--------------------------------------------------
		placeholdersIE
		v:1.0
	-------------------------------------------------- */

	$('html.legacy-ie [placeholder]').focus(function() {
		  var input = $(this);
		  if (input.val() == input.attr('placeholder')) {
		    input.val('');
		    input.removeClass('placeholder');
		  }
		}).blur(function() {
		  var input = $(this);
		  if (input.val() === '' || input.val() == input.attr('placeholder')) {
		    input.addClass('placeholder');
		    input.val(input.attr('placeholder'));
		  }
		}).blur().parents('form').submit(function() {
		  $(this).find('[placeholder]').each(function() {
		    var input = $(this);
		    if (input.val() == input.attr('placeholder')) {
		      input.val('');
	    }
	  });
	});


	/*	--------------------------------------------------
		collapseResponsive: Collapse que se cierran en XS, abren en MD
		v:1.0
	-------------------------------------------------- */
	//Movil y iPad
	if( windowWidth <= mdBreak ){
		$('.js-responsive-auto-close').collapse({
		  toggle: true
		});

	}else{
		$('.js-responsive-auto-close').collapse({
		  toggle: false
		});
	}

	// Sólo móvil
	if( windowWidth < xsBreak ){
		$('.js-responsive-auto-close-xs').collapse({
		  toggle: true
		});

	}else{
		$('.js-responsive-auto-close-xs').collapse({
		  toggle: false
		});
	}

	/*	--------------------------------------------------
		Popovers con HTML
		v:1.0
	-------------------------------------------------- */
		//$('[data-toggle="html-popover"]').popover({
		//	html : true,
		//	content: function() {
		//	var popContentID = $(this).attr('data-id-content');
		//	return $(popContentID).html();
		//	}
		//});
		////Evitamos que se muestren 2 pop-overs a la vez
		//$('[data-toggle="html-popover"]').click(function () {
		//	$('[data-toggle="html-popover"]').not(this).popover('hide');
		//});



	/*	--------------------------------------------------
		buttonTextChange:  Botones de colapse que cambian su texto
		v:1.0
	-------------------------------------------------- */
	$('a,button').click(function(){

		originalText = $(this).attr('data-original-text');
		newText = $(this).attr('data-new-text');

		//Cambiamos los textos para el próximo click
		$(this).attr('data-original-text',newText);
		$(this).attr('data-new-text',originalText);


		$(this).html(newText);


	});


/*	--------------------------------------------------
		toggleClass: hacemos un toggle de una clase en un grupo de elementos
		v:1.0
	-------------------------------------------------- */

	$('.js-toggle-class').on('mouseup',function(e){

		if (e){
			e.preventDefault();
		}

		dataParent = $(this).closest('.js-toggle-class-parent');
		dataClass = dataParent.attr('data-class');

		$(dataParent).find('.js-toggle-class').not(this).removeClass(dataClass);
		$(dataParent).find(this).toggleClass(dataClass);
	});

/*	--------------------------------------------------
		collapseScroll: Movemos el scroll al desplegar un colapsable
		v:1.2
	-------------------------------------------------- */

	$('[data-toggle="collapse"][aria-expanded="false"]').on('click',function(){

		hRef = $(this).attr('href');

		if (!hRef){
			hRef = $(this).attr('data-target') ;
		}

		thisHeight = $(this).parent().height();



		if ( $(this).hasClass('no-scroll') ){

		}else{

			$(hRef).on('show.bs.collapse', function () {
				$('html').addClass('scroll-stop');
			});

			$(hRef).on('shown.bs.collapse', function () {
				moveToOffset = $(this).offset().top - thisHeight -10;
				$("html, body").animate({scrollTop: moveToOffset, useTranslate3d:true }, 700);



				$( window ).scroll(function() {

	    			clearTimeout( $.data( this, "scrollCheck" ) );
	    			$.data( this, "scrollCheck", setTimeout(function() {

	    				$('html').removeClass('scroll-stop');

	    			}, 250) );

	    		});


			});
		}

	});


	/*	--------------------------------------------------
		showOnCollapse: Mostramos elementos on collapseOut
		v:1.2
	-------------------------------------------------- */

	$('[data-toggle="collapse"]').on('click',function(){

		//el href tiene que tener la clase js-show-on-collapsed

		hRef = $(this).attr('href');

		if (!hRef){
			hRef = $(this).attr('data-target') ;
		}

		if ($(hRef).hasClass('js-show-on-collapsed')) {

			var delay = parseFloat($(hRef).css('transition-duration'))*1000; //delay en ms
			var showOnCollapsed = $(this).attr('data-show-on-collapsed');

			//collapsed
			if ($(hRef).hasClass('collapse--in')) {

				setTimeout(function(){
					$(showOnCollapsed).addClass('fadeIn').removeClass('fadeOut');
				}, delay);
			}
			//open
			else {
				$(showOnCollapsed).removeClass('fadeIn').addClass('fadeOut');
			}

		}

	});

	/*	--------------------------------------------------
		scrollTo: Movemos el scroll al elemento indicado haciendo click
		v:1.0
	-------------------------------------------------- */


	$('[data-id-scroll]').on('click',function(){
			//ID del elemento donde queremos ir
			scrollToID = $(this).attr('data-id-scroll');

			//Aplicamos correción de píxeles
			pixelFix = $(this).attr('data-pixel-fix');

			//Lanzamos la funciónn para determinas si esta visible
			waitUntilVisible();

			//Esperamos que el elemento este visible
			function waitUntilVisible(){
				existInterval = false;
				//si tiene la clase in es que esta visible
				if ($(scrollToID).hasClass('in')){

					//movemos scroll
					moveToOffset = $(scrollToID).offset().top-parseInt(pixelFix);
					$("html, body").animate({scrollTop: moveToOffset, useTranslate3d:true }, 700);

					//Cortamos la función
					if (existInterval === true){
						clearInterval(visibleInterval);
					}
				}else{
					//No es visible? Probamos en 500ms otra vez
					existInterval = true;
					visibleInterval = setInterval(waitUntilVisible, 500);
				}
			}

			if($(this).is('a')){
				return false;

			}





	});


	/*	--------------------------------------------------
		aniDrop: Animación dropdowns
		v:1.0
	-------------------------------------------------- */

	//$('.dropdown').on('show.bs.dropdown', function(e){
	//	$(this).find('.dropdown-menu').first().stop(true, true).addClass('animated fadeInDown');
	//});
	//
	//
	//$('.dropdown').on('hide.bs.dropdown', function(e){
	//	$(this).find('.dropdown-menu').first().stop(true, true).addClass('animated fadeOutUp');
	//});




	/*	--------------------------------------------------
		noNumber: Evitamos caracteres no numéricos en input number
		v:1.0
	-------------------------------------------------- */
	$("[type='number']").keydown(function(event) {

		if ( event.keyCode > 90 && event.keyCode < 106 ){
			return;
		}

		if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 ) {

		} else {
			if (event.keyCode < 48 || event.keyCode > 57 ) {
				event.preventDefault();
			}
		}
	});




	/*	--------------------------------------------------
		buttonDismiss: Boton que cierra el Id indicado
		v:1.1
	-------------------------------------------------- */

	$('[data-id-dismiss]').click(function(){

		idToClose = $(this).attr('data-id-dismiss');

		if (idToClose) {

			// Si el attr es this, es que quiere que se cierre a si mismo.
			if ( idToClose === 'this' ){

				idToClose = $(this).parent();

			}

			//Que Animación?
			exitAnimation = $(this).attr('data-animation');
			// Ocultamos el target
			$(idToClose).addClass('animated').addClass(exitAnimation);

			//Display none una vez termine la animación
			$(idToClose).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
				function(e) {
					$(this).addClass('hide');
				}
			);

		}
	});

	/*	--------------------------------------------------
		buttonReveal: Boton que muestra el Id indicado y oculta otro
		v:1.1
	-------------------------------------------------- */

	$('.js-reveal').click(function(){
		idToShow = $(this).attr('data-id-show');

		idToHide  = $(this).attr('data-id-hide');

						showAnimation = $(this).attr('data-animation-show');
						hideAnimation = $(this).attr('data-animation-hide');


		if (idToHide){

			$(idToHide).addClass('animated').addClass(hideAnimation);

			//Display none una vez termine la animación
			$(idToHide).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
				function(e) {
					$(this).addClass('hide');

					if (idToShow) {

						// Si el attr es this, es que quiere que se cierre a si mismo.
						if ( idToShow === 'this' ){

							idToShow = $(this).parent();

						}

						//Que Animación?

						$(idToShow).addClass('animated').addClass(showAnimation);


					}
				}

			);

		}

	});

	$('.js-reveal-basic').click(function(event){
		//event.preventDefault();
		idToHide = $(this).attr('data-id-hide');
		idToShow = $(this).attr('data-id-show');

		if(idToHide) { $(idToHide).hide(); }
		if(idToShow) { $(idToShow).show();}

	});

	/*	--------------------------------------------------
		buttonToggle: Boton que alterna la visibilidad de 2 elementos
		v:1.1
	-------------------------------------------------- */
	$('.js-toggle').click(function(event){
		//event.preventDefault();
		idToHide = $(this).attr('data-id-hide');
		idToShow = $(this).attr('data-id-show');

		dataTimes = $(this).attr('data-times');

		//Si hay datatimes = 0, no hay límite, si hay 1..se limita cambiando el contador a 0

		if(dataTimes < 0){
			return false;
		}


		if(dataTimes > 0){
			$(this).attr('data-times','-1');
		}
		//Que Animación?
		showAnimation = $(this).attr('data-animation-show');
		hideAnimation = $(this).attr('data-animation-hide');

		//Ocultamos y eliminamos el target
		$(idToHide).addClass('animated').addClass(hideAnimation).removeClass(showAnimation);


		//Display none una vez termine la animación
		$(idToHide).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
			function(e) {
				$(this).addClass('hide');
				$(idToShow).removeClass('hide').addClass('animated').addClass(showAnimation).removeClass(hideAnimation);
			}
		);


		//cambiamos el orden de los atributos
		$(this).attr('data-id-show',idToHide);
		$(this).attr('data-id-hide',idToShow);


	});

	$('.js-toggle-basic').click(function(event){
		//event.preventDefault();
		idToHide = $(this).attr('data-id-hide');
		idToShow = $(this).attr('data-id-show');

		$(idToHide).hide();
		$(idToShow).show();

		$(this).attr('data-id-hide', idToShow);
		$(this).attr('data-id-show', idToHide);

	});


	/*--------------------------------------------------
		inputNumberButtons: Botones + - para input number y pattern para forzar numérico (tiene código async)
		v:1.0
	-------------------------------------------------- */

    $('input[type=number]').each(function(){
	    //Forzamos en movil el teclado numérico
	  //  $(this).attr('pattern',"\d");

	    //Le ponemos controles si asi se indica
	    if( $(this).attr('data-controls') == "true" ){
	        $(this).after('<button class="more" title="Aumentar">+</button>');
	        $(this).before('<button class="less" title="Reducir">-</button>');
	    }

    });


	/*--------------------------------------------------
		Botones + - para input number (tiene código sync)
		v:1.0
	-------------------------------------------------- */

    $('.more').click(function(event) {
        //Evitamos que se cierre el dropdown
        event.stopPropagation();
        event.preventDefault();

         //Tenemos en cuenta el limite
         curLimit = $(this).prev().attr('max');
         curVal = $(this).prev().val();

         if (curLimit == curVal){ return false; }

         curVal = parseFloat(curVal);
         $(this).prev().val(curVal+1);

    });

    $('.less').click(function(event) {
        //Evitamos que se cierre el dropdown
        event.stopPropagation();
        event.preventDefault();
        //Tenemos en cuenta el limite
        curLimit = $(this).next().attr('min');
        curVal = $(this).next().val();

        if (curLimit == curVal){ return false; }

        curVal = parseFloat(curVal);
        $(this).next().val(curVal-1);
    });



	/*	--------------------------------------------------
		accordionSelect: Select que alterna visibilidad de un acordeón u otros elementos
		v:1.0
	-------------------------------------------------- */
	$('select.js-accordion-select').change(function(){
		//show hide de toda la vida
		optionShow = $('option:selected',this).attr('data-id-show');
		$(optionShow).show();
		//$(optionShow).removeClass('out').addClass('in')
		optionHide = $('option:selected',this).attr('data-id-hide');
		$(optionHide).hide();

		//Para acordeones
		optionSelected = $('option:selected',this).attr('data-id-trigger');
		$('a[href="'+optionSelected+'"]').trigger('click');

	});


	/*	--------------------------------------------------
		iOSmodalFix: Fix scroll en modales en iOS
		v:1.0
	-------------------------------------------------- */
    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {

	    //Guardamos la posición del scroll
        $(window).scroll(function () {
            $currentScrollPos = $(document).scrollTop();
        });


        $('[data-toggle="modal"]').click(function(){

	        modalTarget = $(this).attr('data-target');

	        //Al abrir un modal, ponemos fixed al body para evitar el scroll y guardamos
	        // la variable en localStorage para evitar que cambie al hacer scroll
			$(modalTarget).on('shown.bs.modal', function (e) {
		        $('body').css({'position': 'fixed'});
		        localStorage.cachedScrollPos = $currentScrollPos;
			});


	         //Al cerrar el modal quitamos el fixed y movemos el scroll a donde estábamos
			$(modalTarget).on('hidden.bs.modal', function (e) {
	            $('body').css({'position': 'relative'});
	            $('body').scrollTop(localStorage.cachedScrollPos);
			});


        });
    }

	/*	--------------------------------------------------
		fakePlaceholderDate: Input month con placeholder falso
		v:1.0
	-------------------------------------------------- */

	$('input[type="month"], input[type="date"]').each(function(){

		datePlaceHolder = $(this).attr('placeholder');
		$(this).before('<span class="js-fake-placeholder">'+datePlaceHolder+'</span>');

	});


	$('input[type="month"], input[type="date"]').focus(function(){

		$(this).prev('.js-fake-placeholder').hide();

	});


	/*	--------------------------------------------------
		textareaAutoSize: Textareas que crecen para adaptar su altura al texto
		v:1.0
	-------------------------------------------------- */

	$('textarea.js-autosize').keyup(function(){

		textareaResize = $(this);

		//añadimos timeout para evitar lag.
		setTimeout(function(){

			//Reseteamos la altura
			textareaResize.removeAttr('style');

			//cogemos altura del scroll
			textareaHeight= textareaResize.get(0).scrollHeight;

			//Se la aplicamos
			textareaResize.height(textareaHeight);

		}, 200);


	});


	/*	--------------------------------------------------
		uploadFileButton v:1.0
		-------------------------------------------------- */


	// Funcionamiento del campo para subir archivo
	$('.js-upload-file').on('click', function(e){

		// Guarda los elementos a modificar en variables
		var inputfile='#'+$( this ).attr('for');
		var filenameContainer=$( this ).attr("data-file-name-holder");

		// Escribe el nombre del archivo si hay un elemento especificado para ello.
		if(filenameContainer){
			$(inputfile).change(function(e){
				var content = '<ul>';
			    for (var i = 0; i < $(this).get(0).files.length; ++i) {
				    content += '<li>'+$(this).get(0).files[i].name+'</li>';
			    }
			    content += '</ul>';
				//Pintamos la lista de archivos que se adjuntaran
				$(filenameContainer).html(content);

			});

		}
	});




	/*	--------------------------------------------------
		Llamada de funciones
	-------------------------------------------------- */


	/*	--------------------------------------------------
		Llamada de funciones en resize
	-------------------------------------------------- */
	$( window ).on('resize', function() {



	});

}); // Cierre DOM Ready abierto al inicio de la página
