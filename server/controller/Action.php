<?php

declare(strict_types=1);

namespace server\controller;

use server\model\AuthenticateUser;
use server\model\RemoveSessionStorage;
use server\model\ManipulateSchedule;

class Action
{
    use ManipulateSchedule;

    final public function __construct(string $root)
    {
        $this->configPath = $root . "/config/config.json";
        $this->config = json_decode(file_get_contents($this->configPath), true);
        $this->isPOST = $_SERVER['REQUEST_METHOD'] === 'POST';
        $this->reqData = json_decode(file_get_contents("php://input"), true);
        $this->reqType = $this->reqData['reqType'];

        $this->token = (array_key_exists('token', $this->reqData)) ? $this->reqData['token'] : null;

        session_start();

        $this->authenticateUser = new AuthenticateUser($this->config, $this->reqData);

        $this->removeSessionStorage = new RemoveSessionStorage();
    }
    /**
     * init
     */
    public function init()
    {
        if (!$this->isPOST) {
            echo false;
        }

        if (!$this->token && $this->reqType === 'authenticateUser') {
            $this->authenticateUser->init();
        } else if ($this->token && $this->reqType === 'removeSessionStorage') {
            $this->removeSessionStorage->init();
        } else if ($this->token && $this->checkReqTypeIsSchedule()) {
            $this->manipulateSchedule();
        }
    }
    private function manipulateSchedule()
    {
        if ($this->reqType === 'addSchedule') {
            $this->addSchedule();
        } elseif ($this->reqType === 'editSchedule') {
            $this->editSchedule();
        } elseif ($this->reqType === 'removeSchedule') {
            $this->removeSchedule();
        } elseif ($this->reqType === 'getInitialSchedule') {
            $this->getInitialSchedule();
        } else {
            throw new Exception($this->reqType . "is unexpected request!");
        }
    }
}
