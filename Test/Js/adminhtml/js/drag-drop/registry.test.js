define([
    'Boundsoff_PageBuilderTemplateInline/js/drag-drop/registry',
], function (Registry) {
    'use strict';

    beforeEach(function () {
        Registry.setDraggedTemplateModelData(null);
    });

    describe('Boundsoff_PageBuilderTemplateInline/js/drag-drop/registry', function () {
        it('set and clear values in registry', function () {
            const modelData = { column: { isColumnLinePlaceholderActive: false } }; // @todo should really mock it
            Registry.setDraggedTemplateModelData(modelData);

            expect(Registry.getDraggedTemplateModelData()?.column?.isColumnLinePlaceholderActive)
                .toBeFalse();

            Registry.setDraggedTemplateModelData(null);
            expect(Registry.getDraggedTemplateModelData())
                .toBeNull();
        });
    });
});
