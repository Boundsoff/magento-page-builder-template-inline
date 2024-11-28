var config = {
    map: {
        '*': {
            'Magento_PageBuilder/js/content-type/column-line/preview': 'Boundsoff_PageBuilderTemplateInline/js/content-type/column-line/preview',
        },
    },
    config: {
        mixins: {
            'Magento_PageBuilder/js/content-type/preview': {
                'Boundsoff_PageBuilderTemplateInline/js/content-type/preview-mixin': true,
            },
            'Magento_PageBuilder/js/content-type/preview-collection': {
                'Boundsoff_PageBuilderTemplateInline/js/content-type/preview-collection-mixin': true,
            },
            'Magento_PageBuilder/js/content-type/column-group/preview': {
                'Boundsoff_PageBuilderTemplateInline/js/content-type/column-group/preview-mixin': true,
            },
            'Magento_PageBuilder/js/page-builder': {
                'Boundsoff_PageBuilderTemplateInline/js/page-builder-mixin': true,
            },
            'Magento_PageBuilder/js/drag-drop/sortable': {
                'Boundsoff_PageBuilderTemplateInline/js/drag-drop/sortable-mixin': true,
            },
        }
    }
};
