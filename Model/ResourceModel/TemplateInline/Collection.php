<?php

namespace Boundsoff\PageBuilderTemplateInline\Model\ResourceModel\TemplateInline;

use Boundsoff\PageBuilderTemplateInline\Model\ResourceModel\TemplateInline as ResourceModel;
use Boundsoff\PageBuilderTemplateInline\Model\TemplateInline as Model;
use Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection;

class Collection extends AbstractCollection
{
    protected $_eventPrefix = 'bf__pb_template_inline_collection';
    protected $_eventObject = 'collection';

    protected function _construct()
    {
        $this->_init(Model::class, ResourceModel::class);
    }
}
