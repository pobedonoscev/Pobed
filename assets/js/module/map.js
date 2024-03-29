let styleMap;

fetch('/assets/js/module/customization.json')
	.then(response => response.json())
	.then(data => {
		styleMap = data;
	})

async function initMap(coordinatesMap, coordinatesMarker, zoom, name) {
    // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker} = ymaps3;

		// Выбираем подходящий селектор в зависимости от наличия четвертого параметра
		let mapContainerSelector;
    if (name) mapContainerSelector = document.querySelector('#mini-map' + `.${name}`);
		if (!name) mapContainerSelector = mapContainerSelector = document.getElementById('mini-map');

    // Иницилиазируем карту
    const map = new YMap(
        // Передаём ссылку на HTMLElement контейнера
        // document.getElementById('mini-map'),
				// document.querySelector('#mini-map' + `.${name}`),
				mapContainerSelector,
        // Передаём параметры инициализации карты
        {
            location: {
                center: coordinatesMap, // Координаты центра карты
                zoom: zoom // Уровень масштабирования
            }
        }
    );

		// Добавьте слой с дорогами и зданиями
		const layer = new YMapDefaultSchemeLayer({
			// customization: styleMap
			customization: styleMap
		});
		map.addChild(layer);

		// Добавьте слой для маркеров
		map.addChild(new YMapDefaultFeaturesLayer());

		// Создайте DOM-элемент для содержимого маркера.
		// Важно это сделать до инициализации маркера!
		// Элемент можно создавать пустым. Добавить HTML-разметку внутрь можно после инициализации маркера.
		const content = document.createElement('div');
		content.classList.add('marker');

		// Инициализируйте маркер
		const marker = new YMapMarker(
			{
				coordinates: coordinatesMarker,
				draggable: true
			},
			content
		);

		// Добавьте маркер на карту
		map.addChild(marker);

		// Добавьте произвольную HTML-разметку внутрь содержимого маркера
		content.innerHTML = `
			<svg width="50px" height="50px" viewBox="0 0 512 512">
				<path d="M256,0C139.563,0,45.172,94.406,45.172,210.828S210.875,512,256,512c45.109,0,210.828-184.75,210.828-301.172 S372.438,0,256,0z M256,307.594c-53.453,0-96.766-43.328-96.766-96.766c0-53.453,43.313-96.766,96.766-96.766 c53.438,0,96.766,43.313,96.766,96.766C352.766,264.266,309.438,307.594,256,307.594z"/>
			</svg>
		`;

		// map.controls.remove('geolocationControl'); // удаляем геолокацию
    // map.controls.remove('searchControl'); // удаляем поиск
    // map.controls.remove('trafficControl'); // удаляем контроль трафика
    // map.controls.remove('typeSelector'); // удаляем тип
    // map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    // map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    // map.controls.remove('rulerControl'); // удаляем контрол правил
    // map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
}