// Устанавливаем сторону света
export function setRotate(params) {
	switch (params) {
		case "N": return `transform="rotate(0, 30, 30)"`; // север
		case "NE": return `transform="rotate(45, 30, 30)"`; // северо-восток
		case "E": return `transform="rotate(90, 30, 30)"`; // восток
		case "SE": return `transform="rotate(135, 30, 30)"`; // юго-восток
		case "S": return `transform="rotate(180, 30, 30)"`; // юг
		case "SW": return `transform="rotate(225, 30, 30)"`; // юго-запад
		case "W": return `transform="rotate(270, 30, 30)"`; // запад
		case "NW": return `transform="rotate(315, 30, 30)"`; // северо-запад
		default:
			console.log('Сторона света не определена');
			break;
	};
};
