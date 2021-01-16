<?php
    session_start();

    if(!isset($_SESSION["mem_no"]) || ($_SESSION["mem_no"]=="")){
        echo '{}';
    }else{
        echo json_encode($_SESSION);
    }

   

?>