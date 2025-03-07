<?php

namespace Boundsoff\PageBuilderTemplateInline\Plugin;

use Boundsoff\PageBuilderTemplateInline\Model\ConfigAcl;
use Magento\Framework\AuthorizationInterface;
use Magento\Framework\UrlInterface;

class StageConfig
{
    const ROUTE_PATH = 'Boundsoff_PageBuilderTemplateInline/template/save';

    /**
     * @param UrlInterface $urlBuilder
     * @param AuthorizationInterface $authorization
     */
    public function __construct(
        protected readonly UrlInterface $urlBuilder,
        protected readonly AuthorizationInterface $authorization,
    ) {
    }

    /**
     * Adding controller url and acl resources to the page builder stage config
     *
     * @param \Magento\PageBuilder\Model\Stage\Config $subject
     * @param array $result
     * @return array
     * @see \Magento\PageBuilder\Model\Stage\Config::getConfig
     */
    public function afterGetConfig($subject, $result)
    {
        $result['bf__template_save_url'] = $this->urlBuilder->getUrl(static::ROUTE_PATH);

        foreach (ConfigAcl::cases() as $case) {
            $result['acl'][strtolower($case->name)] = $this->authorization->isAllowed($case->value);
        }

        return $result;
    }
}
