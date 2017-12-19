'use strict';

(function () {
  var mapCard = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var MainPinParams = {
    WIDTH: 64,
    HEIGHT: 64,
    ARROW_HEIGHT: 22
  };

  var pinOffsetY = MainPinParams.HEIGHT / 2 + MainPinParams.ARROW_HEIGHT;

  var LocationBorders = {
    Y_MIN: 200,
    Y_MAX: 700
  };

  var MapConstraints = {
    TOP: LocationBorders.Y_MIN - pinOffsetY,
    BOTTOM: LocationBorders.Y_MAX - pinOffsetY,
    LEFT: 0,
    RIGHT: mapCard.clientWidth
  };

  var onMainPinKeydown = function (evt) {
    if (evt.keyCode === window.data.enterKey) {
      onMainPinMouseup();
    }
  };
  var onPopupEskPress = function (evt) {
    if (evt.keyCode === window.data.escKey) {
      window.pin.deactivatePin();
      window.card.hideAdvertCard(onPopupEskPress);
    }
  };

  var onPinClick = function (advert, evt) {
    window.pin.deactivatePin();
    evt.currentTarget.classList.add('map__pin--active');
    window.card.showCard(advert, window.pin.deactivatePin);
    document.addEventListener('keydown', onPopupEskPress);
  };

  var onMainPinMouseup = function () {
    mapCard.classList.remove('map--faded');
    window.pin.renderPins(window.data.advertisments, onPinClick);
    window.form.userFormElem.classList.remove('notice__form--disabled');
    window.form.inputsEnable();
  };
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onPinMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y
      };

      var currentCoords = {
        x: mainPin.offsetLeft + shift.x,
        y: mainPin.offsetTop + shift.y
      };

      if (currentCoords.x < MapConstraints.LEFT) {
        currentCoords.x = MapConstraints.LEFT;
      }

      if (currentCoords.x > MapConstraints.RIGHT) {
        currentCoords.x = MapConstraints.RIGHT;
      }

      if (currentCoords.y < MapConstraints.TOP) {
        currentCoords.y = MapConstraints.TOP;
      }

      if (currentCoords.y > MapConstraints.BOTTOM) {
        currentCoords.y = MapConstraints.BOTTOM;
      }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (currentCoords.y) + 'px';
      mainPin.style.left = (currentCoords.x) + 'px';
      window.form.showAddress();
    };

    var onPinMouseUp = function () {
      mainPin.classList.remove('map__pin--active');

      mainPin.style.cursor = 'move';
      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onPinMouseUp);
    };

    mainPin.classList.add('map__pin--active');
    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onPinMouseUp);
  });

  window.form.inputsDisable();
  mainPin.addEventListener('mouseup', onMainPinMouseup);
  mainPin.addEventListener('keydown', onMainPinKeydown);
})();
