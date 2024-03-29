import { allObjects } from '/assets/js/get-objects.js';
import { initializeMortgageSection } from '/assets/js/module/mortgage.js';
import { icons } from '/assets/js/module/icons.js';

// Получение пути из текущего URL
const path = window.location.pathname;

// Разбиение пути на сегменты и декодирование компонентов пути
const segments = path.split('/').filter(Boolean).map(segment => decodeURIComponent(segment));

// URL следует формату /проекты/[имя_проекта]/квартира/[идентификатор_квартиры]/
// Извлечение имени проекта и идентификатора квартиры с декодированием
const projectName = segments[1]; // имя объекта
const apartmentId = segments[3]; // номер квартиры

// Функция для поиска здания по имени
function findBuildingByName(buildingName) {
	// Ищем здание в массиве buildings, имя которого соответствует переданному идентификатору
	return allObjects.find(building => building.data.ssylka === buildingName);
}

// Здание с коротым работаем
const building = findBuildingByName(projectName);

const entranceNumber = building.apartments[apartmentId - 1].entrance; // подъезд
const floorNumber = building.apartments[apartmentId - 1].floor; // этаж

const listPlans = getPlans(building.apartments[apartmentId - 1].plans);

// Добавляем разметку
document.querySelector('main')
	.insertAdjacentHTML('afterbegin',
		`
			<section class="mt50 mb30">
				<div class="container">
					<div class="heading">
						<div style="display: inherit;">
							<a class="name-complex" href="/%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/${building.data.ssylka}/">
								<h2 class="caps">${building.data.name}</h2>
							</a>
						</div>
						<div class="subtitle"><a href="/">главная</a> / <a href="/%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/">проекты</a> / <a href="/%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/${building.data.ssylka}/">${building.data.name}</a> / квартира / 1</div>
					</div>
				</div>
			</section>

			<section>
				<div class="container mb50">
					<div class="a-block">

						<div class="area-apartment">
							<div class="area-total">
								${(building.apartments[apartmentId - 1].areaTotal).toFixed(1)}
							</div>
							<div class="area">
								<div class="item">
									<span>общая:</span>
									<span>${(building.apartments[apartmentId - 1].areaTotal).toFixed(1)}</span>
								</div>
								<div class="item">
									<span>жилая:</span>
									<span>${(building.apartments[apartmentId - 1].areaLiving).toFixed(1)}</span>
								</div>
								<div class="item">
									<span>кухня:</span>
									<span>${(building.apartments[apartmentId - 1].areaKitchen).toFixed(1)}</span>
								</div>
							</div>
						</div>

						<div class="podezdy">
							<h5 class="caps">Квартира #${building.apartments[apartmentId - 1].number}</h5>
							<div class="kislorod">
							${svgCompas(building.apartments[apartmentId - 1].compass[0])}
								<div class="list">
									<span>${building.apartments[apartmentId - 1].rooms}-комнатная</span>
									${newTerrace(building.apartments[apartmentId - 1].balcony, building.apartments[apartmentId - 1].loggia)}
									<span>${getBathroom(building.apartments[apartmentId - 1].bathroom)} санузел</span>
									<span>Вид ${windowView(building.apartments[apartmentId - 1].windowView)}</span>
								</div>
							</div>
						</div>

						<div class="podezdy">
							<h5 class="caps">Дом</h5>
							<div class="list">
								<span>Этап: ${findApartmentRange(apartmentId, building.parameters.constructionStage)}</span>
								<span>Подъезд: ${building.apartments[apartmentId - 1].entrance}</span>
								<span>Этаж: ${building.apartments[apartmentId - 1].floor}</span>
								<span>Сдача: ${building.parameters.deadline[0]} / ${building.parameters.deadline[1]}</span>
							</div>
						</div>

					</div>

					<div class="c-block">
						<div class="buttons plans">
							<button class="not-active">Планировка</button>
							<button class="gray">План этажа</button>
							<button class="gray">Генплан</button>
							<button class="gray">Вид из окна</button>
						</div>
						<div class="round-arrows">
							<div class="round-arrow">
								<svg viewBox="0 0 20 20" class="left">
									<polyline points="2 13 10 5 18 13" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline>
								</svg>
							</div>
							<div class="round-arrow">
								<svg viewBox="0 0 20 20" class="right">
									<polyline points="2 13 10 5 18 13" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline>
								</svg>
							</div>
						</div>
					</div>

					<div class="content">
						<div class="content-block active">
							<div class="plans">
								<img src="/assets/images/objects/${building.data.link}/plans/flat/1/${apartmentId}.png" alt="">
							</div>
						</div>
						<div class="content-block">
							<div class="activeFloorMapSVG">
								<p>Улица</p>
								${createPath(building)}
								<img src="/assets/images/objects/${building.data.link}/plans/entrance/${entranceNumber}-${floorNumber}.png">
								<p>Двор</p>
							</div>
						</div>
						<div class="content-block">
							<div class="complexBlocks ${building.data.link}" id="genplan"></div>
						</div>
						<div class="content-block">
							<div class="window-view">
								${scheme()}
							</div>
						</div>
						<div class="content-block">Содержимое 3</div>
						<!-- Содержимое для каждой кнопки -->
					</div>

					<div class="right-block buy-button">
						<div class="lines">
							<div class="line d-none">
								<span>Статус</span> <span>${getStatus(building.apartments[apartmentId - 1].status)}</span>
							</div>
							<div class="line">
								<span>Стоимость</span> <span>${setFullPrice(building.apartments[apartmentId - 1].status, building.apartments[apartmentId - 1].fullPrice)} ₽</span>
							</div>
							<div class="line">
								<span>1 м²</span> <span>&asymp; ${setFullPrice(building.apartments[apartmentId - 1].status, building.apartments[apartmentId - 1].price)} ₽</span>
							</div>
						</div>
						<a href="tel:+74852333362" class="button graphite">Забронировать</a>
					</div>
					
				</div>
			</section>

			<section id="apartment-mortgage">
				<div class="container">
					<div class="heading">
						<h2 class="caps">Ипотека</h2>
					</div>
					${initializeMortgageSection(building.parameters.mortgage)}
				</div>
			</section>
		`
	)

// Вид из окна - карта с подъездом
function scheme() {
	let variableName = building.data.variable; // Идентификатор комплекса
	let svgString = icons.scheme[variableName]; // SVG код
	let houseNumber = '1'; // Номер дома

  // Формируем идентификаторы для поиска в SVG
  const complexSearchString = `id="${variableName}"`;
  const houseSearchString = `id="${houseNumber}"`;

  // Находим позицию комплекса в строке SVG
  let complexIndex = svgString.indexOf(complexSearchString);
  if (complexIndex === -1) return svgString; // Комплекс не найден

  // Находим позицию дома внутри комплекса
  let houseIndex = svgString.indexOf(houseSearchString, complexIndex);
  if (houseIndex === -1) return svgString; // Дом не найден

  // Находим позицию закрывающего тега для дома
  let closeTagIndex = svgString.indexOf('</g>', houseIndex);
  if (closeTagIndex === -1) return svgString; // Не найден закрывающий тег

  // Вырезаем SVG дома
  let houseSVG = svgString.substring(houseIndex, closeTagIndex);

  // Находим все теги path внутри дома
  let pathTags = houseSVG.match(/<path[^>]*>/g) || [];
  if (entranceNumber <= 0 || entranceNumber > pathTags.length) {
    return svgString; // Номер подъезда некорректен или не существует
  }

  // Подготовка к замене атрибута fill для нужного path
  let updatedHouseSVG = houseSVG;
	if (entranceNumber <= pathTags.length) {
		let updatedPathTag = pathTags[entranceNumber - 1].replace(/<path/, `<path class="active-entrance" fill="#999999"`);
		updatedHouseSVG = updatedHouseSVG.replace(pathTags[entranceNumber - 1], updatedPathTag);
	}

  // Обновляем исходный SVG дома изменённым
  let updatedSVG = svgString.substring(0, houseIndex) + updatedHouseSVG + svgString.substring(closeTagIndex);

  return updatedSVG;
}

// Слушатель кликов на кнопки Планировка/План этажа/Генплан
document.addEventListener('DOMContentLoaded', () => {
	const buttons = document.querySelectorAll('.buttons.plans button');
	const contentBlocks = document.querySelectorAll('.content-block');
	const roundArrows = document.querySelector('.round-arrows'); // Получаем элемент с круглыми стрелками

	buttons.forEach((btn, index) => {
		btn.addEventListener('click', () => {
			// Проверка, является ли кнопка уже неактивной
			if (btn.classList.contains('not-active')) {
					return; // Прекратить выполнение функции, если кнопка неактивна
			}

			// Сброс всех кнопок и блоков содержимого
			buttons.forEach(b => {
					b.classList.remove('not-active')
					b.classList.add('gray')
			});
			contentBlocks.forEach(block => block.classList.remove('active'));

			// Активация текущей кнопки и соответствующего блока содержимого
			btn.classList.remove('gray');
			btn.classList.add('not-active');
			contentBlocks[index].classList.add('active');

			// Если активна кнопка "Планировка", показываем круглые стрелки, иначе скрываем
			if (btn.textContent.trim() === 'Планировка') {
					roundArrows.classList.remove('d-none'); // Показываем круглые стрелки
			} else {
					roundArrows.classList.add('d-none'); // Скрываем круглые стрелки
			}
		});
	});
});

// Добавление плана этажа
function createPath(o) {
	let newArrApartments = o.apartments.filter(i => i.entrance == entranceNumber && i.floor == floorNumber);
	let listPath = `<svg viewBox="${o.coordinates.entrance[entranceNumber - 1][floorNumber - 1]}">`;
	for (let i = 0; i < newArrApartments.length; i++) {

		if (newArrApartments[i].number == apartmentId) {
			listPath += `
			<path class="path active" d="${o.coordinates.apartments[newArrApartments[i].number - 1]}" data-number="${newArrApartments[i].number}"></path>
			`
		}

	};
	return listPath += '</svg>';
};

// Добавление Генплана
window.addEventListener('load', function() {
	if (document.querySelector('.complexBlocks')) {
		const placeObj = document.querySelector('.complexBlocks'); // место вставки

		// если есть картинка
		if (building.images.complex.length != '') {
			// есть ли у картинки viewBox и координаты подъездов
			if (building.coordinates.complex.viewBox.length != 0 && building.coordinates.complex.house.length != 0) {
				const homeSVG = `
					<div class="activeEntranceMapSVG">
						<svg viewBox="${building.coordinates.complex.viewBox}">
							${getMePleasePath(building.coordinates.complex.house)}
						</svg>
						<img src="${building.images.complex}">
					</div>
				`;
				placeObj.insertAdjacentHTML('afterbegin', homeSVG);
			} else {
				placeObj.insertAdjacentHTML('afterbegin', `<img src="${building.images.complex}">`);
			}
		} else {
			placeObj.style.marginBottom = '0px'
		};

		function getMePleasePath(coordinates) {
			let code = '';
			for (let i = 0; i < coordinates.length; i++) {
				if (entranceNumber - 1 == i) {
					code += `
						<path class="path" d="${coordinates[i]}" data-number="${i + 1}"></path>
					`
				}
			};
			return code;
		}
	};
});

// Функция для переключения планировок
function switchPlan(event) {
	const currentImg = document.querySelector('.plans img');
	const currentImgSrc = currentImg.getAttribute("src");
	const currentPlanIndex = listPlans.indexOf(currentImgSrc);

	// Определяем, какую кнопку нажали
	const arrowClicked = event.target.closest('.round-arrow');
	const index = Array.from(arrowClicked.parentElement.children).indexOf(arrowClicked);

	// Проверяем направление переключения
	if (index === 0 && currentPlanIndex > 0) {
			currentImg.setAttribute("src", listPlans[currentPlanIndex - 1]); // Предыдущая планировка
	} else if (index === 1 && currentPlanIndex < listPlans.length - 1) {
			currentImg.setAttribute("src", listPlans[currentPlanIndex + 1]); // Следующая планировка
	}

	// Обновляем состояние кнопок переключения
	updateRoundArrows();
}

// Устанавливаем активные кнопки переключения
setActiveRoundArrows();

// Функция для установки активных кнопок переключения
function setActiveRoundArrows() {
	if (building.apartments[apartmentId - 1].plans > 1) {
			const roundArrows = document.querySelectorAll('.round-arrow');
			roundArrows.forEach((arrow, index) => {
					arrow.addEventListener('click', switchPlan);
			});
			// Обновляем состояние кнопок переключения
			updateRoundArrows();
	}
}

// Функция для проверки кнопок переключения
function updateRoundArrows() {
	const currentImg = document.querySelector('.plans img');
	const currentImgSrc = currentImg.getAttribute("src");
	const currentPlanIndex = listPlans.indexOf(currentImgSrc);

	const roundArrows = document.querySelectorAll('.round-arrow');

	// Убираем класс "active" у всех кнопок
	roundArrows.forEach(arrow => {
			arrow.classList.remove('active');
	});

	// Если текущая планировка не первая, то первая кнопка активна
	if (currentPlanIndex > 0) {
			roundArrows[0].classList.add('active');
	}

	// Если текущая планировка не последняя, то вторая кнопка активна
	if (currentPlanIndex < listPlans.length - 1) {
			roundArrows[1].classList.add('active');
	}
}




// создаем массив планировок
function getPlans(number) {
	let arr = [];
	for (let i = 0; i < number; i++) {
			arr.push(`/assets/images/objects/${building.data.link}/plans/flat/${i + 1}/${apartmentId}.png`);
	}
	return arr;
}

function newTerrace(balcony, loggia) {
	if (balcony && loggia) return `<span>Есть балкон и лоджия</span>`;
	if (balcony) return `<span>Есть балкон</span>`;
	if (loggia) return `<span>Есть лоджия</span>`;
}

function windowView(view) {
	if (view.length > 1) return 'во двор и на улицу';
	if (view == 'двор') return 'во двор';
	if (view == 'улица') return 'на улицу';
}


// функция определяет к какому этапу относится квартира
function findApartmentRange(apartmentId, ranges) {
	for (let i = 0; i < ranges.length; i++) {
			const start = ranges[i][0];
			const end = ranges[i][1];
			
			if (apartmentId >= start && apartmentId <= end) {
					return 1;
			} else {
				return 2;
			}
	}
	
	return `Квартира ${apartmentId} не находится в указанных диапазонах`;
}

function setFullPrice(status, price) {
	price = Number(price)
	if (status === 'available') {
		return price.toLocaleString('ru-RU')
	} else {
		return price.toLocaleString('ru-RU').replace(/\d/g, '*')
	}
};

function svgCompas(params) {
	let rotationDegrees;
	switch (params) {
		case "N": rotationDegrees = 0; break; // север
		case 'NE': rotationDegrees = 45; break; // северо-восток
		case "E": rotationDegrees = 90; break; // восток
		case 'SE': rotationDegrees = 135; break; // юго-восток
		case "S": rotationDegrees = 180; break; // юг
		case "SW": rotationDegrees = 225; break; // юго-запад
		case "W": rotationDegrees = 270; break; // запад
		case "NW": rotationDegrees = 315; break; // северо-запад
		default:
			console.log('Сторона света не определена');
			rotationDegrees = 0; // Устанавливаем стандартное значение, если направление не определено
	}

	// Возвращаем SVG с установленным поворотом
	return `
		<svg class="compas" version="1.1" viewBox="0 0 512 512" style="transform: rotate(${rotationDegrees}deg); transform-origin: center;">
			<circle style="fill:#f7f7f7;" cx="256" cy="248.455" r="176" />
			<path style="fill:#f7f7f7;" d="M256,472.455c-123.516,0-224-100.484-224-224s100.484-224,224-224s224,100.484,224,224 S379.516,472.455,256,472.455z M256,40.455c-114.695,0-208,93.305-208,208s93.305,208,208,208s208-93.305,208-208 S370.695,40.455,256,40.455z" />
			<path style="fill:#f7f7f7;" d="M256,24.455c-123.516,0-224,100.484-224,224c0,11.364,0.897,22.518,2.553,33.426 c0.577,3.8,3.923,6.574,7.766,6.574h0.293c4.851,0,8.425-4.354,7.704-9.151c-3.718-24.719-3.139-50.823,3.049-77.664 c20.188-87.576,95.998-153.324,185.584-160.5C361.302,31.338,464,128.124,464,248.455c0,10.489-0.802,20.792-2.318,30.866 c-0.721,4.792,2.846,9.134,7.692,9.134h0.307c3.843,0,7.189-2.774,7.766-6.574c1.657-10.909,2.553-22.062,2.553-33.426 C480,124.939,379.516,24.455,256,24.455z" />
			<path style="fill:#f7f7f7;" d="M256,24.455c-87.704,0-163.779,50.674-200.528,124.273c-2.685,5.378,1.144,11.727,7.155,11.727h0 c3.042,0,5.771-1.751,7.128-4.473C103.855,87.574,174.51,40.455,256,40.455s152.145,47.119,186.245,115.527 c1.357,2.722,4.086,4.473,7.128,4.473h0c6.011,0,9.84-6.349,7.155-11.727C419.78,75.128,343.704,24.455,256,24.455z" />
			<path style="fill:#e0e0e0;" d="M256,24.455c-42.872,0-82.954,12.122-117.029,33.102c-6.885,4.239-3.847,14.898,4.238,14.898h0 c1.453,0,2.866-0.412,4.103-1.174C178.963,51.777,216.166,40.455,256,40.455s77.037,11.322,108.688,30.826 c1.237,0.762,2.65,1.174,4.103,1.174h0c8.085,0,11.122-10.659,4.238-14.898C338.954,36.576,298.872,24.455,256,24.455z" />
			<path style="fill:#e0e0e0;" d="M56,256.455H8c-4.422,0-8-3.578-8-8s3.578-8,8-8h48c4.422,0,8,3.578,8,8S60.422,256.455,56,256.455z" />
			<path style="fill:#e0e0e0;" d="M504,256.455h-48c-4.422,0-8-3.578-8-8s3.578-8,8-8h48c4.422,0,8,3.578,8,8 S508.422,256.455,504,256.455z" />
			<path style="fill:#e0e0e0;" d="M256,504.455c-4.422,0-8-3.578-8-8v-48c0-4.422,3.578-8,8-8c4.422,0,8,3.578,8,8v48 C264,500.876,260.422,504.455,256,504.455z" />
			<path style="fill:#282828;" d="M256,128.455l60.193,26.752c4.14,1.84,8.364-2.404,6.505-6.535L260.5,10.456 c-1.746-3.88-7.255-3.88-9.001,0l-62.197,138.216c-1.859,4.131,2.365,8.375,6.505,6.535L256,128.455z" />
			<path style="fill:#282828;" d="M256,7.545c-1.814,0-3.627,0.97-4.5,2.91l-62.197,138.216c-1.859,4.131,2.365,8.375,6.505,6.535 L256,128.455V7.545z" />
			<path style="fill:none;stroke-width:0.498539" d="m 242.0409,423.73503 c -35.9813,-3.12214 -68.56346,-16.15719 -96.46713,-38.5933 -17.335,-13.93832 -32.97989,-32.63358 -43.82239,-52.36666 C 77.760643,289.11251 73.624385,235.89602 90.572281,188.94645 108.01874,140.61574 145.40589,102.60113 193.68257,84.10569 c 9.38057,-3.593822 25.94978,-8.284579 27.35818,-7.745124 0.23727,0.09088 -6.94078,16.542258 -15.95124,36.558614 -10.55612,23.45 -16.38436,36.96683 -16.38749,38.00577 -0.007,2.49199 2.34645,4.85327 4.8049,4.81988 1.39912,-0.019 10.14338,-3.69008 32.20777,-13.52168 l 30.28723,-13.49559 28.54042,12.70385 c 35.41634,15.76443 32.98158,14.78611 35.07707,14.09453 2.13699,-0.70527 3.68736,-2.67441 3.66926,-4.66036 -0.009,-0.94618 -6.4215,-15.77366 -16.4118,-37.9464 -9.01871,-20.016356 -16.19741,-36.466123 -15.95268,-36.555035 1.61353,-0.586185 18.98699,4.439567 29.25725,8.463464 55.33142,21.678891 96.23594,70.326901 108.06066,128.517261 4.86834,23.95747 4.61241,49.54269 -0.73589,73.56457 -11.33318,50.90304 -45.12008,94.40077 -91.7399,118.10723 -19.1331,9.7293 -37.73148,15.38357 -59.32619,18.03632 -7.50627,0.92209 -27.14528,1.31147 -34.39922,0.68204 z m -5.16204,-176.73034 c 0.91238,-0.6959 1.94231,-1.76093 2.28874,-2.36673 0.46869,-0.81959 0.69366,-6.51299 0.87914,-22.24895 l 0.24927,-21.1475 17.10939,22.81101 c 15.69983,20.93173 17.29601,22.89356 19.37458,23.81302 4.56468,2.01917 9.71632,-0.46488 11.06902,-5.33735 0.76479,-2.75479 0.76788,-65.51153 0.003,-68.26527 -1.80924,-6.51669 -10.58548,-8.1208 -14.48881,-2.64824 l -1.16115,1.62777 -0.24927,21.13113 -0.24927,21.13112 -17.10904,-22.75619 c -11.66348,-15.51322 -17.60176,-23.01098 -18.65707,-23.55671 -3.07429,-1.58977 -7.75323,-0.78539 -10.02346,1.72318 -2.24072,2.47598 -2.27452,3.02793 -2.2976,37.52475 -0.0155,23.10669 0.14405,33.2019 0.54352,34.39922 0.73322,2.19766 3.24251,4.84018 5.15531,5.42903 2.33716,0.71948 5.70011,0.15777 7.56321,-1.26329 z" />
		</svg>
	`;
}

function getRotate(rotate) {
	if (rotate.length > 1) rotate = rotate[0];
	if (rotate == 'N') return 'север';
	if (rotate == 'NE') return 'северо-восток';
	if (rotate == 'E') return 'восток';
	if (rotate == 'SE') return 'юго-восток';
	if (rotate == 'S') return 'юг';
	if (rotate == 'SW') return 'юго-запад';
	if (rotate == 'W') return 'запад';
	if (rotate == 'NW') return 'северо-запад';
};

function getStatus(status) {
	if (status === 'available') return 'свободна';
	if (status === 'booked') return 'забронирована'
	if (status === 'sold') return 'продана'
};

function getBathroom(bathroom) {
	if (bathroom) return 'Совмещенный';
	if (!bathroom) return 'Раздельный'
};