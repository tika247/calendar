/**
 * resulted in not making types of dailyTime and schedule.date unify as number[]
 */
/**
 * to add new
 * ①edit ReducersNameType
 * ①edit initialState
 * ③edit reduxSlice
 */

import type { ReduxState, CurrentUserType, DailyTimeType, CurrentModeType, TokenType, ScheduleType, CalendarTimeType } from 'src/const/type'
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ReduxState = {
  currentUser: {
    username: null,
    password: null,
  },
  dailyTime: ['', '', '', ''],
  token: null,
  currentMode: "normal",
  schedule: [
    {
      id: "",
      title: "",
      date: "",
      timeFrom: "",
      timeTo: "",
      memo: ""
    }
  ],
  editTarget: {
      id: "",
      title: "",
      date: "",
      timeFrom: "",
      timeTo: "",
      memo: ""
  },
  calendarTime: {
    calendarYear: "0",
    calendarMonth: "0",
  }
};

const reduxSlice = createSlice({
  name: 'redux',
  initialState,
  reducers: {
    "updateCurrentUser": (state, action: PayloadAction<CurrentUserType>) => {
      state.currentUser = action.payload;
    },
    "updateDailyTime": (state, action: PayloadAction<DailyTimeType>) => {
      state.dailyTime = action.payload;
    },
    "updateToken": (state, action: PayloadAction<TokenType>) => {
      state.token = action.payload;
    },
    "updateCurrentMode": (state, action: PayloadAction<CurrentModeType>) => {
      state.currentMode = action.payload;
    },
    "updateeditTarget": (state, action: PayloadAction<ScheduleType>) => {
      state.editTarget = action.payload;
    },
    "updateSchedule": (state, action: PayloadAction<[ScheduleType]>) => {
      state.schedule = action.payload;
    },
    "updateCalendarTime": (state, action: PayloadAction<CalendarTimeType>) => {
      state.calendarTime = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    redux: reduxSlice.reducer,
  },
});

export const reducers: Record<string, any> = reduxSlice.actions;

export default store;