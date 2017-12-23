'use strict';

(function () {
  var getRandomItem = function (array, remove) {
    var randomElementIndex = getRandomNum(0, array.length - 1);
    var randomElement = array[randomElementIndex];

    if (remove) {
      array.splice(randomElementIndex, 1);
    }

    return randomElement;
  };

  var getRandomArray = function (array, amount) {
    var randomArray = [];
    var copyArray = array.slice();

    for (var i = 0; i < amount; i++) {
      var randomArrayElement = getRandomItem(copyArray, true);
      randomArray.push(randomArrayElement);
    }

    return randomArray;
  };

  var getRandomNum = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  window.utils = {
    getRandomArray: getRandomArray
  };
})();
