define([
    'jquery',
    'Magento_Ui/js/modal/modal-component',
    'Magento_PageBuilder/js/events',
    'underscore',
    'Magento_PageBuilder/js/stage-builder'
], function ($, ModalComponent, events, _, stageBuilder) {
    'use strict';

    return ModalComponent.extend({
        defaults: {
            stage: null,
            modules: {
                messageContainer: '${ $.messageContainerProvider }',
                listing: '${ $.listingProvider }'
            }
        },

        /** @inheritdoc */
        initialize: function () {
            this._super();
            _.bindAll(this, 'closeModal');

            events.on('stage:templateList:open', function (params) {
                this.openModal();
                this.stage = params.stage;
            }.bind(this));

            return this;
        },

        toggleTemplateManger() {
            events.trigger(`stage:templateManager:open`, {
                stage: this.stage,
            });
        },

        saveAsTemplate() {
            events.trigger(`stage:templateManager:save`);
        },

        applyTemplate(model) {
            this.closeModal();
            events.trigger(`stage:${this.stage.id}:template:apply`, {
                model,
            });
        },
    });
});
