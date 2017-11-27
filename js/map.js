'use strict';

var shuffleArray = function (array) {
  var arr = array.slice();
  var amount = arr.length;
  var temp = '';
  var i = 0;

  while (amount) {
    i = Math.floor(Math.random() * amount--);

    temp = arr[amount];
    arr[amount] = arr[i];
    arr[i] = temp;
  }

  return arr;
};

var getFeatures = function (features) {
  var featuresAmount = getRandomNum(1, features.length);
  var randomFeatures = features.slice();

  randomFeatures = shuffleArray(randomFeatures);
  randomFeatures.length = featuresAmount;

  return randomFeatures;
};

var getRandomNum = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var Advertisement = function (i) {
  var adTemplate = {
    title: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    price: {
      min: 1000,
      max: 1000000
    },
    type: ['flat', 'house', 'bungalo'],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    maxRooms: 5,
    maxGuests: 20,
    time: {
      min: 12,
      max: 14
    }
  };

  this.author = {
    avatar: 'img/avatars/user0' + (i + 1) + '.png'
  };

  this.location = {
    x: getRandomNum(300, 900),
    y: getRandomNum(100, 500)
  };

  this.offer = {
    title: adTemplate.title[i],
    adress: this.location.x + ', ' + this.location.y,
    price: getRandomNum(adTemplate.price.min, adTemplate.price.max),
    type: adTemplate.type[getRandomNum(0, adTemplate.type.length - 1)],
    rooms: getRandomNum(1, adTemplate.maxRooms),
    guests: getRandomNum(1, adTemplate.maxGuests),
    checkin: getRandomNum(adTemplate.time.min, adTemplate.time.max) + ':00',
    checkout: getRandomNum(adTemplate.time.min, adTemplate.time.max) + ':00',
    features: getFeatures(adTemplate.features),
    description: '',
    photos: ''
  };
};

var generateAdvertisements = function (amount) {
  var advertisements = [];

  for (var i = 0; i < amount; i++) {
    advertisements.push(new Advertisement(i));
  }

  return advertisements;
};

var createPin = function (ad) {
  var pin = document.createElement('button');
  pin.classList.add('map__pin');
  pin.style.cssText = 'left: ' + (ad.location.x - 20) + 'px; top:' + (ad.location.y - 72) + 'px;';
  pin.innerHTML = '<img src="' + ad.author.avatar + '" width="40" height="40" draggable="false">';

  return pin;
};

var renderPins = function (ads) {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(createPin(ads[i]));
  }

  mapPins.appendChild(fragment);
};

var createAdvertisement = function (ad) {
  var template = document.querySelector('template').content;
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
  adElement.querySelector('.popup__avatar').src = ad.author.avatar;

  adFeatureList.innerHTML = '';
  for (var j = 0; j < featuresAmount; j++) {
    var feature = document.createElement('li');
    feature.className = 'feature feature--' + ad.offer.features[j];
    adFeatureList.appendChild(feature);
  }

  return adElement;
};

var fillMap = function () {
  var map = document.querySelector('.map');
  var advertisements = generateAdvertisements(8);

  renderAdvertisements(map, advertisements);
  renderPins(advertisements);

  map.classList.remove('map--faded');

};

var renderAdvertisements = function (map, advertisements) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < advertisements.length; i++) {
    fragment.appendChild(createAdvertisement(advertisements[i]));
  }

  map.appendChild(fragment);
};
fillMap();
