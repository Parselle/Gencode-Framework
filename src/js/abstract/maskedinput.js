let phoneInputs = document.querySelectorAll('*[name="Lead[phone]"]');
for (let i = 0; i < phoneInputs.length; i++) {
  VMasker(phoneInputs[i]).maskPattern('(999) 999 - 99 - 99');
}