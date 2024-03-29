import { addMenu } from './module/menu.js';
import { footer } from './module/footer.js';

// redirectMobileVersion();
// function redirectMobileVersion() {
//   // Проверяем, является ли устройство мобильным
//   const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

//   // Если устройство мобильное, перенаправляем на мобильную версию сайта
//   if (isMobileDevice) {
//     window.location.href = "xn--l1a.xn--90acfdb1cddbd3a4d.xn--p1ai";
//   }
// };

addMenu();

// предотвращает появление контекстного меню при нажатии ПКМ
// document.getElementById("background")
//   .addEventListener("contextmenu", function (e) {
//     e.preventDefault();
//   });

// Отключаем возможность двойного тапа на мобильном устройстве
function disableDoubleTap() {
  if (isMobileDevice() && isMobileBrowser()) {
    var lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
      var now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
  }
};

// Ждем пока загрузится весь Дом документ
document.addEventListener('DOMContentLoaded', function() {

  // Если есть FAQ - добавляем внимацию
  if (document.querySelectorAll('.accordion-item')) {
    const accordionItems = document.querySelectorAll('.accordion-item');
  
    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const content = item.querySelector('.accordion-content');
      const toggle = item.querySelector('.accordion-toggle');
      let isOpen = false;
      
      header.addEventListener('click', function() {
        isOpen = !isOpen;
        
        content.classList.toggle('open');
        toggle.classList.toggle('open');
        
        if (isOpen) {
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          content.style.maxHeight = '0px';
        }
      });
    });
  }
});

// Проверяем, является ли устройство мобильным
function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

// Проверяем, является ли браузер мобильным
function isMobileBrowser() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Вызываем функцию для отключения двойного тапа
// disableDoubleTap();

// Меню прокручивается вместе с сайтом
// if (document.querySelector('header') && window.screen.availWidth > 768) {
//   window.onscroll = function (e) {
//     document.querySelector('header').style.top = window.scrollY + 'px'
//   };
// }

// Добавляем footer
if (document.querySelector('footer') && !document.querySelector('footer .container-fluid')) {
	footer();
};

// Добавляет уникальный номер для обхода кеширования
window.addEventListener('load', () => {
  setTimeout(() => {
    const styleCSS = document.querySelector('[href="/assets/css/style.css"]');
    const scriptJS = document.querySelector('[src="/assets/js/script.js"]');
    const apartmentsJS = document.querySelector('[src="/assets/js/pages/apartments.js"]');
    
    if (styleCSS) {
      styleCSS.setAttribute('href', '/assets/css/style.css?' + randomNumber(10));
    } 
    if (scriptJS) {
      scriptJS.setAttribute('src', '/assets/js/script.js?' + randomNumber(10));
    } 
    if (apartmentsJS) {
      apartmentsJS.setAttribute('src', '/assets/js/pages/apartments.js?' + randomNumber(10));
    };
  }, 1)
});

// Функция возвращает количество предложений в тексте
export function countSentences(text) {
  // Разделители предложений (знаки препинания)
  const delimiters = ['.', '!', '?'];

  // Удаляем лишние пробелы и символы переноса строки
  const cleanedText = text.replace(/\s+/g, ' ').trim();

  // Обходим текст и подсчитываем предложения
  let sentenceCount = 0;
  for (let i = 0; i < cleanedText.length; i++) {
    if (delimiters.includes(cleanedText[i])) {
      sentenceCount++;
    }
  }
  return sentenceCount;
};

// Функция возвращает первое предложение
export function getFirstSentence(text) {
  const regex = /(?<=[!.?])\s+/g;
  const sentences = text.split(regex);
  return sentences[0].trim() + (sentences.length > 1 ? text.match(regex)[0].trim() : '');
};

// Функция возвращает все предложения, кроме первого
export function getRemainingSentences(text) {
  const regex = /(?<=[!.?])\s+/g;
  return text.split(regex).slice(1).join(' ');
};

// Функция определяет среднюю стоимость квадратного метра
export function calculateAveragePrice(arr) {
  if (arr.length === 0) {
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    const price = arr[i].price;

    if (typeof price === 'number') {
      sum += price;
    }
  }
  const averagePrice = sum / arr.length;
  const roundedPrice = Math.round(averagePrice);
  return roundedPrice.toLocaleString('ru-RU');
};

// Функция генерирует рандомные буквы
export function generateRandomLetters(number) {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let randomLetters = '';
  
  for (let i = 0; i < number; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    const randomLetter = letters.charAt(randomIndex);
    randomLetters += randomLetter;
  }
  
  return randomLetters;
}

// Функция генерирует рандомное число
export function randomNumber(number = 10) {
  let randomNumber = '';
  for (let i = 0; i < number; i++) {
    randomNumber += Math.floor(Math.random() * 10);
  }
  return randomNumber;
};

// проверка на undefined
export function checkUndefined(value) {
  return value !== undefined;
};

// Функция возвращает свободные квартиры
export function availableApartments(arr) {
	let result = arr.filter(function (a) {
		return a.status == 'available';
	});
	return result;
};

// Функция проверяет есть ли скидки
export function saleApartments(arr) {
	let result = arr.filter(function (a) {
		return a.sale == true;
	});
	return result;
};

// Функция считает кол-во свободных квартир
export function countStatusAvailable(arr) {
  let count = 0;
  arr.forEach(obj => {
    if (obj.status === "available") {
      count++;
    }
  });
  return count;
};

// Функция считает кол-во квартир свободных квартир по комнатности
export function countRoomsOne(arr, number) {
  let count = 0;
  arr.forEach(o => {
    if (o.rooms === number && o.status === 'available') {
      count++;
    }
  });
  return count;
};

// Проверка на четность
export function isEven(number) {
  return number % 2 === 0;
};

// Функция сокращает число до десятых
export function shortenNumber(number) {
	// Удаляем все пробелы из строки
	const formattedNumber = number.replace(/\s/g, '');

	// Проверяем, является ли число больше 1000000
	if (Number(formattedNumber) >= 1000000) {
		// Делим число на 1000000 и округляем до одной десятой
		const shortenedNumber = (Number(formattedNumber) / 1000000).toFixed(1);
		return shortenedNumber.toString();
	} else {
		// Делим число на 1000 и округляем до одной десятой
		const shortenedNumber = (Number(formattedNumber) / 1000).toFixed(1);
		return shortenedNumber.toString();
	}
};

// Функция для поиска минимальной цены свободной квартиры
export function findMinPrice(arr) {
	// Проверяем, является ли входной параметр массивом
	if (!Array.isArray(arr)) {
		throw new Error('Входной параметр должен быть массивом');
	}

	// Проверяем, содержит ли массив хотя бы один объект
	if (arr.length === 0) {
		return null;
	}

	// Первоначально устанавливаем минимальную цену равной Infinity (бесконечность)
	let minPrice = Infinity;

	// Проходим по каждому объекту в массиве
	arr.forEach(obj => {
		// Проверяем наличие параметра fullPrice в объекте
		if (obj.hasOwnProperty('fullPrice')) {
			// Если цена в текущем объекте меньше минимальной цены, обновляем минимальную цену
			if (obj.fullPrice < minPrice && obj.status == 'available') {
				minPrice = obj.fullPrice;
			}
		}
	});

	// Возвращаем найденную минимальную цену
	return minPrice;
};

// Склонения слова Квартира
export function getLastLetter(number) {
	var lastDigit = number % 10;
	if (lastDigit === 0 || lastDigit === 5 || lastDigit === 6 || lastDigit === 7 || lastDigit === 8 || lastDigit === 9) {
		return '';
	} else if (lastDigit === 1) {
		return 'а';
	} else if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) {
		return 'ы';
	}
};

// back-to-top
// Usage: codyhouse.co/license
(function() {
  var backTop = document.getElementsByClassName('js-back-to-top')[0];
  if( backTop ) {
    var dataElement = backTop.getAttribute('data-element');
    var scrollElement = dataElement ? document.querySelector(dataElement) : window;
    var scrollOffsetInit = parseInt(backTop.getAttribute('data-offset-in')) || parseInt(backTop.getAttribute('data-offset')) || 0, //show back-to-top if scrolling > scrollOffset
      scrollOffsetOutInit = parseInt(backTop.getAttribute('data-offset-out')) || 0, 
      scrollOffset = 0,
      scrollOffsetOut = 0,
      scrolling = false;

    // check if target-in/target-out have been set
    var targetIn = backTop.getAttribute('data-target-in') ? document.querySelector(backTop.getAttribute('data-target-in')) : false,
      targetOut = backTop.getAttribute('data-target-out') ? document.querySelector(backTop.getAttribute('data-target-out')) : false;

    updateOffsets();
    
    //detect click on back-to-top link
    backTop.addEventListener('click', function(event) {
      event.preventDefault();
      if(!window.requestAnimationFrame) {
        scrollElement.scrollTo(0, 0);
      } else {
        dataElement ? scrollElement.scrollTo({top: 0, behavior: 'smooth'}) : window.scrollTo({top: 0, behavior: 'smooth'});
      } 
      //move the focus to the #top-element - don't break keyboard navigation
      moveFocus(document.getElementById(backTop.getAttribute('href').replace('#', '')));
    });
    
    //listen to the window scroll and update back-to-top visibility
    checkBackToTop();
    if (scrollOffset > 0 || scrollOffsetOut > 0) {
      scrollElement.addEventListener("scroll", function(event) {
        if( !scrolling ) {
          scrolling = true;
          (!window.requestAnimationFrame) ? setTimeout(function(){checkBackToTop();}, 250) : window.requestAnimationFrame(checkBackToTop);
        }
      });
    }

    function checkBackToTop() {
      updateOffsets();
      var windowTop = scrollElement.scrollTop || document.documentElement.scrollTop;
      if(!dataElement) windowTop = window.scrollY || document.documentElement.scrollTop;
      var condition =  windowTop >= scrollOffset;
      if(scrollOffsetOut > 0) {
        condition = (windowTop >= scrollOffset) && (window.innerHeight + windowTop < scrollOffsetOut);
      }
      backTop.classList.toggle('back-to-top--is-visible', condition);
      scrolling = false;
    }

    function updateOffsets() {
      scrollOffset = getOffset(targetIn, scrollOffsetInit, true);
      scrollOffsetOut = getOffset(targetOut, scrollOffsetOutInit);
    }

    function getOffset(target, startOffset, bool) {
      var offset = 0;
      if(target) {
        var windowTop = scrollElement.scrollTop || document.documentElement.scrollTop;
        if(!dataElement) windowTop = window.scrollY || document.documentElement.scrollTop;
        var boundingClientRect = target.getBoundingClientRect();
        offset = bool ? boundingClientRect.bottom : boundingClientRect.top;
        offset = offset + windowTop;
      }
      if(startOffset && startOffset) {
        offset = offset + parseInt(startOffset);
      }
      return offset;
    }

    function moveFocus(element) {
      if( !element ) element = document.getElementsByTagName("body")[0];
      element.focus();
      if (document.activeElement !== element) {
        element.setAttribute('tabindex','-1');
        element.focus();
      }
    };
  }
}());

// Подсчет / countup
// Usage: codyhouse.co/license
(function() {	
  var CountUp = function(opts) {
    this.options = extendProps(CountUp.defaults , opts);
    this.element = this.options.element;
    this.initialValue = parseFloat(this.options.initial);
    this.finalValue = parseFloat(this.element.textContent);
    this.deltaValue = parseFloat(this.options.delta);
    this.intervalId;
    this.animationTriggered = false;
    this.srClass = 'cd-sr-only';
    initCountUp(this);
  };

  CountUp.prototype.reset = function() { // reset element to its initial value
    window.cancelAnimationFrame(this.intervalId);
    this.element.textContent = this.initialValue;
  };  

  CountUp.prototype.restart = function() { // restart element animation
    countUpAnimate(this);
  };

  function initCountUp(countup) {
    // reset initial value
    countup.initialValue = getCountupStart(countup);

    // reset countUp for SR
    initCountUpSr(countup);

    // listen for the element to enter the viewport -> start animation
    var observer = new IntersectionObserver(countupObserve.bind(countup), { threshold: [0, 0.1] });
    observer.observe(countup.element);

    // listen to events
    countup.element.addEventListener('countUpReset', function(){countup.reset();});
    countup.element.addEventListener('countUpRestart', function(){countup.restart();});
  };

  function countUpShow(countup) { // reveal countup after it has been initialized
    countup.element.closest('.countup').classList.add('countup--is-visible');
  };

  function countupObserve(entries, observer) { // observe countup position -> start animation when inside viewport
    if(entries[0].intersectionRatio.toFixed(1) > 0 && !this.animationTriggered) {
      countUpAnimate(this);
    }
  };

  function countUpAnimate(countup) { // animate countup
    countup.element.textContent = countup.initialValue;
    countUpShow(countup);
    window.cancelAnimationFrame(countup.intervalId);
    var currentTime = null;

    function runCountUp(timestamp) {
      if (!currentTime) currentTime = timestamp;        
      var progress = timestamp - currentTime;
      if(progress > countup.options.duration) progress = countup.options.duration;
      var val = getValEaseOut(progress, countup.initialValue, countup.finalValue - countup.initialValue, countup.options.duration);
      countup.element.textContent = getCountUpValue(val, countup);
      if(progress < countup.options.duration) {
        countup.intervalId = window.requestAnimationFrame(runCountUp);
      } else {
        countUpComplete(countup);
      }
    };

    countup.intervalId = window.requestAnimationFrame(runCountUp);
  };

  function getCountUpValue(val, countup) { // reset new countup value to proper decimal places+separator
    if(countup.options.decimal) {val = parseFloat(val.toFixed(countup.options.decimal));}
    else {val = parseInt(val);}
    if(countup.options.separator) val = val.toLocaleString('en');
    return val;
  }

  function countUpComplete(countup) { // emit event when animation is over
    countup.element.dispatchEvent(new CustomEvent('countUpComplete'));
    countup.animationTriggered = true;
  };

  function initCountUpSr(countup) { // make sure countup is accessible
    // hide elements that will be animated to SR
    countup.element.setAttribute('aria-hidden', 'true');
    // create new element with visible final value - accessible to SR only
    var srValue = document.createElement('span');
    srValue.textContent = countup.finalValue;
    srValue.classList.add(countup.srClass);
    countup.element.parentNode.insertBefore(srValue, countup.element.nextSibling);
  };

  function getCountupStart(countup) {
    return countup.deltaValue > 0 ? countup.finalValue - countup.deltaValue : countup.initialValue;
  };

  function getValEaseOut(t, b, c, d) { 
    t /= d;
    return -c * t*(t-2) + b;
  };

  var extendProps = function () {
    // Variables
    var extended = {};
    var deep = false;
    var i = 0;
    var length = arguments.length;
  
    // Check if a deep merge
    if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
      deep = arguments[0];
      i++;
    }
  
    // Merge the object into the extended object
    var merge = function (obj) {
      for ( var prop in obj ) {
        if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
          // If deep merge and property is an object, merge properties
          if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
            extended[prop] = extend( true, extended[prop], obj[prop] );
          } else {
            extended[prop] = obj[prop];
          }
        }
      }
    };
  
    // Loop through each object and conduct a merge
    for ( ; i < length; i++ ) {
      var obj = arguments[i];
      merge(obj);
    }
  
    return extended;
  };

  CountUp.defaults = {
    element : '',
    separator : false,
    duration: 3000,
    decimal: false,
    initial: 0,
    delta: 0
  };

  window.CountUp = CountUp;

  //initialize the CountUp objects
  var countUp = document.getElementsByClassName('js-countup');
  if( countUp.length > 0 ) {
    for( var i = 0; i < countUp.length; i++) {(function(i){
    	var separator = (countUp[i].getAttribute('data-countup-sep')) ? countUp[i].getAttribute('data-countup-sep') : false,
        duration = (countUp[i].getAttribute('data-countup-duration')) ? countUp[i].getAttribute('data-countup-duration') : CountUp.defaults.duration,
        decimal = (countUp[i].getAttribute('data-countup-decimal')) ? countUp[i].getAttribute('data-countup-decimal') : false,
    		initial = (countUp[i].getAttribute('data-countup-start')) ? countUp[i].getAttribute('data-countup-start') : 0,
        delta = (countUp[i].getAttribute('data-countup-delta')) ? countUp[i].getAttribute('data-countup-delta') : 0;
    	new CountUp({element: countUp[i], separator : separator, duration: duration, decimal: decimal, initial: initial, delta: delta});
    })(i);}
  }
}());