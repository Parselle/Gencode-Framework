<?=empty($sessiondata["advertisersrequisites"])?'':((empty($_GET['city']) ||
empty($sessiondata["advertisersrequisites"][$_GET['city']]))?$sessiondata["advertisersrequisites"]
['default']:$sessiondata["advertisersrequisites"][$_GET['city']])?>