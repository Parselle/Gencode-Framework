<?php
    session_start();
    $landings_id = 1313;
    $sessiondata = array();
    if (!empty($_SESSION['l'.$landings_id])) {
        $sessiondata = json_decode($_SESSION['l'.$landings_id],true);
    }
    if (!isset($sessiondata["click"])) {
        $sessiondata["click"] = '';
        $url = 'https://mosclubkrasota.ru/site/clicks/';
        $postdata = $_GET;
        $postdata['landings_id'] = $landings_id;
        $postdata['ip'] = $_SERVER["HTTP_X_FORWARDED_FOR"];
        $postdata['referer'] = $_SERVER["HTTP_REFERER"];
        $postdata['useragent'] = $_SERVER["HTTP_USER_AGENT"];
        $postdata['refererlanding'] = "http://".$_SERVER["HTTP_HOST"].$_SERVER["SCRIPT_NAME"];
        $postdata['landingsscripts'] = true;
        $postdata['citieslist'] = true;
        $postdata['advertisersrequisites'] = true; // Для передачи на ленд набора реквизитов
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);
        $sendingresult = curl_exec($ch);
        $sendingerror = curl_error($ch);
        if ( $sendingerror == "" && ($sendingresultjson = json_decode($sendingresult, true)) )
        {
            if (!empty($sendingresultjson["click"]))
                $sessiondata["click"] = $sendingresultjson["click"];
        
            if (!empty($sendingresultjson["landingsscripts"]))
                $sessiondata["landingsscripts"] = $sendingresultjson["landingsscripts"];
        
            if (!empty($sendingresultjson["citieslist"]))
                $sessiondata["citieslist"] = $sendingresultjson["citieslist"];
        
    // Сохранение набора реквизитов 
            if (!empty($sendingresultjson["advertisersrequisites"]))
                $sessiondata["advertisersrequisites"] = $sendingresultjson["advertisersrequisites"];
        }
        $_SESSION['l'.$landings_id] = json_encode($sessiondata);
    }
    if (empty($_GET['city']) || empty($sessiondata["citieslist"][$_GET['city']])) {
        include("/var/www/cpapartizan.ru/www/lib/SxGeo.php");
        $SxGeo = new SxGeo('/var/www/cpapartizan.ru/www/lib/SxGeoCity.dat');
        $SxGeoCity = $SxGeo->getCityFull($_SERVER['HTTP_X_REAL_IP']);
        
        foreach ($sessiondata["citieslist"] as $cityKey => $cityValue) {
            if ($SxGeoCity["city"]["name_ru"] == $cityValue['case1']) {
                $_GET['city'] = $cityKey;
                break;
            }
        }
    }
    if (!empty($_GET['city']) && empty($sessiondata["citieslist"][$_GET['city']])) {
        $_GET['city'] = '';
    }
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        require_once("/var/www/cpapartizan.ru/www/lib/Lead.php");
        
        $sessiondata["leadflag"] = true;
    //	if(!empty($_POST["Lead"]["name"]) && !empty($_POST["Lead"]["phone"])) {
    //    	$sessiondata["friend"] = array(
    //        	"friend" => $_POST["Lead"]["name"],
    //        	"friend_phone" => $_POST["Lead"]["phone"],
    //        	"friend_offer" => empty($_POST["Lead"]["offer"])?null:$_POST["Lead"]["offer"],
    //        	"friend_city" => empty($_POST["Lead"]["city"])?null:$_POST["Lead"]["city"],
    //        	"friend_landing" => $landings_id,
    //    	);
    //	}
        
        $_SESSION['l'.$landings_id] = json_encode($sessiondata);
        
        header('Location: ' . $_SERVER['REQUEST_URI']);
    }

    // $monthAr = array(
    //   1 => array('январь', 'января'),
    //   2 => array('февраль', 'февраля'),
    //   3 => array('март', 'марта'),
    //   4 => array('апрель', 'апреля'),
    //   5 => array('май', 'мая'),
    //   6 => array('июнь', 'июня'),
    //   7 => array('июль', 'июля'),
    //   8 => array('август', 'августа'),
    //   9 => array('сентябрь', 'сентября'),
    //   10=> array('октябрь', 'октября'),
    //   11=> array('ноябрь', 'ноября'),
    //   12=> array('декабрь', 'декабря')
    // );
    // $date = new DateTime(date('d-m-Y'));
    // $date->add(new DateInterval('P5D'));
    // echo $date->format('j')." ".$monthAr[$date->format('n')][1];
?>