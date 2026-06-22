<?php

use App\Core\Renderer;

require '../core/Router.php';
require '../core/Renderer.php';
require 'routes.php';

Renderer::begin();

include 'templates/index.tpl';

Renderer::sent();