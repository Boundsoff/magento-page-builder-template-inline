<?php

namespace Boundsoff\PageBuilderTemplateInline\Plugin;

use Laminas\Validator\ValidatorChain;

class ValidatorFlatMessages
{
    /**
     * @param ValidatorChain $subject
     * @param $result
     */
    public function afterGetMessages(ValidatorChain $subject, $result)
    {
        $messages = [];
        array_walk_recursive($result, function ($item) use (&$messages) {
            $messages[] = $item;
        });
        return $messages;
    }
}
