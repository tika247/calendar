import 'src/scss/view/components/modeDaily.scss';
import TimeLine from "src/view/components/TimeLine";
import BoxSchedule from "src/view/components/BoxSchedule";
import { getDateInEn } from 'src/modules/getDateInEn'
import { getTimeLineMargin } from 'src/modules/getTimeLineMargin'
import { changeTimeLineMargin } from 'src/modules/changeTimeLineMargin'
import { changeBoxScheduleUI } from 'src/modules/changeBoxScheduleUI';
import { getDurationStartTime } from 'src/modules/getDurationStartTime';
import { CustomSelector } from 'src/store/operator';
import type { ScheduleType, DailyTimeType } from 'src/const/type';
import { useEffect } from 'react';

/**
 * Daily schedule function class
 */
function ModeDaily() {
    const userSchedule = CustomSelector("schedule") as [ScheduleType];
    const dailyTime = CustomSelector("dailyTime") as DailyTimeType;

    /**
     * get header hdg
     * @returns {string}
     */
    const getHeaderHdg = () => {
        const day = dailyTime[2];
        const dayOfWeek = getDateInEn(Number(dailyTime[3]));

        return `${day} ${dayOfWeek}`
    }

    /**
     * get each schedule
     * @returns {JSX.Element}
     */
    const getEachSchedule = (arr: [ScheduleType]) => {
        if (!userSchedule || !(userSchedule.length > 0)) return null;

        return arr.map((schedule) => {
            const time = `${dailyTime[0]}-${dailyTime[1]}-${dailyTime[2]}`

            if (schedule.date !== time) return;

            const boxSchedule = <BoxSchedule schedule={schedule}></BoxSchedule>;
            return boxSchedule;
        });
    }

    /**
     * get schedule wrap
     * @returns {JSX.Element}
     */
    const getScheduleWrap = () => {
        const eachSchedule = getEachSchedule(userSchedule);
        if (!eachSchedule || !(eachSchedule.length > 0)) return null;

        const scheduleWrap = <div className="modeDaily__wrap">
            {eachSchedule}
        </div>

        return scheduleWrap;
    }

    /**
     * adjust UI
     */
    const adjustUI = async () => {
        const boxes: NodeListOf<HTMLDivElement> = document.querySelectorAll('.js-boxSchedule');
        const timeLine = document.querySelector('.js-timeLine');
        if(!timeLine) return;
        const scales: NodeListOf<HTMLSpanElement> = timeLine.querySelectorAll('.js-scale');const [durationArr, startTimeArr] = getDurationStartTime(userSchedule, dailyTime);

        const margin = getTimeLineMargin(boxes, durationArr);
        if(!margin) return;

        changeTimeLineMargin(scales, margin);

        changeBoxScheduleUI(boxes, scales, durationArr, startTimeArr, margin);
    }

    useEffect(() => {
        adjustUI();
    }, []);

    return (
        <div className="modeDaily">
            <h3 className="modeDaily__hdg">{getHeaderHdg()}</h3>
            <div className="modeDaily__contents">
                <div className="modeDaily__inner">
                    <TimeLine></TimeLine>
                    {getScheduleWrap()}
                </div>
            </div>
        </div>
    )
}

export default ModeDaily;