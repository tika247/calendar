import { CustomSelector } from 'src/store/operator';
import type { ScheduleType } from 'src/const/type'

export function getStoredSchedule() {
    return CustomSelector("schedule") as [ScheduleType];
}