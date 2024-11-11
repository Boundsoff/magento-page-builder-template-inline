import {TemplateSavePreviewDataInterface} from "Boundsoff_PageBuilderTemplateInline/js/template-inline-manager.types";
import Stage from "Magento_PageBuilder/js/stage";

export type ModelData = { model: object & { component_data: TemplateSavePreviewDataInterface }, stage: Stage }

let modelData: ModelData | null = null;

export function setDraggedTemplateModelData(model?: ModelData): void {
    modelData = model;
}

export function getDraggedTemplateModelData(): ModelData | null {
    return modelData;
}
