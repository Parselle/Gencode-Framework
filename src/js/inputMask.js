import IMask from 'imask'; //https://unmanner.github.io/imaskjs/

export default class InputMask {
  constructor(obj) {
    this.obj = obj;
    this.rules = {
      'name': {mask: /[А-Яа-я]$/},
      'phone': {mask: '+{7} (000) 000 - 00 - 00'},
      'height': {mask: '000'},
      'weight': {mask: '000'},
      'age': {mask: '00'}
    };
  }

  init() {
    const type = this.obj.getAttribute('data-mask');
    if(this.rules[type]) {
      new IMask(this.obj, this.rules[type]);
    }
  }

}
