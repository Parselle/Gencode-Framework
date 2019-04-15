export default class Counter {
  constructor(obj) {
    this.obj = obj;
    this.number = +this.obj.getAttribute('data-counter-start');
    this.increment = +this.obj.getAttribute('data-counter-inc');
    this.direction = this.obj.getAttribute('data-counter-dir');
    this.speed = +this.obj.getAttribute('data-counter-speed');
    this.replace = this.obj.querySelector('*[data-counter="number"]');
  }

  run() {
    let timerId;

    switch(this.direction) {
    case 'from':
      timerId = setInterval(() => {
        if (this.number <= 0) {
          clearInterval(timerId);
        } else {
          this.replace.innerHTML = this.number;
          this.number -= this.increment;
        } 
      }, this.speed);
      break;

    case 'to':
      timerId = setInterval(() => {
        this.replace.innerHTML = this.number;
        this.number += this.increment;
      }, this.speed);
      break;
    }
    
  }
  
}