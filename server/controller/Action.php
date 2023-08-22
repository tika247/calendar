<?php

declare(strict_types=1);

namespace server\controller;

use server\model\RegisterUser;
use server\model\AuthenticateUser;
use server\model\RemoveSessionStorage;
use server\model\ManipulateSchedule;
use server\model\SanitizeHTML;
use server\model\DecodeHTMLSpecialChars;
use server\model\OverWriteConfig;
use server\model\SendRes;

class Action
{
    use ManipulateSchedule;
    use SanitizeHTML;
    use DecodeHTMLSpecialChars;
    use OverWriteConfig;
    use SendRes;

    final public function __construct(string $root)
    {
        ini_set('session.cookie_secure', '1'); // to send Cookie with HTTP connection
        session_start();
        $this->configPath = $root . "/config/config.json";
        $this->config = json_decode(file_get_contents($this->configPath), true);
        $this->isPOST = $_SERVER['REQUEST_METHOD'] === 'POST';
        $this->reqData = json_decode(file_get_contents("php://input"), true);

        $this->sanitizeAllHTML();

        $this->reqType = $this->reqData['reqType'];
        $this->token = (array_key_exists('token', $this->reqData)) ? $this->reqData['token'] : null;
        $this->registerUser = new RegisterUser($this->config, $this->reqData, $this->configPath);
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

        if (!$this->token && $this->reqType === 'registerUser') {
            $this->registerUser->init();
        } elseif (!$this->token && $this->reqType === 'authenticateUser') {
            $this->authenticateUser->init();
        } elseif ($this->token && $this->reqType === 'removeSessionStorage') {
            $this->removeSessionStorage->init($this->token);
        } elseif ($this->token && $this->checkReqTypeIsSchedule()) {
            $this->manipulateSchedule();
        }
    }
    /**
     * sanitizeHTML
     */
    private function sanitizeAllHTML()
    {
        $this->reqData = $this->sanitizeHTML($this->reqData);
        $this->config = $this->sanitizeHTML($this->config);
    }
    /**
     * manipulate schedule
     */
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
