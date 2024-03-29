import { icons } from '/assets/js/module/icons.js';

export const banks = {
	sberbank: {
		title: 'ПАО Сбербанк',
		licence: '№ 1481 от 11.08.2015',
		site: 'http://www.sberbank.ru',
		logotype: `${icons.sberbank}`,
		programs: {
			semeynaya: {
				title: 'Семейная ипотека',
				rate: 6.0,
				installment: 20.1,
				page: '/ru/person/credits/home/family',
			},
			it: {
				title: 'Ипотека для IT-специалистов',
				rate: 5.0,
				installment: 20.1,
				page: '/ipoteka/programs/it-workers',
			},
			voennaya: {
				title: 'Военная ипотека',
				rate: 18.8,
				installment: 20.1,
				page: '/ru/person/credits/home/mil',
			},
			gospodderzhka: {
				title: 'Ипотека с господдержкой',
				rate: 8.0,
				installment: 30.1,
				page: '/ru/person/credits/home/gos_2020',
			}
		}
	},
	vtb: {
		title: 'Банк ВТБ (ПАО)',
		licence: '№ 1000 от 08.07.2015',
		site: 'https://www.vtb.ru',
		logotype: `${icons.vtb}`,
		programs: {
			semeynaya: {
				title: 'Семейная ипотека',
				rate: 6.0,
				installment: 20.1,
				page: '/personal/ipoteka/dlya-semej-s-detmi/',
			},
			it: {
				title: 'Ипотека для IT-специалистов',
				rate: 5.0,
				installment: 20.1,
				page: '/personal/ipoteka/it/',
			},
			voennaya: {
				title: 'Военная ипотека',
				rate: 15.6,
				installment: 5.0,
				page: '/personal/ipoteka/voennaja-ipoteka/',
			},
			gospodderzhka: {
				title: 'Ипотека с господдержкой',
				rate: 8.6,
				installment: 30.1,
				page: '/personal/ipoteka/gospodderzhka-2020/',
			}
		}
	},
	alfabank: {
		title: 'АО «АЛЬФА-БАНК»',
		licence: '№ 1326 от 16.01.2015',
		site: '',
		logotype: `${icons.alfabank}`,
		programs: {
			semeynaya: {
				title: 'Семейная ипотека',
				rate: 5.8,
				installment: 20.1,
				page: '/get-money/mortgage/family/',
			},
			it: {
				title: 'Ипотека для IT-специалистов',
				rate: 4.8,
				installment: 20.1,
				page: '/get-money/mortgage/lgotnaya-ipoteka-dlya-it-specialistov/',
			},
			gospodderzhka: {
				title: 'Ипотека с господдержкой',
				rate: 8.0,
				installment: 30.0,
				page: '/get-money/mortgage/ipoteka-s-gospodderzhkoy/',
			}
		}
	},
	open: {
		title: 'ПАО Банк «ФК Открытие»',
		licence: '№ 2209 от 15.12.1992',
		site: '',
		logotype: `${icons.open}`,
		programs: {
			semeynaya: {
				title: 'Семейная ипотека',
				rate: 6.0,
				installment: 20.1,
				page: '/personal/ipoteka/dlya-semej-s-detmi/',
			},
			it: {
				title: 'Ипотека для IT-специалистов',
				rate: 5.0,
				installment: 20.1,
				page: '/personal/ipoteka/it/',
			},
			voennaya: {
				title: 'Военная ипотека',
				rate: 15.6,
				installment: 5.0,
				page: '/personal/ipoteka/voennaja-ipoteka/',
			},
			gospodderzhka: {
				title: 'Ипотека с господдержкой',
				rate: 8.6,
				installment: 30.1,
				page: '/personal/ipoteka/gospodderzhka-2020/',
			}
		}
	}
};