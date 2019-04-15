import SmoothScroll from 'smooth-scroll'; //https://github.com/cferdinandi/smooth-scroll#readme
import InputMask from './js/InputMask.js';
// import Slider from './components/slider/slider.js';
// import Timer from './components/timer/timer.js';
// import Counter from './components/counter/counter.js';
// import Modal from './components/modal/modal.js';

window.onload = function() {

  new SmoothScroll('a[href*="#"]', {
    speed: 800,
    easing: 'easeInOutCubic',
    ignore: 'a[data-scroll-ignore]'
  });

  document.querySelectorAll('input[data-mask]').forEach((item) => {
    new InputMask(item).init();
  });

  // document.querySelectorAll('.js-slider').forEach((item) => {
  //   new Slider(item).run();
  // });

  // document.querySelectorAll('.js-timer').forEach((item) => {
  //   new Timer(item).run();
  // });

  // document.querySelectorAll('.js-counter').forEach((item) => {
  //   new Counter(item).run();
  // });

  // new Modal().run();
  
};