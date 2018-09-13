//Vendor
import IMask from 'imask'; //Docs https://unmanner.github.io/imaskjs/
//Components
//import Slider from './components/slider';

window.onload = function() {

  //new Slider(document.querySelector('.js-slider')).run();

  //Mask for inputs
  new IMask(document.querySelector('input[name="Lead[name]"]'), {
    mask: /[А-Яа-я]$/
  });
  new IMask(document.querySelector('input[name="Lead[phone]"]'), {
    mask: '+{7} (000) 000 - 00 - 00'
  });
  // new IMask(document.querySelector('input[name="Lead[height]"]'), {
  //   mask: '000'
  // });
  // new IMask(document.querySelector('input[name="Lead[weight]"]'), {
  //   mask: '000'
  // });
  // new IMask(document.querySelector('input[name="Lead[age]"]'), {
  //   mask: '00'
  // });

};