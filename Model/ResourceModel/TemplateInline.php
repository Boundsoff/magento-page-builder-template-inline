<?php

namespace Boundsoff\PageBuilderTemplateInline\Model\ResourceModel;

use Boundsoff\PageBuilderTemplateInline\Api\Data\TemplateInlineInterface;
use Magento\Framework\Model\ResourceModel\Db\AbstractDb;
use Magento\Framework\Model\ResourceModel\Db\Context;
use Magento\Framework\Validator\Factory;

class TemplateInline extends AbstractDb
{
    /**
     * @var array[]
     */
    protected $_serializableFields = [
        TemplateInlineInterface::KEY_COMPONENT_DATA => [[], '{}'],
    ];

    /**
     * @param Context $context
     * @param Factory $validatorFactory
     * @param string $connectionName
     */
    public function __construct(
        Context                    $context,
        protected readonly Factory $validatorFactory,
        $connectionName = null
    ) {
        parent::__construct($context, $connectionName);
    }

    /**
     * @inheritdoc
     */
    protected function _construct()
    {
        $this->_init('bf__pb_template_inline', TemplateInlineInterface::KEY_MODEL_ID);
    }

    /**
     * @inheritdoc
     */
    public function getValidationRulesBeforeSave()
    {
        $builder = $this->validatorFactory->createValidatorBuilder('template_inline', 'resourceModel');
        return $builder->createValidator();
    }
}
