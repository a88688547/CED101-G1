<?php
session_start();

if (!isset($_SESSION["mar_no"]) || ($_SESSION["mar_no"] == "")) {
    echo '{}';
} else {

    if ((time() - $_SESSION["mar_login_time"]) > 60) {
        echo '{}';
    }
    ;
    echo json_encode($_SESSION);
}
