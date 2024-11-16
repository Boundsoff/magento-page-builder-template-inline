/*eslint-disable */
/* jscs:disable */
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
define(["Magento_PageBuilder/js/config"], function (_config) {
  function _default(base) {
    return /*#__PURE__*/function (_base) {
      "use strict";

      function _class() {
        return _base.apply(this, arguments) || this;
      }
      _inheritsLoose(_class, _base);
      var _proto = _class.prototype;
      _proto.getTemplateData = function getTemplateData() {
        var children = [];
        if (this.contentType.children && this.contentType.children().length) {
          this.contentType.children().forEach(function (child) {
            var templateData = child.preview.getTemplateData();
            children.push(templateData);
          });
        }
        var config = this.contentType.config;
        var defaultViewport = _config.getConfig("defaultViewport");
        var contentTypeData = this.contentType.dataStores[defaultViewport].getState();
        var dataStoresStates = this.contentType.getDataStoresStates();
        return {
          config: config,
          contentTypeData: contentTypeData,
          dataStoresStates: dataStoresStates,
          children: children
        };
      };
      return _class;
    }(base);
  }
  return _default;
});
//# sourceMappingURL=preview-collection-mixin.js.map