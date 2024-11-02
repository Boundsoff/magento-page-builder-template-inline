<?php

namespace Boundsoff\PageBuilderTemplateInline\Model\ResourceModel\TemplateInline\Grid;

use Boundsoff\PageBuilderTemplateInline\Model\ResourceModel\TemplateInline;
use Boundsoff\PageBuilderTemplateInline\Model\ResourceModel\TemplateInline\Collection as CollectionParent;
use Magento\Framework\Api\Search\AggregationInterface;
use Magento\Framework\Api\Search\SearchResultInterface;
use Magento\Framework\DataObject;
use Magento\Framework\View\Element\UiComponent\DataProvider\Document;

class Collection extends CollectionParent implements SearchResultInterface
{
    protected $_eventPrefix = 'bf__pb_template_inline_grid_collection';
    protected AggregationInterface $aggregations;

    protected function _construct()
    {
        $this->_init(Document::class, TemplateInline::class);
    }

    public function setItems(array $items = null)
    {
        return $this;
    }

    public function getAggregations()
    {
        return $this->aggregations;
    }

    public function setAggregations($aggregations)
    {
        $this->aggregations = $aggregations;
        return $this;
    }

    public function getSearchCriteria()
    {
        return null;
    }

    public function setSearchCriteria(\Magento\Framework\Api\SearchCriteriaInterface $searchCriteria)
    {
        return $this;
    }

    public function getTotalCount()
    {
        return $this->getSize();
    }

    public function setTotalCount($totalCount)
    {
        return $this;
    }

    protected function beforeAddLoadedItem(DataObject $item)
    {
        return $this;
    }
}
