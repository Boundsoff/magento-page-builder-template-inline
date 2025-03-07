# Magento Page builder / Template inline

Getting the templates from any element in the page builder.
While templates with page builder can be applied only for whole page
by installing this package U will have option to add each separate element.

## Side panel with inline templates
With the icon for the temples U have now the side panel with the list of templates U can search for them and categories them.
![first-preview](https://github.com/none-life/magento-page-builder-template-inline/blob/master/.readme/img/one.png?raw=true)
## Drag and drop inline template anywhere
When found given template and put in the content it will be place in that place, any save information with the viewport data will be put in there and rendered.
![second-preview](https://github.com/none-life/magento-page-builder-template-inline/blob/master/.readme/img/two.png?raw=true)

## Features

✅ **Drag & Drop** - u can drag block to create template with the drop zone and later applied same way by grab the image

✅ **No Override** - those templates when applied they are place with indication where to add them,
same as creation of new element on left panel

✅ **Legacy** - page templates are not modify, when upgrade Magento it won't cause any issues

## Installation

#### Download
```shell
composer require boundsoff/module-page-builder-template-inline
```
#### Enable module
```shell
php bin/magento module:enable Boundsoff_PageBuilderTemplateInline --clear-static-content
```
#### Install
```shell
php bin/magento setup:upgrade
```
#### Compile files (production mode)
```shell
php bin/magento setup:di:compile
```
```shell
php bin/magento setup:static-content:deploy
```
