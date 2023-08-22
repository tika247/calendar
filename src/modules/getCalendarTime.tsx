import { getToday } from 'src/modules/getToday';
/**
 * get today's each values
 * @returns {string[]}
 */
export function getCalendarTime() {
    const today = getToday();
    return {
      calendarYear: today[0],
      calendarMonth: today[1],
    }
}