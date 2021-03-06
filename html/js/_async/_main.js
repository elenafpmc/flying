/*	----------------------------------------------------------------------------------------------------
	 JS global para todo el proyecto de carga asíncrona
------------------------------------------------------------------------------------------------------ */

/*	--------------------------------------------------
	Declaración de funciones
-------------------------------------------------- */
windowWidth = window.innerWidth;
//Si hacemos una llamada AJAX lanzaremos esta función para recargar los plugins
function initAsync(){


	//Validaciones formularios
//	$("input,select,textarea").not("[type=submit]").jqBootstrapValidation(
//		{
//			filter: function () {
//				return $(this).is(":visible");
//			}
//		}
//	);


}

$(window).on('load', function(){

})


svg4everybody();


/*	--------------------------------------------------
	Lógica de scripts
-------------------------------------------------- */
$(function() {

	/*	--------------------------------------------------
		Cookies
	-------------------------------------------------- */
	var flying_cookie = Cookies.get('flyingpigs');
	if (flying_cookie){
		$('.b-cookies').removeClass('active');
	}
	else{
		$('.b-cookies').addClass('active');
	}

	$('.b-cookies__close').on('click', function(){
		$('.b-cookies').removeClass('active');
		Cookies.set('flyingpigs', true, { expires: 30 });
	});

	/*	--------------------------------------------------
		Contact form validation + handler
	-------------------------------------------------- */
	if ($('#flying_contact_form').length) {

		$.validator.addMethod('recaptchaCheck', function (value, element) {
			if ($('#g-recaptcha-response').val()){
				$('input[name="recaptchaHidden"]').val($('#g-recaptcha-response').val());
				return true;
			}
			else{
				return false;
			}
		}, '');

		$.validator.addMethod('legalCheck', function (value, element) {
			return $('[name="contact_legal"]').is(':checked');
		}, '');

		$('#flying_contact_form').validate({
			errorClass: "error-label",
			errorElement: 'p',
			rules:{
				contact_name: {
					required: true
				},
				contact_email: {
					required:true,
					email: true
				},
				contact_message: {
					required: true
				},
				contact_legal: {
					legalCheck: true
				},
				recaptchaHidden:{
					recaptchaCheck: true
				}
			},
			messages: {
				contact_name: {
					required: 'Por favor indique su nombre.'
				},
				contact_email: {
					required: 'Por favor indique un email de contacto',
					email: 'Email invalido. Por favor indique un email de contacto valido.'
				},
				contact_message: {
					required: 'Por favor escriba un mensaje.'
				},
				contact_legal: {
					legalCheck: 'Por favor acepte la politica de privacidad.'
				},
				recaptchaHidden:{
					recaptchaCheck: 'Por favor haga click en el reCaptcha.'
				}
			},
			submitHandler: function(){
				$('.fade-out-submit').fadeOut(300);

				$.ajax({
					type: 'POST',
					url: 'send-contact-form.php',
					data: $('#flying_contact_form').serialize(),
					success: function (data) {
						if(data == 'success')
						{
							$('.fade-in-submit').html('Formulario enviado correctamente. En breve nos pondremos en contacto con usted.').fadeIn(300);
						}
						else
						{
							$('.fade-in-submit').html('Oops! ha ocurrido un error. Por favor refresque y pruebe de nuevo.').fadeIn(300);
						}
					}
				});
			}
		});

	}

	/*	--------------------------------------------------
		Form inputs, add class "focus" on focus
	-------------------------------------------------- */
	$('.form-group .form-control').on('focus', function(){
		$(this).addClass('focus').siblings('label').addClass('focus');
	}).on('blur', function(){
		if ($(this).val() === ''){
			$(this).removeClass('focus').siblings('label').removeClass('focus');
		}
	})

	/*	--------------------------------------------------
		Navegación offcanvas
	-------------------------------------------------- */
	$('button.navbar-toggle').on('click', function() {
		$('body').toggleClass('offcanvas-active');
	});


	/*	--------------------------------------------------
		Clase del header según scroll
	-------------------------------------------------- */
	$header = $('.header');
	if ($header.hasClass('header--light')){
		$(window).scroll(function () {
			$currentScrollPos = $(document).scrollTop();
			if( $currentScrollPos > 0 && $header.hasClass('header--light') ) {
				$header.removeClass('header--light');
			} else if ( $currentScrollPos == 0 && !$header.hasClass('header--light') ) {
				$header.addClass('header--light');
			}
		});
		if($(document).scrollTop() > 0){
			$(document).trigger('scroll');
		}
	}

	/*	--------------------------------------------------
		Swiper init
	-------------------------------------------------- */
	var mySwiper = new Swiper('.swiper-container', {
	    speed: 500,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
			},
			autoplay: {
    		delay: 7000,
  		}
	});

	/*	--------------------------------------------------
		Menu click + smooth scroll
	-------------------------------------------------- */
	if (window.location.hash != ''){
		window.scrollBy(0, -80);
	}
	$('a[href^="#"]').on('click', function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);
			var distance = $target.offset().top - 80;
			if( distance < 0 ){
				distance = 0;
			}

	    $('html, body').stop().animate({
	      'scrollTop': distance
	    }, 900, 'swing', function () {
				// Callback
			});
			$('body').removeClass('offcanvas-active');
	});

	/*	--------------------------------------------------
		Isotope init
	-------------------------------------------------- */
	if ($('.b-projects').length){
		var $projectsGrid = $('.b-projects__grid');
		var $projectsFilters = $('.b-projects__filters__list a');

		$projectsGrid.isotope({
			// options
			itemSelector: '.b-projects__grid__item',
			layoutMode: 'masonry',
			percentPosition: true
		});

		$projectsFilters.on('click', function(ev){
			ev.preventDefault();
			$projectsGrid.isotope({ filter: $(this).data('filter') });
			$projectsFilters.removeClass('active');
			$(this).addClass('active');
		});
	}

	/*	--------------------------------------------------
		Recalculamos alturas cuando se ejecute el lazysizes
	-------------------------------------------------- */
	document.addEventListener('lazybeforeunveil', function(e){

	    sameHeight();

	});

	/*	--------------------------------------------------
		Mostrar una capa
	-------------------------------------------------- */
	$('[data-show]').on('click', function(e){
		var layerToShow = $(this).attr('data-show');
		$(layerToShow).removeClass('hidden');

	// Vamos hasta la capa, esperamos un poco para que esté visible
	setTimeout(function(){

		var moveToOffset = $(layerToShow).offset().top - 80;
		$("html, body").animate({scrollTop: moveToOffset, useTranslate3d:true }, 700);
		sameHeight();

	}, 700);

	});

	/*	--------------------------------------------------
		Ocultar una capa
	-------------------------------------------------- */
	$('[data-hide]').on('click', function(e){
		var layerToHide = $(this).attr('data-hide');
		$(layerToHide).addClass('hidden');
	});

	/*	--------------------------------------------------
		Video players
	-------------------------------------------------- */
	$('.card-video__button').click(function(){

		videoPlayer = $('.card-video-full__player video').attr('id');

		$('.card-video-full__poster').hide();
		$('.card-video-full__player').show();

		document.getElementById(videoPlayer).play();

	});

	/*	--------------------------------------------------
		Llamada de funciones
	-------------------------------------------------- */
	initAsync();

	/*	--------------------------------------------------
		Llamada de funciones en resize
	-------------------------------------------------- */
	$( window ).on('resize', function() {

	});

	/*	--------------------------------------------------
		Llamada de funciones al abrir modales
	-------------------------------------------------- */

	$('#modal-suscription').on('hide.bs.modal', function () {
	 	insertBG();
	 	sameHeight();

	});

});
