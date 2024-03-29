import {
	noviyDom, ekogorod2
} from '/fid/apartments.js';

export class Building {

	constructor(name) {
		this.setData(name);
		const buildingsData = { noviyDom, ekogorod2 };
		this.setParameters(buildingsData[this.data.variable]);
	}

	setData(name) {
		this.data = {
			name,
			translitName: translit(name),
			variable: variableBuilding(translit(name)),
			link: dashName(translit(name)),
			ssylka: name.toLowerCase().replace(/\s+/g, '-')
		};
	}

	setParameters(variable) {
		this.parameters = variable.parameters;
		this.mortgage = variable.mortgage;
		this.parameters.floors = findFloorRange(variable.apartments);
		this.parameters.entrance = [
			findMinEntrance(variable.apartments),
			findMaxEntrance(variable.apartments)
		];

		this.apartments = addNewParametrs(
			variable,
			this.data.name,
			this.data.link,
			this.data.ssylka
		);

		this.coordinates = variable.coordinates;
		this.images = variable.images;
		this.photos = variable.photos;
		this.videos = variable.videos;
		this.documents = variable.documents;
	}
}

function addNewParametrs(obj, name, link, ssylka) {
	obj.apartments.forEach(flat => {
		if (!flat.fullPrice) {
			flat.fullPrice = (flat.price * flat.areaTotal).toFixed();
		}
		if (!flat.compass) {
			flat.compass = ['']
		}
		flat.objectName = 'ЖК ' + name;
		flat.objectLink = link;
		flat.objectSsylka = ssylka;
	})
	return obj.apartments;
};

function variableBuilding(value) {
	return value
		.toLowerCase()
		.replace(/\s\b\D/gi, function (x) { return x.toUpperCase(); })
		.replace(/\s+/g, '')
};

function translit(str) {
	const ruToEn = {
		'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
		'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
		'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
		'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ь': '',
		'ы': 'i', 'ъ': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',

		'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'E',
		'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
		'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
		'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch', 'Ь': '',
		'Ы': 'I', 'Ъ': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
	};

	return str.split('').map(char => ruToEn[char] || char).join('');
}

function dashName(value) {
	return value.toLowerCase().replace(/\s+/g, '-');
}

function findFloorRange(apartments) {
	const floors = apartments.map(apartment => apartment.floor);
	return [Math.min(...floors), Math.max(...floors)];
}

// Определяем минимальный подъезд бъекта
function findMinEntrance(arr) {
	let result = Math.min(...arr.map(obj => obj.entrance));
	return result;
};

// Определяем максимальный подъезд бъекта
function findMaxEntrance(arr) {
	let result = Math.max(...arr.map(obj => obj.entrance));
	return result;
};