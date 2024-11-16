/*eslint-disable */
/* jscs:disable */
define(["jquery", "knockout", "mage/utils/wrapper", "Magento_PageBuilder/js/events", "Boundsoff_PageBuilderTemplateInline/js/drag-drop/registry"], function (_jquery, _knockout, _wrapper, _events, _registry) {
  function applyTemplateInline(modelData, preview, event, ui) {
    // If the container content type can't receive drops we need to cancel the operation
    if (!preview.isContainer()) {
      (0, _jquery)(this).sortable("cancel");
      return;
    }
    var target = event.target;
    var index = Array.from(target.querySelectorAll('.pagebuilder-content-type-wrapper, .pagebuilder-draggable-content-type')).findIndex(function (it) {
      return it.classList.contains('pagebuilder-draggable-content-type');
    });
    index = index === -1 ? null : index;
    var model = modelData.model;
    var contentType = preview.contentType;
    _events.trigger("stage:" + modelData.stage.id + ":template:apply", {
      model: model,
      index: index,
      contentType: contentType
    });
  }
  function _default(sortable) {
    sortable.getSortableOptions = _wrapper.wrap(sortable.getSortableOptions, function (superFunction, preview) {
      var options = superFunction(preview);
      options.receive = _wrapper.wrap(options.receive, function (superFunction) {
        var modelData = (0, _registry.getDraggedTemplateModelData)();
        if (!modelData) {
          return superFunction();
        }
        applyTemplateInline.call(this, modelData, preview, arguments[1], arguments[2]);
      });
      options.stop = _wrapper.wrap(options.stop, function (superFunction, event, ui) {
        var target = event.originalEvent.target;
        if (target.classList.contains('bf__pb_drop-zone')) {
          var contentType = _knockout.dataFor(ui.item[0]);
          contentType.preview.onTemplate();
        }
        return superFunction();
      });
      return options;
    });
    return sortable;
  }
  return _default;
});
//# sourceMappingURL=sortable-mixin.js.map