/*eslint-disable */
/* jscs:disable */
define([], function () {
  var modelData = null;
  function setDraggedTemplateModelData(model) {
    modelData = model;
  }
  function getDraggedTemplateModelData() {
    return modelData;
  }
  return {
    getDraggedTemplateModelData: getDraggedTemplateModelData,
    setDraggedTemplateModelData: setDraggedTemplateModelData
  };
});
//# sourceMappingURL=registry.js.map