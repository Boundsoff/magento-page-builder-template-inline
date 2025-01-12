<?php

namespace Boundsoff\PageBuilderTemplateInline\Test\Unit\Plugin;

use Boundsoff\PageBuilderTemplateInline\Model\ConfigAcl;
use Boundsoff\PageBuilderTemplateInline\Plugin\StageConfig;
use Magento\Framework\AuthorizationInterface;
use Magento\Framework\UrlInterface;
use Magento\PageBuilder\Model\Stage\Config;
use PHPUnit\Framework\TestCase;

class StageConfigTest extends TestCase
{
    /**
     * @var UrlInterface|(UrlInterface&object&\PHPUnit\Framework\MockObject\MockObject)|(UrlInterface&\PHPUnit\Framework\MockObject\MockObject)|(object&\PHPUnit\Framework\MockObject\MockObject)|\PHPUnit\Framework\MockObject\MockObject
     */
    private $url;
    /**
     * @var AuthorizationInterface|(AuthorizationInterface&object&\PHPUnit\Framework\MockObject\MockObject)|(AuthorizationInterface&\PHPUnit\Framework\MockObject\MockObject)|(object&\PHPUnit\Framework\MockObject\MockObject)|\PHPUnit\Framework\MockObject\MockObject
     */
    private $auth;
    /**
     * @var Config|(Config&object&\PHPUnit\Framework\MockObject\MockObject)|(Config&\PHPUnit\Framework\MockObject\MockObject)|(object&\PHPUnit\Framework\MockObject\MockObject)|\PHPUnit\Framework\MockObject\MockObject
     */
    private $model;
    /**
     * @var StageConfig
     */
    private $plugin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->url = $this->createMock(UrlInterface::class);
        $this->auth = $this->createMock(AuthorizationInterface::class);
        $this->model = $this->createMock(Config::class);
        $this->plugin = new StageConfig($this->url, $this->auth);
    }

    /**
     * @return void
     */
    public function testAfterGetConfig(): void
    {
        $this->url->expects($this->once())
            ->method('getUrl')
            ->with(StageConfig::ROUTE_PATH);

        $expectedAclCases = count(ConfigAcl::cases());
        $this->auth->expects($this->exactly($expectedAclCases))
            ->method('isAllowed')
            ->willReturn(true);

        $actual = $this->plugin->afterGetConfig($this->model, []);
        $this->assertArrayHasKey('bf__template_save_url', $actual);
        $this->assertCount($expectedAclCases, $actual['acl']);
        $this->assertContainsOnly('boolean', $actual['acl']);
    }
}
