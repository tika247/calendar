import type { ScheduleType } from 'src/const/type';
import { ERROR_SCHEDULE } from 'src/const/errorMessage';

/**
 * chech title empty
 * @param title 
 * @returns if problem, return true;
 */
function chechTitleEmpty(title: string) {
    if (title.length === 0) {
        alert(ERROR_SCHEDULE.title);
        return true;
    } else {
        return false;
    }
}
/**
 * check date empty
 * @param date 
 * @param timeFrom 
 * @param timeTo 
 */
function checkDateEmpty(date: string, timeFrom: string, timeTo: string) {
    if (date.length === 0 || timeFrom.length === 0 || timeTo.length === 0) {
        alert(ERROR_SCHEDULE.time);
        return true;
    } else {
        return false;
    }
}
/**
 * check time range
 * @param timeFrom 
 * @param timeTo 
 */
function checkTimeRange(timeFrom: string, timeTo: string) {
    if (timeFrom === timeTo) {
        alert(ERROR_SCHEDULE.timeSame);
        return true;
    } else {
        return false;
    }
}
/**
 * check time Reverse
 * @param timeFrom 
 * @param timeTo 
 */
function checkTimeReverse(timeFrom: string, timeTo: string) {
    if (new Date(`1970-01-01T${timeFrom}:00Z`) > new Date(`1970-01-01T${timeTo}:00Z`)) {
        alert(ERROR_SCHEDULE.timeReverse);
        return true;
    } else {
        return false;
    }
}
/**
 * validate schedule
 * @returns {boolean} if no problems, return true
 */
export async function validateSchedule(newSchedule: ScheduleType): Promise<boolean | null> {
    const { title, date, timeFrom, timeTo } = newSchedule;
    let error:boolean | null = chechTitleEmpty(title);
    if(error) return error;
    error = checkDateEmpty(date, timeFrom, timeTo);
    if(error) return error;
    error = checkTimeRange(timeFrom, timeTo);
    if(error) return error;
    error = checkTimeReverse(timeFrom, timeTo);
    if(error) return error;

    return false;
}