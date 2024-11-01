define([
    'Magento_Ui/js/grid/provider',
    'Boundsoff_PageBuilderTemplateInline/js/actions/url-build',
], function (Provider, urlBuild) {
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
    });
});
