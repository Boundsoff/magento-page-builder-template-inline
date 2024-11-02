import PreviewCollection from "Magento_PageBuilder/js/content-type/preview-collection";
import {TemplateSavePreviewDataInterface} from "Boundsoff_PageBuilderTemplateInline/js/template-inline-manager.types";
import Config from "Magento_PageBuilder/js/config";
import ContentTypeInterface from "Magento_PageBuilder/js/content-type.types";
import Preview from "Magento_PageBuilder/js/content-type/preview";

type ContentTypeChild = ContentTypeInterface & PreviewCollectionMixin;

export interface PreviewCollectionMixin {
    getTemplateData(): TemplateSavePreviewDataInterface;
}

export default function (base: typeof PreviewCollection) {
    return class extends base implements PreviewCollectionMixin {

        public getTemplateData(): TemplateSavePreviewDataInterface {
            const children: TemplateSavePreviewDataInterface[] = [];
            if (this.contentType.children && this.contentType.children().length) {
                this.contentType.children()
                    .forEach((child: ContentTypeChild) => {
                        const templateData = (child.preview as Preview & PreviewCollectionMixin).getTemplateData();
                        children.push(templateData);
                    })
            }

            const { config } = this.contentType;
            const defaultViewport = Config.getConfig("defaultViewport");
            const contentTypeData = this.contentType.dataStores[defaultViewport].getState();
            const dataStoresStates = this.contentType.getDataStoresStates();

            return { config, contentTypeData, dataStoresStates, children };
        }

    }
}
