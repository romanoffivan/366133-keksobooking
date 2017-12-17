'use strict';

(function () {
  var mapCard = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormFieldsets = noticeForm.querySelectorAll('fieldset');

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

  var onMainPinMouseup = function () {
    window.map.classList.remove('map--faded');
    window.pin.renderPins(window.data.advertisments);
    noticeForm.classList.remove('notice__form--disabled');
    inputsEnable();
  };

  var onMainPinKeydown = function (evt) {
    if (evt.keyCode === window.data.enterKey) {
      onMainPinMouseup();
    }
  };

  inputsDisable();
  mainPin.addEventListener('mouseup', onMainPinMouseup);
  mainPin.addEventListener('keydown', onMainPinKeydown);
  window.map = mapCard;
})();
