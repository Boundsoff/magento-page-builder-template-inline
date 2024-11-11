/*eslint-disable */
/* jscs:disable */
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
define(["Magento_PageBuilder/js/events", "Magento_PageBuilder/js/content-type-factory"], function (_events, _contentTypeFactory) {
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
        var _this2 = this;
        _base.prototype.initListeners.call(this);
        _events.on("stage:templateManager:save", this.saveAsTemplate.bind(this));
        if (!this.isStageReady()) {
          this.isStageReady.subscribe(function () {
            _events.on("stage:" + _this2.stage.id + ":template:apply", _this2.templateApply.bind(_this2));
          });
        } else {
          _events.on("stage:" + this.stage.id + ":template:apply", this.templateApply.bind(this));
        }
      };
      _proto.templateApply = function templateApply(_ref) {
        var model = _ref.model,
          index = _ref.index,
          contentType = _ref.contentType;
        var parent = contentType || this.stage.rootContainer;
        return this.templateApplyChild(parent, model.component_data).then(function (templateContentType) {
          parent.addChild(templateContentType, index);
        });
      };
      _proto.templateApplyChild = function templateApplyChild(parent, child) {
        var _this3 = this;
        return (0, _contentTypeFactory)(child.config, parent, this.stage.id, child.contentTypeData, child.children.length, child.dataStoresStates).then(function (templateContentType) {
          return Promise.all(child.children.map(function (child, index) {
            return _this3.templateApplyChild(templateContentType, child).then(function (content) {
              templateContentType.addChild(content, index);
            });
          })).then(function () {
            return templateContentType;
          });
        });
      };
      return PageBuilderMixin;
    }(base);
  }
  return _default;
});
//# sourceMappingURL=page-builder-mixin.js.map