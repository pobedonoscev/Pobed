import { office } from '/fid/builder.js';
export function footer() {
	document.querySelector('footer')
		.insertAdjacentHTML('afterbegin',
			`
        <div class="container">
          <div class="heading">
            <h1 class="caps">Есть вопросы?</h1>
          </div>

          <div class="kolbasa">
            <div class="item">
              <span class="micro-text">Юридическое наименование</span>
              <div class="title rg10">
                <a href="/%D0%BA%D0%BE%D0%BC%D0%BF%D0%B0%D0%BD%D0%B8%D1%8F/">
                  ООО «СЗ «ПОБЕДОНОСЦЕВ ГРУПП»
                  <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" d="M1.31727 0.182857L24.941 0.186412L24.9445 23.8101L22.9445 23.8104L22.9415 3.59975L2.01834 24.5185L0.604274 23.1041L21.5269 2.1859L1.31696 2.18286L1.31727 0.182857Z"></path>
                  </svg>
                </a>
                <div class="micro-text">
                  <span>ИНН 7604387794</span>
                  <span>КПП 760401001</span>
                  <span>ОГРН 1227600014190</span>
                </div>
              </div>
            </div>
            <div class="item">
              <span class="micro-text">Местоположение</span>
              <a href="https://yandex.ru/maps/?rtext=~${office.towers.coordinates[1]},${office.towers.coordinates[0]}" target="_blank">
                г. Ярославль, пл. Труда, д. 1<br>
                Бизнес-центр Towers<br>
                офис 605
                <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd" d="M1.31727 0.182857L24.941 0.186412L24.9445 23.8101L22.9445 23.8104L22.9415 3.59975L2.01834 24.5185L0.604274 23.1041L21.5269 2.1859L1.31696 2.18286L1.31727 0.182857Z"></path>
                </svg>
              </a>
            </div>
            <div class="item">
              <div class="title rg20">
                <div class="block">
                  <span class="micro-text">Отдел продаж</span>
                  <span class="micro-text">Сегодня ${printDayOfWeek(office.towers.worksDay)}</span>
                  <a href="tel:+74852333362">
                    +7 (4852) 33-33-62
                    <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                      <path clip-rule="evenodd" d="M1.31727 0.182857L24.941 0.186412L24.9445 23.8101L22.9445 23.8104L22.9415 3.59975L2.01834 24.5185L0.604274 23.1041L21.5269 2.1859L1.31696 2.18286L1.31727 0.182857Z"></path>
                    </svg>
                  </a>
                </div>
                <div class="block">
                  <span class="micro-text">Социальные сети</span>
                  <div class="social-networks">
                    <a href="https://vk.com/pobedonoscev.group" target="_blank">
                      <svg class="vkontakte" viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M12.878 17.304c-5.411 0-8.695-3.755-8.823-9.994h2.74c.086 4.583 2.171 6.528 3.77 6.925V7.31h2.627v3.954c1.542-.17 3.155-1.97 3.698-3.954h2.584c-.414 2.441-2.17 4.24-3.412 4.983 1.242.6 3.24 2.17 4.011 5.01h-2.84c-.6-1.898-2.07-3.369-4.04-3.569v3.57h-.315Z' />
                      </svg>
                    </a>
                    <a href="https://api.whatsapp.com/send?phone=79109730099" target="_blank">
                      <svg class="whatsapp" viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M20 11.794c0 4.304-3.517 7.794-7.855 7.794a7.87 7.87 0 01-3.796-.97L4 20l1.418-4.182a7.714 7.714 0 01-1.127-4.024C4.29 7.489 7.807 4 12.145 4S20 7.49 20 11.794zm-7.855-6.553c-3.641 0-6.603 2.94-6.603 6.553A6.48 6.48 0 006.8 15.636l-.825 2.433 2.537-.806a6.6 6.6 0 003.633 1.084c3.642 0 6.604-2.94 6.604-6.553s-2.962-6.553-6.604-6.553zm3.967 8.348c-.049-.08-.177-.128-.37-.223-.192-.095-1.139-.558-1.315-.621-.177-.064-.305-.096-.434.095a10.92 10.92 0 01-.61.749c-.112.128-.224.143-.416.048-.193-.096-.813-.297-1.549-.948a5.76 5.76 0 01-1.07-1.323c-.113-.191-.013-.295.084-.39.086-.086.192-.223.289-.334.096-.112.128-.191.192-.319s.032-.239-.016-.335c-.048-.095-.433-1.035-.594-1.418-.16-.382-.32-.318-.433-.318-.112 0-.24-.016-.369-.016a.71.71 0 00-.513.239c-.177.19-.674.653-.674 1.593s.69 1.848.786 1.976c.096.127 1.332 2.119 3.289 2.884 1.958.764 1.958.51 2.31.477.353-.031 1.14-.461 1.3-.908.16-.446.16-.829.113-.908z' />
                      </svg>
                    </a>
                    <a href="viber://chat?number=%2B79109730099" target="_blank">
                      <svg class="viber" viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M18.434 15.574c-.484-.391-1.002-.743-1.511-1.102-1.016-.718-1.945-.773-2.703.38-.426.648-1.021.677-1.644.392-1.718-.782-3.044-1.989-3.821-3.743-.344-.777-.34-1.473.465-2.022.425-.29.854-.634.82-1.268-.045-.828-2.043-3.593-2.832-3.885a1.429 1.429 0 00-.984 0C4.373 4.95 3.606 6.48 4.34 8.292c2.19 5.405 6.043 9.167 11.349 11.463.302.13.638.183.808.23 1.208.012 2.623-1.158 3.032-2.318.393-1.117-.438-1.56-1.096-2.093zM12.485 4.88c3.879.6 5.668 2.454 6.162 6.38.045.363-.09.909.426.919.538.01.408-.528.413-.89.045-3.699-3.163-7.127-6.888-7.253-.281.04-.863-.195-.9.438-.024.427.466.357.787.406z'/><path d='M13.244 5.957c-.373-.045-.865-.222-.953.299-.09.546.458.49.811.57 2.395.538 3.23 1.414 3.624 3.802.057.349-.057.89.532.8.436-.066.278-.53.315-.802.02-2.293-1.936-4.38-4.329-4.669z'/><path d='M13.464 7.832c-.249.006-.493.033-.585.3-.137.4.152.496.446.544.983.158 1.5.74 1.598 1.725.027.268.195.484.452.454.356-.043.389-.361.378-.664.017-1.106-1.227-2.385-2.289-2.359z'/>
                      </svg>
                    </a>
                    <a href="https://t.me/+79109730099" target="_blank">
                      <svg class="telegram" viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M18.92 6.089L4.747 11.555c-.967.388-.962.928-.176 1.168l3.534 1.104 1.353 4.146c.164.454.083.634.56.634.368 0 .53-.168.736-.368.13-.127.903-.88 1.767-1.719l3.677 2.717c.676.373 1.165.18 1.333-.628l2.414-11.374c.247-.99-.378-1.44-1.025-1.146zM8.66 13.573l7.967-5.026c.398-.242.763-.112.463.154l-6.822 6.155-.265 2.833-1.343-4.116z' />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <span class="micro-text">Группа компаний</span>
              <div class="official-pages">
                <a href="http://xn--80aaaanejuqvlg4co.xn--p1ai/" target="_blank">
                  Камни Дагестана
                  <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" d="M1.31727 0.182857L24.941 0.186412L24.9445 23.8101L22.9445 23.8104L22.9415 3.59975L2.01834 24.5185L0.604274 23.1041L21.5269 2.1859L1.31696 2.18286L1.31727 0.182857Z"></path>
                  </svg>
                </a>
                <a href="https://pobedonoscev.ru/" target="_blank">
                  P. Architects
                  <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" d="M1.31727 0.182857L24.941 0.186412L24.9445 23.8101L22.9445 23.8104L22.9415 3.59975L2.01834 24.5185L0.604274 23.1041L21.5269 2.1859L1.31696 2.18286L1.31727 0.182857Z"></path>
                  </svg>
                </a>
                <a href="http://xn--90aoahcc4k.xn--p1ai/" target="_blank">
                  Благотворительность
                  <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" d="M1.31727 0.182857L24.941 0.186412L24.9445 23.8101L22.9445 23.8104L22.9415 3.59975L2.01834 24.5185L0.604274 23.1041L21.5269 2.1859L1.31696 2.18286L1.31727 0.182857Z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div class="copyright">
            <div class="item">
              <a href="/" class="logotipe">
                <span class="pobedonoscev" style="font-size: 30px">PG</span>
              </a>
              <p class="text">&copy; 2024</p>
            </div>
            <div class="item">
              <p class="text">Любая информация, представленная на данном сайте, носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями статьи 437 ГК РФ. <span class="circumcision">Мы используем cookie, чтобы пользоваться сайтом было удобно. В настройках браузера вы можете отключить эту возможность. Продолжая пользоваться сайтом вы даёте согласие на использование ваших cookie.</span></p>
              <div class="bottom-links">
                <a href="">Пользовательское соглашение</a>
                <a href="">Политика конфиденциальности</a>
                <a href="">Согласие на обработку персональных данных</a>
                <!-- <span>by: <a href="">dragochinskiy.ru</a></span> -->
              </div>
            </div>
            <div class="item">
              <a href="/" class="logotipe">
                <span class="pobedonoscev">Pobedonoscev</span>
                <span class="group">group</span>
              </a>
            </div>
          </div>

        </div>
			`
	);
};

function printDayOfWeek(worksDay) {
  var date = new Date();
  var day = date.getDay();
  if (worksDay[day].length > 2) return `c ${worksDay[day][1]} до ${worksDay[day][2]}`;
  if (worksDay[day].length <= 2) return `${worksDay[day][1]}`;
};