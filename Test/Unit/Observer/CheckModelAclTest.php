<?php

namespace Boundsoff\PageBuilderTemplateInline\Test\Unit\Observer;

use Boundsoff\PageBuilderTemplateInline\Model\ConfigAcl;
use Boundsoff\PageBuilderTemplateInline\Observer\CheckModelAcl;
use Magento\Framework\AuthorizationInterface;
use Magento\Framework\Event;
use Magento\Framework\Event\Observer;
use Magento\Framework\Exception\LocalizedException;
use PHPUnit\Framework\TestCase;

class CheckModelAclTest extends TestCase
{

    /**
     * @var AuthorizationInterface|(AuthorizationInterface&object&\PHPUnit\Framework\MockObject\MockObject)|(AuthorizationInterface&\PHPUnit\Framework\MockObject\MockObject)|(object&\PHPUnit\Framework\MockObject\MockObject)|\PHPUnit\Framework\MockObject\MockObject
     */
    private $auth;
    /**
     * @var CheckModelAcl
     */
    private $sut;
    /**
     * @var Observer|(Observer&object&\PHPUnit\Framework\MockObject\MockObject)|(Observer&\PHPUnit\Framework\MockObject\MockObject)|(object&\PHPUnit\Framework\MockObject\MockObject)|\PHPUnit\Framework\MockObject\MockObject
     */
    private $observer;
    /**
     * @var Event|(Event&object&\PHPUnit\Framework\MockObject\MockObject)|(Event&\PHPUnit\Framework\MockObject\MockObject)|(object&\PHPUnit\Framework\MockObject\MockObject)|\PHPUnit\Framework\MockObject\MockObject
     */
    private $event;

    protected function setUp(): void
    {
        parent::setUp();
        $this->auth = $this->createMock(AuthorizationInterface::class);
        $this->observer = $this->createMock(Observer::class);
        $this->event = $this->createMock(Event::class);
        $this->sut = new CheckModelAcl($this->auth);
    }

    /**
     * @param string $eventName
     * @param string $configAcl
     * @param bool $shouldThrown
     * @return void
     * @throws LocalizedException
     * @dataProvider executeDataProvider
     */
    public function testExecute(string $eventName, ?string $configAcl, bool $isAllowed): void
    {
        $this->event->expects($this->once())
            ->method('getName')
            ->willReturn($eventName);

        $this->observer->expects($this->once())
            ->method('getEvent')
            ->willReturn($this->event);

        if ($configAcl) {
            $this->auth->expects($this->once())
                ->method('isAllowed')
                ->with($configAcl)
                ->willReturn($isAllowed);
        }

        $isAllowed ?: $this->expectException(LocalizedException::class);
        $this->sut->execute($this->observer);
    }

    public function executeDataProvider(): array
    {
        return [
            'thrown save' => [
                'bf__pb_template_inline_save_before',
                ConfigAcl::TEMPLATE_INLINE_SAVE->value,
                false,
            ],
            'thrown delete' => [
                'bf__pb_template_inline_delete_before',
                ConfigAcl::TEMPLATE_INLINE_DELETE->value,
                false,
            ],
            'wont thrown save' => [
                'bf__pb_template_inline_save_before',
                ConfigAcl::TEMPLATE_INLINE_SAVE->value,
                true,
            ],
            'wont thrown delete' => [
                'bf__pb_template_inline_delete_before',
                ConfigAcl::TEMPLATE_INLINE_DELETE->value,
                true,
            ],
            'unrecognized event model' => [
                'bf__pb_template_inline_after_save',
                null,
                false,
            ],
        ];
    }
}
