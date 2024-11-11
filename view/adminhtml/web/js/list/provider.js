define([
    'Magento_Ui/js/grid/provider',
    'uiRegistry',
    'Magento_PageBuilder/js/events',
    'Boundsoff_PageBuilderTemplateInline/js/actions/url-build',
], function (Provider, registry, events, urlBuild) {
    'use strict';

    return Provider.extend({
        initialize() {
            this._super();

            events.on('templates:save:successful', () => {
                this.clearData()
                    .reload({refresh: true});
            });

            return this;
        },

        onDelete(target, recordId) {
            const eventParams = {provider: this, arguments, shouldContinue: true};
            events.trigger('templates:delete:before', eventParams);
            if (!eventParams.shouldContinue) {
                return;
            }

            const url = urlBuild(`bf-pb-template-inline/template/delete/id/${recordId}`);
            fetch(url)
                .then(() => {
                    this.clearData()
                        .reload({refresh: true});

                    events.trigger('templates:delete:after', {provider: this, arguments});
                });
        },
    });
});
