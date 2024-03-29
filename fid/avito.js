// Подгружаем код
import { listObjects } from '/assets/js/get-objects.js';
import { availableApartments } from '/assets/js/script.js';

// Функция создает код для Fid файла Авито
function createFidCode(object) {
	const apartments = availableApartments(object.apartments);

	const arrRendersAvito = object.images.renders.avito.renders.presence ? getRenders(object.data.link, object.images.renders.avito.renders) : undefined;
	const arrRendersEntrance = object.images.renders.avito.entrance.presence ? getRenders(object.data.link, object.images.renders.avito.entrance) : undefined;
	
	function getRenders(link, type) {
		let arr = [];
		for (let i = 0; i < type.quantity; i++) {
			arr.push(`/fid/images/objects/${link}/${type.folder}/avito/${i + 1}.jpg`);
		}
		return arr;
	};

	// начало
	let ads = '';
	// формирование Ads
	for (let i = 0; i < object.parameters.constructionStage.length; i++) {
		for (let a = 0; a < apartments.length; a++) {
			if (object.parameters.constructionStage[i][0] <= apartments[a].number && apartments[a].number <= object.parameters.constructionStage[i][1]) {			
				ads += `
	<Ad>
		<ApartmentNumber>${apartments[a].number}</ApartmentNumber>
		<Floor>${apartments[a].floor}</Floor>
		<Rooms>${apartments[a].rooms}</Rooms>
		<Price>${apartments[a].fullPrice}</Price>
		<Square>${apartments[a].areaTotal}</Square>
		<KitchenSpace>${apartments[a].areaKitchen}</KitchenSpace>
		<LivingSpace>${apartments[a].areaLiving}</LivingSpace>
		<BathroomMulti>
			<Option>${bathroom(apartments[a])}</Option>
		</BathroomMulti>
		<CeilingHeight>${object.parameters.ceilingHeight / 100}</CeilingHeight>
		<ViewFromWindows>
			${ViewFromWindows(apartments[a])}
		</ViewFromWindows>
		<NDAdditionally>${NDAdditionally(object)}</NDAdditionally>
		<Decoration>${finishing(object.parameters.finishing)}</Decoration>
		<BalconyOrLoggiaMulti>
			${balconyOrLoggiaMulti(apartments[a])}
		</BalconyOrLoggiaMulti>

		<Status>Квартира</Status>
		<HouseType>${houseType(object.parameters.material)}</HouseType>
		<Floors>${object.parameters.floors[1]}</Floors>
		<PassengerElevator>${elevator(object.parameters.elevator.passenger)}</PassengerElevator>
		<FreightElevator>${elevator(object.parameters.elevator.freight)}</FreightElevator>
		<Courtyard>${courtyard(object)}</Courtyard>
		<Parking>${parking(object)}</Parking>

		<DateBegin>2017-04-06T21:58:00+03:00</DateBegin>
		<ManagerName>Елена Демидова</ManagerName>
		<ContactPhone>+7 4852 33-33-62</ContactPhone>
		<Description>
			<![CDATA[
				<p>Продаётся ${apartments[a].rooms}-комнатная квартира площадью ${apartments[a].areaTotal} м² в строящемся многоквартирном доме ${object.data.name}. Строительством дома занимается Pobedonoscev Group которая стала победителем премии "Лучший строящийся жилой комплекс" и "Лучший проект жилья комфорт-класса" в Ярославле.</p>
				<p>Дoм pacполoжeн в экoлoгичeски чиcтoм paйонe - в oбилии зелени, свежегo вoздуxа, pядoм рacполагается благоустроенный квартал Экогород с кафе и магазином на территории, одним углом территория дома будет примыкать к Экопарку. Из окон открывается прекрасный вид на сосновый бор! В Заволжском районе очень развитая инфраструктура! Поблизости расположены несколько детских садов, школ, особенно привилегированны гимназия №3, школа №84 с углубленным изучением английского языка, школа №2 и школа №59 с математическим уклоном. Много развивающих секций для детей и взрослых. Есть несколько торгово-развлекательных центров, полноценный кинотеатр, для любителей спорта Lоft Fitnеss и Fitness House, бассейны, гипермаркет Глобус, KDV и Леруа Мерлен и Яркий, пункты выдачи ОZОN и WILDВЕRRIЕS.</p>
				<p>Стены строящегося дома будут выполнены из керамического блока, который отличается своими повышенными характеристиками в отношении теплопроводности и шумоизоляции. Это кирпичный дом, в котором легко дышится летом, а зимой тепло и уютно. Фасад дома облицован натуральным дагестанским камнем. Неповторимая фактура дагестанского песчаника в контрасте с графитовыми оконными и балконными блоками делает дом исключительно стильным. На прилегающей к жилому комплексу территории предусмотрены собственная инфраструктура активного отдыха: детские игровые площадки, зоны отдыха, спортивные площадки, зеленые зоны, открытая парковка. Территория дома будет огорожена.</p>
				<p>Индивидуальное газовое отопление (комфорт, экономия и тепло в любое время года). Квартира с предчистовой отделкой (стяжки полов, подготовка стен, 2-х контурный газовый котел, алюминиевое остекление балконов и лоджий, высокие потолки (2,7м) расширят пространство в Вашей квартире.</p>
				<p>При покупке квартиры Вы можете использовать ипотечное кредитование по льготной ставке, а также использовать сертификаты материнского капитала. Денежные средства до ввода дома в эксплуатацию хранятся на Вашем эскроу-счете! Звоните! Ответим на все Ваши вопросы!</p>
			]]>
		</Description>
		<Images>${images(apartments[a], object, [arrRendersAvito, arrRendersEntrance])}</Images>
		<VideoURL>${videos(object)}</VideoURL>

		<Id>${identifier(apartments[a], object)}</Id>
		<NewDevelopmentId>${newDevelopmentId(apartments[a], object)}</NewDevelopmentId>
		<MarketType>${capitalizeFirstLetter(object.parameters.type)}</MarketType>
		<Category>${capitalizeFirstLetter(object.parameters.category)}</Category>
		<ContactMethod>По телефону и в сообщениях</ContactMethod>
		<SaleMethod>Договор долевого участия</SaleMethod>
		<SaleOptions>
			<Option>Можно в ипотеку</Option>
		</SaleOptions>
		<OperationType>Продам</OperationType>
		<PropertyRights>Застройщик</PropertyRights>
	</Ad>
		`;
		};
	};
	};

	return ads;
};


function bathroom(a) {
	if (a.bathroom === true) return 'Совмещённый'
	if (a.bathroom === false) return 'Раздельный'
};

function ViewFromWindows(a) {
	let code = '';
	a.windowView.forEach(el => {
		code += el === 'двор' ? '<Option>Во двор</Option>' : '<Option>На улицу</Option>';
	});
	return code;
};

function NDAdditionally(o) {
	let code = ``;
	o.parameters.advantages.map(arr => arr[0]).forEach(el => {
		code += `<Option>${el}</Option>`
	});
	return code;
};

function finishing(value) {
	if (value === 'предчистовая') return 'Предчистовая';
	if (value === 'черновая') return 'Без отделки';
	if (value === 'чистовая') return 'Чистовая';
};

function balconyOrLoggiaMulti(a) {
	let code = '';
	if (a.balcony) code += '<Option>Балкон</Option>';
	if (a.loggia) code += '<Option>Лоджия</Option>';
	return code;
};

function houseType(material) {
	if (material === 'кирпич') return 'Кирпичный';
	if (material === 'панель') return 'Панельный';
	if (material === 'блок') return 'Блочный';
	if (material === 'монолит') return 'Монолитный';
	if (material === 'монолит-кирпич') return 'Монолитно-кирпичный';
	if (material === 'дерево') return 'деревянный';
};

function elevator(num) {
	if (num === 0) return 'Нет';
	if (num > 0) return num;
};

function courtyard(o) {
	let code = ``;
	if (o.parameters.fencedArea) code += '<Option>Закрытая территория</Option>';
	if (o.parameters.sportsGround) code += '<Option>Спортивная площадка</Option>';
	if (o.parameters.playground) code += '<Option>Детская площадка</Option>';
	return code;
};

function parking(o) {
	let code = '';
	o.parameters.parking.forEach(el => {
		if (el === 'подземная') code += `<Option>Подземная</Option>`;
		if (el === 'надземная') code += `<Option>Наземная многоуровневая</Option>`;
		if (el === 'открытая') code += `<Option>Открытая во дворе</Option>`;
	});
	return code;
};

function images(a, o, arrRenders) {
	let code = '';

	arrRenders.forEach(el => {
		el = getRandomArr(el);
		if (el.length > 0) {
			for (let i = 0; i < 3; i++) {
				code += `<Image url="https://xn--90acfdb1cddbd3a4d.xn--p1ai${el[i]}" />`;
			}
		};
	});

	code += `<Image url="https://xn--90acfdb1cddbd3a4d.xn--p1ai/assets/images/objects/${o.data.link}/plans/flat/1/${a.number}.png" />`;
	return code;
};

function getRandomArr(arr) {
	return arr.sort(() => Math.random() - 0.5);
};

function videos(o) {
	if (o.videos.length > 0) return `https://xn--90acfdb1cddbd3a4d.xn--p1ai${o.videos[0]}`;
};

function identifier(a, o) {
	return o.data.variable + '-' + a.number;
};

function newDevelopmentId(a, o) {
	let code = ``;
	if (o.parameters.id.avito.length === 1) {
		code += `${o.parameters.id.avito[0]}`
	} else {
		code += o.parameters.id.avito[findApartmentBuilding(a.number, o.parameters.constructionStage)];
	};
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

function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

function getFidFile(nameObject) {
	// начало
	let xml = `<?xml version="1.0" encoding="UTF-8"?>
<Ads formatVersion="3" target="Avito.ru">
	`
	listObjects.forEach(o => {
		nameObject.forEach(name => {
			if (name === o.data.name) {
				xml += createFidCode(o);
			};
		})
	});
	xml += `
</Ads>`
	saveToPC(xml, 'avito');
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