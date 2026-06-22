<?php

namespace App\Core;

class Renderer
{

    public static function begin(): void
    {
        ob_start();
    }

    /**
     * @throws \Exception
     */
    public static function sent(): void
    {
        if (!ob_get_level()) throw new \Exception('Buffer is not active');
        ob_end_flush();
    }

    /**
     * @throws \Exception
     */
    public static function get(): string
    {
        if (!ob_get_level()) throw new \Exception('Buffer is not active');
        return ob_get_clean();
    }
}