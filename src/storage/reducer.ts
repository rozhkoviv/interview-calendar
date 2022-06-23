import { createAction, createReducer } from '@reduxjs/toolkit';

export type SelectedDay = {
  time: number;
  day: Date;
}

const getWeekForDate = (date: Date): Date[] => {
  if (date.getDay() === 0) {
    const fakeDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    return getWeekForDate(fakeDate);
  }

  const days: Date[] = [];

  for (let i = 1; i < 8; i++) {
    const day = date.getDay() - date.getDay() + i;
    days.push(getDateOfWeekBasedOnCurrent(date, day));
  }

  return days;
}

const getDateOfWeekBasedOnCurrent = (currentDate: Date, dayOfWeek: number) => {
  if (dayOfWeek === currentDate.getDay()) return currentDate;

  if (dayOfWeek > currentDate.getDay()) {
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + dayOfWeek - currentDate.getDay());;
  } else {
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - (currentDate.getDay() - dayOfWeek));;
  }
}

export const setDay = createAction('day/set', (day: null | SelectedDay) => ({ payload: day }));

export const nextWeek = createAction('week/next');
export const prevWeek = createAction('week/prev');
export const currentWeek = createAction('week/current');
export const reloadWeek = createAction('week/reload');

export const dayReducer = createReducer<null | SelectedDay>(null, (builder) => {
  builder.addCase(setDay, (state, action) => {
    return action.payload;
  })
})

export const weekReducer = createReducer(getWeekForDate(new Date()), (builder) => {
  builder
  .addCase(currentWeek, (state, action) => {
    return getWeekForDate(new Date());
  })
  .addCase(nextWeek, (state, action) => {
    return getWeekForDate(new Date(state[0].getFullYear(), state[0].getMonth(), state[0].getDate() + 7));
  })
  .addCase(prevWeek, (state, action) => {
    return getWeekForDate(new Date(state[0].getFullYear(), state[0].getMonth(), state[0].getDate() - 7));
  })
  .addCase(reloadWeek, (state, action) => {
    return getWeekForDate(state[0]);
  })
})