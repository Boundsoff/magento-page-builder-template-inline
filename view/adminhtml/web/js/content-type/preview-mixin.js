/*eslint-disable */
/* jscs:disable */
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
define(["mage/translate", "Magento_PageBuilder/js/content-type-menu/option"], function (_translate, _option) {
  function _default(base) {
    return /*#__PURE__*/function (_base) {
      "use strict";

      function PreviewMixin() {
        return _base.apply(this, arguments) || this;
      }
      _inheritsLoose(PreviewMixin, _base);
      var _proto = PreviewMixin.prototype;
      _proto.retrieveOptions = function retrieveOptions() {
        var options = _base.prototype.retrieveOptions.call(this);
        options.template = new _option({
          preview: this,
          icon: "<i class='icon-pagebuilder-variable'></i>",
          title: (0, _translate)("Template"),
          action: this.onTemplate,
          classes: ["template-structural"],
          sort: 55
        });
        return options;
      };
      _proto.onTemplate = function onTemplate() {
        confirm('@todo implement dialog!');
      };
      return PreviewMixin;
    }(base);
  }
  return _default;
});
//# sourceMappingURL=preview-mixin.js.map