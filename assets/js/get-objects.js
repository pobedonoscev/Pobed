// Подгружаем класс DataObject
import { Building } from './module/object.js';

// Формируем полный список объектов
export const allObjects = sortByPriority([
	new Building('Новый Дом'),
	new Building('Экогород 2')
]);

// Создание массива объектов где есть свободные квартиры
export const listObjects = [];

// Перебор полного списка объектов,
// Добавление объекта в listObjects если есть свободные квартиры
allObjects.forEach(object => {
	if (object.apartments.some(o => o.status === 'available')) {
		listObjects.push(object);
	};
});

function sortByPriority(arr) {
	arr.sort(function (a, b) {
		return a.parameters.priority - b.parameters.priority;
	});
	return arr;
};