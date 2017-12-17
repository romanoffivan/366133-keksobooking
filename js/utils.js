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

  var getRandomArray = function (array) {
    var randomArray = [];
    var randomLength = getRandomNum(1, array.length);
    var copyArray = array.slice();

    for (var i = 0; i < randomLength; i++) {
      var randomArrayElement = getRandomItem(copyArray, true);
      randomArray.push(randomArrayElement);
    }

    return randomArray;
  };

  var getRandomNum = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  window.utils = {
    getRandomItem: getRandomItem,
    getRandomArray: getRandomArray,
    getRandomNum: getRandomNum
  };
})();
