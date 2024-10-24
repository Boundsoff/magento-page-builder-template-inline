<?php

namespace Boundsoff\PageBuilderTemplateInline\Model\ResourceModel;

use Boundsoff\PageBuilderTemplateInline\Api\Data\TemplateInlineInterface;
use Magento\Framework\Model\ResourceModel\Db\AbstractDb;

class TemplateInline extends AbstractDb
{
    protected $_serializableFields = [
        TemplateInlineInterface::KEY_COMPONENT_DATA => [[], '{}'],
    ];

    protected function _construct()
    {
        $this->_init('bf__pb_template_inline', TemplateInlineInterface::KEY_MODEL_ID);
    }
}
