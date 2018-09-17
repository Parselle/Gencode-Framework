<script type="text/javascript">
  function validateform(form) {
    var digits_reg = new RegExp('[^0-9]', 'g');

    var nameInput = form.elements['Lead[name]'];
    if (nameInput.value == '' && nameInput.value.length < 2) {
      alert('Имя указано неверно!');
      return false;
    }

    var heightInput = form.elements['Lead[height]'];
    if (heightInput) {
      heightInput.value = heightInput.value.replace(digits_reg, '');
      if (heightInput.value < 5) {
        alert('Рост указан неверно!');
        return false;
      }
    }
    
    var weightInput = form.elements['Lead[weight]'];
    if (weightInput) {
      weightInput.value = weightInput.value.replace(digits_reg, '');
      if (weightInput.value < 5) {
        alert('Вес указан неверно!');
        return false;
      }
    }

    var ageInput = form.elements['Lead[age]'];
    if (ageInput && ageInput.getAttribute('type') != 'hidden') {
      ageInput.value = ageInput.value.replace(digits_reg, '');
      if (ageInput.value < 5) {
        alert('Возраст указан неверно!');
        return false;
      }
    }

    var phoneInput = form.elements['Lead[phone]'];
    var phoneInputValue = phoneInput.value.replace(digits_reg, '');
    if (
      phoneInputValue == '' ||
      phoneInputValue.length < 11 ||
      phoneInputValue.length > 11
    ) {
      alert(
        'Телефон указан неверно! Должен сождержать 11 цифр. Пример: +7(912)345-67-89 или городской с кодом города +7(495)123-45-67'
      );
      return false;
    } else {
      phoneInput.value = phoneInputValue;
    }

    form.submit();
  }
</script>

<?=empty($sessiondata["landingsscripts"]["inbody"])?'':$sessiondata["landingsscripts"]["inbody"]?>

<?php if (($_SERVER['REQUEST_METHOD'] != 'POST') && isset($sessiondata["leadflag"])) {
  unset($sessiondata["leadflag"]);
  $_SESSION['l'.$landings_id] = json_encode($sessiondata);
    
  echo empty($sessiondata["landingsscripts"]["thankyoupage"])?'':$sessiondata["landingsscripts"]["thankyoupage"];
  echo "<script>alert('Ваша заявка принята. Вскоре с вами свяжется оператор для уточнения деталей.');</script>";
    
  if (!empty($sessiondata["friend"])) {
      $getparams = array_merge($_GET, $sessiondata["friend"]);
      unset($sessiondata["friend"]);
      $_SESSION['l'.$landings_id] = json_encode($sessiondata);
      
      if (!empty($_SERVER["HTTP_REFERER"])) {
          $getparams['refland'] = $_SERVER["HTTP_REFERER"];
      }
      
      echo "<script>window.location.href=\"http://cpapartizan.ru/invitingtp/v1/".(empty($getparams) ? '' : '?'.http_build_query($getparams))."\";</script>";
  }
} ?>