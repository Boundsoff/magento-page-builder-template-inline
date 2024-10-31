define([

], function () {
    'use strict';

    return function (urlPath) {
        const url = new URL(window.BASE_URL);

        const pathname = url.pathname
            .replace(/\/$/, '')
            .split('/');

        pathname.pop();

        urlPath
            .replace(/^\//, '')
            .replace(/\/$/, '')
            .split('/')
            .forEach(path => (pathname.push(path)));

        url.pathname = pathname.join('/');

        return url.toString();
    }
})
