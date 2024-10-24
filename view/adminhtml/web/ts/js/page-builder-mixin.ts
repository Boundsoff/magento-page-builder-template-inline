import PageBuilder from "Magento_PageBuilder/js/page-builder";
import events from "Magento_PageBuilder/js/events";

export default function (base: typeof PageBuilder) {
    return class PageBuilderMixin extends base {
        template: string = 'Boundsoff_PageBuilderTemplateInline/page-builder'

        public toggleTemplateList() {
            // @todo add ACL

            events.trigger('stage:templateList:open', {
                stage: this.stage,
            });
        }

        public initListeners() {
            super.initListeners();
            events.on(`stage:templateManager:save`, this.saveAsTemplate.bind(this));
        }
    }
}
