<?php

namespace Boundsoff\PageBuilderTemplateInline\Plugin;

use Laminas\Validator\ValidatorChain;

class ValidatorFlatMessages
{
    /**
     * Adjust messages to be flat in order to process them correctly
     *
     * @param ValidatorChain $subject
     * @param array $result
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
