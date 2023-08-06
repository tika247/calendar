import type { ScheduleType } from 'src/const/type';
import { ERROR_SCHEDULE } from 'src/const/errorMessage';
import { changeTimeStyle } from 'src/modules/changeTimeStyle';
/**
 * to chech duplication
 * @param range1 
 * @param range2 
 * @returns 
 */
function hasDuplicates(range1: number[], range2: number[]) {
    const range = [];
    for (let i = range1[0]; i < range1[1]; i++) {
      range.push(i);
    }
    for (let i = range2[0]; i < range2[1]; i++) {
      range.push(i);
    }
    const set = new Set(range);
    return set.size !== range.length;
  }
/**
 * check if the schedule can be set in the time
 * @returns {boolean} if error, return true
 */
export async function checkDuplication(currentSchedule: [ScheduleType], newSchedule: ScheduleType, isEdit: boolean): Promise<boolean> {
    if(!currentSchedule) return true;

    const {id, date, timeFrom, timeTo} = newSchedule;
    const time: number[] = [changeTimeStyle(timeFrom) as number, changeTimeStyle(timeTo) as number];

    const result = currentSchedule.some((sdl) => {
        const conditionEdit = isEdit && id === sdl.id;
        const conditionDiffDay = date !== sdl.date; 
        if(conditionEdit || conditionDiffDay) return false;

        const sdlTime: number[] = [changeTimeStyle(sdl.timeFrom) as number, changeTimeStyle(sdl.timeTo) as number];

        return (hasDuplicates(time, sdlTime)) ? true : false;
    });

    if(result) alert(ERROR_SCHEDULE.duplication);
    return (result) ? true : false;
}