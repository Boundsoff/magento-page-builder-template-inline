<?php

namespace Boundsoff\PageBuilderTemplateInline\Model;

use Boundsoff\PageBuilderTemplateInline\Api\Data\TemplateInlineInterface;
use Magento\Framework\Api\AttributeValueFactory;
use Magento\Framework\Api\ExtensionAttributesFactory;
use Magento\Framework\Model\AbstractExtensibleModel;
use Magento\Framework\Validator\Factory;

class TemplateInline extends AbstractExtensibleModel implements TemplateInlineInterface
{
    protected $_eventPrefix = 'bf__pb_template_inline';
    protected $_eventObject = 'template_inline';

    public function __construct(
        \Magento\Framework\Model\Context                        $context,
        \Magento\Framework\Registry                             $registry,
        ExtensionAttributesFactory                              $extensionFactory,
        AttributeValueFactory                                   $customAttributeFactory,
        protected readonly Factory                              $validatorFactory,
        \Magento\Framework\Model\ResourceModel\AbstractResource $resource = null,
        \Magento\Framework\Data\Collection\AbstractDb           $resourceCollection = null,
        array                                                   $data = []
    )
    {
        parent::__construct(
            $context,
            $registry,
            $extensionFactory,
            $customAttributeFactory,
            $resource,
            $resourceCollection,
            $data
        );
    }

    protected function _construct()
    {
        $this->_init(ResourceModel\TemplateInline::class);
    }

    public function getName(): string
    {
        return $this->getData(self::KEY_NAME);
    }

    public function setName(string $name): self
    {
        return $this->setData(self::KEY_NAME, $name);
    }

    public function getPreviewImage(): ?string
    {
        return $this->getData(self::KEY_PREVIEW_IMAGE);
    }

    public function setPreviewImage(?string $previewImage): self
    {
        return $this->setData(self::KEY_PREVIEW_IMAGE, $previewImage);
    }

    public function getComponentData(): mixed
    {
        return $this->getData(self::KEY_COMPONENT_DATA);
    }

    public function setComponentData(mixed $componentData): self
    {
        return $this->setData(self::KEY_COMPONENT_DATA, $componentData);
    }

    public function getCreatedFor(): string
    {
        return $this->getData(self::KEY_CREATED_FOR);
    }

    public function setCreatedFor(string $createdFor): self
    {
        return $this->setData(self::KEY_CREATED_FOR, $createdFor);
    }

    public function getCreatedAt()
    {
        return $this->getData(self::KEY_CREATED_AT);
    }

    public function getUpdatedAt()
    {
        return $this->getData(self::KEY_UPDATED_AT);
    }

    protected function _getValidationRulesBeforeSave()
    {
        $builder = $this->validatorFactory->createValidatorBuilder('template_inline', 'model');
        return $builder->createValidator();
    }
}
