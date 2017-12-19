'use strict';

(function () {

  var NOT_FOR_GUESTS_VALUE = '100';
  var MinPrices = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
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

  var syncSelectElemsValue = function (changedSelect, syncingSelect) {
    syncingSelect.options[changedSelect.selectedIndex].selected = 'selected';
  };

  var syncTypeWithMinPrice = function () {
    priceInputElem.min = MinPrices[typeSelectElem.value];
    priceInputElem.placeholder = priceInputElem.min;
  };

  var syncRoomsWithGuests = function (changedSelect, syncingSelect) {
    var value = changedSelect.value;
    syncingSelect.value = (value === NOT_FOR_GUESTS_VALUE) ? 0 : value;
  };

  var onUserFormElemChange = function (evt) {
    var target = evt.target;

    switch (target) {
      case checkinSelectElem:
        syncSelectElemsValue(checkinSelectElem, checkoutSelectElem);
        break;
      case checkoutSelectElem:
        syncSelectElemsValue(checkoutSelectElem, checkinSelectElem);
        break;
      case typeSelectElem:
        syncTypeWithMinPrice();
        break;
      case numOfRoomsSelectElem:
        syncRoomsWithGuests(numOfRoomsSelectElem, capacitySelectElem);
        break;
    }
  };

  syncTypeWithMinPrice();
  showAddress();
  syncRoomsWithGuests(numOfRoomsSelectElem, capacitySelectElem);
  userFormElem.addEventListener('change', onUserFormElemChange);
  window.form = {
    userFormElem: userFormElem,
    inputsDisable: inputsDisable,
    inputsEnable: inputsEnable,
    showAddress: showAddress
  };
})();
