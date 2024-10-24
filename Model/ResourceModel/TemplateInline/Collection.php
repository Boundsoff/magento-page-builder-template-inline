<?php

namespace Boundsoff\PageBuilderTemplateInline\Model\ResourceModel\TemplateInline;

use Boundsoff\PageBuilderTemplateInline\Model\ResourceModel\TemplateInline as ResourceModel;
use Boundsoff\PageBuilderTemplateInline\Model\TemplateInline as Model;
use Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection;

class Collection extends AbstractCollection
{
    protected function _construct()
    {
        $this->_init(Model::class, ResourceModel::class);
    }
}
