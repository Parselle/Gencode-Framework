class Slider {
  constructor(obj) {
    this.obj = obj;
    this.curSlide;
    this.arrowPrev = this.obj.querySelector('.c-slider__arrowPrev');
    this.arrowNext = this.obj.querySelector('.c-slider__arrowNext');
  }

  moveTo(direction) {
    this.curSlide = this.obj.querySelector('.current');
    let prevSlide = this.curSlide.previousSibling;
    let nextSlide = this.curSlide.nextSibling;

    switch(direction) {
    case 'next':
      if (!nextSlide) return false;

      if (prevSlide) {
        prevSlide.classList.remove('prev');
        prevSlide.classList.add('prevHide');
      }

      this.curSlide.classList.remove('current');
      this.curSlide.classList.add('prev');

      if (nextSlide.nextSibling) {
        let nextSecond = nextSlide.nextSibling;
        nextSecond.classList.remove('nextHide');
        nextSecond.classList.add('next');
      }

      nextSlide.classList.remove('next');
      nextSlide.classList.add('current');
      break;

    case 'prev':
      if (!prevSlide) return false;			

      if (nextSlide) {
        nextSlide.classList.remove('next');
        nextSlide.classList.add('nextHide');
      }

      this.curSlide.classList.remove('current');
      this.curSlide.classList.add('next');

      if (prevSlide.previousSibling) {
        let prevSecond = prevSlide.previousSibling;
        prevSecond.classList.remove('prevHide');
        prevSecond.classList.add('prev');
      }

      prevSlide.classList.remove('prev');
      prevSlide.classList.add('current');
      break;
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

let slider = new Slider(document.querySelector('.js-slider'));
slider.run();