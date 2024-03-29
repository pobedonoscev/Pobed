// подгружаем массив комплексов
import { listObjects, allObjects } from '/assets/js/get-objects.js';

// если страница проекты
if (document.getElementById('proekty')) {

	document.getElementById('proekty')
		.insertAdjacentHTML('afterbegin',
			`
				<aside class="list-projects-block">
					<div class="container">
						<div class="heading">
							<h1 class="caps">Завершенные проекты</h1>
						</div>
						<div class="right-block">
							<p class="mb50">
								Каждый наш проект - это новый вызов и возможность создать что-то по-настоящему уникальное и неповторимое. Мы стремимся к инновациям и превосходству в каждой детали, чтобы каждый дом стал настоящим произведением искусства.
							</p>
						</div>
            <div class="list-obj">
              <div class="sort">
								
							</div>
						</div>
					</div>
				</aside>
			`
		);

	// перебираем все объекты
	allObjects.forEach(o => {

		// если в объекте есть хотя бы одна свободная квартира
		if (o.apartments.some(obj => obj.status === "available")) {

			// создаем массив свободных, забронированных и проданных квартир
			const a = o.apartments.filter(obj => obj.status === "available");
			const b = o.apartments.filter(obj => obj.status === "booked");
			const s = o.apartments.filter(obj => obj.status === "sold");
	
			// добавляем карточку объекта
			document.querySelector('#proekty aside')
				.insertAdjacentHTML('beforebegin',
					`
						<article id="${o.data.link}">
							<div class="container">
								<div class="heading">
									<h1 class="caps">${o.data.name}</h1>
								</div>

								${bigListObj(o)}

								<div class="butterbrod mb30">
									<div class="dopy">
										${getItemBlocs(a, b, s, o)}
									</div>
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

				// кнопка карты tr
				if (document.querySelector(`article#${o.data.link} .iconMap`)) {
					document.querySelector(`article#${o.data.link} .iconMap`)
						.addEventListener('click', () => {
							iconMap(o.data.link);
						});
				}

		} else {
			// добавляем карточку объекта
			document.querySelector('#proekty aside .sort')
				.insertAdjacentHTML('afterbegin',
					`
					<a href="" class="item">
						<div class="title">
							<h3>${o.data.name}</h3>
							<span class="caps">${o.parameters.type}</span>
						</div>
						<img src="/assets/images/objects/${o.data.link}/projects.jpg" alt="">
					</a>
					`
			);
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

// формирование блоков с информацией по объекту
function getItemBlocs(a, b, s, o) {
	return `
		<div class="item">
			<h5 class="caps">Объект</h5>
			<div class="list caps">
				<span>Домов: ${o.parameters.houses}</span>
				<span>Подъездов: ${o.parameters.entrance[1]}</span>
				<span>Этажей: ${o.parameters.floors[1]}</span>
			</div>
		</div>
		<a href="/%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/${o.data.ssylka}/#renders" class="item">
			<img src="/assets/images/objects/${o.data.link}/item.jpg" alt="">
			<h4 class="caps">Картинки</h4>
			<div class="line"></div>
		</a>
		<div class="item">
			<h5 class="caps">Дом</h5>
			<div class="list caps">
				<div class="param"><span>Сдача</span><spa>${o.parameters.deadline[0]} кв-л ${o.parameters.deadline[1]} г</span></div>
				<div class="param"><span>Класс</span><spa>${o.parameters.class}</span></div>
				<div class="param"><span>Отделка</span><spa>${o.parameters.finishing}</span></div>
				<div class="param"><span>Материал</span><spa>${o.parameters.material}</span></div>
			</div>
		</div>
		<div class="item">
			<h5 class="caps">МАФ</h5>
			<div class="muSuperSpisok noDots">
				${generalInformation(o.parameters)}
			</div>
		</div>
		<div class="item">
			<h5 class="caps">Преимущества</h5>
			<div class="muSuperSpisok noDots">
				${generalInfo(o.parameters)}
			</div>
		</div>
		<div class="item">
			<h5 class="caps">Документы</h5>
			<div class="list apa">
				${getListDocuments(o)}
			</div>
		</div>
		<a href="/%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/${o.data.ssylka}/#progress" class="item">
			<img src="/assets/images/objects/${o.data.link}/construction.jpg" alt="">
			<h4 class="caps">Ход строительства</h4>
			<div class="line"></div>
		</a>
	`
};

function getListDocuments(o) {
	let code = '';

	for (let i = 0; i < o.documents.length && i < 5; i++) {
		code += `
			<a href="${o.documents[i][2]}" class="status">
				${o.documents[i][0]}
				<svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
					<path clip-rule="evenodd" d="M1.31727 0.182857L24.941 0.186412L24.9445 23.8101L22.9445 23.8104L22.9415 3.59975L2.01834 24.5185L0.604274 23.1041L21.5269 2.1859L1.31696 2.18286L1.31727 0.182857Z"></path>
				</svg>
			</a>
		`
	}

	code += '';
	return code;
}

function iconMap(name) {
	document.querySelector(`article#${name} .obj-header .obj-header-multimedia`).classList.toggle('d-none');
	document.querySelector(`article#${name} .obj-header .obj-header-map`).classList.toggle('d-none');
};

function generalInformation(op) {
	let code = '<ul class="chekanutiy">';

	if (op.playground) code += '<li>Детская площадка</li>';
	if (op.sportsGround) code += '<li>Спортивная площадка</li>';
	if (op.fencedArea) code += '<li>Огороженная территория</li>';
	if (op.elevator.passenger) code += '<li>Пассажирский лифт</li>';
	if (op.elevator.freight) code += '<li>Грузовой лифт</li>';

	code += '</ul>';
	return code;
};

function generalInfo(op) {
	let code = '<ul class="chekanutiy">';

	for (let i = 0; i < op.advantages.length && i < 4; i++) {
		code += `<li>${op.advantages[i][0]}</li>`
	}

	code += '</ul>';
	return code;
};

// добавляем кнопку если свободных квартир > 3
function getButtonComplex(a, o) {
	if (a.length > 3) {
		return `<button class="gray ${o.data.link}" style="margin: 0 auto">Показать еще</button>`
	} else {
		return '';
	}
};

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