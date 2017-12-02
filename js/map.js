'use strict';

var OFFER_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var MAX_ROOMS = 5;
var MAX_GUESTS = 20;
var MAX_OBJ = 8;

var Price = {
  MIN_PRICE: 1000,
  MAX_PRICE: 1000000
};

var Time = {
  MIN_TIME: 12,
  MAX_TIME: 14
};

var CoordX = {
  MIN_COORDX: 300,
  MAX_COORDX: 900
};

var CoordY = {
  MIN_COORDY: 100,
  MAX_COORDY: 500
};

var getRandomItem = function (array, remove) {
  var randomElementIndex = getRandomNum(0, array.length - 1);
  var randomElement = array[randomElementIndex];

  if (remove) {
    array.splice(randomElementIndex, 1);
  }

  return randomElement;
};

var getRandomArray = function (array) {
  var randomArray = [];
  var randomLength = getRandomNum(1, array.length);
  var copyArray = array.slice();

  for (var i = 0; i < randomLength; i++) {
    var randomArrayElement = getRandomItem(copyArray, true);
    randomArray.push(randomArrayElement);
  }

  return randomArray;
};

var getRandomNum = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var generatePromo = function (i) {
  var locationX = getRandomNum(CoordX.MIN_COORDX, CoordX.MAX_COORDX);
  var locationY = getRandomNum(CoordY.MIN_COORDY, CoordY.MAX_COORDY);
  var promo = {};

  promo.author = {
    avatar: 'img/avatars/user0' + (i + 1) + '.png'
  };

  promo.location = {
    x: locationX,
    y: locationY
  };

  promo.offer = {
    title: getRandomItem(OFFER_TITLES, true),
    adress: locationX + ', ' + locationY,
    price: getRandomNum(Price.MIN_PRICE, Price.MAX_PRICE),
    type: getRandomItem(OFFER_TYPES),
    rooms: getRandomNum(1, MAX_ROOMS),
    guests: getRandomNum(1, MAX_GUESTS),
    checkin: getRandomNum(Time.MIN_TIME, Time.MAX_TIME) + ':00',
    checkout: getRandomNum(Time.MIN_TIME, Time.MAX_TIME) + ':00',
    features: getRandomArray(OFFER_FEATURES),
    description: '',
    photos: []
  };
  return promo;
};

var generateAdvertisements = function (amount) {
  var advertisements = [];

  for (var i = 0; i < amount; i++) {
    advertisements[i] = generatePromo(i);
  }

  return advertisements;
};

var offersOfArray = generateAdvertisements(MAX_OBJ);

var map = document.querySelector('.map');
var template = document.querySelector('template').content.querySelector('article.map__card');
var pinTemplate = document.querySelector('template').content.querySelector('button.map__pin');

var createPin = function (ad) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.cssText = 'left: ' + ad.location.x + 'px; top:' + ad.location.y + 'px;';
  pinElement.querySelector('img').src = ad.author.avatar;

  return pinElement;
};

var renderPins = function (ads) {
  var fragment = document.createDocumentFragment();
  var mapPins = document.querySelector('.map__pins');
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(createPin(ads[i]));
  }

  mapPins.appendChild(fragment);
};

var createAdvertisement = function (offersArray) {
  var adFeatureList = template.querySelector('.popup__features');
  var offersTemplate = template.cloneNode(true);

  offersTemplate.querySelector('h3').textContent = offersArray.offer.title;
  offersTemplate.querySelector('p > small').textContent = offersArray.offer.adress;
  offersTemplate.querySelector('.popup__price').innerHTML = offersArray.offer.price + '&#x20bd;/ночь';
  offersTemplate.querySelector('h4').textContent = offersArray.offer.type;
  offersTemplate.querySelector('h4 + p').textContent = 'комнаты: ' + offersArray.offer.rooms + ' для ' + offersArray.offer.guests + ' гостей';
  offersTemplate.querySelector('h4 + p + p').textContent = 'Заезд после ' + offersArray.offer.checkin + ', выезд до ' + offersArray.offer.checkout;
  offersTemplate.querySelector('.popup__features + p').textContent = offersArray.offer.description;
  offersTemplate.querySelector('img').src = offersArray.author.avatar;
  adFeatureList.innerHTML = '';

  for (var j = 0; j < offersArray.offer.features.length; j++) {
    var feature = document.createElement('li');
    feature.className = 'feature feature--' + offersArray.offer.features[j];
    adFeatureList.appendChild(feature);
  }

  return offersTemplate;
};

var renderAdvertisements = function (obj) {
  var mapFilter = document.querySelector('.map__filters-container');
  var fragment = document.createDocumentFragment();
  fragment.appendChild(createAdvertisement(obj[0]));

  map.insertBefore(fragment, mapFilter);
};

var fillMap = function () {
  renderAdvertisements(offersOfArray);
  renderPins(offersOfArray);

  map.classList.remove('map--faded');
};

fillMap();
