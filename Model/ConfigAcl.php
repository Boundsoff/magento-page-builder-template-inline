<?php

namespace Boundsoff\PageBuilderTemplateInline\Model;

enum ConfigAcl: string
{
    case TEMPLATE_INLINE_SAVE = 'Boundsoff_PageBuilderTemplateInline::template_save';
    case TEMPLATE_INLINE_APPLY = 'Boundsoff_PageBuilderTemplateInline::template_apply';
    case TEMPLATE_INLINE_DELETE = 'Boundsoff_PageBuilderTemplateInline::template_delete';
}
