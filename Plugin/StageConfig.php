<?php

namespace Boundsoff\PageBuilderTemplateInline\Plugin;

use Magento\Framework\UrlInterface;

class StageConfig
{
    public function __construct(
        protected UrlInterface $urlBuilder,
    )
    {
    }

    /**
     * @param \Magento\PageBuilder\Model\Stage\Config $subject
     * @param array $result
     * @return array
     * @see \Magento\PageBuilder\Model\Stage\Config::getConfig
     */
    public function afterGetConfig($subject, $result)
    {
        $result['bf__template_save_url'] = $this->urlBuilder->getUrl('Boundsoff_PageBuilderTemplateInline/template/save');
        return $result;
    }
}
