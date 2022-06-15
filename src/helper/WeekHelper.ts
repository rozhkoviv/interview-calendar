import EventEmitter from 'events';

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

export type SelectedDay = {
  time: number;
  day: Date;
}

class WeekHelper {
  obs = new EventEmitter();
  
  week: Date[] = getWeekForDate(new Date());

  selectedDay: SelectedDay | null = null;

  subscribeWeek = (func: (week: Date[]) => any) => {
    this.obs.addListener('changeW', func);
  }

  subscribeDay = (func: (day: SelectedDay) => any) => {
    this.obs.addListener('changeD', func);
  }

  setWeek = (date: Date) => {
    this.week = getWeekForDate(date);
    this.obs.emit('changeW', this.week);
  }

  getWeek = () => this.week;

  getWeekStart = () => {
    return this.week[0];
  }

  setDay = (newDay: SelectedDay | null) => {
    this.selectedDay = newDay;
    this.obs.emit('changeD', this.selectedDay);
  }

  getDay = () => this.selectedDay;
}

const wHelper = new WeekHelper();

export const useWeekHelper = () => wHelper;