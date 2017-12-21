'use strict';

(function () {
  window.synchronizeFields = function (field1, field2, values1, values2, syncCallback) {
    var valueIndex = values1.indexOf(field1.value);
    syncCallback(field2, values2[valueIndex]);
  };
})();
