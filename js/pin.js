'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('template').content.querySelector('button.map__pin');
  var fragment = document.createDocumentFragment();

  var createPin = function (data, callback) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.cssText = 'left: ' + data.location.x + 'px; top:' + data.location.y + 'px;';
    pinElement.querySelector('img').src = data.author.avatar;
    pinElement.addEventListener('click', function (evt) {
      callback(data, evt);
    });
    return pinElement;
  };

  var renderPins = function (pins, clickHandler) {
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(createPin(pins[i], clickHandler));
    }

    mapPins.appendChild(fragment);
  };

  var deactivatePin = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  window.pin = {
    renderPins: renderPins,
    deactivatePin: deactivatePin
  };
})();
