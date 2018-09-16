import IMask from 'imask'; //https://unmanner.github.io/imaskjs/

export default class InputMask {
  constructor() {
    this.rules = {
      'name': {mask: /[А-Яа-я]$/},
      'phone': {mask: '+{7} (000) 000 - 00 - 00'},
      'height': {mask: '000'},
      'weight': {mask: '000'},
      'age': {mask: '00'}
    };
  }

  run() {
    for (let type in this.rules) {
      let inputs = document.querySelectorAll(`input[data-mask="${type}"]`);
      if (inputs) {
        inputs.forEach((input) => {
          new IMask(input, this.rules[type]);
        });
      }
    }
  }

}