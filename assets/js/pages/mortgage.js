async function mortgage(url, banks, programka) {

  // Загружаем данные с указанного URL
  const response = await fetch(url);
  const content = await response.text();

  // Используем DOM-парсер для разбора HTML-контента
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');

  // Создаем массив для банков
  let arrBanks = [];

  // Получаем список банков из разобранного документа
  const listBanks = doc.querySelectorAll('.sc-cBBpIb.iKLDtm');

  // Проходим по каждому банку в списке
  for (let bank = 0; bank < listBanks.length; bank++) {
    // Получаем название банка
    const nameBank = listBanks[bank].firstChild.firstChild.children[1].innerText;
    arrBanks[bank] = [nameBank]; // Добавляем название в массив банков

    // Получаем коды из разобранного документа
    const codes = listBanks[bank].lastChild.lastChild.lastChild.lastChild.childNodes;
    // Проходим по каждому коду
    for (let p = 0; p < codes.length; p++) {
      // Получаем значения nameProgram и interestRate
      const nameProgram = codes[p].children[0].innerText;
      const interestRate = codes[p].children[1].children[0].children[1].innerText;
      const downpayment = codes[p].children[1].children[1].children[1].innerText;
      const period = codes[p].children[1].children[2].children[1].innerText;

      // Создаем пустой массив, если он не существует
      if (!arrBanks[bank][1]) {
        arrBanks[bank][1] = [];
      }
      
      // Добавляем значения в массив банка
      arrBanks[bank][1].push([nameProgram, interestRate, downpayment, period]);
    }
  };

  // Удаляем банки, которых нет в переданном массиве banks
  arrBanks = arrBanks.filter(([name]) => {
    return banks.some(banks => name.includes(banks)) || banks.includes(name);
  });

  // Удаляем программы, которых нет в переданном массиве program
  arrBanks = arrBanks.map((bank) => {
    const filteredPrograms = [];
    bank[1].forEach((program) => {
      if (programka.includes(program[0])) {
        filteredPrograms.push(program);
      }
    });
    return [bank[0], filteredPrograms];
  });
  

  // Изменяем названия банков на короткие названия
	arrBanks = arrBanks.map(arr => {
		const name = arr[0]; 
		const shortenedName = banks.find(b => name.includes(b));
		return [shortenedName, arr[1]];
	});

};

const myBanks = ['Сбербанк', 'ВТБ', 'АЛЬФА-БАНК', 'Открытие'];
const myProgram = ['Ипотека с государственной поддержкой', 'Ипотека для IT-специалистов', 'Ипотека для семей с детьми']
mortgage('https://www.pik.ru/yaroslavl/mortgage/partners', myBanks, myProgram);
