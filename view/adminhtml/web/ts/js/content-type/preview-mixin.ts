import $t from "mage/translate";
import Preview from "Magento_PageBuilder/js/content-type/preview";
import {OptionsInterface} from "Magento_PageBuilder/js/content-type-menu/option.types";
import Option from "Magento_PageBuilder/js/content-type-menu/option";

export default function (base: typeof Preview) {
    return class PreviewMixin extends base {
        protected retrieveOptions(): OptionsInterface {
            const options = super.retrieveOptions();
            options.template = new Option({
                preview: this,
                icon: "<i class='icon-pagebuilder-variable'></i>",
                title: $t("Template"),
                action: this.onTemplate,
                classes: ["template-structural"],
                sort: 55,
            })

            return options;
        }

        public onTemplate(): void {
            confirm('@todo implement dialog!');
        }
    }
}
