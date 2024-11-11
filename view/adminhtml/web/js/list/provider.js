define([
    'Magento_Ui/js/grid/provider',
    'uiRegistry',
    'Magento_PageBuilder/js/events',
    'Boundsoff_PageBuilderTemplateInline/js/actions/url-build',
], function (Provider, registry, events, urlBuild) {
    'use strict';

    // @todo add event listener for adding new items to refresh

    return Provider.extend({
        onDelete(target, recordId) {
            if (!events.trigger('templates:delete:before', {provider: this, arguments})) {
                return;
            }

            const url = urlBuild(`bf-pb-template-inline/template/delete/id/${recordId}`);
            fetch(url)
                .then(() => {
                    this.clearData()
                        .reload({ refresh: true });

                    events.trigger('templates:delete:after', {provider: this, arguments});
                });
        },
    });
});
