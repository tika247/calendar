import type { Obj } from 'src/const/type';

export const ERROR_LOGIN: Obj<string | Function> = {
    empty: "Fill in the all blank!",
    userNotExsist: "Enter appropriate username and password!",
    axiosError: (err: ErrorEvent) => {
        return `Something wrong with addSchedule!\n${err}`
    },
} 
export const ERROR_SIGNUP: Obj<string | Function> = {
    empty: "Fill in the all blank!",
    repeatPassword: "The repeat password is not same.\n Fill in with the same!",
    userDuplication: "The username has already registered!",
    axiosError: (err: ErrorEvent) => {
        return `Something wrong with addSchedule!\n${err}`
    },
} 
export const ERROR_SCHEDULE: Obj<string | ((err: ErrorEvent) => string)> = {
    title: "Title is not entered!",
    time: "Time is not selected correctly!",
    timeSame: "Set a different value into from and to!",
    timeReverse: "Set a starting time value becomes later than ending time!",
    axiosError: (err: ErrorEvent) => {
        return `Something wrong with addSchedule!\n${err}`
    },
    duplication: "You already have a schedule in the period!\nEdit or Delete the existing first."
}