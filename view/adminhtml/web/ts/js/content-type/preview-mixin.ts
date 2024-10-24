import $t from "mage/translate";
import Preview from "Magento_PageBuilder/js/content-type/preview";
import {OptionsInterface} from "Magento_PageBuilder/js/content-type-menu/option.types";
import Option from "Magento_PageBuilder/js/content-type-menu/option";
import Config from "Magento_PageBuilder/js/config";
import TemplateInlineManager from "Boundsoff_PageBuilderTemplateInline/js/template-inline-manager";

export default function (base: typeof Preview) {
    return class PreviewMixin extends base {
        protected retrieveOptions(): OptionsInterface {
            const options = super.retrieveOptions();
            options.template = new Option({
                preview: this,
                icon: "<i class='bf__pb_icons_emoji'>📝</i>",
                title: $t("Template"),
                action: this.onTemplate,
                classes: ["template-structural"],
                sort: 55,
            })

            return options;
        }

        public onTemplate(): void {
            const { config } = this.contentType;
            const defaultViewport = Config.getConfig("defaultViewport");
            const contentTypeData = this.contentType.dataStores[defaultViewport].getState();
            const dataStoresStates = this.contentType.getDataStoresStates();

            TemplateInlineManager.saveAs(this, {
                config,
                contentTypeData,
                dataStoresStates
            });
        }
    }
}
