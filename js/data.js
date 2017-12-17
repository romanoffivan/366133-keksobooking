'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
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

  var generatePromo = function (i) {
    var locationX = window.utils.getRandomNum(CoordX.MIN, CoordX.MAX);
    var locationY = window.utils.getRandomNum(CoordY.MIN, CoordY.MAX);
    var promo = {};

    promo.author = {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    };

    promo.location = {
      x: locationX,
      y: locationY
    };

    promo.offer = {
      title: window.utils.getRandomItem(OFFER_TITLES, true),
      adress: locationX + ', ' + locationY,
      price: window.utils.getRandomNum(Price.MIN, Price.MAX),
      type: window.utils.getRandomItem(OFFER_TYPES),
      rooms: window.utils.getRandomNum(1, MAX_ROOMS),
      guests: window.utils.getRandomNum(1, MAX_GUESTS),
      checkin: window.utils.getRandomNum(Time.MIN, Time.MAX) + ':00',
      checkout: window.utils.getRandomNum(Time.MIN, Time.MAX) + ':00',
      features: window.utils.getRandomArray(OFFER_FEATURES),
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

  var generateFeaturesList = function (featuresArray) {
    var featuresList = '';
    for (var i = 0; i < featuresArray.length; i++) {
      featuresList = '<li class="feature feature--' + featuresArray[i] + '"></li>' + featuresList;
    }
    return featuresList;
  };
  window.data = {
    escKey: ESC_KEYCODE,
    enterKey: ENTER_KEYCODE,
    types: AppartmentTypes,
    advertisments: advertisments,
    generateFeaturesList: generateFeaturesList
  };
})();
