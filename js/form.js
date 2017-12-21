'use strict';

(function () {
  var FormFieldsParams = {
    TIME_OPTIONS: ['12:00', '13:00', '14:00'],
    ROOMS_OPTIONS: ['1', '2', '3', '100'],
    GUESTS_OPTIONS: ['1', '2', '3', '0'],
    APARTMENTS_OPTIONS: ['bungalo', 'flat', 'house', 'palace'],
    PRICE_OPTIONS: [0, 1000, 5000, 10000]
  };
  var userFormElem = document.querySelector('.notice__form');
  var mainPin = document.querySelector('.map__pin--main');
  var noticeFormFieldsets = userFormElem.querySelectorAll('fieldset');

  var checkinSelectElem = userFormElem.querySelector('#timein');
  var checkoutSelectElem = userFormElem.querySelector('#timeout');

  var typeSelectElem = userFormElem.querySelector('#type');
  var priceInputElem = userFormElem.querySelector('#price');

  var numOfRoomsSelectElem = userFormElem.querySelector('#room_number');
  var capacitySelectElem = userFormElem.querySelector('#capacity');
  var addressInput = userFormElem.querySelector('#address');


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

  var showAddress = function () {
    var left = parseInt(getComputedStyle(mainPin).getPropertyValue('left'), 10);
    var top = parseInt(getComputedStyle(mainPin).getPropertyValue('top'), 10);
    addressInput.value = left + ' ' + top;
  };

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
    if (element.placeholder) {
      element.placeholder = value;
    }
  };

  var onUserFormElemChange = function (evt) {
    var target = evt.target;

    switch (target) {
      case checkinSelectElem:
        window.synchronizeFields(checkinSelectElem, checkoutSelectElem, FormFieldsParams.TIME_OPTIONS, FormFieldsParams.TIME_OPTIONS, syncValues);
        break;
      case checkoutSelectElem:
        window.synchronizeFields(checkinSelectElem, checkoutSelectElem, FormFieldsParams.TIME_OPTIONS, FormFieldsParams.TIME_OPTIONS, syncValues);
        break;
      case typeSelectElem:
        window.synchronizeFields(typeSelectElem, priceInputElem, FormFieldsParams.APARTMENTS_OPTIONS, FormFieldsParams.PRICE_OPTIONS, syncValueWithMin);
        break;
      case numOfRoomsSelectElem:
        window.synchronizeFields(numOfRoomsSelectElem, capacitySelectElem, FormFieldsParams.ROOMS_OPTIONS, FormFieldsParams.GUESTS_OPTIONS, syncValues);
        break;
    }
  };

  showAddress();
  userFormElem.addEventListener('change', onUserFormElemChange);
  window.form = {
    userFormElem: userFormElem,
    inputsDisable: inputsDisable,
    inputsEnable: inputsEnable,
    showAddress: showAddress
  };
})();
