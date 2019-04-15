import SmoothScroll from 'smooth-scroll'; //https://github.com/cferdinandi/smooth-scroll#readme

new SmoothScroll('a[href*="#"]', {
  speed: 800,
  easing: 'easeInOutCubic',
  ignore: 'a[data-scroll-ignore]'
});