'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var mapFilter = document.querySelector('.map__filters-container');
  var pinTemplate = document.querySelector('template').content.querySelector('button.map__pin');
  var fragment = document.createDocumentFragment();

  var createPin = function (data) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.cssText = 'left: ' + data.location.x + 'px; top:' + data.location.y + 'px;';
    pinElement.querySelector('img').src = data.author.avatar;

    pinElement.addEventListener('click', function (evt) {
      onPinClick(evt, data);
    });

    return pinElement;
  };

  var renderPins = function (pins) {
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(createPin(pins[i]));
    }

    mapPins.appendChild(fragment);
  };

  var deactivatePin = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var onPinClick = function (evt, advert) {
    deactivatePin();

    evt.currentTarget.classList.add('map__pin--active');
    var advCard = window.card.createAdvertisement(advert);
    window.card.hideAdvertCard();
    window.map.insertBefore(advCard, mapFilter);

    advCard.querySelector('.popup__close').addEventListener('click', function () {
      deactivatePin();
      window.card.hideAdvertCard();
    });
    document.addEventListener('keydown', window.card.onPopupEskPress);
  };
  window.pin = {
    renderPins: renderPins,
    deactivatePin: deactivatePin
  };
})();
