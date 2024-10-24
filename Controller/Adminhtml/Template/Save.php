<?php

namespace Boundsoff\PageBuilderTemplateInline\Controller\Adminhtml\Template;

use Boundsoff\PageBuilderTemplateInline\Api\Data\TemplateInlineInterface;
use Boundsoff\PageBuilderTemplateInline\Api\TemplateInlineRepositoryInterface;
use Magento\Framework\Api\ImageContent;
use Magento\Framework\Api\ImageContentValidator;
use Magento\Framework\Api\ImageContentFactory;
use Magento\Framework\App\Action\HttpPostActionInterface;
use Magento\Framework\App\Filesystem\DirectoryList;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\Controller\Result\Json;
use Magento\Framework\Controller\ResultFactory;
use Magento\Framework\Escaper;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\Filesystem;
use Magento\Framework\Image\AdapterFactory;
use Psr\Log\LoggerInterface;

class Save implements HttpPostActionInterface
{
    public function __construct(
        protected TemplateInlineRepositoryInterface $templateInlineRepository,
        protected RequestInterface                  $request,
        protected ResultFactory                     $resultFactory,
        protected Escaper                           $escaper,
        protected Filesystem                        $filesystem,
        protected ImageContentValidator             $imageContentValidator,
        protected ImageContentFactory               $imageContentFactory,
        protected AdapterFactory                    $imageAdapterFactory,
        protected LoggerInterface                   $logger,
    )
    {
    }

    public function execute()
    {
        $name = (string)$this->request->getParam(TemplateInlineInterface::KEY_NAME);
        $previewImage = (string)$this->request->getParam(TemplateInlineInterface::KEY_PREVIEW_IMAGE);
        $createdFor = (string)$this->request->getParam(TemplateInlineInterface::KEY_CREATED_FOR);
        $componentData = (array)$this->request->getParam(TemplateInlineInterface::KEY_COMPONENT_DATA);

        array_walk_recursive($componentData, function (&$item) {
            $item = $this->escaper->escapeJs($item);
        });

        $templateInline = $this->templateInlineRepository->new();
        $templateInline->setName($name);
        $templateInline->setCreatedFor($createdFor);
        $templateInline->setComponentData($componentData);

        try {
            if (!empty($previewImage)) {
                $filePath = $this->storePreviewImage($previewImage, $name);
                $templateInline->setPreviewImage($filePath);
            }

            $this->templateInlineRepository->save($templateInline);
        } catch (LocalizedException $exception) {
            $this->logger->debug($exception->getTraceAsString());

            /** @var Json $result */
            $result = $this->resultFactory->create(ResultFactory::TYPE_JSON);
            return $result->setData([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        } catch (\Throwable $exception) {
            $this->logger->error($exception->getMessage());
            $this->logger->debug($exception->getTraceAsString());

            /** @var Json $result */
            $result = $this->resultFactory->create(ResultFactory::TYPE_JSON);
            return $result->setData([
                'success' => false,
            ]);
        }

        /** @var Json $result */
        $result = $this->resultFactory->create(ResultFactory::TYPE_JSON);
        return $result->setData([
            'success' => true,
            'message' => __('Template was successfully saved.'),
        ]);
    }

    /**
     * Handle storing the preview image
     *
     * @param RequestInterface $request
     * @return string
     * @throws LocalizedException
     * @throws \Magento\Framework\Exception\FileSystemException
     * @throws \Magento\Framework\Exception\InputException
     */
    private function storePreviewImage(string $previewImage, string $name): ?string
    {
        $fileName = preg_replace("/[^A-Za-z0-9]/", '', str_replace(
                ' ',
                '-',
                strtolower($name)
            )) . '_' . uniqid() . '.jpg';

        // Prepare the image data
        $imgData = str_replace(' ', '+', $previewImage);
        $imgData = substr($imgData, strpos($imgData, ",") + 1);
        // phpcs:ignore
        $decodedImage = base64_decode($imgData);

        $imageProperties = getimagesizefromstring($decodedImage);
        if (!$imageProperties) {
            throw new LocalizedException(__('Unable to get properties from image.'));
        }

        /* @var ImageContent $imageContent */
        $imageContent = $this->imageContentFactory->create();
        $imageContent->setBase64EncodedData($imgData);
        $imageContent->setName($fileName);
        $imageContent->setType($imageProperties['mime']);

        if ($this->imageContentValidator->isValid($imageContent)) {
            $mediaDirWrite = $this->filesystem
                ->getDirectoryWrite(DirectoryList::MEDIA);
            $directory = $mediaDirWrite->getAbsolutePath('.template-manager');
            $mediaDirWrite->create($directory);
            $fileAbsolutePath = "{$directory}/{$fileName}";
            // Write the file to the directory
            $mediaDirWrite->getDriver()->filePutContents($fileAbsolutePath, $decodedImage);
            // Generate a thumbnail, called -thumb next to the image for usage in the grid
            $thumbPath = str_replace('.jpg', '-thumb.jpg', $fileName);
            $thumbAbsolutePath = $directory . $thumbPath;
            $imageFactory = $this->imageAdapterFactory->create();
            $imageFactory->open($fileAbsolutePath);
            $imageFactory->resize(350);
            $imageFactory->save($thumbAbsolutePath);

            // Store the preview image within the new entity
            return $mediaDirWrite->getRelativePath($fileAbsolutePath);
        }

        return null;
    }
}
