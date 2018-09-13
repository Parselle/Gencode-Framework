export default class Slider {
  constructor(obj) {
    this.obj = obj;
    this.curSlide;
    this.arrowPrev = this.obj.querySelector('.c-slider__arrowPrev');
    this.arrowNext = this.obj.querySelector('.c-slider__arrowNext');
  }

  moveTo(direction) {
    this.curSlide = this.obj.querySelector('.current');
    let prevSlide = this.curSlide.previousElementSibling;
    let nextSlide = this.curSlide.nextElementSibling;

    switch(direction) {
    case 'next':
      if (!nextSlide) break;

      if (prevSlide) {
        prevSlide.classList.remove('prev');
        prevSlide.classList.add('prevHide');
      }

      this.curSlide.classList.remove('current');
      this.curSlide.classList.add('prev');

      if (nextSlide.nextElementSibling) {
        let nextSecond = nextSlide.nextElementSibling;
        nextSecond.classList.remove('nextHide');
        nextSecond.classList.add('next');
      }

      nextSlide.classList.remove('next');
      nextSlide.classList.add('current');
      break;

    case 'prev':
      if (!prevSlide) break;			

      if (nextSlide) {
        nextSlide.classList.remove('next');
        nextSlide.classList.add('nextHide');
      }

      this.curSlide.classList.remove('current');
      this.curSlide.classList.add('next');

      if (prevSlide.previousElementSibling) {
        let prevSecond = prevSlide.previousElementSibling;
        prevSecond.classList.remove('prevHide');
        prevSecond.classList.add('prev');
      }

      prevSlide.classList.remove('prev');
      prevSlide.classList.add('current');
      break;

    default: break;
    }
  }

  run() {
    this.arrowPrev.addEventListener('click', () => {
      this.moveTo('prev');
    });

    this.arrowNext.addEventListener('click', () => {
      this.moveTo('next');
    });
  }
}