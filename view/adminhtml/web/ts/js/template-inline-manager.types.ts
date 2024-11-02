import ContentTypeConfigInterface from 'Magento_PageBuilder/js/content-type-config.types';
import { DataObject } from 'Magento_PageBuilder/js/data-store';

export interface TemplateSavePreviewDataInterface {
    config: ContentTypeConfigInterface;
    contentTypeData: DataObject;
    dataStoresStates: { [key: string]: any };
    children: TemplateSavePreviewDataInterface[];
}
