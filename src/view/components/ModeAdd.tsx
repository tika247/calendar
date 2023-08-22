import 'src/scss/view/components/modeAdd.scss';
import BtnBox from "src/view/components/BtnBox";
import { useState } from 'react';
import type { ScheduleType } from 'src/const/type';
import { ERROR_SCHEDULE } from 'src/const/errorMessage';
import { getStoredToken } from 'src/modules/getStoredToken';
import { getStoredSchedule } from 'src/modules/getStoredSchedule';
import { checkDuplication } from 'src/modules/checkDuplication';
import { validateSchedule } from 'src/modules/validateSchedule';
import { getTimeRange } from 'src/modules/getTimeRange';
import { myAxios } from 'src/const/myAxios';
import { CustomDispatch } from 'src/store/operator';
/**
 * Mode to add new schedule
 */
function ModeAdd() {
    const token = getStoredToken();
    const currentSchedule = getStoredSchedule();
    const customDispatch = CustomDispatch();
    
    /**
     * useState
    */
    const [today, twoYLater] = getTimeRange();
    const [timeFrom, timeTo] = ["00:00", "00:00"]
    const [currentEntered, setCurrentEntered] = useState({
        id: "",
        title: "",
        date: today,
        timeFrom: timeFrom,
        timeTo: timeTo,
        memo: ""
    });

    /**
     * change currentEntered
     */
    const changeCurrentEntered = (e: any) => {
        const target = e.currentTarget;
        if (!target) return;
        const name = target.name.trim();
        const value = target.value.trim();
        setCurrentEntered((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    /**
     * show modal normal
     */
    const showModeNormal = () => {
        customDispatch("updateCurrentMode", "normal");
    }
    /**
     * add schedule
     * @todo config.jsonにaddScheduleできない
     */
    const addSchedule = async () => {
        const newUserSchedule = await getNewUserSchedule(currentEntered);

        if (!newUserSchedule) return;

        customDispatch("updateSchedule", newUserSchedule);
        showModeNormal();
    }

    /**
     * change mode to normal
     */
    const changeModeToNormal = () => {
        customDispatch("updateCurrentMode", "normal");
    }

    /**
     * return now for a schedule ID
     */
    const getNowForID = () => {
        const now = new Date();
        return `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
    }

    /**
     * get new user schedule
     */
    const getNewUserSchedule = async (newSchedule: ScheduleType) => {
        if (!token) return;

        let errorCheck: boolean | null = await checkDuplication(currentSchedule, newSchedule, false);
        if(errorCheck) return;
        errorCheck = await validateSchedule(newSchedule);
        if(errorCheck) return;

        // add id to newSchedule
        newSchedule.id = getNowForID();

        const params = {
            reqType: "addSchedule",
            token: token,
            newSchedule: newSchedule,
        }

        const res: Promise<boolean> = await myAxios.post("", params)
            .then(res => {
                return res.data
            })
            .catch((err: ErrorEvent) => {
                if(typeof ERROR_SCHEDULE.axiosError !== 'function') return;
                throw new Error(ERROR_SCHEDULE.axiosError(err));
            });

        return res;
    }

    return (
        <div className="modeAdd">
            <ul className="modeAdd__list">
                <li className="modeAdd__item">
                    <label htmlFor="title">title</label>
                    <input type="text" id="title" name="title" maxLength={40} minLength={1} onChange={changeCurrentEntered} required />
                </li>
                <li className="modeAdd__item">
                    <label>time</label>
                    <div className="modeAdd__time">
                        <input type="date" title="date of the schedule" name="date"
                            defaultValue={today}
                            min={today} max={twoYLater} onChange={changeCurrentEntered} required />
                        <div className="modeAdd__timeRange">
                            <input type="time" title="starting time of the schedule" name="timeFrom" defaultValue={timeFrom} onChange={changeCurrentEntered} required /> <span>~</span> <input type="time" title="ending time of the schedule" name="timeTo" defaultValue={timeTo} onChange={changeCurrentEntered} required />
                        </div>
                    </div>
                </li>
                <li className="modeAdd__item">
                    <label htmlFor="memo">memo</label>
                    <textarea id="memo" name="memo" cols={30} rows={10} onChange={changeCurrentEntered}></textarea>
                </li>
                <BtnBox boxType="schedule" onCancelMethod={changeModeToNormal} onCheckMethod={addSchedule}></BtnBox>
            </ul>
        </div>
    );
}

export default ModeAdd;