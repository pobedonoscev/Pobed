export function initializeMortgageSection(mortgage) {
	const buttonsHtml = getButtons(mortgage); // Получаем HTML для кнопок

	// Возвращаем сгенерированный HTML
	return `
			${buttonsHtml} <!-- Вставляем HTML для кнопок -->
			<div class="list-banks">
					${clickProgramButton(mortgage)} <!-- Вставляем HTML для блока банков и инициализируем кнопки -->
			</div>
			<div class="right-block mb50">
					<p>Не является публичной офертой.</p>
			</div>
	`;
}

// Функция для создания HTML-кода кнопок для ипотечных программ
export function getButtons(mortgage) {
	const uniqueProgramsArray = uniqueMortgagePrograms(mortgage);
	
	const buttonsHtml = uniqueProgramsArray.map((program, index) => {
			const buttonClass = index === 0 ? "not-active" : "gray";
			return `<button class="${buttonClass} mortgage">${program}</button>`;
	}).join('');

	return `<div class="buttons mortgage">${buttonsHtml}</div>`;
}


// Функция формирует массив уникальных ипотечных программ
function uniqueMortgagePrograms(banks) {
	const uniquePrograms = new Set(); // Используем Set для хранения уникальных программ

	// Проходим по объекту банков и их программам, добавляем уникальные названия программ в Set
	for (const bank in banks) {
			const programs = banks[bank].programs;
			for (const program in programs) {
					uniquePrograms.add(programs[program].title);
			}
	}

	return Array.from(uniquePrograms); // Возвращаем массив уникальных программ из Set
}

export function clickProgramButton(mortgage) {
	document.addEventListener('DOMContentLoaded', function() {
			const buttonsContainer = document.querySelector('.buttons.mortgage');
			buttonsContainer.addEventListener('click', function(event) {
					if (event.target.tagName === 'BUTTON') {
							const selectedProgram = event.target.textContent;
							const filteredBanks = Object.values(mortgage).filter(bank => {
									const programs = Object.values(bank.programs);
									return programs.some(program => program.title === selectedProgram);
							});

							const buttons = buttonsContainer.querySelectorAll('button');
							buttons.forEach(button => button.classList.remove('not-active'));
							buttons.forEach(button => button.classList.add('gray'));
							event.target.classList.remove('gray');
							event.target.classList.add('not-active');

							creatingBankBlocks(filteredBanks, selectedProgram);
					}
			});

			const firstProgramButton = buttonsContainer.querySelector('button');
			if (firstProgramButton) {
					firstProgramButton.classList.add('not-active');
					const selectedProgram = firstProgramButton.textContent;
					const filteredBanks = Object.values(mortgage).filter(bank => {
							const programs = Object.values(bank.programs);
							return programs.some(program => program.title === selectedProgram);
					});
					creatingBankBlocks(filteredBanks, selectedProgram);
			}
	});
}


function creatingBankBlocks(arr, selectedProgram) {
	let code = '';
	for (let i = 0; i < arr.length; i++) {
			// Получаем массив программ для текущего банка
			const programs = arr[i].programs;

			// Переменные для хранения ставки и первого взноса по выбранной программе
			let rate = '';
			let installment = '';

			// Проходим по программам текущего банка и ищем нужную программу
			for (const programKey in programs) {
					const program = programs[programKey];
					if (program.title === selectedProgram) {
							// Если программа найдена, записываем ставку и первый взнос в соответствующие переменные
							rate = program.rate + '%'; // Добавляем символ процента
							installment = program.installment + '%'; // Добавляем символ процента
							break; // Выходим из цикла, так как программа уже найдена
					}
			}

			code += `
					<a href="" target="_blank">
							<div class="item">
									<div class="banks-name">
											<span class="">${arr[i].title}</span>
											<span class="license">${arr[i].licence}</span>
									</div>
									<div class="banks-percent">
											<span class="caps">Ставка</span>
											<h4>${rate}</h4>
									</div>
									<div class="banks-program">
											<span class="caps">Первый взнос</span>
											<span>от ${installment}</span>
									</div>
									${arr[i].logotype}
							</div>
					</a>
			`;
	}
	
	// Находим элемент .apartment-mortgage .list-banks
	const listBanksElement = document.querySelector('#apartment-mortgage .list-banks');
	// Добавляем сгенерированный HTML-код внутрь элемента
	listBanksElement.innerHTML = code;
}