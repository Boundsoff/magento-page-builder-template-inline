<?php

namespace Boundsoff\PageBuilderTemplateInline\Api\Data;

use Magento\Framework\Api\ExtensibleDataInterface;

interface TemplateInlineInterface extends ExtensibleDataInterface
{
    public const KEY_MODEL_ID = 'model_id';
    public const KEY_NAME = 'name';
    public const KEY_PREVIEW_IMAGE = 'preview_image';
    public const KEY_COMPONENT_DATA = 'component_data';
    public const KEY_CREATED_FOR = 'created_for';
    public const KEY_CREATED_AT = 'created_at';
    public const KEY_UPDATED_AT = 'updated_at';

    /**
     * Get name
     *
     * @return string
     */
    public function getName(): string;

    /**
     * Set name
     *
     * @param string $name
     * @return self
     */
    public function setName(string $name): self;

    /**
     * Get preview image path
     *
     * @return string|null
     */
    public function getPreviewImage(): ?string;

    /**
     * Set preview image path
     *
     * @param string|null $previewImage
     * @return self
     */
    public function setPreviewImage(?string $previewImage): self;

    /**
     * Get component data
     *
     * @return mixed
     */
    public function getComponentData(): mixed;

    /**
     * Set component data
     *
     * @param mixed $componentData
     * @return self
     */
    public function setComponentData(mixed $componentData): self;

    /**
     * Get type for which was created
     *
     * @return string
     */
    public function getCreatedFor(): string;

    /**
     * Set type for which was created
     *
     * @param string $createdFor
     * @return self
     */
    public function setCreatedFor(string $createdFor): self;

    /**
     * Get creation timestamp
     *
     * @return mixed
     */
    public function getCreatedAt();

    /**
     * Get update timestamp
     *
     * @return mixed
     */
    public function getUpdatedAt();
}
