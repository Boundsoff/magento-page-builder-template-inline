import $t from "mage/translate";
import Preview from "Magento_PageBuilder/js/content-type/preview";
import {OptionsInterface} from "Magento_PageBuilder/js/content-type-menu/option.types";
import Option from "Magento_PageBuilder/js/content-type-menu/option";
import Config from "Magento_PageBuilder/js/config";
import TemplateInlineManager from "Boundsoff_PageBuilderTemplateInline/js/template-inline-manager";
import {TemplateSavePreviewDataInterface} from "Boundsoff_PageBuilderTemplateInline/js/template-inline-manager.types";
import ContentTypeInterface from "Magento_PageBuilder/js/content-type.types";
import ContentTypeConfigInterface from "Magento_PageBuilder/js/content-type-config.types";
import ObservableUpdater from "Magento_PageBuilder/js/content-type/observable-updater";

export interface PreviewMixin {
    onTemplate(): void;
    getTemplateData(): TemplateSavePreviewDataInterface;
}

export default function (base: typeof Preview) {
    return class extends base implements PreviewMixin {
        protected retrieveOptions(): OptionsInterface {
            const options = super.retrieveOptions();

            if (TemplateInlineManager.SupportedContentTypes.has(this.contentType.config.name)) {
                options.template = new Option({
                    preview: this,
                    icon: "<i class='icon-pagebuilder-template icomoon-insert-template'></i>",
                    title: $t("Template"),
                    action: this.onTemplate,
                    classes: ["template-structural"],
                    sort: 55,
                });
            }

            return options
        }

        public onTemplate(): void {
            const componentData = this.getTemplateData();

            TemplateInlineManager.saveAs(this, componentData);
        }

        public getTemplateData(): TemplateSavePreviewDataInterface {
            const { config } = this.contentType;
            const defaultViewport = Config.getConfig("defaultViewport");
            const contentTypeData = this.contentType.dataStores[defaultViewport].getState();
            const dataStoresStates = this.contentType.getDataStoresStates();
            const children: TemplateSavePreviewDataInterface[] = [];

            return { config, contentTypeData, dataStoresStates, children };
        }
    }
}
