import { getFirstSentence, getRemainingSentences, countStatusAvailable, countRoomsOne, countSentences } from '/assets/js/script.js';
import { allObjects, listObjects } from '../get-objects.js';

// Получение пути из текущего URL
const path = window.location.pathname;

// Разбиение пути на сегменты и декодирование компонентов пути
const segments = path.split('/').filter(Boolean).map(segment => decodeURIComponent(segment));

// URL следует формату /проекты/[имя_проекта]/подъезд/[номер_подъезда]/этаж/[номер_этажа]/
// Извлекаем название проекта, номер подъезда и номер этажа
const projectName = segments[1]; // имя объекта

// Функция для поиска здания по имени
function findBuildingByName(buildingName) {
	// Ищем здание в массиве buildings, имя которого соответствует переданному идентификатору
	return allObjects.find(building => building.data.ssylka === buildingName);
}

// Здание с коротым работаем
const o = findBuildingByName(projectName);

const months = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];

const iconButton = `
	<svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg">
		<path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" />
	</svg>
`

// Присваивание переменной номера ячейки массива с последним годом
let currentYearIndex = o.photos.findIndex(indexYear => indexYear.year === Math.max(...o.photos.map(indexYear => indexYear.year)));

// Номер ячейки массива с последним месяцем в выбранном году
let currentMonthIndex = getLastMonth();

if (true) {
	document.querySelector('.complex')
	.insertAdjacentHTML('beforeend',
	`
	
	<section id="complex-main-img">
		<div class="container-fluid">
			${choosingAnEntrance()}
		</div>
		<div class="container pc">
			<div class="searchBlock mt50" id="kvartiry">
				<div class="search" id=""></div>
				<div class="apartmentsBlock"></div>
			</div>
		</div>
	</section>

	<section>
		<div class="container">
			<div class="heading">
				<h2 class="caps">${o.data.name}</h2>
			</div>
			<div class="right-block mb50">
				<p>${descriptionComplex()}</p>
			</div>
		</div>
	</section>

	<section>
		<div class="container">
			<div class="heading">
				<h1 class="caps">Параметры</h1>
			</div>
			<div class="butter">
				<div class="right-block mb50">
					<h3>${generalInformationMini()}</h3>
				</div>
				<div class="dopy">
					<div class="item">
						<svg enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><circle cx="53.646" cy="426.537" r="7.5"/><circle cx="457.906" cy="426.537" r="7.5"/><path d="m504.5 403.281c4.142 0 7.5-3.357 7.5-7.5v-31.062c0-4.143-3.358-7.5-7.5-7.5h-225.469v-35.492c6.763-2.364 13.092-5.756 18.875-10.121 3.306-2.495 3.963-7.198 1.468-10.505-2.495-3.304-7.197-3.962-10.504-1.468-3.092 2.333-6.381 4.311-9.839 5.921v-18.62c4.738-3.526 8.605-8.09 11.317-13.389 3.169-6.196 9.237-10.045 15.835-10.045h3.933c-.548 4-1.538 7.915-2.96 11.704-1.457 3.878.506 8.202 4.384 9.658 3.878 1.457 8.202-.507 9.658-4.385 2.059-5.482 3.406-11.167 4.028-16.978h8.43c4.142 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5h-27.473c-12.258 0-23.442 6.979-29.189 18.213-.668 1.305-1.451 2.536-2.336 3.684-.427-.368-.882-.71-1.363-1.023-3.538-2.304-7.942-2.666-11.782-.968-3.487 1.544-7.477 1.554-10.945.031-3.918-1.722-8.388-1.359-11.955.97-.448.293-.873.611-1.275.953-2.802-3.621-4.52-8.01-4.842-12.671-.458-6.629 1.771-12.937 6.274-17.761 4.508-4.829 10.627-7.489 17.229-7.489 12.7 0 23.031-10.332 23.031-23.031v-39.094h29.625c17.92 0 32.5-14.579 32.5-32.5v-105.313c0-17.944-14.537-32.5-32.5-32.5h-105.311c-17.92 0-32.5 14.579-32.5 32.5v105.312c0 17.944 14.537 32.5 32.5 32.5h29.625v19.965c-28.629 10.048-47.91 38.139-46.521 68.937 1.273 28.227 20.099 53.141 46.521 62.483v35.522h-225.469c-4.142 0-7.5 3.357-7.5 7.5v31.062c0 4.143 3.358 7.5 7.5 7.5h8.031v47.125h-8.031c-4.142 0-7.5 3.357-7.5 7.5v31.062c0 4.143 3.358 7.5 7.5 7.5h226.723c3.118 9.029 11.702 15.532 21.777 15.532s18.659-6.503 21.777-15.531h226.723c4.142 0 7.5-3.357 7.5-7.5v-31.062c0-4.143-3.358-7.5-7.5-7.5h-8.031v-47.125h8.031zm-7.5-31.062v16.062h-217.969v-16.062zm-253.931-216.907 83.087-83.087v25.405l-57.682 57.682zm65.587 0h-18.968l36.468-36.468v18.968c0 9.65-7.85 17.5-17.5 17.5zm5.885-139.302-127.688 127.686c-.664-1.863-1.009-3.847-1.009-5.884v-18.512l47.091-47.091c2.929-2.93 2.929-7.678 0-10.607-2.929-2.928-7.678-2.928-10.606 0l-36.485 36.485v-25.405l57.682-57.682h25.405l-21.651 21.651c-2.929 2.93-2.929 7.678 0 10.607 2.929 2.928 7.678 2.928 10.606 0l32.258-32.258h18.512c2.037 0 4.021.346 5.885 1.01zm-128.697 16.49c0-9.649 7.851-17.5 17.5-17.5h18.969l-36.469 36.469zm11.616 121.803 127.687-127.687c.664 1.864 1.009 3.847 1.009 5.884v18.512l-104.301 104.3h-18.512c-2.036 0-4.019-.345-5.883-1.009zm3.972 104.235c-1.16-25.727 16.043-49.043 40.906-55.442 3.314-.854 5.63-3.842 5.63-7.264v-25.52h16.062v39.094c0 4.429-3.603 8.031-8.031 8.031-10.649 0-20.926 4.467-28.195 12.254-7.371 7.897-11.02 18.206-10.273 29.027.775 11.232 6.456 21.482 15.438 28.182v18.603c-18.092-8.507-30.62-26.643-31.537-46.965zm-186.432 113.681h217.969v16.062h-217.969zm0 93.187h58.299c4.142 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5h-42.768v-47.125h202.438v47.125h-124.67c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5h124.669v16.062h-217.968zm241 31.594c-4.428 0-8.031-3.603-8.031-8.031 0-13.623 0-194.965 0-205.549 5.231 1.532 10.821 1.532 16.062 0v205.549c0 4.428-3.603 8.031-8.031 8.031zm241-15.531h-217.969v-16.062h217.969zm-15.531-31.063h-202.438v-47.125h202.438z"/></g></svg>
						<div class="param">
							<span>Срок сдачи</span>
							<span>${o.parameters.deadline[0]} квартал ${o.parameters.deadline[1]} года</span>
						</div>
					</div>
					<div class="item">
						<svg enable-background="new 0 0 511.805 511.805" viewBox="0 0 511.805 511.805" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m496.111 247.379c30.96-29.378 13.391-83.405-28.909-88.97l-94.349-13.709c-12.106-1.759-22.567-9.358-27.981-20.327l-6.656-13.486c-1.834-3.715-6.332-5.24-10.045-3.407-3.715 1.834-5.239 6.331-3.406 10.046l6.656 13.487c7.6 15.397 22.283 26.064 39.275 28.533l94.348 13.709c30.154 3.786 42.761 42.601 20.596 63.382l-68.271 66.543c-12.297 11.986-17.905 29.246-15.002 46.17l16.116 93.961c2.445 14.254-3.08 27.839-14.78 36.341-11.704 8.504-26.335 9.562-39.14 2.831l-84.388-44.363c-15.199-7.99-33.348-7.99-48.547 0l-84.388 44.363c-12.804 6.732-27.436 5.673-39.14-2.831-11.7-8.502-17.225-22.087-14.78-36.341l16.116-93.961c2.903-16.924-2.705-34.184-15.002-46.17l-68.271-66.543c-22.171-20.788-9.549-59.598 20.597-63.382l94.347-13.709c16.993-2.468 31.676-13.135 39.276-28.533l42.194-85.489c12.919-27.507 53.735-27.499 66.65 0l20.044 40.612c1.834 3.715 6.332 5.239 10.045 3.406 3.714-1.833 5.239-6.331 3.406-10.046l-20.045-40.611c-18.374-38.521-75.187-38.509-93.552 0l-42.195 85.489c-5.414 10.969-15.874 18.569-27.981 20.327l-94.347 13.709c-42.315 5.568-59.861 59.604-28.91 88.97l68.271 66.543c8.76 8.538 12.755 20.834 10.687 32.89l-16.116 93.961c-3.381 19.71 4.569 39.258 20.748 51.014 16.18 11.757 37.231 13.28 54.937 3.973l84.388-44.363c10.829-5.693 23.759-5.693 34.587 0l84.388 44.363c7.701 4.048 16.032 6.047 24.322 6.047 10.771 0 21.472-3.376 30.615-10.02 16.179-11.756 24.129-31.304 20.748-51.014l-16.116-93.961c-2.068-12.056 1.927-24.352 10.687-32.89z"/><path d="m475.171 225.893c6.176-6.02 8.272-14.51 5.607-22.711-2.666-8.203-9.354-13.842-17.89-15.081l-94.348-13.709c-21.88-3.179-40.785-16.914-50.57-36.739l-42.195-85.489c-7.705-16.403-32.045-16.398-39.747 0l-42.194 85.488c-9.785 19.826-28.69 33.56-50.57 36.74l-94.347 13.708c-8.537 1.24-15.225 6.878-17.891 15.082-2.665 8.201-.568 16.691 5.607 22.711l68.272 66.544c15.833 15.432 23.054 37.656 19.317 59.448l-3.746 21.838c-.7 4.083 2.042 7.961 6.124 8.661 4.086.704 7.96-2.042 8.66-6.125l3.746-21.838c4.572-26.66-4.262-53.847-23.631-72.727l-68.272-66.544c-4.364-3.802-1.793-11.695 3.97-12.205l94.347-13.709c26.767-3.889 49.894-20.691 61.865-44.945l42.194-85.488c2.267-5.325 10.577-5.326 12.845 0l42.194 85.489c11.971 24.254 35.099 41.055 61.865 44.944l94.348 13.71c2.923.424 4.868 2.064 5.781 4.872.912 2.806.302 5.273-1.811 7.333l-68.271 66.543c-19.37 18.88-28.204 46.068-23.631 72.728l16.116 93.961c.394 2.294-.041 4.041-1.409 5.664-2.37 2.723-5.814 3.651-8.983 1.878l-84.388-44.363c-23.489-12.53-52.977-12.53-76.466 0l-84.387 44.363c-3.168 1.773-6.615.845-8.983-1.877-1.368-1.623-1.803-3.37-1.409-5.666l6.393-37.274c.7-4.083-2.042-7.961-6.124-8.661-4.087-.703-7.96 2.042-8.66 6.125l-6.393 37.275c-1.143 6.668.491 12.847 4.725 17.87 6.74 8.033 18.215 10.556 27.432 5.486l84.388-44.363c19.201-10.242 43.305-10.242 62.506 0l84.387 44.362c9.215 5.071 20.691 2.547 27.432-5.487 4.235-5.024 5.869-11.204 4.725-17.87l-16.116-93.961c-3.738-21.792 3.483-44.016 19.317-59.449z"/></g></g></svg>
						<div class="param">
							<span>Класс жилья</span>
							<span>${o.parameters.class}</span>
						</div>
					</div>
					<div class="item">
						<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve"><g><g><path d="M494.354,414.741c-0.144-0.136-0.291-0.267-0.442-0.395L343.659,287.752c-4.05-3.412-10.038-3.157-13.784,0.587 l-13.578,13.578l-41.839-41.839l63.448-63.448c12.141-12.142,17.338-29.433,13.901-46.256 c-3.437-16.822-14.999-30.691-30.928-37.098L45.342,2.452C32.889-2.557,19.256,0.227,9.765,9.718S-2.511,32.842,2.497,45.296 l110.825,275.537c6.407,15.93,20.277,27.492,37.099,30.928c3.417,0.698,6.851,1.039,10.258,1.039 c13.374,0,26.323-5.265,35.998-14.94l63.356-63.356l41.839,41.839l-13.578,13.578c-3.744,3.745-4,9.733-0.587,13.784 l126.594,150.253c0.128,0.151,0.259,0.299,0.395,0.442c10.549,11.138,24.806,17.387,40.146,17.596 c0.264,0.003,0.527,0.005,0.79,0.005c15.043,0,29.157-5.843,39.819-16.504c10.848-10.848,16.707-25.269,16.499-40.609 C511.741,439.547,505.492,425.29,494.354,414.741z M239.224,224.845c-3.983-3.981-10.44-3.982-14.424,0 c-3.983,3.983-3.983,10.441,0,14.424l20.81,20.81l-63.356,63.356c-7.392,7.393-17.505,10.431-27.75,8.341 c-10.243-2.093-18.355-8.856-22.256-18.554L21.422,37.684c-2.868-7.131,1.392-12.168,2.766-13.541 c1.041-1.041,4.184-3.738,8.747-3.738c1.46,0,3.067,0.276,4.796,0.971l275.537,110.825c9.699,3.901,16.462,12.013,18.554,22.256 c2.093,10.243-0.947,20.358-8.34,27.75l-63.448,63.448L239.224,224.845z M481.028,481.073 c-6.802,6.803-15.806,10.529-25.405,10.529c-0.167,0-0.337-0.001-0.505-0.004c-9.694-0.132-18.71-4.044-25.421-11.024 L309.34,337.722l28.338-28.337l142.851,120.358c6.981,6.711,10.894,15.727,11.025,25.421 C491.686,464.951,487.948,474.153,481.028,481.073z"/></g></g><g><g><path d="M80.289,89.192L68.566,60.418c-2.124-5.217-8.077-7.725-13.293-5.597c-5.217,2.125-7.723,8.077-5.597,13.292 l11.723,28.773c1.611,3.957,5.425,6.354,9.448,6.354c1.281,0,2.584-0.243,3.845-0.757C79.908,100.359,82.414,94.408,80.289,89.192 z"/></g></g><g><g><path d="M131.722,215.434l-36.146-88.723c-2.124-5.216-8.076-7.725-13.293-5.596c-5.217,2.125-7.723,8.077-5.597,13.293 l36.146,88.723c1.611,3.956,5.425,6.353,9.448,6.353c1.281,0,2.584-0.243,3.845-0.757 C131.342,226.601,133.847,220.65,131.722,215.434z"/></g></g></svg>
						<div class="param">
							<span>Материал стен</span>
							<span>${o.parameters.material}</span>
						</div>
					</div>
					<div class="item">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve"><g><g><path d="M194.116,0v16.907h188.457v106.867H73.169V16.907h92.816V0H11.253v140.681h433.235V0H194.116z M56.262,123.774H28.16 V16.907h28.102V123.774z M427.582,123.774h-0.001H399.48V16.907h28.102V123.774z"/></g></g><g><g><polygon points="90.019,33.757 90.019,87.219 106.926,87.219 106.926,50.664 267.254,50.664 267.254,33.757 "/></g></g><g><g><rect x="284.129" y="33.757" width="22.504" height="16.907"/></g></g><g><g><path d="M464.164,61.886v16.907h19.676v72.436l-40.056,40.056H225.043v101.27h-39.382v98.465h16.907v-30.924h61.857v134.997 h-61.857v-75.94h-16.907v92.847h95.671V292.556H241.95v-84.363h208.838l49.96-49.96V61.886H464.164z M264.426,309.462v33.727 h-61.857v-33.727H264.426z"/></g></g><g><g><rect x="222.25" y="461.336" width="22.504" height="16.907"/></g></g><g><g><rect x="222.25" y="427.579" width="22.504" height="16.907"/></g></g><g><g><rect x="222.25" y="393.821" width="22.504" height="16.907"/></g></g></svg>
						<div class="param">
							<span>Отделка</span>
							<span>${o.parameters.finishing}</span>
						</div>
					</div>
				</div>
				<div class="right-block mt50">
					<h3>Что еще?</h3>
					${generalInformation()}
				</div>
			</div>
		</div>
	</section>

	<section id="renders">
		<div class="container">
			<div class="heading">
				<h1 class="caps">Визуализация</h1>
			</div>
			<div class="right-block">
				<p class="mb50">Наши визуализации позволят вам окунуться в атмосферу будущего жилого комплекса, рассмотреть детали архитектуры, ознакомиться с ландшафтным дизайном и увидеть потенциал будущего дома.</p>
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

	<section class="contact-information">
		<div class="container">
			<div class="heading">
				<h1 class="caps">Расположение</h1>
			</div>
			<div class="right-block">
				<p class="mb50">ЖК "${o.data.name}" расположен неподалеку от всех необходимых объектов инфраструктуры. В пешей доступности находятся школы, детские сады, аптеки, остановки общественного транспорта, а также торговые центры.</p>
			</div>
			<div id="mini-map"></div>
		</div>
	</section>

	<section id="progress">
		<div class="container">
			<div class="heading">
				<h1 class="caps">Ход строительства</h1>
			</div>
			<div class="right-block">
				<p class="mb50">Независимо от погодных условий, мы выезжаем на строительную площадку и готовим для вас материал. Мы понимаем, что интересует каждого из вас, и постоянно делимся информацией о ходе строительства.</p>
			</div>
			<div class="constructionProgressBlock"></div>
		</div>
	</section>

	<section id="documents">
		<div class="container">
			<div class="heading">
				<h2 class="caps">Документация</h2>
			</div>
			<div class="right-block mb50">
				<p>Список законодательных актов, необходимых для детального изучения строительного объекта, включая нормативные документы и правовые акты, регулирующие строительную деятельность.</p>
			</div>
			<div class="list-documents">
				${getDocBox()}
			</div>
		</div>
	</section>
	`
	);

	constructionProgress();
};

if (document.querySelector('.ducIvn')) {
	const ducIvn = document.querySelector('.ducIvn');
	const dc = document.querySelector('.description-complex .dnone');
	ducIvn.addEventListener('click', () => {
		ducIvn.innerText = (ducIvn.innerText === 'Читать далее') ? 'Скрыть' : 'Читать далее';
		dc.classList.toggle('dnone');
	});
};

// Инициализация карусели
$('.owl-carousel')
	.owlCarousel({
		stagePadding: 50,
		loop: true,
		margin: 10,
		nav: true,
		responsive: {
			0: {items: 1},
			768: {items: 3},
			1400: {items: 5}
		}
	})

function descriptionComplex() {
	if (o.parameters.description[1] && o.parameters.description[1].trim() !== "") {
		let code = `
			<div class="description-complex">
				<p class="mb20">${getFirstSentence(o.parameters.description[1])}</p>
		`;
		if (countSentences(o.parameters.description[1]) > 1) {
			code += `
				<div class="dnone"><p class="mb20">${getRemainingSentences(o.parameters.description[1])}</p></div>
				<button class="ducIvn">Читать далее</button>
			`
		};
		code += '</div>'
		return code;
	} else {
		return '';
	}
};

function generalInformation() {
	let code = '<ul class="chekanutiy">';

	if (o.parameters.playground) code += '<li>Детская площадка</li>';
	if (o.parameters.sportsGround) code += '<li>Спортивная площадка</li>';
	if (o.parameters.fencedArea) code += '<li>Огороженная территория</li>';
	if (o.parameters.elevator.passenger) code += '<li>Пассажирский лифт</li>';
	if (o.parameters.elevator.freight) code += '<li>Грузовой лифт</li>';

	code += '</ul>';
	return code;
};

function generalInformationMini() {
	return `
		<div class="general-information-mini">
			<div class="line">Домов<span class="general-circle">${o.parameters.houses}</span></div>
			<div class="line">Подъездов<span class="general-circle">${o.parameters.entrance[1]}</span></div>
			<div class="line">Этажей<span class="general-circle">${o.parameters.floors[1]}</span></div>
		</div>
	`
};

function picturesObject() {
	let code = ``;
	for (let i = 0; i < o.images.renders.pc.quantity; i++) {
		code += `
			<div class="item">
				<img src="/assets/images/objects/${o.data.link}/renders/small/${i + 1}.jpg" alt="">
			</div>
		`
	};
	return code;
};

function choosingAnEntrance() {
	return `
		<div class="complex-block">
			<div class="complexBlocks ${o.data.link}" id="genplan"></div>
			<div class="complex-stat phone">
				<div class="area">
					<div class="left-block">
						<span class="num">${countStatusAvailable(o.apartments)}</span>
						<span>свободных квартир</span>
					</div>
					<div class="right-block">
						<div class="s-data">
							<span>1-комн:</span>
							<span>${countRoomsOne(o.apartments, 1)}</span>
						</div>
						<div class="s-data">
							<span>2-комн:</span>
							<span>${countRoomsOne(o.apartments, 2)}</span>
						</div>
						<div class="s-data">
							<span>3-комн:</span>
							<span>${countRoomsOne(o.apartments, 3)}</span>
						</div>
					</div>
				</div>
				<a href="/%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/${o.data.ssylka}/%D0%BF%D0%BE%D0%B4%D1%8A%D0%B5%D0%B7%D0%B4/1/%D1%8D%D1%82%D0%B0%D0%B6/1/" class="button caps graphite" style="width: 100%; justify-content: center; border: 0;">Перейти</a>
			</div>
		</div>
	`
};

function constructionProgress(m = o.photos[currentYearIndex].month[getLastMonth()].num, y = o.photos[currentYearIndex].year) {

	if (document.querySelector('.construction-progress')) {
		document.querySelector('.construction-progress').remove();
	};

	// открываем код
	let code = `
	<div class="construction-progress">
		<img src="/assets/photos/${o.data.link}/${y}/${m}/1.JPG" class="image">
		<div class="lr">
	`;

	// если фотографий больше, чем 1
	if (o.photos[currentYearIndex].month[currentMonthIndex].numberOfPhotos > 1) {
		code += `
			<div class="active">
				<svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill="#000" />
				</svg>
			</div>
			<div class="active">
				<svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" fill="#000" />
				</svg>
			</div>
		`
	} else {
		code += `
			<div class="not-active">
				<svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" />
				</svg>
			</div>
			<div class="not-active">
				<svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" />
				</svg>
			</div>
		`
	};

	// закрываем, открываем
	code += `
		</div>
		<div class="date">
	`

	// если несколько месяцев
	if (o.photos[currentYearIndex].month.length > 1) {
		code += `
			<div class="active" id="monthButton">
				<span>${months[m - 1]}</span>
				${iconButton}
			</div>
		`
	} else {
		code += `
			<div class="not-active" id="monthButton">
				<span>${months[m - 1]}</span>
			</div>`
	};

	// если несколько лет
	if (o.photos.length > 1) {
		code += `
			<div class="active" id="yearButton">
				<span>${y}</span>
				${iconButton}
			</div>
		`;
	} else {
		code += `<span class="not-active" id="yearButton"><span>${y}</span></span>`;
	};

	// закрываем код
	code += `
		</div>
	</div>
	`

	document.querySelector('.constructionProgressBlock')
		.insertAdjacentHTML('afterbegin', code)

	// Если кнопка активная
	if (document.getElementById("yearButton").className === 'active') {
		document.getElementById("yearButton")
			.addEventListener("click", () => {
				if (document.querySelector('.construction-progress .month')) {
					document.querySelector('.construction-progress .month').remove();
				};
				if (!document.querySelector('.construction-progress .year') && !document.querySelector('.construction-progress .month')) {
					// Создаем выпадающее меню для выбора года
					let menu = document.createElement("div");
					menu.classList.add("year");
					
					// Добавляем в меню список годов
					const yearsArr = o.photos.map(photo => photo.year);
					const years = yearsArr.map(year => String(year));
					for (let i = 0; i < years.length; i++){
						menu.insertAdjacentHTML('beforeend', `<span>${years[i]}</span>`);
					};
					
					// Обработчик события для выбора года
					menu.addEventListener("click", function(event){
						getCurrentIndexYear(event.target.textContent);
						let indexNumMonth = o.photos[currentYearIndex].month.findIndex(el => el.num === m);
						if (indexNumMonth >= 0) {
							currentMonthIndex = indexNumMonth;
						} else {
							currentMonthIndex = getLastMonth();
						};
						menu.remove();
						constructionProgress(o.photos[currentYearIndex].month[currentMonthIndex].num, currentYearIndex.year);
					});
			
					// Добавляем меню на страницу
					if (!document.querySelector('.construction-progress .year')) {
						document.querySelector('.construction-progress').appendChild(menu);
					}
				} else {
					if (document.querySelector('.construction-progress .year')) {
						document.querySelector('.construction-progress .year').remove();
					}
				}
			});
	};

	if (document.getElementById("monthButton").className === 'active') {
		document.getElementById("monthButton")
			.addEventListener("click", () => {
				if (document.querySelector('.construction-progress .year')) {
					document.querySelector('.construction-progress .year').remove();
				};
				if (!document.querySelector('.construction-progress .month') && !document.querySelector('.construction-progress .year')) {
					// Создаем выпадающее меню для выбора месяца
					let menu = document.createElement("div");
					menu.classList.add("month");
					
					// Добавляем в меню список месяцев
					for (let i = 0; i < o.photos[currentYearIndex].month.length; i++){
						menu.insertAdjacentHTML('beforeend', `<span>${months[o.photos[currentYearIndex].month[i].num - 1]}</span>`);
					};

					// Обработчик события для выбора месяца
					menu.addEventListener("click", function(event){
						getCurrentIndexMonth(event.target.textContent);
						menu.remove();
						constructionProgress(o.photos[currentYearIndex].month[currentMonthIndex].num, currentYearIndex.year);
					});
					
					// Добавляем меню на страницу
					if (!document.querySelector('.construction-progress .month')) {
						document.querySelector('.construction-progress').appendChild(menu);
					}
				} else {
					if (document.querySelector('.construction-progress .month')) {
						document.querySelector('.construction-progress .month').remove();
					}
				}
			});
	};

	document.querySelector('.lr').children[0].addEventListener("click", () => {
		changeImage("left")
	});
	document.querySelector('.lr').children[1].addEventListener("click", () => {
		changeImage("right")
	});

	function changeImage(direction) {
		var image = document.querySelector(".construction-progress .image");
		
		// получение порядкового номера текущей фотографии (исходя из ее имени)
		var currentImageNumber = parseInt(image.src.split("/").pop().split(".")[0]);
		
		// определение нового порядкового номера фотографии
		var newImageNumber;
		
		if (direction === "left") {
			newImageNumber = currentImageNumber - 1;
			
			// проверка, если достигнуто начало списка фотографий, вернуться в конец списка
			if (newImageNumber < 1) {
				newImageNumber = o.photos[currentYearIndex].month[currentMonthIndex].numberOfPhotos;
			}
		} else if (direction === "right") {
			newImageNumber = currentImageNumber + 1;
			
			// проверка, если достигнут конец списка фотографий, вернуться в начало списка
			if (newImageNumber > o.photos[currentYearIndex].month[currentMonthIndex].numberOfPhotos) {
				newImageNumber = 1;
			}
		}
		
		// замена имени файла в URL картинки
		var newImageURL = image.src.replace(currentImageNumber + ".JPG", newImageNumber + ".JPG");
		image.src = newImageURL;
	};
	
};

// Функция возвращает номер ячейки массива с последним месяцем в выбранном году
function getLastMonth() {
	return o.photos[currentYearIndex].month.findIndex(indexMonth => indexMonth.num === Math.max(...o.photos[currentYearIndex].month.map(indexMonth => indexMonth.num)));
};

// Функция определяет номера ячейки массива с месяцем по текущему значению, записанному в кнопке
function getCurrentIndexMonth(value) {
	currentMonthIndex = o.photos[currentYearIndex].month.findIndex(indexMonth => indexMonth.num === (months.indexOf(value) + 1));
};

// Функция определяет номера ячейки массива с годом по текущему значению, записанному в кнопке
function getCurrentIndexYear(value) {
	currentYearIndex = o.photos.findIndex(indexYear => indexYear.year === Number(value));
};

function getDocBox() {
	let code = '';
	for (let i = 0; i < o.documents.length; i++) {
		code += `
			<a href="${o.documents[i][2]}" target="_blank">
				<div class="item">
					<div class="name">
						<span>${o.documents[i][0]}</span>
						<svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
							<path clip-rule="evenodd" d="M1.31727 0.182857L24.941 0.186412L24.9445 23.8101L22.9445 23.8104L22.9415 3.59975L2.01834 24.5185L0.604274 23.1041L21.5269 2.1859L1.31696 2.18286L1.31727 0.182857Z"></path>
						</svg>
					</div>
					<div class="info">
						<span>${o.documents[i][3]}</span>
						<span>${o.documents[i][1]}</span>
					</div>
				</div>
			</a>
		`
	};
	return code;
};

// Определяем максимальный приоритет объектов
// function findMaxPriorityObject(listObjects) {
// 	let maxPriority = -Infinity; // инициализируем переменную с минимальным значением
// 	let maxPriorityObject = null;

// 	for (let key in listObjects) {
// 		if (listObjects.hasOwnProperty(key)) {
// 			let object = listObjects[key];
// 			if (object.parameters && object.parameters.priority > maxPriority) {
// 				maxPriority = object.parameters.priority;
// 				maxPriorityObject = object;
// 			}
// 		}
// 	}

// 	return maxPriorityObject;
// };