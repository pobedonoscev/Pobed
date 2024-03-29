import { icons } from '/assets/js/module/icons.js';

// Меню
const codeMenu = `
	<div class="menu">
    <span class="x">
      <?xml version="1.0" ?>
      <svg style="enable-background:new 0 0 50 50;" version="1.1" viewBox="0 0 50 50" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Layer_1">
          <polygon points="2.707,48.707 25,26.414 47.293,48.707 48.707,47.293 26.414,25 48.707,2.707 47.293,1.293 25,23.586 2.707,1.293    1.293,2.707 23.586,25 1.293,47.293  " />
        </g>
        <g />
      </svg>
    </span>
    <div class="buba">
      <div class="top">
        <div class="logotipe">
          <span class="pobedonoscev">Pobedonoscev</span>
          <span class="group">Group</span>
        </div>
        <ul>
          <li><a href="/">Главная</a></li>
          <li><a href="/%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B/">Проекты</a></li>
          <li><a href="/%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D1%8B/">Квартиры</a></li>
          <li><a href="/%D0%B8%D0%BF%D0%BE%D1%82%D0%B5%D0%BA%D0%B0/">Ипотека</a></li>
          <li><a href="/%D0%BA%D0%BE%D0%BC%D0%BF%D0%B0%D0%BD%D0%B8%D1%8F/">Компания</a></li>
          <li><a href="/%D0%BA%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D1%8B/">Контакты</a></li>
        </ul>
      </div>
    </div>
  </div>
`;

export function addMenu() {

  // Можно использовать SVG: <a href="/">${icons.logotipe}</a>
  if (document.querySelector('header')) {
    document.querySelector('header')
      .insertAdjacentHTML('afterbegin',
      `
        <div class="container shapka">
          <a href="/" class="logotipe">
            <span class="pobedonoscev">Pobedonoscev</span>
            <span class="group">group</span>
          </a>
          <div class="list-button">
            <a href="/%D0%BA%D0%B2%D0%B0%D1%80%D1%82%D0%B8%D1%80%D1%8B/" class="button graphite">Выбрать квартиру</a>
            <nav class="button gray">
              ${icons.burgerMenu}
            </nav>
          </div>
        </div>
      `)
  }

    document.addEventListener('DOMContentLoaded', function() {
      if (document.querySelector('nav')) {
        document.querySelector('nav')
        .addEventListener('click', () => {
    
          document.querySelector('body')
            .insertAdjacentHTML('afterbegin', '<div class="shadow"></div>' + codeMenu);
    
          let menu = document.querySelector('.menu');
          let shadow = document.querySelector('.shadow');
    
          menu.classList.add('menu-open');
          shadow.classList.add('shadow-open');
    
          const closeMenu = () => {
            menu.classList.remove('menu-open');
            menu.classList.add('menu-close');
            shadow.classList.remove('shadow-open');
            shadow.classList.add('shadow-close');
            setTimeout(() => {
              shadow.remove();
              menu.remove();
            }, 500);
          };
    
          document.querySelector('.menu .x').addEventListener('click', closeMenu);
          shadow.addEventListener('click', closeMenu);
    
        });
      };
    });

};