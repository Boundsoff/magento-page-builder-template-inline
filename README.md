# Page Builder / Template inline

![Version](https://shields.io/packagist/v/boundsoff/module-page-builder-template-inline) ![Downloads](https://shields.io/packagist/dt/boundsoff/module-page-builder-template-inline) ![PHP Version](https://shields.io/packagist/php-v/boundsoff/module-page-builder-template-inline) ![License](https://img.shields.io/packagist/l/boundsoff/module-page-builder-template-inline)


Apply templates to individual elements in your page builder, not just entire pages.
This package gives you the flexibility to customize specific elements, streamlining your workflow.

## Side panel with inline templates
Add a side panel with a searchable, categorized list of templates, accessible via an icon,
for applying templates to individual elements in your page builder, enhancing customization and workflow efficiency.

![second-preview](https://github.com/none-life/magento-page-builder-template-inline/blob/master/.readme/img/created.gif?raw=true)
## Drag and drop inline template anywhere
Apply a selected template to a specific element in your page builder using a side panel with a searchable, categorized template list, accessible via an icon.
The template’s content, including saved viewport data, is placed and rendered in the chosen element, enhancing customization and workflow efficiency.
![first-preview](https://github.com/none-life/magento-page-builder-template-inline/blob/master/.readme/img/apply.gif?raw=true)

## Features

✅ **Drag & Drop** - Drag blocks to create templates using a drop zone, then apply them by dragging the template image.

✅ **No Override** - Templates are placed with clear indicators for insertion, mirroring the creation of new elements in the left panel.

✅ **Legacy** - Compatible with Magento page templates, ensuring upgrades don’t cause issues.

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
