<?php

namespace Boundsoff\PageBuilderTemplateInline\Api;

use Boundsoff\PageBuilderTemplateInline\Api\Data\TemplateInlineInterface;
use Boundsoff\PageBuilderTemplateInline\Api\Data\TemplateInlineSearchResultsInterface;
use Magento\Framework\Api\SearchCriteriaInterface;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Exception\NoSuchEntityException;

interface TemplateInlineRepositoryInterface
{
    /**
     * Create new empty model
     *
     * @return TemplateInlineInterface
     */
    public function new(): TemplateInlineInterface;

    /**
     * Get from database model with it's id
     *
     * @param int $modelId
     * @return TemplateInlineInterface|null
     */
    public function getById(int $modelId): ?TemplateInlineInterface;

    /**
     * Save model to database
     *
     * @param TemplateInlineInterface $model
     * @return void
     */
    public function save(TemplateInlineInterface $model): void;

    /**
     * Get the items by its search criteria
     *
     * @param SearchCriteriaInterface $searchCriteria
     * @return TemplateInlineSearchResultsInterface
     */
    public function getList(SearchCriteriaInterface $searchCriteria);

    /**
     * Delete model by its id
     *
     * @param int $modelId
     * @return void
     * @throws NoSuchEntityException
     * @throws LocalizedException
     * @throws \Exception
     */
    public function deleteById(int $modelId): void;
}
