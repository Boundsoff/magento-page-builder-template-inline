<?php

namespace Boundsoff\PageBuilderTemplateInline\Api\Data;

use Magento\Framework\Api\SearchResultsInterface;

interface TemplateInlineSearchResultsInterface extends SearchResultsInterface
{
    /**
     * @return TemplateInlineInterface[]
     */
    public function getItems();

    /**
     * @param TemplateInlineInterface[] $items
     * @return self
     */
    public function setItems(array $items);
}
