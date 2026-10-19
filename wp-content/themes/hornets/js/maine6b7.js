(function($){

	$(document).ready(function(){

		
		//фіксація header
		var header = $('#header'); // клас твого хедера
		var scrollOffset = 1; // з якої позиції фіксувати
		
		$(window).on('scroll', function () {
			if ($(this).scrollTop() > scrollOffset) {
				header.addClass('header--fixed');
			} else {
				header.removeClass('header--fixed');
			}
		});

		// === 1. Ініціалізація Slick та обробка beforeChange ===
		const $slider = $('.video-slider-front');

		if ($slider.length) {
			$slider.slick({
				dots: true,
				infinite: true,
				adaptiveHeight: true,
				speed: 300,
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1
			});

			$slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
				// Пауза всіх HTML5 відео
				$(this).find('video').each(function() {
					this.pause();
					this.currentTime = 0;
				});
			});
		}

		$('.mobile-btn').click(function() {
			$(this).toggleClass('active no-active');
			$('body').toggleClass('open-header');
		});

		$(".mobile-btn-bar").click(function () {
			var menu = $(this).next("ul"); 
			menu.stop(true, true).slideToggle(300);
			$(this).toggleClass("active");
		});

		$('.home-header a[href="/#production"]').click(function (e) {
			if ($('body').hasClass('open-header')) {
				e.preventDefault(); // зупиняє стандартну поведінку
				$('.mobile-btn').removeClass('active').addClass('no-active');
				$('body').removeClass('open-header');
		
				// Плавний скрол до секції після закриття меню
				const target = $('#production');
				if (target.length) {
					$('html, body').animate({
						scrollTop: target.offset().top
					}, 500);
				}
			}
		});

		let videoSlider = $(".video-slider .video-item").length;
		if(videoSlider > 1) {
			$('.video-slider').slick({
				dots: true,
				infinite: true,
				speed: 300,
				arrows: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				responsive: [
					{
						breakpoint: 767,
						settings: {
							arrows: false,
						}
					}
				]
			});
		}



		const suppurtMenu = document.querySelector(".widget_nav_menu");
		if(suppurtMenu) {
			$('.widget_nav_menu ul > li.list > a').click(function (event) {
				event.preventDefault()
	
				var $li = $(this).parent('li')
				var $submenu = $li.children('ul.sub-menu')
				console.log($submenu)
				if ($li.hasClass('current-menu-ancestor')) {
					$submenu.stop().slideUp(300)
					$li.removeClass('current-menu-ancestor')
				} else {
					$li.siblings('li').each(function () {
						var $otherSubmenu = $(this).children('ul.sub-menu')
						if (
							$(this).hasClass('current-menu-item') &&
							!$(this).hasClass('current-menu-ancestor')
						) {
							$otherSubmenu.stop().slideUp(300)
							$(this).removeClass('current-menu-item')
						}
					})
	
					if ($li.hasClass('current-menu-item')) {
						$submenu.stop().slideUp(300)
						$li.removeClass('current-menu-item')
					} else {
						$submenu.stop().slideDown(300)
						$li.addClass('current-menu-item')
					}
				}
			})
		}		

		$('.partners-front .partners-content').slick({
			dots: true,
			infinite: true,
			speed: 300,
			adaptiveHeight: true,
			slidesToShow: 4,
			slidesToScroll: 4,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						arrows: false,
					}
				}
			]
		});


		$('#hornet .hornet-slider').slick({
			dots: true,
			infinite: true,
			speed: 300,
			arrows: false,
			slidesToShow: 1,
			slidesToScroll: 1,
		});


		const $photoSlider = $('.photo-slider');
		const $photoThumbnails = $('.photo-thumbnails');

		// Получаем количество изображений из data-атрибута
		const imageCount = parseInt($('.hornet-slider-container').data('image-count'), 10);
		
		// Основной слайдер
		$photoSlider.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			dots: false,
			adaptiveHeight: true,
			asNavFor: '.photo-thumbnails'
		});

		// Слайдер миниатюр
		if (imageCount > 1) {
			$photoThumbnails.slick({
				slidesToShow: imageCount < 4 ? imageCount : 5,  // 👈 Показываем точное количество картинок
				slidesToScroll: 1,
				asNavFor: '.photo-slider',
				dots: false,
				centerMode: imageCount >= 5, // 👈 Центрируем только при 4 и более картинках
				centerPadding: "0px",
				focusOnSelect: true,
				lazyLoad: 'ondemand',
				arrows: false,
				responsive: [
					{
						breakpoint: 767,
						settings: {
							slidesToShow: imageCount < 3 ? imageCount : 3
						}
					}
				]
			});
		}
		$('article table').wrap('<div class="table_conteiner"></div>')

		// document.querySelectorAll('.youtube-facade').forEach(el => {
		// 	const videoId = el.dataset.videoId;
		// 	// const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
		// 	// el.style.backgroundImage = `url(${thumbnail})`;
		  
		// 	el.addEventListener('click', () => {
		// 	  const iframe = document.createElement('iframe');
		// 	  iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
		// 	  iframe.setAttribute('frameborder', '0');
		// 	  iframe.setAttribute('allowfullscreen', '');
		// 	  iframe.setAttribute('allow', 'autoplay; encrypted-media');
		// 	  iframe.style.width = '100%';
		// 	  iframe.style.height = '100%';
		// 	  el.replaceWith(iframe);
		// 	});
		//   });

		/*Слайдер на ст. дрона*/
		var imageCountDrone = parseInt($('.drone-image').data('imagecount'));
		if (imageCountDrone <= 3) {
			$('.drone-wrapper-slider').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				fade: true,
				dots: false,
				adaptiveHeight: false
			});
		
			$('.drone-thumbnails').slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				dots: false,
				arrows: false,
				focusOnSelect: true,
				draggable: false,
				swipe: false,
				touchMove: false,
				infinite: false
			});
		
			$('.drone-thumbnails').on('click', '.slick-slide', function () {
				var index = $(this).data('slick-index');
				$('.drone-wrapper-slider').slick('slickGoTo', index);
		
				$('.drone-thumbnails .slick-slide').removeClass('slick-current');
				$(this).addClass('slick-current');
			});
		
			$('.drone-wrapper-slider').on('afterChange', function (event, slick, currentSlide) {
				$('.drone-thumbnails .slick-slide').removeClass('slick-current');
				$('.drone-thumbnails .slick-slide[data-slick-index="' + currentSlide + '"]').addClass('slick-current');
			});
		} else {
			$('.drone-wrapper-slider').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				fade: true,
				dots: false,
				adaptiveHeight: false,
				asNavFor: '.drone-thumbnails'
			});
			$('.drone-thumbnails').slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				dots: false,
				arrows: false,
				centerMode: true,
				infinite: true, // можеш залишити true, якщо хочеш без кінця
				focusOnSelect: true,
				asNavFor: '.drone-wrapper-slider'
			});
		}

		const btnWrap = document.querySelector(".tml-submit-wrap .tml-button");
		if (btnWrap) {
			const span = document.createElement("span");
			span.classList.add("style-item");
	
			btnWrap.parentNode.insertBefore(span, btnWrap);
			span.appendChild(btnWrap);
			btnWrap.closest('.tml-submit-wrap').classList.add('submit-btn');
		}
	
		
		/*Конец Слайдер на ст. дрона*/

		$('.faq .faq_item').click(function () {
			$(this).toggleClass('active')
			$(this).find('.faq_answer').toggle(500)
		})
		

		$('.menu a[href="#production"]').click(function(event) {
			event.preventDefault(); // Отключаем стандартный переход
	
			var target = $('#production');
	
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 800);
			}
	
			$('.mobile-btn').removeClass('active'); // Закрываем кнопку
			$('.mobile-btn').addClass('no-active');
			$('body').removeClass('open-header'); // Закрываем меню
		});

		/*
    	let postId = $('#content').data('post-id');
		let checkboxContainer = $('#dynamic-checkbox-container'); // Контейнер для чекбоксів
		let selectedOptionsField = $('#selected-options'); // Поле для вибраних значень

		if (!postId || !checkboxContainer.length || !selectedOptionsField.length) return;

		let optionsMap = {
			5: ["Аналоговий денний", "Аналоговий тепловізійний"],
			6: ["Цифровий DJI", "Цифровий Walksnail"],
			7: ["Аналоговий денний/аналоговий тепловізійний", "Цифровий DJI", "Цифровий Walksnail", "Цифровий тепловізійний Walksnail"],
			8: ["Аналоговий денний/аналоговий тепловізійний", "Цифровий DJI", "Цифровий Walksnail", "Цифровий тепловізійний Walksnail"],
			9: ["Аналоговий денний/аналоговий тепловізійний", "Цифровий DJI, цифровий Walksnail", "Цифровий тепловізійний Walksnail"],
			72: ["Аналоговий денний/аналоговий тепловізійний", "Цифровий DJI", "Цифровий Walksnail", "Цифровий тепловізійний Walksnail"],
			11: ["Аналоговий день+ніч", "Цифровий DJI", "Цифровий Walksnail", "Цифровий тепловізійний Walksnail"]
		};

		if (optionsMap[postId]) {
			checkboxContainer.empty(); // Очищаємо контейнер перед додаванням

			$.each(optionsMap[postId], function (index, value) {
				let checkbox = $('<div class="intem-check"><input id="'+ index +'" type="checkbox" value="' + value + '"><label for="'+ index +'">' + value + '</label><div>');
				checkboxContainer.append(checkbox);
			});

			// Оновлюємо приховане поле при зміні чекбоксів
			checkboxContainer.on('change', 'input[type="checkbox"]', function () {
				let selectedValues = [];
				checkboxContainer.find('input[type="checkbox"]:checked').each(function () {
					selectedValues.push($(this).val());
				});
				selectedOptionsField.val(selectedValues.join(', ')); // Записуємо вибрані значення в текстове поле
			});
		}


		let responseOutput = $('.wpcf7-response-output');

		// Ховаємо повідомлення, якщо воно порожнє
		if (responseOutput.text().trim() === '') {
			responseOutput.hide();
		}
	
		// Виконуємо перевірку після відправки форми
		$(document).on('wpcf7invalid wpcf7spam wpcf7mailfailed', function () {
			responseOutput = $('.wpcf7-response-output'); // Оновлюємо селектор (якщо блок перевантажується)
			responseOutput.removeClass('successful').addClass('error').fadeIn();
		});
	
		$(document).on('wpcf7mailsent', function () {
			responseOutput = $('.wpcf7-response-output');
			responseOutput.removeClass('error').addClass('successful').fadeIn();
		});
		*/


		


	});

})(jQuery);




