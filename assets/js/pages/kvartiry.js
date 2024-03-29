// подгружаем массив комплексов
import { listObjects, allObjects } from '/assets/js/get-objects.js';

// если страница квартиры
if (document.getElementById('kvartiry')) {

	// перебираем все объекты
	listObjects.forEach(o => {

		// создаем массив свободных, забронированных и проданных квартир
		const a = o.apartments.filter(obj => obj.status === "available");
		const b = o.apartments.filter(obj => obj.status === "booked");
		const s = o.apartments.filter(obj => obj.status === "sold");
		
		const zero = a.filter(obj => obj.rooms === 0);
		const one = a.filter(obj => obj.rooms === 1);
		const two = a.filter(obj => obj.rooms === 2);
		const three = a.filter(obj => obj.rooms === 3);

		// добавляем карточку объекта
		document.getElementById('kvartiry')
			.insertAdjacentHTML('beforeend',
				`
					<article id="${o.data.link}">
						<div class="container">
							<div class="heading">
								<h1 class="caps">${o.data.name}</h1>
							</div>

							${bigListObj(o)}

							<!--
							<div class="sortorovka">
								<ul class="rooms">
									${ulRooms(a)}
								</ul>
							</div>
							-->

							<div class="list-apartments-block">
								<div class="list-apartments">
									${listApartments(a, o)}
								</div>
								${getButtonComplex(a, o)}
							</div>

						</div>
					</article>
				`
			);

			initMap(
				[o.parameters.coordinates[0][0], o.parameters.coordinates[0][1]],
				[o.parameters.coordinates[1][0], o.parameters.coordinates[1][1]],
				16, o.data.link
			);

			// если есть кнопка Иконка карты
			if (document.querySelector(`article#${o.data.link} .iconMap`)) {
				document.querySelector(`article#${o.data.link} .iconMap`)
					.addEventListener('click', () => {
						iconMap(o.data.link);
					});
			}
			
			// если есть кнопка Показать еще
			if (document.querySelector(`button.${o.data.link}`)) {
				document.querySelector(`button.${o.data.link}`)
					.addEventListener('click', () => {
						addedBlocks(a, o);
					});
			}
	});

};

function bigListObj(o) {
	let code = '<div class="obj-header">'

	if (!o.videos.poster && !o.images.poster) code += `<div class="obj-header-map">`;
	if (o.videos.poster || o.images.poster) code += `<div class="obj-header-map d-none">`;
	code += `
		<div id="mini-map" class="${o.data.link}"></div>
		<div class="position br">
			<a target="_blank" href="https://yandex.ru/maps/?rtext=~${o.parameters.coordinates[0][1]},${o.parameters.coordinates[0][0]}" class="button gray" style="margin: 0 auto">Маршрут</a>
			<a href="/%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/${o.data.ssylka}/" class="button gray" style="margin: 0 auto">Перейти</a>
		</div>
	</div>
	`

	if (!o.videos.poster && !o.images.poster) code += `<div class="obj-header-multimedia d-none">`;
	if (o.videos.poster || o.images.poster) code += `<div class="obj-header-multimedia">`;
	code += `
		<a href="/%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/${o.data.ssylka}/">
			${pictureOrVideo(o)}
		</a>
		<div class="position br">
			<a href="/%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/${o.data.ssylka}/" class="button gray" style="margin: 0 auto">Перейти</a>
		</div>
	</div>
	`

	code += `
		<div class="ptr position tr">
			${getButtonsTR(o.images.poster, o.videos.poster)}
		</div>
	`

	code += '</div>';
	return code;
};

function getButtonsTR(videos, images) {
  if (videos || images) {
		return `
			<svg class="iconMap" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="M9.14844 7.48828C8.58844 7.48828 8.14844 7.93828 8.14844 8.48828C8.14844 9.03828 8.59844 9.48828 9.14844 9.48828C9.69844 9.48828 10.1484 9.03828 10.1484 8.48828C10.1484 7.93828 9.69844 7.48828 9.14844 7.48828Z" />
				<path d="M21.46 5.04C20.62 3.09 18.77 2 16.19 2H7.81C4.6 2 2 4.6 2 7.81V16.19C2 18.77 3.09 20.62 5.04 21.46C5.23 21.54 5.45 21.49 5.59 21.35L21.35 5.59C21.5 5.44 21.55 5.22 21.46 5.04ZM10.53 12.24C10.14 12.62 9.63 12.8 9.12 12.8C8.61 12.8 8.1 12.61 7.71 12.24C6.69 11.28 5.57 9.75 6 7.93C6.38 6.28 7.84 5.54 9.12 5.54C10.4 5.54 11.86 6.28 12.24 7.94C12.66 9.75 11.54 11.28 10.53 12.24Z" />
				<path d="M19.4689 20.5295C19.6889 20.7495 19.6589 21.1095 19.3889 21.2595C18.5089 21.7495 17.4389 21.9995 16.1889 21.9995H7.80892C7.51892 21.9995 7.39892 21.6595 7.59892 21.4595L13.6389 15.4195C13.8389 15.2195 14.1489 15.2195 14.3489 15.4195L19.4689 20.5295Z" />
				<path d="M22.0017 7.80892V16.1889C22.0017 17.4389 21.7517 18.5189 21.2617 19.3889C21.1117 19.6589 20.7517 19.6789 20.5317 19.4689L15.4117 14.3489C15.2117 14.1489 15.2117 13.8389 15.4117 13.6389L21.4517 7.59892C21.6617 7.39892 22.0017 7.51892 22.0017 7.80892Z" />
			</svg>
		`
	} else {
		return '';
	}
};

// видео или картинка
function pictureOrVideo(o) {
	if (o.videos.poster) {
		return `
			<video autoplay loop muted playsinline poster="/assets/images/objects/${o.data.link}/poster.jpg">
				<source src="/assets/videos/${o.data.link}/object.mp4" type="video/mp4">
			</video>
		`
	} else {
		return `<img src="/assets/images/objects/${o.data.link}/object.jpg" alt="">`
	}
};

function iconMap(name) {
	document.querySelector(`article#${name} .obj-header .obj-header-multimedia`).classList.toggle('d-none');
	document.querySelector(`article#${name} .obj-header .obj-header-map`).classList.toggle('d-none');
};

function ulRooms(a) {
	// если есть хотя бы 1 квартира
	if (a.some(obj => obj.rooms === 1)) {
	};
	return `
		<li class="zoth disabled">студия</li>
		<li class="zoth">1</li>
		<li class="zoth">2</li>
		<li class="zoth">3</li>
	`
};

// добавляем кнопку если свободных квартир > 3
function getButtonComplex(a, o) {
	if (a.length > 3) {
		return `<button class="gray ${o.data.link}" style="margin: 0 auto">Показать еще</button>`
	} else {
		return '';
	}
};

// добавляем блоки с квартирами
function addedBlocks(a, o) {
	const quantity = document.querySelectorAll(`article#${o.data.link} .list-apartments a`); // кол-во блоков

  for (let i = quantity.length; i < quantity.length + 3; i++) {
    if (a[i]) {
      const newApartment = `
      <a class="apartment" href="/%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/${o.data.ssylka}/%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D0%B0/${a[i].number}">
				<div class="aInfo">
					<div class="general">
						<div class="gInfo">${a[i].rooms}-комнатная, ${a[i].areaTotal} м²</div>
						<div>этаж ${a[i].floor}, подъезд ${a[i].entrance}</div>
					</div>
					<div class="prices">
						<div class="price">
							<span>Стоимость</span>
							<span>${Number(a[i].fullPrice).toLocaleString('ru-RU')} ₽</span>
						</div>
						<div class="price">
							<span>Цена за м²</span>
							<span>${Number(a[i].price).toLocaleString('ru-RU')} ₽</span>
						</div>
					</div>
					<div class="views">
						<span>Окна: ${windowView(a[i].windowView)}</span>
						<span>Сторона света: ${getRotate(a[i].compass)}</span>
					</div>
				</div>
				<div class="iPlan">
					<img src="/assets/images/objects/${o.data.link}/plans/flat/2/${a[i].number}.png" alt="">
				</div>
			</a>
			`;
      document.querySelector(`article#${o.data.link} .list-apartments`)
				.insertAdjacentHTML('beforeend', newApartment);
    } else {
			document.querySelector(`button.${o.data.link}`).remove();
			break;
		}
  }
};

// создаем список квартир
function listApartments(a, o) {
  let code = '';
  const itemsPerLoad = 3; // Количество квартир для пошагового вывода
  
  for (let i = 0; i < a.length; i++) {
    if (i > 0 && i % itemsPerLoad === 0 && i !== a.length) {
      break; // Прерываем цикл на этом шаге для пошагового вывода
    }
    code += `
      <a class="apartment" href="/%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/${o.data.ssylka}/%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D0%B0/${a[i].number}">
				<div class="aInfo">
					<div class="general">
						<div class="gInfo">${a[i].rooms}-комнатная, ${a[i].areaTotal} м²</div>
						<div>этаж ${a[i].floor}, подъезд ${a[i].entrance}</div>
					</div>
					<div class="prices">
						<div class="price">
							<span>Стоимость</span>
							<span>${Number(a[i].fullPrice).toLocaleString('ru-RU')} ₽</span>
						</div>
						<div class="price">
							<span>Цена за м²</span>
							<span>${Number(a[i].price).toLocaleString('ru-RU')} ₽</span>
						</div>
					</div>
					<div class="views">
						<span>Окна: ${windowView(a[i].windowView)}</span>
						<span>Сторона света: ${getRotate(a[i].compass)}</span>
					</div>
				</div>
				<div class="iPlan">
					<img src="/assets/images/objects/${o.data.link}/plans/flat/2/${a[i].number}.png" alt="">
				</div>
			</a>
    `;
  }

  return code;
}

// определяем сторону света
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

function windowView(view) {
	let code = '';
	if (view.length === 1) {
		if (view[0] === 'двор') {
			code += `во двор`
		} else {
			code += `на улицу`
		}
	} else {
		code += `во двор и на улицу`
	}
	return code;
};