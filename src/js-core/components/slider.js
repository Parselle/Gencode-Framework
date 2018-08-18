class Slider {
	constructor(obj) {
		this.obj = obj;
		this.slides = $(this.obj).find('.js-slider__item');
		this.curSlide = 0;
		this.arrowPrev = $(this.obj).find('.js-slider__arrow-prev');
		this.arrowNext = $(this.obj).find('.js-slider__arrow-next');
		this.delay = 2000;
		this.timerSlide;
	}

	showNext() {
		$(this.slides).removeClass('active').hide();
		if (this.curSlide  == this.slides.length - 1) this.curSlide = 0;
		else this.curSlide++;
		$(this.slides).eq(this.curSlide).fadeIn(400);
	}

	showPrev() {
		$(this.slides).removeClass('active').hide();
		if (this.curSlide  == 0) this.curSlide = this.slides.length - 1;
		else this.curSlide--;
		$(this.slides).eq(this.curSlide).fadeIn(400);
	}

	autoPlay() {
		this.timerSlide = setInterval(() => {
			this.showNext();
		}, this.delay);
	}

	stopSlider() {
		clearInterval(this.timerSlide);
	}

	run() {
		this.autoPlay();

		$(this.arrowPrev).on('click', () => {
			this.stopSlider();
			this.showPrev();
		});

		$(this.arrowNext).on('click', () => {
			this.stopSlider();
			this.showNext();
		});
	}
}

let sliderAbout = new Slider($('.about .js-slider'));
sliderAbout.run();