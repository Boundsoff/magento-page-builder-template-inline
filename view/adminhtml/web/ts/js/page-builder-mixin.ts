import PageBuilder from "Magento_PageBuilder/js/page-builder";
import events from "Magento_PageBuilder/js/events";
import {TemplateSavePreviewDataInterface} from "Boundsoff_PageBuilderTemplateInline/js/template-inline-manager.types";
import createContentType from "Magento_PageBuilder/js/content-type-factory";
import ContentTypeInterface from "Magento_PageBuilder/js/content-type.types";
import ContentTypeCollectionInterface from "Magento_PageBuilder/js/content-type-collection.types";

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

        public templateApply({model}: { model: TemplateModel }) {
            return this.templateApplyChild(this.stage.rootContainer, model.component_data)
                .then((templateContentType: ContentTypeInterface & ContentTypeCollectionInterface) => {
                    this.stage.rootContainer.addChild(templateContentType);
                })
        }

        protected templateApplyChild(
            parent: ContentTypeInterface & ContentTypeCollectionInterface,
            child: TemplateSavePreviewDataInterface,
        ): Promise<ContentTypeInterface & ContentTypeCollectionInterface> {
            return createContentType(
                child.config,
                parent,
                this.stage.id,
                child.contentTypeData,
                child.children.length,
                child.dataStoresStates,
            )
                .then((templateContentType: ContentTypeInterface & ContentTypeCollectionInterface) => {
                    return Promise.all(
                        child.children.map((child, index) => {
                            return this.templateApplyChild(templateContentType, child)
                                .then((content: ContentTypeInterface) => {
                                    templateContentType.addChild(content, index);
                                })
                        })
                    )
                        .then(() => {
                            return templateContentType;
                        })
                });
        }
    }
}
