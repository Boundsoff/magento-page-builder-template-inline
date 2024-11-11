# Magento Page builder / Template inline

While templates with page builder can be applied only for whole page
by installing this package U will have option to add each separate element.

## Features

✅ **Drag & Drop** - u can drag block to create template with the drop zone and later applied same way by grab the image

✅ **No Override** - those templates when applied they are place with indication where to add them,
same as creation of new element on left panel

✅ **Legacy** - page templates are not modify, when upgrade Magento it won't cause any issues

## Installation

### Alpha
Still works in progress, u can use it but U need to set the _minimum-stability_ to **alpha**

#### Download module
```shell
composer require boundsoff/module-page-builder-template-inline
```
#### Enable module for Magento
```shell
php bin/magento module:enable Boundsoff_PageBuilderTemplateInline --clear-static-content
```
#### Install module with models
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

## Work in progress (WIP)

1. currently the element _columns_ cannot by applied properly, it will be fixed in the future
2. some rending elements for the preview image gets error which can lead to empty image,
   will get it fixed later on 
