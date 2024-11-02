<?php

namespace Boundsoff\PageBuilderTemplateInline\Model;

use Boundsoff\PageBuilderTemplateInline\Api\Data\TemplateInlineInterface;
use Boundsoff\PageBuilderTemplateInline\Api\Data\TemplateInlineSearchResultsInterface;
use Boundsoff\PageBuilderTemplateInline\Api\Data\TemplateInlineSearchResultsInterfaceFactory;
use Boundsoff\PageBuilderTemplateInline\Api\TemplateInlineRepositoryInterface;
use Boundsoff\PageBuilderTemplateInline\Model\ResourceModel\TemplateInline\Collection;
use Boundsoff\PageBuilderTemplateInline\Model\ResourceModel\TemplateInline\CollectionFactory;
use Magento\Framework\Api\SearchCriteria\CollectionProcessorInterface;
use Magento\Framework\Api\SearchCriteriaBuilder;
use Magento\Framework\Api\SearchCriteriaInterface;
use Magento\Framework\Exception\AlreadyExistsException;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Framework\Exception\NotFoundException;

class TemplateInlineRepository implements TemplateInlineRepositoryInterface
{
    public function __construct(
        protected CollectionProcessorInterface                $collectionProcessor,
        protected SearchCriteriaBuilder                       $searchCriteriaBuilder,
        protected CollectionFactory                           $collectionFactory,
        protected TemplateInlineSearchResultsInterfaceFactory $searchResultsFactory,
    )
    {
    }

    public function new(): TemplateInlineInterface
    {
        /** @var Collection $collection */
        $collection = $this->collectionFactory->create();
        /** @noinspection PhpIncompatibleReturnTypeInspection */
        return $collection->getNewEmptyItem();
    }

    public function getById(int $modelId): ?TemplateInlineInterface
    {
        $searchCriteria = $this->searchCriteriaBuilder
            ->addFilter(TemplateInlineInterface::KEY_MODEL_ID, $modelId)
            ->setPageSize(1)
            ->create();

        $item = $this->getList($searchCriteria)
            ->getItems();
        return array_shift($item);
    }

    /**
     * @throws AlreadyExistsException
     */
    public function save(TemplateInlineInterface $model): void
    {
        /** @var Collection $collection */
        $collection = $this->collectionFactory->create();
        $collection->getResource()
            ->save($model);
    }

    public function getList(SearchCriteriaInterface $searchCriteria)
    {
        $collection = $this->collectionFactory->create();
        $this->collectionProcessor->process($searchCriteria, $collection);

        $searchResults = $this->searchResultsFactory->create();
        $searchResults->setSearchCriteria($searchCriteria);
        $searchResults->setItems($collection->getItems());
        $searchResults->setTotalCount($collection->getSize());
        return $searchResults;
    }

    public function deleteById(int $modelId): void
    {
        $collection = $this->collectionFactory->create();
        $model = $this->getById($modelId);
        if (empty($model)) {
            $fieldName = $collection->getResource()
                ->getIdFieldName();

            throw NoSuchEntityException::singleField($fieldName, $modelId);
        }
        $collection->getResource()
            ->delete($model);
    }
}
