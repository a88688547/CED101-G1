<?php
session_start();

if (!isset($_SESSION["mar_no"]) || ($_SESSION["mar_no"] == "")) {
    echo '{}';
} else {
    //判斷 登入時間 超過5分鐘  需要重登新入
    if ((time() - $_SESSION["mar_login_time"]) > 1800) {
        echo '{}';
    } else {
        echo json_encode($_SESSION);
    }
    ;

}
