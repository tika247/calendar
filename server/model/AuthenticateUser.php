<?php

declare(strict_types=1);

namespace server\model;

/**
 * authenticate a user and register a token into a session
 */
class AuthenticateUser
{
    public function __construct($config, $reqData)
    {
        $this->config = $config;
        $this->reqData = $reqData;
    }
    public function init()
    {
        $this->authenticate();
    }
    private function authenticate()
    {
        header('Content-Type: application/json');
        $username = $this->reqData['username'];
        $password = $this->reqData['password'];

        $schedule = null;

        foreach ($this->config['userList'] as $key => $value) {
            if ($value["username"] === $username && $value["password"] === $password) {
                $_SESSION["token"] = session_id();
                $_SESSION["userID"] = $value["id"];
                $schedule = $value["schedule"];
                break;
            }
        }

        if ($schedule) {
            echo json_encode([$_SESSION["token"], $_SESSION["userID"], $schedule]);
        } else {
            echo false;
        }
    }
}
