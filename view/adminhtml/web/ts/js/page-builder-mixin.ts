import PageBuilder from "Magento_PageBuilder/js/page-builder";
import events from "Magento_PageBuilder/js/events";
import {TemplateSavePreviewDataInterface} from "Boundsoff_PageBuilderTemplateInline/js/template-inline-manager.types";
import createContentType from "Magento_PageBuilder/js/content-type-factory";
import ContentTypeInterface from "Magento_PageBuilder/js/content-type.types";

type TemplateModel = object & { component_data: TemplateSavePreviewDataInterface }

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

            if (!this.isStageReady()) {
                this.isStageReady.subscribe(() => {
                    events.on(`stage:${this.stage.id}:template:apply`, this.templateApply.bind(this));
                })
            } else {
                events.on(`stage:${this.stage.id}:template:apply`, this.templateApply.bind(this));
            }
        }

        public templateApply({ model } : { model: TemplateModel}) {
            return createContentType(
                model.component_data.config,
                this.stage.rootContainer,
                this.stage.id,
                model.component_data.contentTypeData,
                0,
                model.component_data.dataStoresStates,
            ).then((duplicateContentType: ContentTypeInterface) => {
                this.stage.rootContainer.addChild(duplicateContentType);

                return duplicateContentType;
            });
        }
    }
}
