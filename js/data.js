'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var AppartmentTypes = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var generateAdvertisements = function (data) {
    var arrayOfAdvertisements = [];

    for (var i = 0; i < data.length; i++) {
      arrayOfAdvertisements.push(data[i]);
    }

    return arrayOfAdvertisements;
  };

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
    generateFeaturesList: generateFeaturesList,
    generateAdvertisements: generateAdvertisements
  };
})();
