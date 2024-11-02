define([
    'Magento_Ui/js/grid/provider',
    'uiRegistry',
    'Boundsoff_PageBuilderTemplateInline/js/actions/url-build',
], function (Provider, registry, urlBuild) {
    'use strict';

    // @todo add event listener for adding new items to refresh

    return Provider.extend({
        onDelete(target, recordId) {
            const url = urlBuild(`bf-pb-template-inline/template/delete/id/${recordId}`);

            fetch(url)
                .then(() => {
                    this.clearData()
                        .reload({ refresh: true });
                });
        },
        onApply(target, recordId, action) {
            const model = this.get(`data.items.${action.rowIndex}`);

            registry.promise('pagebuilder_stage_template.pagebuilder_stage_template.modal_templates')
                .then(modal => {
                    modal.applyTemplate({
                        ...model,
                        component_data: JSON.parse(model.component_data),
                    });
                });
        },
    });
});
