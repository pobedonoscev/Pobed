// Подгружаем массив комплексов, где есть свободные квартиры
import { listObjects, allObjects } from '/assets/js/get-objects.js';

// const search = document.querySelector('.search');
if (document.querySelector('.search')) {

	// Добавляем разметку сортировки
	document.querySelector('.searchBlock .search')
		.insertAdjacentHTML('beforeend',
			`
			<div class="sorting">
				${codeComplex()}
				${codeRooms()}
				${codePrice()}
				${codeButton()}
			</div>
			`
		);

	function codeComplex() {
		return `
			<ul class="naming">
				<li class="complex">
					${submenuCodeComplex()}
				</li>
			</ul>
		`;
	};

	function submenuCodeComplex() {
		if (listObjects.length > 1) {
			return `
				<span>Все</span>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
					<path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
				</svg>
				<ul class="submenu hidden">`+ 
					`${nameCodeComplex()}`+ 
				`</ul>`
		} else if (listObjects.length == 1) {
			return `${listObjects[0].data.name}`
		} else { return `Квартир нет` }
	};

	function nameCodeComplex() {
		let code = '<li>Все</li>';
		listObjects.forEach(o => {
			code += `<li>${o.data.name}</li>`;
		});
		return code;
	};

	function codeRooms() {
		return `
			<ul class="rooms">
				<li class="zoth disabled">студия</li>
				<li class="zoth disabled">1</li>
				<li class="zoth disabled">2</li>
				<li class="zoth disabled">3</li>
			</ul>
		`;
	};

	function codePrice() {
		return `
			<div class="price">
				<div class="filters-price__inputs">
					<label class="filters-price__label">
						<span class="filters_price__text">от</span>
						<input type="number" min="500" max="999999" placeholder="500" class="filters-price__input" id="input-0" />
						<span class="filters_price__text">₽</span>
					</label>
					<label class="filters-price__label">
						<span class="filters_price__text">до</span>
						<input type="number" min="500" max="999999" placeholder="999999" class="filters-price__input" id="input-1" />
						<span class="filters_price__text">₽</span>
					</label>
				</div>
				<div class="range-slider" id="range-slider"></div>
			</div>
		`;
	};

	function codeButton() {
		return `
			<button class="button graphite">
				<span>${0}</span>&nbsp;<span>предложений</span>
			</button>
		`;
	};

	let arr = {
		allApartments: [],
		apartments: [],
		rooms: [],
		price: [],
	};

	getArrApartments();
	arr.price[0] = Math.min(...arr.allApartments.map(o => o.fullPrice));
	arr.price[1] = Math.max(...arr.allApartments.map(o => o.fullPrice));
	/* Range Slider */
	const rangeSlider = document.getElementById('range-slider');

	// Инициализируем
	noUiSlider.create(rangeSlider, {
		start: [arr.price[0], arr.price[1]], // устанавливаем начальные значения
		connect: true, // указываем что нужно показывать выбранный диапазон
		step: 1, // шаг изменения значений
		range: {
			'min': [arr.price[0]],
			'max': [arr.price[1]]
		} // устанавливаем минимальное и максимальное значения
	});

	function correctionRangeSlider() {
		let newValuesRangeSlider = {
			start: [arr.price[0], arr.price[1]],

		};
		rangeSlider.noUiSlider.updateOptions(newValuesRangeSlider); // ?
	};

	// Находим 1 и 2 input и создаем из них массив
	const input0 = document.getElementById('input-0');
	const input1 = document.getElementById('input-1');
	const inputs = [input0, input1];

	// Запускаем каждый раз при update
	// values: Текущие значения ползунка (массив)
	// handle: Handle that caused the event (number)
	rangeSlider.noUiSlider.on('update', function (values, handle) {
		inputs[handle].value = Math.round(values[handle]);
	});

	// Меняется rangeSlider в зависимости от ввода цифры вручную
	const setRangeSlider = (i, value) => {
		arr.price[i] = value;
		rangeSlider.noUiSlider.set(arr.price);
	};

	// Слушатель rangeSlider для ввода цифры, введенной вручную
	inputs.forEach((el, index) => {
		el.addEventListener('change', (e) => {
			setRangeSlider(index, e.currentTarget.value);
		});
	});

	// Поиск элементов кода
	// const vvod = document.querySelector('.objects'); // delete
	const apartmentsBlock = document.querySelector('.apartmentsBlock');
	const searchComplex = document.querySelector('.search .complex'); // Кнопка выбора комплекса
	const resultButton = document.querySelector('.search .button'); // Кнопка с кол-вом предложений
	const complexSubmenu = document.querySelectorAll('.complex .submenu li'); // Список комплексов
	const ulRooms = document.querySelector('ul.rooms').children; // Список кружочков

	let numberOfBlocks = 0;

	if (document.querySelector('.aktiv')) {
		if (arr.apartments.length > 8) {
			apartmentsBlock.insertAdjacentHTML('afterbegin', '<div class="objects"></div><div class="kola"><div class="shellNextButton"><button class="nextButton gray caps">Показать еще</button></div></div>');
			// kola.classList.remove('dn');
			document.querySelector('.nextButton').addEventListener('click', () => {
				numberOfBlocks += 1;
				vvod.insertAdjacentHTML('beforeend', clickButton());
			});
		};
		const vvod = document.querySelector('.objects');
		vvod.insertAdjacentHTML('afterbegin', clickButton());
	};

	let kola = '';

	// Вешаем слушатель кликов на кнопку с кол-вом предложений
	resultButton.addEventListener('click', () => {
		apartmentsBlock.innerHTML = '';
		numberOfBlocks = 0;
		apartmentsBlock.insertAdjacentHTML('afterbegin', '<div class="objects mb50"></div><div class="kola dn"><div class="shellNextButton"><button class="nextButton gray caps">Показать еще</button></div></div>');
		kola = document.querySelector('.kola');
		const vvod = document.querySelector('.objects'); // delete
		vvod.insertAdjacentHTML('afterbegin', clickButton());
		
		if (arr.apartments.length > 8) {
			kola.classList.remove('dn');
		};
		if (document.querySelector('.nextButton')) {
			document.querySelector('.nextButton').addEventListener('click', () => {
				numberOfBlocks += 1;
				vvod.insertAdjacentHTML('beforeend', clickButton());
			});
		};
	});

	// Вешаем слушатель кликов на кнопку выбора Комплекса
	searchComplex.addEventListener('click', () => {
		searchComplex.lastElementChild.classList.toggle('hidden');
	});

	// Вешаем слушатель кликов на кнопки Комплексов
	complexSubmenu.forEach(li => {
		li.addEventListener('click', (e) => {

			// Меняем текст Комплекс на выбранный
			document.querySelector('.complex span')
				.textContent = e.target.textContent;

			render(getArrApartments(e.target.textContent));

		});
	});

	render(arr.allApartments);
	highlightedCheckbox();

	// Функция отрисовывает фильтр по комнатности
	function render(array) {
		arr.apartments = array; 
		
		// Выставляем состояние кнопок сортировки по комнатности относительно выбранного комплекса
		for (let x = 0; x < ulRooms.length; x++) {
			ulRooms[x].classList.remove('pushed');
			ulRooms[x].removeEventListener('click', clickButtonRoom);

			if (array.some(o => o.rooms === x)) {
				ulRooms[x].classList.remove('disabled');
				ulRooms[x].addEventListener('click', clickButtonRoom);
			} else {
				ulRooms[x].classList.add('disabled');
			};
		};

		setNewPrice(array);
		setNewValueButton(array);
		
	};

	// Функция формирования массива с квартирами по нажатию кнопок фильтра комнатности 
	// и отправление на корректировку отображения фильтра цен и количества предложений
	function clickButtonRoom(event) {
		event.target.classList.toggle('pushed');
		resultFromFilters();
	};

	function resultFromFilters(values) {
		let array = [];
		
		for (let i = 0; i < ulRooms.length; i++) {
			if (ulRooms[i].classList.contains('pushed')) {
				array.push(...arr.allApartments.filter(y => y.rooms == i));
			};
		};
		if (array.length == 0) {
			array = arr.allApartments;
		};
		if (!values) {
			setNewPrice(array);
			correctionRangeSlider();
		};
		
		arr.apartments = array.filter(y => y.fullPrice >= arr.price[0] && y.fullPrice <= arr.price[1]);
		setNewValueButton(arr.apartments);
		highlightedCheckbox();
	};

	// Индикация мин/макс цен при перемещении ползунков и формирование массива с квартирами
	rangeSlider.noUiSlider.on('end', function (values) {
		arr.price[0] = Number(values[0]);
		arr.price[1] = Number(values[1]);
		resultFromFilters(arr.price);
		highlightedCheckbox();
	});

	function highlightedCheckbox() {
		for (let x = 0; x < ulRooms.length; x++) {
			ulRooms[x].classList.remove('highlighted');
			if (arr.allApartments.some(y => y.rooms == x && y.fullPrice >= arr.price[0] && y.fullPrice <= arr.price[1] && !ulRooms[x].classList.contains('disabled'))) {
				if (!ulRooms[x].classList.contains('highlighted')) {
					ulRooms[x].classList.add('highlighted');
				};
			} else {
				ulRooms[x].classList.remove('highlighted');
			};
		};
	};

	// Формируем массив в зависимости от выбора из списка объектов
	function getArrApartments(click) {
		let array = [];
		listObjects.forEach(o => {
			if (click === o.data.name || click === 'Все' || click === undefined) {
				array.push(...availableApartments(o.apartments));
			};
		});
		arr.allApartments = array;
		arr.apartments = array;
		return array;
	};

	// Функция возвращает только свободные квартиры
	function availableApartments(arr) {
		let x = arr.filter(y => y.status === 'available');
		return x;
	};

	// Функция устанавливает новое кол-во предложений
	function setNewValueButton(value) {
		resultButton.firstElementChild.textContent = value.length;
	};

	// Функция устанавливает новые значения в фильтре цен
	function setNewPrice(array) {
		let newPrice = [
			Math.min(...array.map(o => o.fullPrice)),
			Math.max(...array.map(o => o.fullPrice))
		];

		arr.price[0] = newPrice[0];
		arr.price[1] = newPrice[1];

		rangeSlider.noUiSlider.set(
			[arr.price[0], arr.price[1]]
		);
	};

	// Функция проверяет нажатые фильтры по комнатности и формирует массив
	function getRooms() {
		for (let i = 0; i < ulRooms.length; i++) {
			if (ulRooms[i].classList.contains('active')) {
				arr.rooms[i] = true;
			} else {
				arr.rooms[i] = false;
			}
		};
	};

	// Функция отображения карточек квартир после нажатия кнопок количества предложений и "показать еще"
	function clickButton() {
		getRooms();
		let result = ``;
		for (let i = 8 * numberOfBlocks; i < 8 + 8 * numberOfBlocks; i++) {
			if (i == arr.apartments.length) {
				numberOfBlocks = 0;
				kola.classList.add('dn');
				break;
			};
			result += `
				<a href="/%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/${arr.apartments[i].objectSsylka}/%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D0%B0/${arr.apartments[i].number}/" class="box">
					<div class="image">
						<img src="/assets/images/objects/${arr.apartments[i].objectLink}/plans/flat/1/${arr.apartments[i].number}.png" alt="">
					</div>
					<div class="text">
						<div class="left">
							<div class="top">${arr.apartments[i].rooms}-к, ${arr.apartments[i].areaTotal} м²</div>
							<div class="bottom">${arr.apartments[i].objectName}</div>
						</div>
						<div class="right">
							<div class="top">${Math.round(arr.apartments[i].fullPrice).toLocaleString('ru-RU')} ₽</div>
							<div class="bottom">№ ${arr.apartments[i].number}</div>
						</div>
					</div>
				</a>
			`;
		};

		// result += `</div>`;


		return result;
	};

};
