'use strict';

(function () {
  var map = document.querySelector('.map');
  var template = document.querySelector('template').content.querySelector('article.map__card');
  var mapFilter = document.querySelector('.map__filters-container');
  var createAdvertisement = function (data) {
    var offersElement = template.cloneNode(true);

    offersElement.querySelector('h3').textContent = data.offer.title;
    offersElement.querySelector('p > small').textContent = data.offer.address;
    offersElement.querySelector('.popup__price').innerHTML = data.offer.price + '&#x20bd;/ночь';
    offersElement.querySelector('h4').textContent = window.data.types[data.offer.type];
    offersElement.querySelector('h4 + p').textContent = 'комнаты: ' + data.offer.rooms + ' для ' + data.offer.guests + ' гостей';
    offersElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    offersElement.querySelector('.popup__features + p').textContent = data.offer.description;
    offersElement.querySelector('img').src = data.author.avatar;
    offersElement.querySelector('.popup__features').innerHTML = window.data.generateFeaturesList(data.offer.features);

    return offersElement;
  };

  var showAdvert = function (data, onClose) {
    var advCard = createAdvertisement(data);
    hideAdvert();
    map.insertBefore(advCard, mapFilter);
    advCard.querySelector('.popup__close').addEventListener('click', function () {
      hideAdvert();
      onClose();
    });
  };

  var hideAdvert = function (clickHandler) {
    var popup = document.querySelector('.popup');
    if (popup) {
      map.removeChild(popup);
      document.removeEventListener('keydown', clickHandler);
    }
  };
  window.card = {
    showAdvert: showAdvert,
    hideAdvert: hideAdvert
  };
})();
