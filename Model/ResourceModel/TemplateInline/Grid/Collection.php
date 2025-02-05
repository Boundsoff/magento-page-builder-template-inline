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
    /**
     * @var string
     */
    protected $_eventPrefix = 'bf__pb_template_inline_grid_collection';
    /**
     * @var AggregationInterface
     */
    protected AggregationInterface $aggregations;

    /**
     * @inheritdoc
     */
    protected function _construct()
    {
        $this->_init(Document::class, TemplateInline::class);
    }

    /**
     * @inheritdoc
     */
    public function setItems(array $items = null)
    {
        return $this;
    }

    /**
     * @inheritdoc
     */
    public function getAggregations()
    {
        return $this->aggregations;
    }

    /**
     * @inheritdoc
     */
    public function setAggregations($aggregations)
    {
        $this->aggregations = $aggregations;
        return $this;
    }

    /**
     * @inheritdoc
     */
    public function getSearchCriteria()
    {
        return null;
    }

    /**
     * @inheritdoc
     */
    public function setSearchCriteria(\Magento\Framework\Api\SearchCriteriaInterface $searchCriteria)
    {
        return $this;
    }

    /**
     * @inheritdoc
     */
    public function getTotalCount()
    {
        return $this->getSize();
    }

    /**
     * @inheritdoc
     */
    public function setTotalCount($totalCount)
    {
        return $this;
    }

    /**
     * @inheritdoc
     */
    protected function beforeAddLoadedItem(DataObject $item)
    {
        return $this;
    }
}
