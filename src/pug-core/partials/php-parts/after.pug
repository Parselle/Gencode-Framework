<script type="text/javascript">
    function validateform(form)
    {
        var digits_reg = new RegExp("[^0-9]", "g");
        form.elements["Lead[age]"].value = form.elements["Lead[age]"].value.replace(digits_reg, '');
        if (form.elements["Lead[name]"].value == "") {
            alert("Укажите Имя");
            return false;
        }
        if (form.elements["Lead[name]"].value.length < 2) {
            alert("Укажите Имя");
            return false;
        }
    
        if (form.elements["Lead[weight]"].value.length < 2){
            alert("Укажите вес");
            return false;
        }

        if (form.elements["Lead[height]"].value == "") {
            alert("Укажите Рост");
            return false;
        }
        if (form.elements["Lead[phone]"].value == "") {
            alert("Телефон не заполнен. Должен сождержать 10 цифр. Пример: 9123456789 или городской с кодом города 4951234567");
            return false;
        }
        var phone_reg = new RegExp("[^0-9]", "g");
        form.elements["Lead[phone]"].value = form.elements["Lead[phone]"].value.replace(phone_reg, '');
        if (form.elements["Lead[phone]"].value.length < 10)
        {
            alert("Телефон не заполнен. Должен сождержать 10 цифр. Пример: 9123456789 или городской с кодом города 4951234567");
            return false;
        }
        if (form.elements["Lead[phone]"].value.length > 11)
        {
            alert("Телефон не заполнен. Должен сождержать 10 цифр. Пример: 9123456789 или городской с кодом города 4951234567");
            return false;
        }
        form.submit();
    }
</script>

<?=empty($sessiondata["landingsscripts"]["inbody"])?'':$sessiondata["landingsscripts"]["inbody"]?>

<?php
    if (($_SERVER['REQUEST_METHOD'] != 'POST') && isset($sessiondata["leadflag"])) {
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
    } 
?>