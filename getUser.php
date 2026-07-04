<?php

header('Content-Type: application/json');

function export(mixed $value)
{
    echo '<pre>';
    var_export($value);
    echo '</pre>';
}

if (isset($_GET['action']))
{
    $action = $_GET['action'];

    if ($action == 'getUser')
    {
        if (isset($_GET['id']))
        {
            $userID = $_GET['id'];
            $conn = new PDO('mysql:host=MySQL-8.4;port=3306;dbname=chat', 'root', '');
            $result = $conn->query('SELECT * FROM users');

            $users = $result->fetchAll(PDO::FETCH_ASSOC);
            die(json_encode($users));
        }
        else
        {

            die('Не найден id пользователя!');
        }
    }
}
