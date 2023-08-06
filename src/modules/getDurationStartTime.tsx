import { changeTimeStyle } from 'src/modules/changeTimeStyle';
import type { ScheduleType, DailyTimeType } from 'src/const/type';
/**
 * 
 * @param {ScheduleType} schedule
 * @returns {number}
 */
function getEachDuration(schedule: ScheduleType) {
    const { timeFrom, timeTo } = schedule;
    const timeFromArr: number[] = timeFrom.split(':').map(str => parseInt(str));
    const timeToArr: number[] = timeTo.split(':').map(str => parseInt(str));

    const startTime = new Date();
    startTime.setHours(timeFromArr[0], timeFromArr[1], 0);
    const endTime = new Date();
    endTime.setHours(timeToArr[0], timeToArr[1], 0);
    const timeDiff = endTime.getTime() - startTime.getTime(); // get time difference in milliseconds
    const hours = Math.floor(timeDiff / (1000 * 60 * 60)); // convert to hours
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60); // convert to minutes
    const decimalTime = hours + minutes / 60; // convert to decimal time
    return decimalTime;
}
function checkIfToday(schedule: ScheduleType, dailyTime: DailyTimeType) {
    const dateArr = schedule.date.split('-');
    const condition1 = dailyTime[0] === dateArr[0];
    const condition2 = dailyTime[1] === dateArr[1];
    const condition3 = dailyTime[2] === dateArr[2];

    return condition1 && condition2 && condition3;
}
/**
 * get a schedule duration
 * @returns {number}
 */
export function getDurationStartTime(schedules: [ScheduleType], dailyTime: DailyTimeType): number[][] {
    const durationArr: number[] = [];
    const startTimeArr: number[] = [];

    schedules.forEach((schedule) => {
        if (checkIfToday(schedule, dailyTime)) {
            durationArr.push(getEachDuration(schedule));
            const timeFrom = changeTimeStyle(schedule.timeFrom) as number;
            startTimeArr.push(timeFrom);
        }
    });

    return [durationArr, startTimeArr];
}