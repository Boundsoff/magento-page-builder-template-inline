define([
    'jquery',
    'uiRegistry',
    'Magento_PageBuilder/js/grid/columns/preview-image',
    'Magento_PageBuilder/js/config',
    'Magento_PageBuilder/js/events',
    'Magento_PageBuilder/js/drag-drop/drop-indicators',
    'Magento_PageBuilder/js/drag-drop/matrix',
    'Magento_PageBuilder/js/drag-drop/registry',
    'Boundsoff_PageBuilderTemplateInline/js/drag-drop/registry',
    'Magento_PageBuilder/js/binding/draggable',
], function (
    $,
    registry,
    ColumnPreviewImage,
    Config,
    events,
    dropIndicators,
    dropMatrix,
    dragDropRegistry,
    dropRegistry,
) {
    'use strict';

    const {hideDropIndicators, showDropIndicators} = dropIndicators;
    const {getAllowedContainersClasses} = dropMatrix;
    const {setDraggedTemplateModelData, getDraggedTemplateModelData} = dropRegistry;
    const {setDraggedContentTypeConfig} = dragDropRegistry;

    // need to map content type name, for better input
    const configContentTypeName = ((name) => {
        switch (name) {
            case "column":
                return "column-group";
            default:
                return name;
        }
    });

    // noinspection JSUnusedGlobalSymbols
    return ColumnPreviewImage.extend({
        dragAndApply($row) {
            const row = {
                ...$row,
                component_data: JSON.parse($row.component_data),
            };
            const modal = registry.get('pagebuilder_stage_template.pagebuilder_stage_template.modal_templates');

            const connectToSortable = getAllowedContainersClasses(
                configContentTypeName(row.component_data.config.name),
                modal.stage.id,
            );

            return {
                appendTo: "body",
                cursor: "-webkit-grabbing",
                connectToSortable,
                containment: "document",
                scroll: true,
                helper() {
                    return $(this).clone()
                        .addClass('pagebuilder-draggable-content-type')
                        .css({
                            width: $(this).width(),
                            height: $(this).height(),
                            zIndex: 10001,
                            pointerEvents: "none",
                        });
                },
                start: this.onDragStart.bind(this, row, modal),
                stop: this.onDragStop.bind(this, row, modal),
            };
        },
        onDragStart(row, modal) {
            modal.closeModal();

            $(".content-type-container.ui-sortable").each(function () {
                if ($(this).data("ui-sortable")) {
                    $(this).sortable("option", "tolerance", "intersect");
                }
            });

            const configName = configContentTypeName(row.component_data.config.name);
            const contentTypeConfig = Config.getContentTypeConfig(configName);
            setDraggedContentTypeConfig(contentTypeConfig);
            setDraggedTemplateModelData({model: row, stage: modal.stage});

            events.on("column:drag:new", this.onColumnDragNew.bind(this));

            showDropIndicators(configName, modal.stage.id);
            events.trigger("stage:interactionStart", {stage: modal.stage});
        },
        onDragStop(row, modal) {
            $(".content-type-container.ui-sortable").each(function () {
                if ($(this).data("ui-sortable")) {
                    $(this).sortable("option", "tolerance", "pointer");
                }
            });

            setDraggedContentTypeConfig(null);
            setDraggedTemplateModelData(null);
            hideDropIndicators();
            events.trigger("stage:interactionStop", {stage: modal.stage});

            events.off("column:drag:new", this.onColumnDragNew.bind(this));
        },
        onColumnDragNew($data) {
            const modelData = getDraggedTemplateModelData();

            if ($data.shouldContinue && !!modelData) {
                modelData.column = $data;

                // can trigger multiple times by jquery events ??
                events.off("column:drag:new", this.onColumnDragNew.bind(this));
                $data.shouldContinue = false;

                // since jquery plugin sortable won't be trigger when apply above the column group, need to do manually
                if ($data.isColumnLinePlaceholderActive) {
                    events.trigger(`stage:${modelData.stage.id}:template:apply`, {
                        modelData,
                        index: null,
                        contentType: $data.preview.contentType
                    });
                }
            }
        },
    });
})
