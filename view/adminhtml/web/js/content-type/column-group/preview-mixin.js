/*eslint-disable */
/* jscs:disable */
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
define(["Magento_PageBuilder/js/events"], function (_events) {
  function _default(base) {
    return /*#__PURE__*/function (_base) {
      "use strict";

      function PreviewMixin() {
        return _base.apply(this, arguments) || this;
      }
      _inheritsLoose(PreviewMixin, _base);
      var _proto = PreviewMixin.prototype;
      _proto.onNewColumnDrop = function onNewColumnDrop(dropPosition) {
        var eventData = {
          shouldContinue: true,
          dropPosition: dropPosition,
          preview: this
        };
        _events.trigger("column:drag:new", eventData);
        if (!eventData.shouldContinue) {
          return;
        }
        _base.prototype.onNewColumnDrop.call(this, dropPosition);
      };
      return PreviewMixin;
    }(base);
  }
  return _default;
});
//# sourceMappingURL=preview-mixin.js.map