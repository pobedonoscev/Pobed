import { allObjects } from '/assets/js/get-objects.js';

window.addEventListener('load', function() {
	if (document.querySelector('.complexBlocks')) {
		const placeObj = document.querySelector('.complexBlocks'); // место вставки
		const nameObj = placeObj.classList[1]; // имя объекта

		allObjects.forEach(o => {

			// соответствует ли имя объекта странице
			if (o.data.link === nameObj) {
				// если есть картинка
				if (o.images.complex.length != '') {
					// есть ли у картинки viewBox и координаты подъездов
					if (o.coordinates.complex.viewBox.length != 0 && o.coordinates.complex.house.length != 0) {
						const homeSVG = `
							<div class="homeSVG">
								<svg viewBox="${o.coordinates.complex.viewBox}">
									${getMePleasePath(o.coordinates.complex.house, o.data.ssylka)}
								</svg>
								<img src="${o.images.complex}">
							</div>
						`;
						placeObj.insertAdjacentHTML('afterbegin', homeSVG);
					} else {
						placeObj.insertAdjacentHTML('afterbegin', `<img src="${o.images.complex}">`);
					}
				} else {
					placeObj.style.marginBottom = '0px'
				};
			} else {
				placeObj.style.marginBottom = '0px'
			};

		});

		function getMePleasePath(coordinates, ssylka) {
			let lambruska = '';
			for (let i = 0; i < coordinates.length; i++) {
				lambruska += `
					<a href="/%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/${ssylka}/%D0%BF%D0%BE%D0%B4%D1%8A%D0%B5%D0%B7%D0%B4/${i + 1}/%D1%8D%D1%82%D0%B0%D0%B6/1/">
						<path class="path" d="${coordinates[i]}" data-number="${i + 1}"></path>
					</a>
				`
			};
			return lambruska;
		}
	};
});