export const ERROR_SCHEDULE = {
    title: "Title is not entered!",
    time: "Time is not selected correctly!",
    timeSame: "Set a different value into from and to!",
    timeReverse: "Set a starting time value becomes later than ending time!",
    axiosError: (err: ErrorEvent) => {
        return `Something wrong with addSchedule!\n${err}`
    },
    duplication: "You already have a schedule in the period!\nEdit or Delete the existing first."
} 