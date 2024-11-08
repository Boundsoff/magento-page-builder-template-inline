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
    const {getAllowedContainersClasses} = dropMatrix;
    const {setDraggedContentTypeConfig} = dropRegistry;

    // noinspection JSUnusedGlobalSymbols
    return ColumnPreviewImage.extend({
        dragAndApply($row) {
            const row = {
                ...$row,
                component_data: JSON.parse($row.component_data),
            };
            const modal = registry.get('pagebuilder_stage_template.pagebuilder_stage_template.modal_templates');
            const self = this;

            return {
                appendTo: "body",
                cursor: "-webkit-grabbing",
                connectToSortable: ".content-type-drop",
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
                start() {
                    self.onDragStart.apply(self, [this, row, modal]);
                },
                stop() {
                    self.onDragStop.apply(self, [this, row, modal]);
                },
            };
        },
        onDragStart(sortable, row, modal) {
            modal.closeModal();

            $(".content-type-container.ui-sortable").each(function() {
                if ($(this).data("ui-sortable")) {
                    $(this).sortable("option", "tolerance", "intersect");
                }
            });

            showDropIndicators(row.component_data.config.name, modal.stage.stageId);
            setDraggedContentTypeConfig(row.component_data.config);
            events.trigger("stage:interactionStart", {stage: modal.stage});
        },
        onDragStop(sortable, row, modal) {
            $(".content-type-container.ui-sortable").each(function() {
                if ($(this).data("ui-sortable")) {
                    $(this).sortable("option", "tolerance", "pointer");
                }
            });

            hideDropIndicators();
            setDraggedContentTypeConfig(null);

            events.trigger("stage:interactionStop", {stage: modal.stage});
        },
    });
})
