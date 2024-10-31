define([
    'Magento_Ui/js/grid/columns/actions',
    '../../actions/url-build'
], function (Actions, urlBuild)  {
    'use strict';

    return Actions.extend({
        _getCallback(action) {
            let href = action.href
            if (!href.includes(':indexField')) {
                return this._super(action);
            }
            href = href.replace(':indexField', action.recordId);

            return () => (window.location.assign(urlBuild(href)));
        }
    });
});
