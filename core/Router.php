<?php

namespace App\Core;

use Exception;

class Router
{
    private static array $routes = [];

    /**
     * @throws Exception
     */
    public static function get(string $pattern, callable $handler): void
    {
        if (isset(static::$routes['get'][$pattern])) {
            throw new Exception('Route GET [ '. $pattern .' ] already exists.');
        }

        static::$routes['get'][$pattern] = $handler;
    }

    /**
     * @throws Exception
     */
    public static function post(string $pattern, callable $handler): void
    {
        if (isset(static::$routes['post'][$pattern])) {
            throw new Exception('Route POST [ '. $pattern .' ] already exists.');
        }

        static::$routes['post'][$pattern] = $handler;
    }
}