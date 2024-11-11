import $t from "mage/translate";
import Preview from "Magento_PageBuilder/js/content-type/preview";
import {OptionsInterface} from "Magento_PageBuilder/js/content-type-menu/option.types";
import Option from "Magento_PageBuilder/js/content-type-menu/option";
import Config from "Magento_PageBuilder/js/config";
import TemplateInlineManager from "Boundsoff_PageBuilderTemplateInline/js/template-inline-manager";
import {TemplateSavePreviewDataInterface} from "Boundsoff_PageBuilderTemplateInline/js/template-inline-manager.types";

export interface PreviewMixin {
    onTemplate(): void;
    getTemplateData(): TemplateSavePreviewDataInterface;
}

export default function (base: typeof Preview) {
    return class extends base implements PreviewMixin {
        protected retrieveOptions(): OptionsInterface {
            const options = super.retrieveOptions();

            options.template = new Option({
                preview: this,
                icon: "<i class='bf__pb_icons_emoji'>📝</i>",
                title: $t("Template"),
                action: this.onTemplate,
                classes: ["template-structural"],
                sort: 55,
            });

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
