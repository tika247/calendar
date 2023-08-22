import 'src/scss/view/components/hdgHeader.scss';
import arrowLeft from 'src/img/icon-arrowLeft.svg';
import arrowRight from 'src/img/icon-arrowRight.svg';
import { getMonthInEn } from 'src/modules/getMonthInEn';
import { CustomSelector } from 'src/store/operator';
import type { CalendarTimeType } from 'src/const/type';
import { CustomDispatch } from 'src/store/operator';

/**
 * @returns 
 */
function HdgHeader() {
    const customDispatch = CustomDispatch();
    const calendarTime = CustomSelector("calendarTime") as CalendarTimeType;
    const {calendarYear, calendarMonth} = calendarTime;
    const calendarYearNum = Number(calendarYear);
    const calendarMonthNum = Number(calendarMonth);
    /**
     * get header text
     * @returns {string}
    */
   const getHeaderText = () => {
       const monthEn = getMonthInEn(Number(calendarMonth));

        return `${monthEn} ${calendarYear}`
    }
    /**
     * rewind one month
     */
    const rewindOneMonth = () => {
        const newYear = (calendarMonthNum === 1) ? calendarYearNum - 1 : calendarYearNum;
        const newMonth = (calendarMonthNum === 1) ? 12 : calendarMonthNum - 1;
        const newCalendarTime = {
            calendarYear: String(newYear),
            calendarMonth: String(newMonth).padStart(2, '0')
        }
        customDispatch("updateCalendarTime", newCalendarTime);
    }
    /**
     * fast-forward one month
     */
    const fastForwardOneMonth = () => {
        const newYear = (calendarMonthNum === 12) ? calendarYearNum + 1 : calendarYearNum;
        const newMonth = (calendarMonthNum === 12) ? 1 : calendarMonthNum + 1;
        const newCalendarTime = {
            calendarYear: String(newYear),
            calendarMonth: String(newMonth).padStart(2, '0')
        }
        customDispatch("updateCalendarTime", newCalendarTime);
    }
    return (
        <div className="hdgHeader">
            <button className="hdgHeader__btn --left" onClick={rewindOneMonth}>
                <img src={arrowLeft} alt="" />
            </button>
            <h2 className="hdgHeader__text">{getHeaderText()}</h2>
            <button className="hdgHeader__btn --right" onClick={fastForwardOneMonth}>
                <img src={arrowRight} alt="" />
            </button>
        </div>
    )
}

export default HdgHeader;