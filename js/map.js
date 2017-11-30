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

var PRICES = {
  min: 1000,
  max: 1000000
};

var TIMES = {
  min: 12,
  max: 14
};

var COORD_X = {
  min: 300,
  max: 900
};

var COORD_Y = {
  min: 100,
  max: 500
};

var MAX_ROOMS = 5;
var MAX_GUESTS = 20;
var MAX_OBJ = 8;

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var template = document.querySelector('template').content.querySelector('.map__card');
var pin = document.querySelector('template').content.querySelector('.map__pin');
var pinImage = pin.querySelector('img');

map.classList.remove('map--faded');

var getRandomItem = function (array, key) {
  var randomElementIndex = getRandomNum(0, array.length - 1);
  var randomElement = array[randomElementIndex];

  if (key) {
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

var generateAd = function (i) {
  var ads = {};

  ads.author = {
    avatar: 'img/avatars/user0' + (i + 1) + '.png'
  };

  ads.location = {
    x: getRandomNum(COORD_X.min, COORD_X.max),
    y: getRandomNum(COORD_Y.min, COORD_Y.max)
  };

  ads.offer = {
    title: getRandomItem(OFFER_TITLES, true),
    adress: location.x + ', ' + location.y,
    price: getRandomNum(PRICES.min, PRICES.max),
    type: OFFER_TYPES[getRandomNum(0, OFFER_TYPES.length - 1)],
    rooms: getRandomNum(1, MAX_ROOMS),
    guests: getRandomNum(1, MAX_GUESTS),
    checkin: getRandomNum(TIMES.min, TIMES.max) + ':00',
    checkout: getRandomNum(TIMES.min, TIMES.max) + ':00',
    features: getRandomArray(OFFER_FEATURES),
    description: '',
    photos: []
  };
  return ads;
};

var generateAdvertisements = function (amount) {
  var advertisements = [];

  for (var i = 0; i < amount; i++) {
    advertisements[i] = generateAd(i);
  }

  return advertisements;
};

var createPin = function (ad) {
  var pinElement = pin.cloneNode(true);
  pinElement.style.cssText = 'left: ' + ad.location.x + 'px; top:' + ad.location.y + 'px;';
  pinImage.src = ad.author.avatar;

  return pinElement;
};

var renderPins = function (ads) {
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(createPin(ads[i]));
  }

  mapPins.appendChild(fragment);
};

var createAdvertisement = function (ad) {
  var adElement = template.cloneNode(true);
  var featuresAmount = ad.offer.features.length;
  var adFeatureList = adElement.querySelector('.popup__features');

  adElement.querySelector('h3').textContent = ad.offer.title;
  adElement.querySelector('p > small').textContent = ad.offer.address;
  adElement.querySelector('.popup__price').innerHTML = ad.offer.price + '&#x20bd;/ночь';
  adElement.querySelector('h4').textContent = ad.offer.type;
  adElement.querySelector('h4 + p').textContent = 'комнаты: ' + ad.offer.rooms + ' для ' + ad.offer.guests + ' гостей';
  adElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  adElement.querySelector('.popup__features + p').textContent = ad.offer.description;
  adElement.querySelector('img').src = ad.author.avatar;

  adFeatureList.innerHTML = '';
  for (var j = 0; j < featuresAmount; j++) {
    var feature = document.createElement('li');
    feature.className = 'feature feature--' + ad.offer.features[j];
    adFeatureList.appendChild(feature);
  }

  return adElement;
};

var renderAdvertisements = function (obj) {
  for (var i = 0; i < obj.length; i++) {
    fragment.appendChild(createAdvertisement(obj[i]));
  }

  map.appendChild(fragment);
};

var fillMap = function () {
  var advertisements = generateAdvertisements(MAX_OBJ);

  renderAdvertisements(advertisements);
  renderPins(advertisements);
};

fillMap();
