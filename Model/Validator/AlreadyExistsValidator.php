<?php

namespace Boundsoff\PageBuilderTemplateInline\Model\Validator;

use Magento\Framework\Model\AbstractModel;
use Magento\Framework\Model\ResourceModel\Db\AbstractDb;
use Magento\Framework\ObjectManagerInterface;
use Magento\Framework\Validator\AbstractValidator;

class AlreadyExistsValidator extends AbstractValidator
{

    /**
     * @param string $propertyName
     * @param ObjectManagerInterface $objectManager
     */
    public function __construct(
        protected readonly string                 $propertyName,
        protected readonly ObjectManagerInterface $objectManager,
    ) {
    }

    /**
     * @inheritdoc
     */
    public function isValid($value)
    {
        try {
            /** @var AbstractDb $resourceModel */
            $resourceModel = $this->objectManager->create($value->getResourceName());
            $connection = $resourceModel->getConnection();

            $select = $connection->select()
                ->from($resourceModel->getMainTable(), $resourceModel->getIdFieldName())
                ->where("{$this->propertyName} = ?", $value->getData($this->propertyName));

            if (!!$connection->fetchOne($select)) {
                $message = __("The '%1' is already taken", $value->getData($this->propertyName));
                $this->_addMessages([
                    (string)$message,
                ]);
                return false;
            }

             return true;
        } catch (\Throwable $exception) {
            $this->_addMessages([
                $exception->getMessage(),
            ]);

            return false;
        }
    }
}
