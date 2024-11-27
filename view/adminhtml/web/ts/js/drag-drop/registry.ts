import {TemplateSavePreviewDataInterface} from "Boundsoff_PageBuilderTemplateInline/js/template-inline-manager.types";
import Stage from "Magento_PageBuilder/js/stage";
import {DropPosition} from "Magento_PageBuilder/js/content-type/column-line/drag-and-drop";
import {default as ColumnLinePreview} from "Boundsoff_PageBuilderTemplateInline/js/content-type/column-line/preview";
import {default as ColumnGroupPreview} from "Magento_PageBuilder/js/content-type/column-group/preview";

export type ModelData = {
    model: object & { component_data: TemplateSavePreviewDataInterface },
    stage: Stage,
    column: null | {
        dropPosition?: DropPosition,
        preview: ColumnLinePreview | ColumnGroupPreview,
        isColumnLinePlaceholderActive: boolean
    },
}

let modelData: ModelData | null = null;

export function setDraggedTemplateModelData(model?: ModelData): void {
    modelData = model;
}

export function getDraggedTemplateModelData(): ModelData | null {
    return modelData;
}
