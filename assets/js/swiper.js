new Swiper('.image-slider', {

	// Стрелки
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},

	// Навигация
	// Буллеты, текущее положение, прогрессбар
	pagination: {
		el: '.swiper-pagination',

		// Буллеты(круги)
		clickable: true,
	},

	// Включение/отключение
	// Перетаскивания на ПК
	simulateTouch: true,
	// Чувствительность свайпа
	touchAngle: 45,
	// Курсор перетаскивания
	grabCursor: true,

	// Навигация по хешу
	hashNavigation: {
		// Отслеживать состояние
		watchState: true,
	},

	// Управление клавиатурой
	keyboard: {
		// Включить/выключить
		enabled: true,
		// Включить/выключить только когда слайдер в пределах вьюпорта
		onlyInViewport: true,
		// Включить/выключить управление клавишами pageUp, pageDown
		pageUpDown: true,
	},

	// Количество слайдов для показа
	slidesPerView: 1,

	// Отключение функционала если слайдов меньше чем нужно
	watchOverflow: true,

	// Отступ между слайдами
	spaceBetween: 0,

	// Количество пролистываемых слайдов
	slidePerGroup: 1,

	// Стартовый слайд
	initialSlide: 0,

	// Бесконечный слайдер
	loop: false,

	// Свободный режим
	freeMode: false,

	// Скорость переключения слайдов
	speed: 800,

	// ЭФФЕКТЫ ПЕРЕКЛЮЧЕНИЯ СЛАЙДОВ

	// 1. Стандартный
	// effect: 'slide',

	// 2. Смена прозрачности
	effect: 'fade',
	// Дополнительно к fade
	fadeEffect: {
		// Параллельная смена прозрачности
		crossFade: true,
	},

	// БРЕЙК ПОИНТЫ (АДАПТИВ)
	// Ширина экрана
	breakpoints: {
		320: {
			slidePerView: 1,
		},
		480: {
			slidePerView: 1,
		},
		992: {
			slidePerView: 1,
		}
	},

	// ОТКЛЮЧИТЬ ПРЕДЗАГРУЗКУ КАРТИНОК
	preloadImages: false,
	// Lazy Loading (подгрузка картинок)
	lazy: {
		// Подгружать на странице переключения слайда
		loadOnTransitionStart: false,
		// Подгрузить предыдущую и следующую картинки
		loadPrevNext: true,
	},
	// Слежка за видимыми классами
	watchSlidesProgress: true,
	// Добавление класса видимым слайдам
	watchSlidesVisibility: true,

});