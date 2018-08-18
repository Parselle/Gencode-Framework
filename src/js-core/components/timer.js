class Timer {
	constructor(obj) {
		this.obj = obj;
		this.increment = +$(this.obj).attr('data-timer');
		this.days = $(this.obj).find('.js-timer__days');
		this.hours = $(this.obj).find('.js-timer__hours');
		this.minutes = $(this.obj).find('.js-timer__minutes');
		this.seconds = $(this.obj).find('.js-timer__seconds');

		this.daysValue;
		this.hoursValue;
		this.minutesValue;
		this.secondsValue;
	}

	setData() {
		let date = new Date();
		date.setHours(59);
		date.setMinutes(45);
		date.setSeconds(45);

		this.daysValue = (date.getDate() + this.increment) - date.getDate();
		this.hoursValue = date.getHours();
		this.minutesValue = date.getMinutes();
		this.secondsValue = date.getSeconds();
		
		$(this.days).html(this.daysValue);
		$(this.hours).html(this.hoursValue);
		$(this.minutes).html(this.minutesValue);
		$(this.seconds).html(this.secondsValue);
	}

	countDate() {
		let timerId = setInterval(() => {
			if (this.secondsValue <= 0) {
				this.secondsValue = 59;
				this.minutesValue -= 1;
			} else {
				this.secondsValue--;
			}

			if (this.minutesValue <= 0) {
				this.minutesValue = 59;
				this.hours -= 1;
			}

			$(this.seconds).html(this.secondsValue);
			$(this.minutes).html(this.minutesValue);
		}, 1000);
	}

	run() {
		this.setData();
		this.countDate();
	}
}

let timer1 = new Timer($('.js-timer'));
timer1.run();