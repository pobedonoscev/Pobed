// Подгружаем код
import { allObjects } from '/assets/js/get-objects.js';
import { availableApartments, saleApartments, checkUndefined } from '/assets/js/script.js';

// Функция создает код для Fid файла ДомКлик
function createFidCode(object) {
	const apartments = availableApartments(object.apartments);

	const arrRendersDomclick = object.images.renders.domclick.renders.presence ? getRenders(object.data.link, object.images.renders.domclick.renders) : undefined;
	const arrRendersEntrance = object.images.renders.domclick.entrance.presence ? getRenders(object.data.link, object.images.renders.domclick.entrance) : undefined;

	function getRenders(link, type) {
		let arr = [];
		for (let i = 0; i < type.quantity; i++) {
			arr.push(`/fid/images/objects/${link}/${type.folder}/domclick/${i + 1}.jpg`);
		}
		return arr;
	};

	let code = '';

	// начало
	code += `<?xml version="1.0" encoding="UTF-8"?>
<complexes>
	<complex>
	`

	// формирование параметров
	code += `
		<id>${object.parameters.id.domclick[1]}</id>
		<name>ЖК "${object.data.name}"</name>
		<latitude>${object.parameters.coordinates[0][1]}</latitude>
		<longitude>${object.parameters.coordinates[0][0]}</longitude>
		<address>${object.parameters.location}</address>
	`

	// формирование images
	code += `
		<images>${images([arrRendersDomclick, arrRendersEntrance])}
		</images>
	`

	// формирование videos
	// необязательный
	if (object.videos.length > 0) {
		code += `
		<videos>`
		for (let i = 0; i < object.videos.length; i++) {
			code += `
			<video>
				<url>https://xn--90acfdb1cddbd3a4d.xn--p1ai/${object.videos[i]}</url>
			</video>`
		};
		code += `
		</videos>\n`
	};

	// формирование buildings
	code += `
		<buildings>`
	for (let i = 0; i < object.parameters.constructionStage.length; i++) {
	code += `
			<building>
				<id>${object.parameters.id.domclick[2][i]}</id>
				<fz_214>${object.parameters.fz214}</fz_214>
				<name>Этап ${i + 1}</name>
				<floors>${object.parameters.floors[1]}</floors>
				<building_state>${object.parameters.status}</building_state>
				<built_year>${object.parameters.deadline[1]}</built_year>
				<ready_quarter>${object.parameters.deadline[0]}</ready_quarter>
				<building_type>${material(object.parameters.material)}</building_type>
				<!-- <ceiling_height>${object.parameters.ceilingHeight / 100}</ceiling_height> -->
				<!-- ${lifts(object.parameters.elevator)} -->
				<flats>
	`;
	for (let a = 0; a < apartments.length; a++) {
		
		if (object.parameters.constructionStage[i][0] <= apartments[a].number && apartments[a].number <= object.parameters.constructionStage[i][1]) {
				code += `
					<flat>
						<flat_id>${apartments[a].number}</flat_id>
						<apartment>${apartments[a].number}</apartment>
						<floor>${apartments[a].floor}</floor>
						<room>${apartments[a].rooms}</room>
						<plan>https://xn--90acfdb1cddbd3a4d.xn--p1ai/assets/images/objects/${object.data.link}/plans/flat/1/${apartments[a].number}.png</plan>
						<!-- <ceiling_height>${ceilingHeight(a)}</ceiling_height> -->
						<balcony>${balconyOrLoggia(apartments[a].balcony, apartments[a].loggia)}</balcony>
						<renovation>${finishing(object.parameters.finishing)}</renovation>
						<price>${apartments[a].fullPrice}</price>
						<area>${apartments[a].areaTotal}</area>
						<living_area>${apartments[a].areaLiving}</living_area>
						<kitchen_area>${apartments[a].areaKitchen}</kitchen_area>
						<window_view>${windowView(apartments[a].windowView)}</window_view>
						<bathroom>${bathroom(apartments[a].bathroom)}</bathroom>
						<housing_type>${category(object.parameters.category)}</housing_type>
						<ready_housing>1</ready_housing>
					</flat>
		`;
		};
	};
	code += `
				</flats>
			</building>
	`;
	};
	code += `	</buildings>`

	function finishing(value) {
		if (value === 'предчистовая') return 'да'
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

	function balconyOrLoggia(balcony, loggia) {
		if (balcony === true && loggia === false) {
			return 'балкон'
		} else if (balcony === false && loggia === true) {
			return 'лоджия'
		} else if (balcony === true && loggia === true) {
			return 'балкон и лоджия'
		} else {
			return 'нет'
		}
	};

	function ceilingHeight(a) {
		if (checkUndefined(object.apartments[a].ceilingHeight)) {
			return object.apartments[a].ceilingHeight;
		} else {
			return object.parameters.ceilingHeight / 100;
		};
	};

	function bathroom(value) {
		if (value === true) {
			return 'совмещенный'
		} else {
			return 'раздельный'
		}
	};

	// формирование discounts
	// необязательный
	if (object.apartments.some(o => o.sale === true)) {
		const a = saleApartments(object.apartments);
		code += `
		<discounts>`
		for (let i = 0; i < a.length; i++) {
			code += `
			<discount>
				<name>Скидка на ${a[i].rooms}-комнатную квартиру №${a[i].number} на ${a[i].floor} этаже</name>
				<description>Отличный шанс купить квартиру о которой вы давно мечтаете - выгодно. Мы предлагаем ${a[i].rooms}-комнатную квартиру на ${a[i].floor} этаже по сниженной цене. Специальная цена доступна для наших покупателей в независимости от способа приобретения недвижимости.</description>
				<image>https://xn--90acfdb1cddbd3a4d.xn--p1ai/assets/images/objects/${object.data.link}/plans/flat/1/${a[i].number}.png</image>
				<site>https://xn--90acfdb1cddbd3a4d.xn--p1ai/%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/${object.data.ssylka}/%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D0%B0/${a[i].number}/</site>
			</discount>`
		};
		code += `
		</discounts>\n
		`
	};

	code += `
		<description_main>
			<title>Жилой комплекс ${object.data.name}</title>
			<text>${object.parameters.description}</text>
		</description_main>
	`

	code += `
		<infrastructure>
			<parking>${parking(object.parameters.parking)}</parking>
			<security>${object.parameters.security}</security>
			<fenced_area>${object.parameters.fencedArea}</fenced_area>
			<sports_ground>${object.parameters.sportsGround}</sports_ground>
			<playground>${object.parameters.playground}</playground>
			<school>${object.parameters.school}</school>
			<kindergarten>${object.parameters.kindergarten}</kindergarten>
		</infrastructure>
	`

	// формирование sales_info
	code += `
		<sales_info>
			<sales_phone>${object.parameters.office.phone}</sales_phone>
			<sales_address>${object.parameters.office.address}</sales_address>
			<sales_latitude>${object.parameters.office.coordinates[0]}</sales_latitude>
			<sales_longitude>${object.parameters.office.coordinates[1]}</sales_longitude>
			<timezone>+3</timezone>
			<work_days>
	`
	for (let i = 0; i < object.parameters.office.worksDay.length; i++) {
		code += `
				<work_day>
					<day>${object.parameters.office.worksDay[i][0]}</day>
					<open_at>${object.parameters.office.worksDay[i][1]}</open_at>
					<close_at>${object.parameters.office.worksDay[i][2]}</close_at>
				</work_day>
		`			
	}
	code += `
			</work_days>
		</sales_info>
	`;

	// формирование developer
	code += `
		<developer>
			<id>${object.parameters.id.domclick[0]}</id>
			<name>Застройщик</name>
			<phone>+74852333362</phone>
			<site>победоносцев.рф</site>
			<logo>https://xn--90acfdb1cddbd3a4d.xn--p1ai/assets/images/logo.svg</logo>
		</developer>
	`

	// конец
	code += `
	</complex>
</complexes>
	`

	return code;
};

function lifts(elevator) {
	let code = '';
	if (elevator.passenger > 0) code += `<passenger_lifts_count>${elevator.passenger}</passenger_lifts_count>`;
	if (elevator.freight > 0) code += `<cargo_lifts_count>${elevator.freight}</cargo_lifts_count>`;
	return code;
};

function images(arrRenders) {
	let code = '';

	arrRenders.forEach(arr => {
		arr = getRandomArr(arr);
		if (arr.length > 0) {
			for (let i = 0; i < arr.length; i++) {
				code += `
			<image>https://xn--90acfdb1cddbd3a4d.xn--p1ai${arr[i]}</image>`;
			};
		};
	});

	return code;
};

function getRandomArr(arr) {
	return arr.sort(() => Math.random() - 0.5);
};

function category(value) {
	if (value == 'квартиры') return 0;
	if (value == 'апартаменты') return 1;
};

function material(value) {
	if (value == 'кирпич') return 'кирпичный';
	if (value == 'панель') return 'панельный';
	if (value == 'блок') return 'блочный';
	if (value == 'монолит') return 'монолитный';
	if (value == 'монолит-кирпич') return 'кирпично-монолитный';
	if (value == 'дерево') return 'деревянный';
};

function parking(value) {
	if (value == 'открытая') {
		return 'наземная'
	} else {
		return value;
	}
};

function getFidFile(nameObject) {
	allObjects.forEach(o => {
		if (nameObject === o.data.name) {
			const fidCode = createFidCode(o);
			saveToPC(fidCode, o.data.link);
		};
	});
};

// Сохранение XML файла на компьютере
function saveToPC(str = "", name){
	let blob = new Blob([str], {type: "application/xml"});
	let link = document.createElement("a");
	link.setAttribute("href", URL.createObjectURL(blob));
	link.setAttribute("download", `${name}`);
	link.click();
};

getFidFile('Экогород 2');