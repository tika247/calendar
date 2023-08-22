import { useState } from 'react';
import 'src/scss/view/components/modeEdit.scss';
import BtnBox from "src/view/components/BtnBox";
import { CustomDispatch, CustomSelector } from 'src/store/operator';
import { getTimeRange } from 'src/modules/getTimeRange';
import { checkDuplication } from 'src/modules/checkDuplication';
import { validateSchedule } from 'src/modules/validateSchedule';
import { getStoredToken } from 'src/modules/getStoredToken';
import { getStoredSchedule } from 'src/modules/getStoredSchedule';
import { ERROR_SCHEDULE } from 'src/const/errorMessage';
import { myAxios } from 'src/const/myAxios';
import { ScheduleType } from 'src/const/type';

/**
 * Mode to add new schedule
 */
function ModeEdit() {
    const token = getStoredToken();
    const currentSchedule = getStoredSchedule();
    const customDispatch = CustomDispatch();
    const editTarget = CustomSelector("editTarget") as ScheduleType;
    const { title, date, timeFrom, timeTo, memo } = editTarget;

    /**
     * useState
    */
    const [today, twoYLater] = getTimeRange();
    const [currentEntered, setCurrentEntered] = useState(editTarget);

    /**
     * get new user schedule
     */
    const getNewUserSchedule = async (newSchedule: ScheduleType) => {
        if (!token) return;

        let errorCheck: boolean | null = await checkDuplication(currentSchedule, newSchedule, true);
        if(errorCheck) return;
        errorCheck = await validateSchedule(newSchedule);
        if(errorCheck) return;
        
        const params = {
            reqType: "editSchedule",
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
    /**
     * show modal normal
     */
    const showModeNormal = () => {
        customDispatch("updateCurrentMode", "normal");
    }
    /**
     * edit schedule
     */
    const editSchedule = async() => {
        const newUserSchedule = await getNewUserSchedule(currentEntered);

        if (!newUserSchedule) return;

        customDispatch("updateSchedule", newUserSchedule);
        showModeNormal();
    }

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
     * change mode to normal
     */
    const changeModeToNormal = () => {
        customDispatch("updateCurrentMode", "normal");
    }

    return (
        <div className="modeEdit">
            <ul className="modeEdit__list">
                <li className="modeEdit__item">
                    <label htmlFor="title">title</label>
                    <input type="text" id="title" name="title" defaultValue={title} maxLength={40} minLength={1} onChange={changeCurrentEntered} required />
                </li>
                <li className="modeEdit__item">
                    <label>time</label>
                    <div className="modeEdit__time">
                        <input type="date" title="date of the schedule" name="date"
                            defaultValue={date}
                            min={today} max={twoYLater} onChange={changeCurrentEntered} required />
                        <div className="modeEdit__timeRange">
                            <input type="time" title="starting time of the schedule" name="timeFrom" defaultValue={timeFrom} onChange={changeCurrentEntered} required /> <span>~</span> <input type="time" title="ending time of the schedule" name="timeTo" defaultValue={timeTo} onChange={changeCurrentEntered} required />
                        </div>
                    </div>
                </li>
                <li className="modeEdit__item">
                    <label htmlFor="memo">memo</label>
                    <textarea name="memo" id="memo" cols={30} rows={10} defaultValue={memo} onChange={changeCurrentEntered}></textarea>
                </li>
                <BtnBox boxType="schedule" onCancelMethod={changeModeToNormal} onCheckMethod={editSchedule}></BtnBox>
            </ul>
        </div>
    );
}

export default ModeEdit;