import { listObjects, allObjects } from '../get-objects.js';
import { initializeMortgageSection } from '/assets/js/module/mortgage.js';

// Получение пути из текущего URL
const path = window.location.pathname;

// Разбиение пути на сегменты и декодирование компонентов пути
const segments = path.split('/').filter(Boolean).map(segment => decodeURIComponent(segment));

// URL следует формату /проекты/[имя_проекта]/подъезд/[номер_подъезда]/этаж/[номер_этажа]/
// Извлекаем название проекта, номер подъезда и номер этажа
const projectName = segments[1]; // имя объекта
const entranceNumber = segments[3]; // номер подъезда
const floorNumber = segments[5]; // номер этажа

// Функция для поиска здания по имени
function findBuildingByName(buildingName) {
	// Ищем здание в массиве buildings, имя которого соответствует переданному идентификатору
	return allObjects.find(building => building.data.ssylka === buildingName);
}

// Здание с коротым работаем
const o = findBuildingByName(projectName);

// Добавляем разметку
document.querySelector('main')
	.insertAdjacentHTML('afterbegin',
		`

		<section class="mt50 mb30">
			<div class="container">
				<div class="heading">
					<div style="display: inherit;">
						<a class="name-complex" href="/%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/${o.data.ssylka}/">
							<h2 class="caps">${o.data.name}</h2>
						</a>
					</div>
					<div class="subtitle"><a href="/">главная</a> / <a href="/%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/">проекты</a> / <a href="/%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/${o.data.ssylka}/">${o.data.name}</a> / подъезд ${entranceNumber} / этаж ${floorNumber}</div>
				</div>
			</div>
		</section>

		<section>
			<div class="container mb50">
				<div class="a-block">

					<div class="podezdy">
						<h5 class="caps">Этаж #${floorNumber}</h5>
						<div class="home">
							${codeFloorObject()}
						</div>
					</div>

					<div class="podezdy">
						<h5 class="caps">Подъезд #${entranceNumber}</h5>
						<div class="kislorod">
							${svgCompas(o.parameters.compass[0])}
							${svgMasterPland()}
						</div>
					</div>

					<div class="square-block">
						<h5 class="caps">Характеристики</h5>
						<div class="list">
							${getElevator(o.parameters.elevator)}
							<span>${o.parameters.finishing} отделка</span>
							<span>Потолки ${o.parameters.ceilingHeight} см</span>
							<span>${findApartmentRange(findApartment(o.apartments, entranceNumber, floorNumber), o.parameters.constructionStage)} этап</span>
							<span>Сдача: ${o.parameters.deadline[0]} / ${o.parameters.deadline[1]}</span>
						</div>
					</div>

				</div>
				<div class="b-block">
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
					${getPlans()}
					<div class="buttons-blog d-none">
						<span class="available">свободна</span>
						<span class="booked">бронь</span>
						<span class="sold">продана</span>
					</div>
					<div class="status-list caps">
						<div class="status">Свободна <div class="white"></div></div>
						<div class="status">Забронирована <div class="grey"></div></div>
						<div class="status">Продана <div class="orange"></div></div>
					</div>
				</div>
				
			</div>
		</section>

		${entranceImages()}

		<section id="apartment-mortgage">
			<div class="container">
				<div class="heading">
					<h2 class="caps">Ипотека</h2>
				</div>
				${initializeMortgageSection(o.parameters.mortgage)}
			</div>
		</section>

		`
	);

// Инициализация карусели
if (o.images.renders.entrance.presence) {
	$('.owl-carousel')
		.owlCarousel({
			stagePadding: 50,
			margin: 30,
			loop: true,
			nav: true,
			responsive: {
				0: {
					items: 1
				},
				768: {
					items: 3
				},
				1400: {
					items: 5,
					stagePadding: 100,
					margin: 50
				}
			}
		})
}

function getElevator(arr) {
	if (arr.passenger && arr.freight) return '<span>грузовой и пассажирский лифт</span>';
	if (!arr.passenger && !arr.freight) return '';
	if (arr.passenger) return '<span>пассажирский лифт</span>';
	if (arr.freight) return '<span>грузовой лифт</span>';
}

// получаем первую квартиру подъезда и этажа
function findApartment(apartments, entranceNumber, floorNumber) {
	for (let i = 0; i < apartments.length; i++) {
			const apartment = apartments[i];
			if (apartment.floor == entranceNumber && apartment.entrance == floorNumber) {
					return apartment.number;
			}
	}
	return null; // Возвращаем null, если подходящая квартира не найдена
}

// функция определяет к какому этапу относится квартира
function findApartmentRange(apartmentNumber, ranges) {
	for (let i = 0; i < ranges.length; i++) {
			const start = ranges[i][0];
			const end = ranges[i][1];
			
			if (apartmentNumber >= start && apartmentNumber <= end) {
					return 1;
			} else {
				return 2;
			}
	}
	
	return `Квартира ${apartmentNumber} не находится в указанных диапазонах`;
}

function entranceImages() {
	if (o.images.renders.entrance.presence) {
		return `
			<section>
				<div class="container">
					<div class="heading">
						<h1 class="caps">Визуализация</h1>
					</div>
					<div class="right-block">
						<p class="mb50">Наши визуализации позволят вам окунуться в атмосферу будущего жилого комплекса, рассмотреть детали архитектуры, ознакомиться с интерьерным дизайном и увидеть потенциал будущего дома.</p>
					</div>
				</div>
				<div class="container-fluid">
					<div class="renders">
						<div class="owl-carousel owl-theme">
							${picturesObject()}
						</div>
					</div>
				</div>
			</section>
		`
	} else {
		return ``;
	}
};

function picturesObject() {
	let code = ``;
	for (let i = 0; i < o.images.renders.entrance.quantity; i++) {
		code += `
			<div class="item">
				<img src="/assets/images/objects/${o.data.link}/renders/entrance/${i + 1}.jpg" alt="">
			</div>
		`
	};
	return code;
};

// Определяем максимальную этажность объекта
function floor(arr) {
	for (let i = 1; i < arr.length; i++) {
		if (arr[i].floor > o.maxFloor) {
			o.maxFloor = arr[i].floor;
		}
		if (arr[i].floor < o.minFloor) {
			o.minFloor = arr[i].floor;
		}
	}
};

function svgMasterPland() {
	if (o.coordinates.masterPlan.path.length == 0) {
		return 'План не нарисован'
	} else {
		let result = '<div class="master-plan">';
		result += `<svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="${o.coordinates.masterPlan.viewBox}">`;
		for (let i = 0; i < o.coordinates.masterPlan.path.length; i++) {
			if (Number(entranceNumber) === i + 1) {
				result += `
					<a class="link" href="/%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/${o.data.ssylka}/%D0%BF%D0%BE%D0%B4%D1%8A%D0%B5%D0%B7%D0%B4/${i + 1}/%D1%8D%D1%82%D0%B0%D0%B6/${floorNumber}/">
						<path class="selected" d="${o.coordinates.masterPlan.path[i]}"/>
						<text x="${o.coordinates.masterPlan.pathNumber[i][0]}" y="${o.coordinates.masterPlan.pathNumber[i][1]}" class="figure selected">${i + 1}</text>
					</a>
				`
			} else {
				result += `
					<a class="link" href="/%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/${o.data.ssylka}/%D0%BF%D0%BE%D0%B4%D1%8A%D0%B5%D0%B7%D0%B4/${i + 1}/%D1%8D%D1%82%D0%B0%D0%B6/${floorNumber}/">
						<path class="unselected" d="${o.coordinates.masterPlan.path[i]}"/>
						<text x="${o.coordinates.masterPlan.pathNumber[i][0]}" y="${o.coordinates.masterPlan.pathNumber[i][1]}" class="figure">${i + 1}</text>
					</a>
				`
			};
		};
		result += `</svg></div>`
		return result;
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

function getPlans() {
	return `
		<div class="mapSVG">
			${createPath()}
			<img src="/assets/images/objects/${o.data.link}/plans/entrance/${entranceNumber}-${floorNumber}.png">
		</div>
	`
};

function createPath() {
	let newArrApartments = o.apartments.filter(i => i.entrance == entranceNumber && i.floor == floorNumber);
	let listPath = `<svg viewBox="${o.coordinates.entrance[entranceNumber - 1][floorNumber - 1]}">`;
	for (let i = 0; i < newArrApartments.length; i++) {

		if (newArrApartments[i].status == 'available') {
			listPath += `
				<a href="/%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/${o.data.ssylka}/%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D0%B0/${newArrApartments[i].number}/">
					<path class="path available" d="${o.coordinates.apartments[newArrApartments[i].number - 1]}" data-number="${newArrApartments[i].number}"></path>
				</a>
			`
		} else if (newArrApartments[i].status == 'booked') {
			listPath += `
				<path class="path booked" d="${o.coordinates.apartments[newArrApartments[i].number - 1]}" data-number="${newArrApartments[i].number}"></path>
			`
		} else if (newArrApartments[i].status == 'sold') {
			listPath += `
				<path class="path sold" d="${o.coordinates.apartments[newArrApartments[i].number - 1]}" data-number="${newArrApartments[i].number}"></path>
			`
		}

	};
	return listPath += '</svg>';
};

function codeFloorObject() {
	let code = '<div class="roof"><div class="one"></div><div class="two"></div></div>';
	for (let i = o.parameters.floors[1]; i >= o.parameters.floors[0]; i--) {
		if (i == floorNumber) {
			code += `
				<a href="#" class="floor active">${i}</a>
			`
		} else {
			code += `
				<a href="/%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/${o.data.ssylka}/%D0%BF%D0%BE%D0%B4%D1%8A%D0%B5%D0%B7%D0%B4/${entranceNumber}/%D1%8D%D1%82%D0%B0%D0%B6/${i}/" class="floor">${i}</a>
			`
		}
	}
	return code;
};