export default class Modal {
  constructor(obj) {
    this.obj = obj;
    this.closeBtn;
  }

  showModal(target) {
    let modal = document.querySelector(target.getAttribute('data-modal'));
    modal.classList.add('active');
  }

  closeModal(target) {
    target.parentNode.classList.remove('active');
  }

  run() {
    document.querySelectorAll('*[data-modal*="#"]').forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        this.showModal(e.target);
      });
    });

    document.querySelectorAll('*[data-modal="close"]').forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        this.closeModal(e.target);
      });
    });

  }
}