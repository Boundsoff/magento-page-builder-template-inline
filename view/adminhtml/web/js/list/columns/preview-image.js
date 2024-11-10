define([
    'jquery',
    'uiRegistry',
    'Magento_PageBuilder/js/grid/columns/preview-image',
    'Magento_PageBuilder/js/events',
    'Magento_PageBuilder/js/drag-drop/drop-indicators',
    'Magento_PageBuilder/js/drag-drop/matrix',
    'Magento_PageBuilder/js/drag-drop/registry',
    'Magento_PageBuilder/js/binding/draggable',
], function (
    $,
    registry,
    ColumnPreviewImage,
    events,
    dropIndicators,
    dropMatrix,
    dropRegistry,
) {
    'use strict';

    const {hideDropIndicators, showDropIndicators} = dropIndicators;
    const {setDraggedContentTypeConfig} = dropRegistry;
    const {getAllowedContainersClasses} = dropMatrix;

    // noinspection JSUnusedGlobalSymbols
    return ColumnPreviewImage.extend({
        dragAndApply($row) {
            const row = {
                ...$row,
                component_data: JSON.parse($row.component_data),
            };
            const modal = registry.get('pagebuilder_stage_template.pagebuilder_stage_template.modal_templates');
            const connectToSortable = getAllowedContainersClasses(row.component_data.config.name, modal.stage.id);

            return {
                appendTo: "body",
                cursor: "-webkit-grabbing",
                connectToSortable,
                containment: "document",
                scroll: true,
                helper() {
                    return $(this).clone()
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

            showDropIndicators(row.component_data.config.name, modal.stage.id);
            events.trigger("stage:interactionStart", {stage: modal.stage});
            // @todo need to inject into sortable.ts
        },
        onDragStop(row, modal) {
            $(".content-type-container.ui-sortable").each(function () {
                if ($(this).data("ui-sortable")) {
                    $(this).sortable("option", "tolerance", "pointer");
                }
            });

            hideDropIndicators();
            events.trigger("stage:interactionStop", {stage: modal.stage});
        },
    });
})
