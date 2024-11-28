import {PreviewInterface} from "Magento_PageBuilder/js/content-type/preview.types";
import * as html2canvas from "html2canvas";
import $t from "mage/translate";
import Config from "Magento_PageBuilder/js/config";
import {TemplateSavePreviewDataInterface} from "Boundsoff_PageBuilderTemplateInline/js/template-inline-manager.types";
import registry from "uiRegistry";
import events from "Magento_PageBuilder/js/events";
// @ts-ignore
import alertDialog from 'Magento_PageBuilder/js/modal/confirm-alert';
// @ts-ignore
import templateManagerSave from "Magento_PageBuilder/js/modal/template-manager-save";
// @ts-ignore
import promptContentTmpl from 'text!Magento_PageBuilder/template/modal/template-manager/save-content-modal.html';
import {isAllowed} from "Magento_PageBuilder/js/acl";
import {resources} from "Boundsoff_PageBuilderTemplateInline/js/acl";
import {emptyPreviewImage} from "Boundsoff_PageBuilderTemplateInline/js/template-inline-manager/empty-preview-image";
import Preview from "Magento_PageBuilder/js/content-type/column/preview";

type TemplateSaveResponse = { success: boolean, message?: String }

export default class TemplateInlineManager {
    static SupportedContentTypes = new Set([
        "block",
        "image",
        "row",
        "text",
        "column",
        "column-group",
        "heading",
        "products",
        "video",
        "tabs",
        "banner",
        "slider",
        "buttons",
        "map",
        "html",
    ]);

    public static createCapture(preview: PreviewInterface): Html2CanvasPromise<String> {
        const element: HTMLElement = (() => {
            switch (preview.config.name) {
                case "column":
                    return (<Preview>preview).element[0];
                default:
                    return <HTMLElement>preview.wrapperElement;
            }
        })();

        const stageElement = document.getElementById(preview.contentType.stageId);
        stageElement.classList.add('capture');
        stageElement.classList.add('interacting');

        return html2canvas(element, {
            scale: 1,
            useCORS: true,
        })
            .then(canvas => {
                stageElement.classList.remove('capture');
                stageElement.classList.remove('interacting');

                return canvas.toDataURL('image/jpeg', 0.85);
            })
            .catch(error => {
                stageElement.classList.remove('capture');
                stageElement.classList.remove('interacting');

                console.error(error);
                return emptyPreviewImage;
            })
    }

    public static saveAs(preview: PreviewInterface, component_data: TemplateSavePreviewDataInterface) {
        if (!isAllowed(resources.TEMPLATE_INLINE_SAVE)) {
            alertDialog({
                content: $t("You do not have permission to save inline templates."),
                title: $t("Permission Error"),
            });
            return;
        }

        // delay for better render
        const capture = new Promise(resolve => setTimeout(resolve, 1000))
            .then(() => TemplateInlineManager.createCapture(preview))

        // noinspection JSVoidFunctionReturnValueUsed
        const prompt = templateManagerSave({
            title: $t("Save Block as Template"),
            promptContentTmpl,
            templateTypes: Config.getConfig("stage_config").template_types,
            createdForNote: $t("Created For is to help with filtering templates. This does not restrict where this template can be used."),
            typeLabel: $t("Created For"),
            label: $t("Template Name"),
            validation: true,
            modalClass: "template-manager-save",
            validationRules: ["required-entry"],
            attributesForm: {
                novalidate: "novalidate",
                action: "",
            },
            attributesField: {
                "name": "name",
                "data-validate": "{required:true}",
                "maxlength": "255",
            },
            actions: {
                confirm(name: string, created_for: string) {
                    return capture
                        .then(preview_image => {
                            const requestUrl = new URL(Config.getConfig('bf__template_save_url'));
                            const requestData = {name, created_for, component_data, preview_image};

                            // @ts-ignore
                            requestUrl.searchParams.set('form_key', window.FORM_KEY);
                            requestUrl.searchParams.set('isAjax', 'true');

                            return fetch(requestUrl.toString(), {
                                method: 'POST',
                                body: JSON.stringify(requestData),
                                headers: new Headers({
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                }),
                            })
                                .then(response => response.json());
                        })
                        .then((response: TemplateSaveResponse) => {
                            if (!response.success) {
                                throw new Error(response.message?.toString() || 'Unknown error');
                            }

                            events.trigger('templates:save:successful', {response});
                            alertDialog({
                                content: $t("Block has been successfully saved as a template."),
                                title: $t("Template Saved"),
                            });
                            TemplateInlineManager.refreshGrid()
                        })
                        .catch(error => {
                            events.trigger('templates:save:error', {error, name, created_for, component_data});
                            const errorMessage = error.message || $t("An issue occurred while attempting to save " +
                                "the template, please try again.");
                            alertDialog({
                                content: `<pre>${errorMessage}</pre>`,
                                title: $t("An error occurred"),
                            });

                            throw error;
                        })
                },
            },
        })

        capture.then(imageEncoded => {
            // @ts-ignore
            prompt.templateManagerSave("setPreviewImage", imageEncoded);
        });
    }

    protected static refreshGrid() {
        const templateStageGrid = registry
            .get("pagebuilder_stage_template_grid.pagebuilder_stage_template_grid_data_source");

        if (templateStageGrid) {
            templateStageGrid.storage().clearRequests();
            templateStageGrid.reload();
        }
    }
}
