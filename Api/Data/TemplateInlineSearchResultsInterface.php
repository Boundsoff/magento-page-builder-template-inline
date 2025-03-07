<?php

namespace Boundsoff\PageBuilderTemplateInline\Api\Data;

use Magento\Framework\Api\SearchResultsInterface;

interface TemplateInlineSearchResultsInterface extends SearchResultsInterface
{
    /**
     * Get search result items
     *
     * @return TemplateInlineInterface[]
     */
    public function getItems();

    /**
     * Set search result items
     *
     * @param TemplateInlineInterface[] $items
     */
    public function setItems(array $items);
}
