import $ from 'jquery'
window.jQuery = $
window.$ = $

import Swiper from 'swiper/bundle';
import 'magnific-popup/dist/jquery.magnific-popup.min.js';

document.addEventListener('DOMContentLoaded', () => {

	$('.filter-item .list .item input[type=checkbox]').on('change', function() {
		if ($(this).attr('data-color')) {
			var col = $(this).attr('data-color');
			$(this).parent().parent().toggleClass('active');
			if ($(this).parent().parent().hasClass('active')) {
				$(this).siblings('.btn').css('background', col);
			} else {
				$(this).siblings('.btn').css('background', '');
			}
		} else {
			$(this).parent().parent().toggleClass('active');
		}
	});

	$('.filter.sort .filter-item').on('click', function() {
		$(this).siblings('.filter-item').removeClass('active');
		$(this).siblings('.filter-item').children('.list').removeClass('active');
		$(this).toggleClass('active');
		$(this).children('.list').toggleClass('active');
	});

	$('.sort .filter-item .list .item input[type=radio]').on('change', function() {
		$(this).parent().parent().siblings().removeClass('active');
		$('.sort .filter-item .title span').html($(this).parent().parent().attr('data-info'));
		$(this).parent().parent().toggleClass('active');
	});

	if (window.screen.width < 992) {
		$('.filter-item').on('click', function() {
			$(this).siblings('.filter-item').removeClass('active');
			$(this).siblings('.filter-item').children('.list').removeClass('active');
			$(this).toggleClass('active');
			$(this).children('.main-list').toggleClass('active');
		});
	}

	if (window.screen.width < 992) {
		$('.form-trigger').on('click', function() {
			$('.search-form').addClass('active');
		})
	}

	const swiper = new Swiper('.swiper_product', {
		loop: true,
		slidesPerView: "auto",
		spaceBetween: 0,
		direction: 'horizontal',
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});

	$('.checkout label.delivery input').on('change', function() {
		$('.checkout label.delivery svg').removeClass('active');
		if ($(this).is(':checked')) {
			$(this).siblings('svg').addClass('active');
		}
	});

	$('.checkout label.payment input').on('change', function() {
		$('.checkout label.payment svg').removeClass('active');
		if ($(this).is(':checked')) {
			$(this).siblings('svg').addClass('active');
		}
	});

	const blockCatalogImg = new Swiper(".block-catalog__img", {
		pagination: {
			el: ".swiper-pagination",
			clickable: true
		},
		scrollbar: {
			el: ".swiper-scrollbar",
			hide: false,
		},
	});
	
	let thumbs = document.querySelectorAll('.block-catalog__img .swiper-pagination-bullet');
	thumbs.forEach(el => el.addEventListener('mouseenter', function() {
		$(this).trigger('click');
	}));

	$('.footer .super-link h4').on('click', function() {
		$(this).siblings('.main-info').removeClass('d-none');
	});

	$('.form_product').magnificPopup({
		type: 'inline',
		preloader: false,
		showCloseBtn: false,
		focus: '#name',
		mainClass: 'mfp-with-zoom',
		zoom: {
			enabled: true,
			duration: 300,
			easing: 'ease-in-out',
			opener: function(openerElement) {
				return openerElement.is('img') ? openerElement : openerElement.find('img');
			}
		},
		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				}
			}
		}
	});

	if(window.screen.width < 992) {
		$('.single-product .buttons .button').on('click', function(){
			$('.single-product .buttons .button').removeClass('active');
			$('.info-content').removeClass('active');
			$(this).addClass('active');
			var nav = $(this).attr('data-nav-tab');
			$('.info-content[data-tab='+ nav +']').addClass('active');
		});
	}

	$('.single-fest .buttons .button').on('click', function(){
		$('.single-fest .buttons .button').removeClass('active');
		$('.product-list').removeClass('active');
		$(this).addClass('active');
		var nav = $(this).attr('data-nav-tab');
		$('.product-list[data-tab='+ nav +']').addClass('active');
	});

	$('#billing_address_1').parent().before('<h3>Адрес доставки</h3>');

	$('#new-coupon').on('change', function() {

	});


	$(document).mouseup( function(e){ // событие клика по веб-документу
		var div = $( "#new-coupon" ); // тут указываем ID элемента
		if ( !div.is(e.target) // если клик был не по нашему блоку
		    && div.has(e.target).length === 0 && div.val() != '') { // и не по его дочерним элементам
			
			var coup = div.val();
			$('#coupon_code').val(coup);
			$('.checkout_coupon.woocommerce-form-coupon .button').click();

		}
	});


	$('.burger').on('click', function() {
		$('.mobile-menu').addClass('active');
	});
	$('.burger-close').on('click', function() {
		$('.mobile-menu').removeClass('active');
	});


})





// const catalogFilters = document.querySelector('.catalog__menu__filters');
// const filtersCloseButton = document.querySelector('.filters-close');
// const filterMobileButton = document.querySelector('.catalog__menu__mobile-button');
const filterListButton = document.querySelectorAll('.catalog__menu__filters__list__unit__button');

// filterMobileButton.addEventListener('click', () => {
//     catalogFilters.classList.add('active')
// })

// filtersCloseButton.addEventListener('click', () => {
//     catalogFilters.classList.remove('active')
// })

filterListButton.forEach(button => {
    button.addEventListener('click', () =>{
        button.closest('.catalog__menu__filters__list__unit').classList.toggle('active');
    })

    document.addEventListener( 'click', (e) => {
        let target = e.target;
        let catalogMenuUnit = button.closest('.catalog__menu__filters__list__unit');
        let itCatalogMenuUnit = target === catalogMenuUnit || catalogMenuUnit.contains(target);
        let catalogMenuUnitIsActive = catalogMenuUnit.classList.contains('active');
        if ( !itCatalogMenuUnit && catalogMenuUnitIsActive) {
            catalogMenuUnit.classList.remove('active');
        }
    });

})




if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest =
        function(s) {
            let matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i,
                el = this;
            do {
                i = matches.length;
                while (--i >= 0 && matches.item(i) !== el) {};
            } while ((i < 0) && (el = el.parentElement));
            return el;
        };
}
