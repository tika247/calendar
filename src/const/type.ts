import { MouseEventHandler } from 'react';
import store from "src/store/store";

export type PropsType = {};

/**
 * Store
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export interface CurrentUserType {
    username: string | null,
    password: string | null,
}
export type TokenType = { "value": string, "expiry": number } | null;
export type CurrentModeType = string;
export type DailyTimeType = string[];
export interface ScheduleType {
    id: string,
    title: string,
    date: string,
    timeFrom: string,
    timeTo: string,
    memo: string
}
export interface CalendarTimeType {
    calendarYear: string,
    calendarMonth: string,
}
export interface ReduxState {
    currentUser: CurrentUserType,
    dailyTime: DailyTimeType,
    token: TokenType,
    currentMode: CurrentModeType,
    schedule: [ScheduleType],
    editTarget: ScheduleType,
    calendarTime: CalendarTimeType
}

/**
 * Context
 */
export interface CtxHookType {
    isDev: boolean;
}

/**
 * Component
 */
export type BtnBoxProps = {
    boxType: string;
    onCancelMethod?: Function;
    onCheckMethod: Function;
};
export type BtnLProps = {
    btnType: string;
    clickMethod?: MouseEventHandler<HTMLButtonElement> | undefined
};
export type BtnMProps = {
    btnType: string;
    alt: string;
    onClickMethod: Function;
};
export type BtnSProps = {
    btnType: string;
};
export interface DayType {
    id: number; // ID of the date
    value: string; // Value of the date
}
export type LogInBoxProps = {
    boxName: string;
    onChildValueChange: Function;
};
export interface ModeType {
    mode: string
}
export interface HomeType {
    mode: string
}
export interface LogInBoxArrowType {
    enteredState: boolean;
}