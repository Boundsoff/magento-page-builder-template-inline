<?php

namespace Boundsoff\PageBuilderTemplateInline\Api\Data;

use Magento\Framework\Api\ExtensibleDataInterface;

interface TemplateInlineInterface extends ExtensibleDataInterface
{
    const KEY_MODEL_ID = 'model_id';
    const KEY_NAME = 'name';
    const KEY_PREVIEW_IMAGE = 'preview_image';
    const KEY_COMPONENT_DATA = 'component_data';
    const KEY_CREATED_FOR = 'created_for';
    const KEY_CREATED_AT = 'created_at';
    const KEY_UPDATED_AT = 'updated_at';

    /**
     * @return string
     */
    public function getName(): string;

    /**
     * @param string $name
     * @return self
     */
    public function setName(string $name): self;

    /**
     * @return string|null
     */
    public function getPreviewImage(): ?string;

    /**
     * @param string|null $previewImage
     * @return self
     */
    public function setPreviewImage(?string $previewImage): self;

    /**
     * @return mixed
     */
    public function getComponentData(): mixed;

    /**
     * @param mixed $componentData
     * @return self
     */
    public function setComponentData(mixed $componentData): self;

    /**
     * @return string
     */
    public function getCreatedFor(): string;

    /**
     * @param string $createdFor
     * @return self
     */
    public function setCreatedFor(string $createdFor): self;

    /**
     * @return mixed
     */
    public function getCreatedAt();

    /**
     * @return mixed
     */
    public function getUpdatedAt();
}
