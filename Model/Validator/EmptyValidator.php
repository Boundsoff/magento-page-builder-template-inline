<?php

namespace Boundsoff\PageBuilderTemplateInline\Model\Validator;

use Laminas\Validator\NotEmpty as LaminasNotEmpty;
use Magento\Framework\Validator\ValidatorInterface;

class EmptyValidator extends LaminasNotEmpty implements ValidatorInterface
{

}
