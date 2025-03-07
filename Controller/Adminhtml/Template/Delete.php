<?php

namespace Boundsoff\PageBuilderTemplateInline\Controller\Adminhtml\Template;

use Boundsoff\PageBuilderTemplateInline\Api\TemplateInlineRepositoryInterface;
use Magento\Framework\App\Action\HttpGetActionInterface;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\Controller\ResultFactory;
use Psr\Log\LoggerInterface;

class Delete implements HttpGetActionInterface
{
    /**
     * @param RequestInterface $request
     * @param ResultFactory $resultFactory
     * @param TemplateInlineRepositoryInterface $templateInlineRepository
     * @param LoggerInterface $logger
     */
    public function __construct(
        protected readonly RequestInterface                  $request,
        protected readonly ResultFactory                     $resultFactory,
        protected readonly TemplateInlineRepositoryInterface $templateInlineRepository,
        protected readonly LoggerInterface                   $logger,
    ) {
    }

    /**
     * Delete template by its id
     *
     * @return \Magento\Framework\App\ResponseInterface|\Magento\Framework\Controller\ResultInterface
     */
    public function execute()
    {
        $resultRaw = $this->resultFactory->create(ResultFactory::TYPE_RAW);
        $resultRaw->setHttpResponseCode(200);
        $modelId = $this->request->getParam('id');

        try {
            $this->templateInlineRepository->deleteById($modelId);
        } catch (\Throwable $exception) {
            $this->logger->error($exception->getMessage());
            $this->logger->debug($exception->getTraceAsString());
            $resultRaw->setHttpResponseCode(400);
        }

        return $resultRaw->setContents('');
    }
}
