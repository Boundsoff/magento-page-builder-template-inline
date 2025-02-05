<?php

namespace Boundsoff\PageBuilderTemplateInline\Model\ResourceModel\TemplateInline;

use Boundsoff\PageBuilderTemplateInline\Model\ResourceModel\TemplateInline as ResourceModel;
use Boundsoff\PageBuilderTemplateInline\Model\TemplateInline as Model;
use Magento\Framework\DataObject;
use Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection;

class Collection extends AbstractCollection
{
    /**
     * @var string
     */
    protected $_eventPrefix = 'bf__pb_template_inline_collection';
    /**
     * @var string
     */
    protected $_eventObject = 'collection';

    /**
     * @inheritdoc
     */
    protected function _construct()
    {
        $this->_init(Model::class, ResourceModel::class);
    }

    /**
     * @inheritdoc
     */
    protected function beforeAddLoadedItem(DataObject $item)
    {
        $this->getResource()
            ->unserializeFields($item);

        return $this;
    }
}
