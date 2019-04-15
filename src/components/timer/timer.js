export default class Timer {
  constructor(obj) {
    this.obj = obj;
    this.increment = +this.obj.getAttribute('data-timer');
    this.days = this.obj.querySelector('*[data-timer="days"]');
    this.hours = this.obj.querySelector('*[data-timer="hours"]');
    this.minutes = this.obj.querySelector('*[data-timer="minutes"]');
    this.seconds = this.obj.querySelector('*[data-timer="seconds"]');

    this.daysValue;
    this.hoursValue;
    this.minutesValue;
    this.secondsValue;
  }

  countDate() {
    let timerId = setInterval(() => {
      let dateFrom = new Date();
      let dateTo = new Date();
      dateTo.setDate(dateTo.getDate() + this.increment);
      dateTo.setHours(23, 59, 59);
      let dateDiff = dateTo - dateFrom;

      this.daysValue = (parseInt(dateDiff/(60*60*1000*24))).toString();
      this.hoursValue = (parseInt(dateDiff/(60*60*1000))%24).toString();
      this.minutesValue = (parseInt(dateDiff/(1000*60))%60).toString();
      this.secondsValue = (parseInt(dateDiff/1000)%60).toString();

      if (this.secondsValue <= 0 && this.minutesValue <= 0 && this.hoursValue <= 0 && this.daysValue <= 0) {
        timerId.clearInterval();
      }
      
      this.days.innerHTML = this.daysValue;
      this.hours.innerHTML = this.hoursValue;
      this.minutes.innerHTML = this.minutesValue;
      this.seconds.innerHTML = this.secondsValue;
    }, 1000);
  }

  run() {
    this.countDate();
  }
}