/*eslint-disable */
/* jscs:disable */
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
define(["Magento_PageBuilder/js/events", "Magento_PageBuilder/js/content-type-factory", "Magento_PageBuilder/js/acl", "Boundsoff_PageBuilderTemplateInline/js/acl", "Magento_Ui/js/modal/alert", "knockout", "Magento_PageBuilder/js/content-type/column/resize", "Magento_PageBuilder/js/content-type/column-group/factory", "Magento_PageBuilder/js/config", "Magento_PageBuilder/js/content-type/column-group/grid-size"], function (_events, _contentTypeFactory, _acl, _acl2, _alert, _knockout, _resize, _factory, _config, _gridSize) {
  function _default(base) {
    return /*#__PURE__*/function (_base) {
      "use strict";

      function PageBuilderMixin(config, initialValue) {
        var _this;
        _this = _base.call(this, config, initialValue) || this;
        _this.template = 'Boundsoff_PageBuilderTemplateInline/page-builder';
        _this.canApplyInlineTemplates = (0, _acl.isAllowed)(_acl2.resources.TEMPLATE_INLINE_APPLY);
        _this.isStageReady.subscribe(function () {
          _this.shouldShowDropZone = _knockout.computed(function () {
            return _this.stage.interacting() && _this.canApplyInlineTemplates;
          });
        });
        return _this;
      }
      _inheritsLoose(PageBuilderMixin, _base);
      var _proto = PageBuilderMixin.prototype;
      _proto.toggleTemplateList = function toggleTemplateList() {
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
      _proto.onMouseTemplateZone = function onMouseTemplateZone(self, $event) {
        $event.type === 'mouseover' ? $event.target.classList.add('active') : $event.target.classList.remove('active');
      };
      _proto.templateApply = function templateApply(_ref) {
        var _this3 = this;
        var modelData = _ref.modelData,
          index = _ref.index,
          contentType = _ref.contentType;
        if (!this.canApplyInlineTemplates) {
          (0, _alert)({
            content: $t("You do not have permission to apply inline templates."),
            title: $t("Permission Error")
          });
          return;
        }
        var model = modelData.model;
        var parent = function (_modelData$column) {
          switch (model.component_data.config.name) {
            case 'column':
              return ((_modelData$column = modelData.column) == null ? void 0 : _modelData$column.preview.contentType) || contentType || _this3.stage.rootContainer;
            default:
              return contentType || _this3.stage.rootContainer;
          }
        }();
        return this.templateApplyChild(parent, model.component_data).then(function (templateContentType) {
          switch (templateContentType.config.name) {
            case 'column':
              return _this3.templateAddColumn(templateContentType, modelData, parent, index);
            default:
              parent.addChild(templateContentType, index);
              break;
          }
          return templateContentType;
        }).then(function (templateContentType) {
          var eventData = {
            templateContentType: templateContentType,
            model: model,
            parent: parent
          };
          _events.trigger("templates:apply:successfully", eventData);
          _events.trigger("templates:apply:successfully:" + templateContentType.config.name, eventData);
        });
      };
      _proto.templateApplyChild = function templateApplyChild(parent, child) {
        var _this4 = this;
        return (0, _contentTypeFactory)(child.config, parent, this.stage.id, child.contentTypeData, child.children.length, child.dataStoresStates).then(function (templateContentType) {
          templateContentType.dropped = true;
          return Promise.all(child.children.map(function (child, index) {
            return _this4.templateApplyChild(templateContentType, child).then(function (content) {
              templateContentType.addChild(content, index);
            });
          })).then(function () {
            return templateContentType;
          });
        });
      };
      _proto.templateAddColumn = function templateAddColumn(contentType, modelData, parent, index) {
        if (modelData.column) {
          var columnLinePreview = modelData.column.preview;
          var resizeUtils = columnLinePreview.getResizeUtils();

          // create new line above or bellow of the content
          if (modelData.column.isColumnLinePlaceholderActive) {
            return (0, _factory.createColumnLine)(columnLinePreview.contentType.parentContentType, resizeUtils.getColumnsWidth(), columnLinePreview.getNewColumnLineIndex()).then(function (columnLine) {
              columnLine.addChild(contentType);
              (0, _resize.updateColumnWidth)(contentType, resizeUtils.getColumnsWidth());
              return contentType;
            });
          }
          var dropPosition = modelData.column.dropPosition;
          if (dropPosition) {
            var newWidth = resizeUtils.getAcceptedColumnWidth((resizeUtils.getColumnWidth(dropPosition.affectedColumn) - resizeUtils.getSmallestColumnWidth()).toString());
            columnLinePreview.contentType.addChild(contentType, dropPosition.insertIndex);
            (0, _resize.updateColumnWidth)(dropPosition.affectedColumn, newWidth);
            (0, _resize.updateColumnWidth)(contentType, resizeUtils.getSmallestColumnWidth());
            return contentType;
          }
        }
        var defaultGridSize = (0, _gridSize.getDefaultGridSize)();
        return (0, _contentTypeFactory)(_config.getContentTypeConfig("column-group"), parent, this.stage.id, {
          grid_size: defaultGridSize
        }).then(function (columnGroup) {
          parent.addChild(columnGroup, index);
          return (0, _factory.createColumnLine)(columnGroup, 100);
        }).then(function (columnLine) {
          columnLine.addChild(contentType);
          (0, _resize.updateColumnWidth)(contentType, 100);
          return contentType;
        });
      };
      return PageBuilderMixin;
    }(base);
  }
  return _default;
});