'use strict';

const fs = require('fs');


const mocksTitle = ['Продам книги Стивена Кинга.',
  'Продам новую приставку Sony Playstation 5.',
  'Продам отличную подборку фильмов на VHS.',
  'Куплю антиквариат.',
  'Куплю породистого кота.',
  'Продам коллекцию журналов «Огонёк».',
  'Отдам в хорошие руки подшивку «Мурзилка».',
  'Продам советскую посуду. Почти не разбита.',
  'Куплю детские санки.'];

const mocksType = ['offer', 'sale'];

const mocksDescription = ['Товар в отличном состоянии.',
  'Пользовались бережно и только по большим праздникам.',
  'Продаю с болью в сердце...',
  'Бонусом отдам все аксессуары.',
  'Даю недельную гарантию.',
  'Если товар не понравится — верну всё до последней копейки.',
  'Это настоящая находка для коллекционера!',
  'Если найдёте дешевле — сброшу цену.',
  'Таких предложений больше нет!',
  'Две страницы заляпаны свежим кофе.',
  'При покупке с меня бесплатная доставка в черте города.',
  'Кажется, что это хрупкая вещь.',
  'Мой дед не мог её сломать.',
  'Кому нужен этот новый телефон, если тут такое...',
  'Не пытайтесь торговаться. Цену вещам я знаю.']


const mockCategory = ['Книги',
  'Разное',
  'Посуда',
  'Игры',
  'Животные',
  'Журналы'];

const MAX_PHOTO_IMAGE_NUMBER = 16;

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const zeroFill = (number, width) => {
  width -= number.toString().length;
  if (width > 0) {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
  }
  return number + ""; // always return a string
}

const createMockArray = (numb) => {
  const mockedArr = [];
  for (let i = 0; i < numb; i++) {
    mockedArr.push({
      "type": mocksType[randomIntFromInterval(0, mocksType.length - 1)],
      "title": mocksTitle[randomIntFromInterval(0, mocksTitle.length - 1)],
      "description": mocksDescription.slice().sort(function (a, b) {
        return 0.5 - Math.random()
      }).slice(0, 4).join(),
      "sum": randomIntFromInterval(1000, 100000),
      "picture": `item${zeroFill(randomIntFromInterval(1, MAX_PHOTO_IMAGE_NUMBER), 2)}.jpg`,
      "category": mockCategory.slice().sort(function (a, b) {
        return 0.5 - Math.random()
      }).slice(0, mockCategory.length - 1),
    })
  }

  return mockedArr;
}

const generate = (input) => {

  let mockArr = [];

  if (Number(input) !== NaN && input.trim() != '') {

    if (Number.parseInt(input) > 1000) {
      console.log('Не больше 1000 объявлений ')
    }
    mockArr = createMockArray(Number.parseInt(input));
  } else {
    mockArr = createMockArray(1);
  }

  fs.writeFile('mocks.json', JSON.stringify(mockArr), function (err) {
    if (err) {
      process.exit(1);
    }
    process.exit(0);

  });
}


exports.generate = generate;
