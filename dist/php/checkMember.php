<?php
    session_start();

    if(!isset($_SESSION["memNo"]) || ($_SESSION["memNo"]=="")){
        echo '{}';
    }else{
        echo json_encode($_SESSION);
    }

   

?>