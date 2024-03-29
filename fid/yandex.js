// Подгружаем код
import { listObjects } from '/assets/js/get-objects.js';
import { availableApartments } from '/assets/js/script.js';
import { developer } from '/fid/builder.js';
const currentDate = getCurrentDateTimeWithTimezone();

// Функция создает код для Fid файла Авито
function createFidCode(object) {
	const apartments = availableApartments(object.apartments);

	// начало
	let ads = ``;
	// формирование Ads
	for (let i = 0; i < object.parameters.constructionStage.length; i++) {
		for (let a = 0; a < apartments.length; a++) {
			if (object.parameters.constructionStage[i][0] <= apartments[a].number && apartments[a].number <= object.parameters.constructionStage[i][1]) {
				ads += `
	<offer internal-id="${identifier(apartments[a], object)}">
		<type>продажа</type>
		<property-type>жилая</property-type>
		<category>квартира</category>
		<url>${developer.url}%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/${object.data.ssylka}/%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D0%B0/${apartments[a].number}/</url>
		<creation-date>${currentDate}</creation-date>
		<location>
			<country>${object.parameters.location[0]}</country>
			<region>${object.parameters.location[1]}</region>
			<district>${object.parameters.location[2]}</district>
			<locality-name>${object.parameters.location[3]}</locality-name>
			<address>${object.parameters.location[4]}</address>
			<latitude>${object.parameters.coordinates[0][0]}</latitude>
			<longitude>${object.parameters.coordinates[0][1]}</longitude>
		</location>
		<sales-agent>
			<name>Елена Демидова</name>
			<phone>+74852333362</phone>
			<category>developer</category>
			<organization>${developer.organization}</organization>
			<url>${developer.url}</url>
			<email>${developer.email}</email>
			<photo>${developer.logo}</photo>
		</sales-agent>
		<deal-status>первичная продажа</deal-status>
		<price>
			<value>${apartments[a].fullPrice}</value>
			<currency>RUB</currency>
		</price>
		<area><value>${apartments[a].areaTotal}</value></area>
		<living-space><value>${apartments[a].areaLiving}</value></living-space>
		<kitchen-space><value>${apartments[a].areaKitchen}</value></kitchen-space>
		<renovation>${renovation(object.parameters.finishing)}</renovation>
		<new-flat>1</new-flat>
		<floor>${apartments[a].floor}</floor>
		<rooms>${apartments[a].rooms}</rooms>
		<balcony>${balconyOrLoggiaMulti(apartments[a])}</balcony>
		<window-view>${viewFromWindows(apartments[a])}</window-view>
		<bathroom-unit>${bathroom(apartments[a])}</bathroom-unit>
		<floors-total>${object.parameters.floors[1]}</floors-total>
		<building-name>${object.data.name}</building-name>
		<yandex-building-id>${object.parameters.id.yandex[0]}</yandex-building-id>
		<yandex-house-id>${object.parameters.id.yandex[findApartmentBuilding(apartments[a].number, object.parameters.constructionStage)]}</yandex-house-id>
		<building-state>${buildingStatus(object.parameters.status)}</building-state>
		<built-year>${object.parameters.deadline[1]}</built-year>
		<ready-quarter>${object.parameters.deadline[0]}</ready-quarter>
		<building-type>${houseType(object.parameters.material)}</building-type>
		<building-section>${findApartmentBuilding(apartments[a].number, object.parameters.constructionStage)}</building-section>
		<ceiling-height>${object.parameters.ceilingHeight / 100}</ceiling-height>
		<lift>${elevator(object.parameters.elevator)}</lift>
		<guarded-building>${object.parameters.fencedArea}</guarded-building>
		${imagePlans(apartments[a], object)}
		<description>Продаётся ${apartments[a].rooms}-комнатная квартира площадью ${apartments[a].areaTotal} м² в строящемся многоквартирном доме ${object.data.name}. Строительством дома занимается Pobedonoscev Group которая стала победителем премии "Лучший строящийся жилой комплекс" и "Лучший проект жилья комфорт-класса" в Ярославле.</description>
	</offer>
		`;
			};
		};
	};

	return ads;
};

function getCurrentDateTimeWithTimezone(){
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const offset = -now.getTimezoneOffset() / 60; // вычисляем часовой пояс и меняем знак для формата UTC

  const timezoneOffset = (offset >= 0 ? '+' : '-') + String(offset).padStart(2, '0') + ':00';

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneOffset}`;
};

function identifier(a, o) {
	return o.data.variable + '-' + a.number;
};

function bathroom(a) {
	if (a.bathroom === true) return 'совмещенный'
	if (a.bathroom === false) return 'раздельный'
};

function balconyOrLoggiaMulti(a) {
	let code = '';
	if (a.balcony) code += 'балкон';
	if (a.loggia) code += 'лоджия';
	return code;
};

function findApartmentBuilding(a, buildingData) {
	for (let i = 0; i < buildingData.length; i++) {
		if (a >= buildingData[i][0] && a <= buildingData[i][1]) {
			return `${i + 1}`;
		}
	};
	console.log(`Квартира ${a} не относится к корпусу ни одного из зданий`);
};

function buildingStatus(status) {
	if (status === 'unfinished') return 'unfinished';
	if (status === 'ready') return 'hand-over';
};

function imagePlans(a, o) {
	let code = `<image tag="plan">https://xn--90acfdb1cddbd3a4d.xn--p1ai/assets/images/objects/${o.data.link}/plans/flat/1/${a.number}.png</image>`;
	let arrRenders = getArrRenders(o);
	if (o.images.renders.big.length > 0) {
		for (let i = 0; i < 3; i++) {
			code += `<image>https://xn--90acfdb1cddbd3a4d.xn--p1ai${arrRenders[i]}</image>`;
		}
	};
	return code;
};

function getArrRenders(o) {
	return o.images.renders.big.sort(() => Math.random() - 0.5);
};

function renovation(quality) {
	if (quality === 'черновая' || quality === 'предчистовая') return 'черновая отделка';
	if (quality === 'чистовая') return 'чистовая отделка';
};

function viewFromWindows(a) {
	let code = '';
	a.windowView.forEach(el => {
		code += el === 'двор' ? 'во двор' : 'на улицу';
	});
	return code;
};

function houseType(material) {
	if (material === 'кирпич') return 'кирпичный';
	if (material === 'панель') return 'панельный';
	if (material === 'блок') return 'блочный';
	if (material === 'монолит') return 'монолит';
	if (material === 'монолит-кирпич') return 'монолитно-кирпичный';
	if (material === 'дерево') return 'деревянный';
};

function elevator(el) {
	if (el.passenger > 0 || el.freight > 0) {
		return 'да'
	} else {
		return 'нет'
	}
};

function getFidFile(nameObject) {
	// начало
	let xml = `<?xml version="1.0" encoding="UTF-8"?>
<realty-feed xmlns="http://webmaster.yandex.ru/schemas/feed/realty/2010-06">
<generation-date>${currentDate}</generation-date>
	`
	listObjects.forEach(o => {
		nameObject.forEach(name => {
			if (name === o.data.name) {
				xml += createFidCode(o);
			};
		})
	});
	xml += `
</realty-feed>`
	saveToPC(xml, 'yandex');
};

// Сохранение XML файла на компьютере
function saveToPC(str = "", name) {
	let blob = new Blob([str], {type: "application/xml"});
	let link = document.createElement("a");
	link.setAttribute("href", URL.createObjectURL(blob));
	link.setAttribute("download", `${name}`);
	link.click();
};

getFidFile(['Экогород 2']);