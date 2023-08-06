<?php

declare(strict_types=1);

namespace server\model;

/**
 * remove sessionStorage
 */
class RemoveSessionStorage
{
    public function init()
    {
        session_unset();
    }
}
