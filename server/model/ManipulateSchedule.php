<?php

declare(strict_types=1);

namespace server\model;

/**
 * Manipulate Schedule
 */
trait ManipulateSchedule
{
/**
 * get initial schedule
 */
    private function getInitialSchedule()
    {
        $schedule = null;
        foreach ($this->config['userList'] as $key => $value) {
            if ($value["id"] === $this->reqData['userID']) {
                $schedule = $value["schedule"];
                break;
            }
        }
        echo json_encode($schedule);
    }
/**
 * add new schedule
 */
    private function addSchedule()
    {
        if ($this->token !== $_SESSION['token']) {
            return;
        }

        $newSchedule = $this->reqData['newSchedule'];
        $newUserSchedule = null;

        foreach ($this->config['userList'] as $key => $value) {
            if ($value["id"] === $_SESSION['userID']) {
                array_push($this->config['userList'][$key]["schedule"], $newSchedule);

                // sort timeFrom and timeTo
                usort($this->config['userList'][$key]["schedule"], function ($a, $b) {
                    $a_time = strtotime($a['timeFrom']);
                    $b_time = strtotime($b['timeFrom']);
                    if ($a_time == $b_time) {
                        $a_time = strtotime($a['timeTo']);
                        $b_time = strtotime($b['timeTo']);
                    }
                    return $a_time - $b_time;
                });

                // sort date
                usort($this->config['userList'][$key]["schedule"], function ($a, $b) {
                    return strtotime($a['date']) - strtotime($b['date']);
                });

                $newUserSchedule = $this->config['userList'][$key]["schedule"];
                break;
            }
        }

        if (!$newUserSchedule) {
            return;
        }

        $newConfig = json_encode($this->config, JSON_UNESCAPED_UNICODE);
        file_put_contents($this->configPath, $newConfig); // = fopen(), fwrite(),  fclose()
        echo json_encode($newUserSchedule);
    }

/**
 * edit new schedule
 */
    private function editSchedule()
    {
        if ($this->token !== $_SESSION['token']) {
            return;
        }

        $newSchedule = $this->reqData['newSchedule'];

        extract($this->getCurrentUserSchedule());

        $targetID = $newSchedule['id'];

        foreach ($userSchedule as $key => $value) {
            if ($value['id'] === $targetID) {
                $this->config['userList'][$index]["schedule"][$key] = $newSchedule;
            }
        }

        $newUserSchedule = $this->config['userList'][$index]["schedule"];

        $newConfig = json_encode($this->config, JSON_UNESCAPED_UNICODE);
        file_put_contents($this->configPath, $newConfig);
        echo json_encode($newUserSchedule);
    }

/**
 * remove new schedule
 */
    private function removeSchedule()
    {
        if ($this->token !== $_SESSION['token']) {
            return;
        }

        $targetID = $this->reqData['targetID'];

        extract($this->getCurrentUserSchedule());

        foreach ($userSchedule as $key => $value) {
            if ($value['id'] === $targetID) {
                array_splice($this->config['userList'][$index]["schedule"], $key, 1);
            }
        }

        $newUserSchedule = $this->config['userList'][$index]["schedule"];

        $newConfig = json_encode($this->config, JSON_UNESCAPED_UNICODE);
        file_put_contents($this->configPath, $newConfig);
        echo json_encode($newUserSchedule);
    }

/**
 * check reqType is schedule
 */
    private function checkReqTypeIsSchedule()
    {
        $target = ['addSchedule', 'editSchedule', 'removeSchedule', 'getInitialSchedule'];

        return gettype(array_search($this->reqType, $target)) === 'integer';
    }

/**
 * get a current user schedule
 * @return array [index, userSchedule]  ※of a current user
 */
    private function getCurrentUserSchedule()
    {
        foreach ($this->config['userList'] as $index => $value) {
            if ($value["id"] === $_SESSION['userID']) {
                return [
                    'index' => $index,
                    'userSchedule' => $this->config['userList'][$index]["schedule"]
                ];
            }
        }
    }
}
