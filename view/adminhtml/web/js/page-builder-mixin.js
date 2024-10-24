/*eslint-disable */
/* jscs:disable */
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
define(["Magento_PageBuilder/js/events"], function (_events) {
  function _default(base) {
    return /*#__PURE__*/function (_base) {
      "use strict";

      function PageBuilderMixin() {
        var _this;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _base.call.apply(_base, [this].concat(args)) || this;
        _this.template = 'Boundsoff_PageBuilderTemplateInline/page-builder';
        return _this;
      }
      _inheritsLoose(PageBuilderMixin, _base);
      var _proto = PageBuilderMixin.prototype;
      _proto.toggleTemplateList = function toggleTemplateList() {
        // @todo add ACL

        _events.trigger('stage:templateList:open', {
          stage: this.stage
        });
      };
      _proto.initListeners = function initListeners() {
        _base.prototype.initListeners.call(this);
        _events.on("stage:templateManager:save", this.saveAsTemplate.bind(this));
      };
      return PageBuilderMixin;
    }(base);
  }
  return _default;
});
//# sourceMappingURL=page-builder-mixin.js.map