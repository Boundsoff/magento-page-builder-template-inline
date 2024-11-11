import $ from 'jquery';
import wrapper from 'mage/utils/wrapper';
import events from "Magento_PageBuilder/js/events";
import Preview from "Magento_PageBuilder/js/content-type/preview";
import {getDraggedTemplateModelData, ModelData} from "Boundsoff_PageBuilderTemplateInline/js/drag-drop/registry";
import {PreviewMixin} from "Boundsoff_PageBuilderTemplateInline/js/content-type/preview-mixin";

type PreviewExtended = Preview & PreviewMixin;

function applyTemplateInline(modelData: ModelData, preview: Preview, event: Event, ui: JQueryUI.SortableUIParams): void {
    // If the container content type can't receive drops we need to cancel the operation
    if (!preview.isContainer()) {
        $(this).sortable("cancel");
        return;
    }


    const target = <HTMLElement>event.target;
    let index = Array.from(target.querySelectorAll('.pagebuilder-content-type-wrapper, .pagebuilder-draggable-content-type'))
        .findIndex(it => it.classList.contains('pagebuilder-draggable-content-type'))
    index = index === -1 ? null : index;

    const model = modelData.model;
    const contentType = preview.contentType;
    events.trigger(`stage:${modelData.stage.id}:template:apply`, { model, index, contentType });
}

export default function (sortable: { getSortableOptions: Function }) {
    sortable.getSortableOptions = wrapper.wrap(sortable.getSortableOptions, function (superFunction: Function, preview: PreviewExtended): JQueryUI.SortableOptions | any {
        const options = superFunction(preview);

        options.receive = wrapper.wrap(options.receive, function (superFunction: Function) {
            const modelData = getDraggedTemplateModelData();
            if (!modelData) {
                return superFunction();
            }

            applyTemplateInline.call(this, modelData, preview, arguments[1], arguments[2]);
        });

        options.stop = wrapper.wrap(options.stop, function (superFunction: Function, event: { originalEvent?: Event }) {
            const target = <HTMLElement>event.originalEvent.target;
            if (target.classList.contains('bf__pb_drop-zone')) {
                preview.onTemplate();
            }

            return superFunction();
        });

        return options;
    })

    return sortable;
}
