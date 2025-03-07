<?php

namespace Boundsoff\PageBuilderTemplateInline\Observer;

use Boundsoff\PageBuilderTemplateInline\Model\ConfigAcl;
use Magento\Framework\AuthorizationInterface;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\Exception\LocalizedException;

class CheckModelAcl implements ObserverInterface
{
    /**
     * @param AuthorizationInterface $authorization
     */
    public function __construct(
        protected readonly AuthorizationInterface $authorization,
    ) {
    }

    /**
     * Check ACL permission for the actions
     *
     * @throws LocalizedException
     * @inheritdoc
     */
    public function execute(Observer $observer)
    {
        $name = $observer->getEvent()->getName();
        $name = explode('_', $name);
        $name = array_pop($name) . "_" . array_pop($name);

        $isAllowed = match ($name) {
            'before_save' => $this->authorization->isAllowed(ConfigAcl::TEMPLATE_INLINE_SAVE->value),
            'before_delete' => $this->authorization->isAllowed(ConfigAcl::TEMPLATE_INLINE_DELETE->value),
            default => false,
        };

        if (!$isAllowed) {
            throw new LocalizedException(__('Permission Error'));
        }
    }
}
