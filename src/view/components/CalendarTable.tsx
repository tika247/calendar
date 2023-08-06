import 'src/scss/view/components/calendarTable.scss';
import { CustomSelector, CustomDispatch } from 'src/store/operator';
import type { DayType, CalendarTimeType } from 'src/const/type';
import { getToday } from 'src/modules/getToday';
import { dayOfWeekArr } from 'src/const/common';
import { MouseEventHandler } from 'react';

/**
 * Calendar table function class
 */
function CalendarTable() {
    const customDispatch = CustomDispatch();
    const calendarTime = CustomSelector('calendarTime') as CalendarTimeType;
    const { calendarYear, calendarMonth } = calendarTime;
    const calendarYearNum = Number(calendarYear);
    const calendarMonthNum = Number(calendarMonth);

    /**
     * check is an argument is today
     * @param {string} str
     * @returns 
     */
    const checkIsToday = (str: string) => {
        const today = getToday();
        const condition1 = Number(today[0]) === calendarYearNum;
        const condition2 = Number(today[1]) === calendarMonthNum;
        const condition3 = Number(today[2]) === Number(str);

        return (condition1 && condition2 && condition3) ? 'is-current' : '';
    }

    /**
     * Divides an array into chunks of a specified size
     * @param array - The array to be divided
     * @param size - Size of each chunk
     * @returns The resulting divided array
     */
    const chunkArray = (array: DayType[], size: number) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    }

    /**
     * get the array of dates
     * @returns The array of dates
     */
    const getDayArr = () => {
        const firstDayOfMonth = new Date(calendarYearNum, calendarMonthNum - 1, 1).getDay();
        const lastDayOfMonth = new Date(calendarYearNum, calendarMonthNum, 0).getDate();

        const dayArr = [];

        for (let i = 0; i < lastDayOfMonth; i++) {
            const obj = {
                id: i + 1,
                value: String(i + 1)
            };
            dayArr.push(obj);
        }

        for (let i = 0; i < firstDayOfMonth; i++) {
            const obj = {
                id: 100 + i,
                value: ""
            };
            dayArr.unshift(obj);
        }

        const deepDayArr = chunkArray(dayArr, 7);

        const lastArr = deepDayArr[deepDayArr.length - 1];
        const lastLength = lastArr.length;
        const buffer = 7 - lastLength;

        for (let i = 0; i < buffer; i++) {
            const obj = {
                id: 200 + i,
                value: ""
            };
            lastArr.push(obj);
        }

        return deepDayArr;
    }

    /**
     * get weekdays
     * @returns An array containing the elements of the weekdays
     */
    const getDayOfWeekArr = () => {
        return dayOfWeekArr.map((day) => {
            return <th key={day}><span>{day}</span></th>
        });
    }

    /**
     * get each day of the month
     * @returns An array containing elements representing each day of the month
     */
    const getEachDayOfMonth = () => {
        const dayArr = getDayArr();
        return dayArr.map((arr) => {
            return (
                <tr key={arr[0].id}>
                    {getEachDayOfWeekArr(arr)}
                </tr>
            );
        });
    }

    /**
     * show ModeDaily
     */
    const showModeDaily: MouseEventHandler<HTMLButtonElement> = (e) => {
        if (!e.currentTarget || !e.currentTarget.firstChild || !e.currentTarget.firstChild.textContent) return;

        const selectedDate: string = e.currentTarget.firstChild.textContent;
        const newSelectedDate: string = selectedDate.padStart(2, '0');
        const newDay = String(new Date(calendarYearNum, calendarMonthNum - 1, Number(newSelectedDate)).getDay());
        const newDailyTime = [calendarYear, calendarMonth, newSelectedDate, newDay];

        customDispatch("updateDailyTime", newDailyTime);
        customDispatch("updateCurrentMode", "daily");
    }

    /**
     * get each day of the week
     * @param arr - Array of dates for the week
     * @returns An array containing elements representing each day of the week
     */
    const getEachDayOfWeekArr = (arr: DayType[]) => {
        return arr.map((day) => {
            const check = day.value.length > 0;
            const checkOK = <td key={day.id} className={checkIsToday(day.value)}><button onClick={showModeDaily}><span>{day.value}</span></button></td>;
            const checkNO = <td key={day.id} className="--noValue"></td>;
            return check ? checkOK : checkNO;
        });
    }

    return (
        <table className="calendarTable">
            <thead>
                <tr>
                    {getDayOfWeekArr()}
                </tr>
            </thead>
            <tbody>
                {getEachDayOfMonth()}
            </tbody>
        </table>
    );
}

export default CalendarTable;