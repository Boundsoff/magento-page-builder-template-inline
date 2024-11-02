/*eslint-disable */
/* jscs:disable */
define(["html2canvas", "mage/translate", "Magento_PageBuilder/js/config", "uiRegistry", "Magento_PageBuilder/js/modal/confirm-alert", "Magento_PageBuilder/js/modal/template-manager-save", "text!Magento_PageBuilder/template/modal/template-manager/save-content-modal.html"], function (html2canvas, _translate, _config, _uiRegistry, _confirmAlert, _templateManagerSave, _saveContentModal) {
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  var TemplateInlineManager = /*#__PURE__*/function () {
    "use strict";

    function TemplateInlineManager() {}
    TemplateInlineManager.createCapture = function createCapture(preview) {
      var element = preview.wrapperElement;
      var stageElement = document.getElementById(preview.contentType.stageId);
      stageElement.classList.add('capture');
      stageElement.classList.add('interacting');
      return html2canvas(element, {
        scale: 1,
        useCORS: true
      }).then(function (canvas) {
        stageElement.classList.remove('capture');
        stageElement.classList.remove('interacting');
        return canvas.toDataURL('image/jpeg', 0.85);
      }).catch(function (error) {
        stageElement.classList.remove('capture');
        stageElement.classList.remove('interacting');
        console.error(error);
        return '';
      });
    };
    TemplateInlineManager.saveAs = function saveAs(preview, component_data) {
      var capture = TemplateInlineManager.createCapture(preview);

      // noinspection JSVoidFunctionReturnValueUsed
      var prompt = (0, _templateManagerSave)({
        title: (0, _translate)("Save Block as Template"),
        promptContentTmpl: _saveContentModal,
        templateTypes: _config.getConfig("stage_config").template_types,
        createdForNote: (0, _translate)("Created For is to help with filtering templates. This does not restrict where this template can be used."),
        typeLabel: (0, _translate)("Created For"),
        label: (0, _translate)("Template Name"),
        validation: true,
        modalClass: "template-manager-save",
        validationRules: ["required-entry"],
        attributesForm: {
          novalidate: "novalidate",
          action: ""
        },
        attributesField: {
          "name": "name",
          "data-validate": "{required:true}",
          "maxlength": "255"
        },
        actions: {
          confirm: function confirm(name, created_for) {
            return capture.then(function (preview_image) {
              var requestUrl = new URL(_config.getConfig('bf__template_save_url'));
              var requestData = {
                name: name,
                created_for: created_for,
                component_data: component_data,
                preview_image: preview_image
              };

              // @ts-ignore
              requestUrl.searchParams.set('form_key', window.FORM_KEY);
              requestUrl.searchParams.set('isAjax', 'true');
              return fetch(requestUrl.toString(), {
                method: 'POST',
                body: JSON.stringify(requestData),
                headers: new Headers({
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                })
              }).then(function (response) {
                return response.json();
              });
            }).then(function (response) {
              if (!response.success) {
                var _response$message;
                throw new Error(((_response$message = response.message) == null ? void 0 : _response$message.toString()) || 'Unknown error');
              }
              (0, _confirmAlert)({
                content: (0, _translate)("Block has been successfully saved as a template."),
                title: (0, _translate)("Template Saved")
              });
              TemplateInlineManager.refreshGrid();
            }).catch(function (error) {
              (0, _confirmAlert)({
                content: error.message || (0, _translate)("An issue occurred while attempting to save " + "the template, please try again."),
                title: (0, _translate)("An error occurred")
              });
              throw error;
            });
          }
        }
      });
      capture.then(function (imageEncoded) {
        // @ts-ignore
        prompt.templateManagerSave("setPreviewImage", imageEncoded);
      });
    };
    TemplateInlineManager.refreshGrid = function refreshGrid() {
      var templateStageGrid = _uiRegistry.get("pagebuilder_stage_template_grid.pagebuilder_stage_template_grid_data_source");
      if (templateStageGrid) {
        templateStageGrid.storage().clearRequests();
        templateStageGrid.reload();
      }
    };
    return TemplateInlineManager;
  }();
  return TemplateInlineManager;
});
//# sourceMappingURL=template-inline-manager.js.map