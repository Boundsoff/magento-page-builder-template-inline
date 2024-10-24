<?php

namespace Boundsoff\PageBuilderTemplateInline\Api;

use Boundsoff\PageBuilderTemplateInline\Api\Data\TemplateInlineInterface;
use Boundsoff\PageBuilderTemplateInline\Api\Data\TemplateInlineSearchResultsInterface;
use Magento\Framework\Api\SearchCriteriaInterface;

/**
 *
 */
interface TemplateInlineRepositoryInterface
{
    /**
     * @return TemplateInlineInterface
     */
    public function new(): TemplateInlineInterface;

    /**
     * @param int $modelId
     * @return TemplateInlineInterface|null
     */
    public function getById(int $modelId): ?TemplateInlineInterface;

    /**
     * @param TemplateInlineInterface $model
     * @return void
     */
    public function save(TemplateInlineInterface $model): void;

    /**
     * @param SearchCriteriaInterface $searchCriteria
     * @return TemplateInlineSearchResultsInterface
     */
    public function getList(SearchCriteriaInterface $searchCriteria): TemplateInlineSearchResultsInterface;
}
