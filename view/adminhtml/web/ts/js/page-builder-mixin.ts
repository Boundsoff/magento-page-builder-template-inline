import PageBuilder from "Magento_PageBuilder/js/page-builder";
import events from "Magento_PageBuilder/js/events";
import {TemplateSavePreviewDataInterface} from "Boundsoff_PageBuilderTemplateInline/js/template-inline-manager.types";
import createContentType from "Magento_PageBuilder/js/content-type-factory";
import ContentTypeInterface from "Magento_PageBuilder/js/content-type.types";
import ContentTypeCollectionInterface from "Magento_PageBuilder/js/content-type-collection.types";
import {isAllowed} from "Magento_PageBuilder/js/acl";
import {resources} from "Boundsoff_PageBuilderTemplateInline/js/acl";
import alertDialog from "Magento_Ui/js/modal/alert";
import ko from 'knockout'
import {getDraggedTemplateModelData, ModelData} from "Boundsoff_PageBuilderTemplateInline/js/drag-drop/registry";
import {updateColumnWidth} from "Magento_PageBuilder/js/content-type/column/resize";
import ColumnPreview from "Magento_PageBuilder/js/content-type/column/preview";
import {createColumnLine} from "Magento_PageBuilder/js/content-type/column-group/factory";
import {default as ColumnLinePreview} from "Boundsoff_PageBuilderTemplateInline/js/content-type/column-line/preview";
import {default as ColumnGroupPreview} from "Magento_PageBuilder/js/content-type/column-group/preview";
import Config from "Magento_PageBuilder/js/config";
import {getDefaultGridSize} from "Magento_PageBuilder/js/content-type/column-group/grid-size";

type TemplateApply = {
    modelData: ModelData,
    index?: number,
    contentType?: ContentTypeInterface & ContentTypeCollectionInterface
}

type TemplateContentType =
    ContentTypeInterface
    & ContentTypeCollectionInterface
    & ContentTypeCollectionInterface<ColumnPreview>;

export default function (base: typeof PageBuilder) {
    return class PageBuilderMixin extends base {
        public template: string = 'Boundsoff_PageBuilderTemplateInline/page-builder'
        public shouldShowDropZone: KnockoutObservable<boolean> = ko.observable(false);
        protected readonly canApplyInlineTemplates: boolean;

        constructor(config: any, initialValue: string) {
            super(config, initialValue);

            this.canApplyInlineTemplates = isAllowed(resources.TEMPLATE_INLINE_APPLY);
            this.isStageReady.subscribe(() => {
                if (this.canApplyInlineTemplates) {
                    events.on(`stage:sortable:start`, ({ui}: { ui: { item: JQuery } }) => {
                        const modelData = !!getDraggedTemplateModelData();
                        const isContentType = ui.item.hasClass('pagebuilder-draggable-content-type');

                        if (!modelData && !isContentType) {
                            return this.shouldShowDropZone(true);
                        }
                    });
                    events.on(`stage:sortable:end`, () => this.shouldShowDropZone(false));
                    events.on(`stage:sortable:receive`, () => this.shouldShowDropZone(false));
                    events.on(`stage:sortable:deactivate`, () => this.shouldShowDropZone(false));
                }
            })
        }

        public toggleTemplateList() {
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

        public onMouseTemplateZone(self: this, $event: MouseEvent) {
            $event.type === 'mouseover'
                ? (<Element>$event.target).classList.add('active')
                : (<Element>$event.target).classList.remove('active');
        }

        public templateApply({modelData, index, contentType}: TemplateApply) {
            if (!this.canApplyInlineTemplates) {
                alertDialog({
                    content: $t("You do not have permission to apply inline templates."),
                    title: $t("Permission Error"),
                });
                return;
            }

            const model = modelData.model;
            const parent = (() => {
                switch (model.component_data.config.name) {
                    case 'column':
                        return modelData.column?.preview.contentType
                            || contentType
                            || this.stage.rootContainer;
                    default:
                        return contentType
                            || this.stage.rootContainer;
                }
            })();

            return this.templateApplyChild(parent, model.component_data)
                .then((templateContentType: TemplateContentType) => {

                    switch (templateContentType.config.name) {
                        case 'column':
                            return this.templateAddColumn(templateContentType, modelData, parent, index);
                        default:
                            parent.addChild(templateContentType, index);
                            break;
                    }

                    return templateContentType;
                })
                .then(templateContentType => {
                    const eventData = {templateContentType, model, parent};
                    events.trigger("templates:apply:successfully", eventData);
                    events.trigger(`templates:apply:successfully:${templateContentType.config.name}`, eventData);
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
                    templateContentType.dropped = true;

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

        protected templateAddColumn(
            contentType: TemplateContentType,
            modelData: ModelData,
            parent: ContentTypeInterface & ContentTypeCollectionInterface,
            index?: number,
        ) {
            if (modelData.column) {
                const columnLinePreview = <ColumnLinePreview>modelData.column.preview;
                const resizeUtils = columnLinePreview.getResizeUtils();

                // create new line above or bellow of the content
                if (modelData.column.isColumnLinePlaceholderActive) {
                    return createColumnLine(
                        columnLinePreview.contentType.parentContentType,
                        resizeUtils.getColumnsWidth(),
                        columnLinePreview.getNewColumnLineIndex(),
                    ).then((columnLine) => {
                        columnLine.addChild(contentType);
                        updateColumnWidth(contentType, resizeUtils.getColumnsWidth());

                        return contentType;
                    });
                }

                const dropPosition = modelData.column.dropPosition;
                if (dropPosition) {
                    const newWidth = resizeUtils.getAcceptedColumnWidth(
                        (resizeUtils.getColumnWidth(dropPosition.affectedColumn) -
                            resizeUtils.getSmallestColumnWidth()).toString(),
                    );

                    columnLinePreview.contentType.addChild(contentType, dropPosition.insertIndex);
                    updateColumnWidth(dropPosition.affectedColumn, newWidth);
                    updateColumnWidth(contentType, resizeUtils.getSmallestColumnWidth());

                    return contentType;
                }
            }

            const defaultGridSize = getDefaultGridSize();

            return createContentType(
                Config.getContentTypeConfig("column-group"),
                parent,
                this.stage.id,
                {grid_size: defaultGridSize},
            )
                .then((columnGroup: ContentTypeCollectionInterface<ColumnGroupPreview>) => {
                    parent.addChild(columnGroup, index);
                    return createColumnLine(columnGroup, 100);
                })
                .then((columnLine) => {
                    columnLine.addChild(contentType);
                    updateColumnWidth(contentType, 100);

                    return contentType;
                });
        }
    }
}
