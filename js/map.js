'use strict';
var ESC_KEYCODE = 27;

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
  MIN: 1000,
  MAX: 1000000
};

var Time = {
  MIN: 12,
  MAX: 14
};

var CoordX = {
  MIN: 300,
  MAX: 900
};

var CoordY = {
  MIN: 100,
  MAX: 500
};

var AppartmentTypes = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
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
  var locationX = getRandomNum(CoordX.MIN, CoordX.MAX);
  var locationY = getRandomNum(CoordY.MIN, CoordY.MAX);
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
    price: getRandomNum(Price.MIN, Price.MAX),
    type: getRandomItem(OFFER_TYPES),
    rooms: getRandomNum(1, MAX_ROOMS),
    guests: getRandomNum(1, MAX_GUESTS),
    checkin: getRandomNum(Time.MIN, Time.MAX) + ':00',
    checkout: getRandomNum(Time.MIN, Time.MAX) + ':00',
    features: getRandomArray(OFFER_FEATURES),
    description: '',
    photos: []
  };
  return promo;
};

var generateAdvertisements = function (amount) {
  var arrayOfAdvertisements = [];

  for (var i = 0; i < amount; i++) {
    arrayOfAdvertisements[i] = generatePromo(i);
  }

  return arrayOfAdvertisements;
};

var advertisments = generateAdvertisements(MAX_OBJ);

var map = document.querySelector('.map');
var template = document.querySelector('template').content.querySelector('article.map__card');
var pinTemplate = document.querySelector('template').content.querySelector('button.map__pin');
var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var createPin = function (data) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.cssText = 'left: ' + data.location.x + 'px; top:' + data.location.y + 'px;';
  pinElement.querySelector('img').src = data.author.avatar;

  return pinElement;
};

var renderPins = function (pins) {
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createPin(pins[i]));
  }

  mapPins.appendChild(fragment);
};

var generateFeaturesList = function (featuresArray) {
  var featuresList = '';
  for (var i = 0; i < featuresArray.length; i++) {
    featuresList = '<li class="feature feature--' + featuresArray[i] + '"></li>' + featuresList;
  }
  return featuresList;
};

var createAdvertisement = function (data) {
  var offersElement = template.cloneNode(true);

  offersElement.querySelector('h3').textContent = data.offer.title;
  offersElement.querySelector('p > small').textContent = data.offer.adress;
  offersElement.querySelector('.popup__price').innerHTML = data.offer.price + '&#x20bd;/ночь';
  offersElement.querySelector('h4').textContent = AppartmentTypes[data.offer.type];
  offersElement.querySelector('h4 + p').textContent = 'комнаты: ' + data.offer.rooms + ' для ' + data.offer.guests + ' гостей';
  offersElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  offersElement.querySelector('.popup__features + p').textContent = data.offer.description;
  offersElement.querySelector('img').src = data.author.avatar;
  offersElement.querySelector('.popup__features').innerHTML = generateFeaturesList(data.offer.features);

  return offersElement;
};

var renderAdvertisements = function (array, index) {
  var mapFilter = document.querySelector('.map__filters-container');
  map.insertBefore(createAdvertisement(array[index]), mapFilter);
};

var mainPin = document.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.notice__form');
var noticeFormFieldsets = noticeForm.querySelectorAll('fieldset');
var popup = map.querySelector('.popup');
var pinsList = fragment.querySelectorAll('.map__pin');

var inputsDisable = function () {
  for (var i = 0; i < noticeFormFieldsets.length; i++) {
    noticeFormFieldsets[i].disabled = true;
  }
};

var inputsEnable = function () {
  for (var i = 0; i < noticeFormFieldsets.length; i++) {
    noticeFormFieldsets[i].disabled = false;
  }
};

var closePopup = function () {
  popup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEskPress);
};

var activatePin = function () {
  var target = event.target;
  var btn = target.closest('button');
  if (!btn) {
    return;
  }
  if (!mapPins.contains(btn)) {
    return;
  }
  btn.classList.add('map__pin--active');
};

var deactivatePin = function () {
  var target = event.target;
  var btn = target.closest('button');
  if (!btn) {
    return;
  }
  for (var i = 0; i < pinsList.length; i++) {
    if (mainPin.classList.contains('map__pin--active')) {
      mainPin.classList.remove('map__pin--active');
    }
    if (pinsList[i].classList.contains('map__pin--active')) {
      pinsList[i].classList.remove('map__pin--active');
    }
  }
};

var openPopup = function () {
  var target = event.target;
  var btn = target.closest('button');
  if (!btn) {
    return;
  }
  if (!mapPins.contains(btn)) {
    return;
  }
  if (btn === mainPin) {
    return;
  }

  for (var i = 0; i < pinsList.length; i++) {
    if (btn === pinsList[i]) {
      map.removeChild(popup);
      var card = renderAdvertisements(advertisments, 0);
      popup = card;
      var popupClose = popup.querySelector('.popup__close');
      popup.classList.remove('hidden');
      popupClose.addEventListener('click', onPopupCloseClick);
      document.addEventListener('keydown', onPopupEskPress);
      return;
    }
  }
};

var onMainPinMouseup = function () {
  map.classList.remove('map--faded');
  renderPins(advertisments);
  noticeForm.classList.remove('notice__form--disabled');
  inputsEnable();
};

var onPopupEskPress = function (event) {
  if (event.keyCode === ESC_KEYCODE) {
    closePopup();
    deactivatePin();
  }
};

var onPopupCloseClick = function () {
  closePopup();
  deactivatePin();
};

var onPinClick = function () {
  deactivatePin();
  activatePin();
  openPopup();
};

inputsDisable();
closePopup();
mapPins.addEventListener('click', onPinClick);
mainPin.addEventListener('mouseup', onMainPinMouseup);
