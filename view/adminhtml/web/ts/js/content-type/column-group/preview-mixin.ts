import Preview from "Magento_PageBuilder/js/content-type/column-group/preview";
import {DropPosition} from "Magento_PageBuilder/js/content-type/column-group/drag-and-drop";
import events from "Magento_PageBuilder/js/events";

export default function (base: typeof Preview) {
    return class PreviewMixin extends base {

        onNewColumnDrop(dropPosition: DropPosition) {
            const eventData = { shouldContinue: true, dropPosition, preview: this };
            events.trigger("column:drag:new", eventData);
            if (!eventData.shouldContinue) {
                return;
            }

            super.onNewColumnDrop(dropPosition);
        }
    }
}
