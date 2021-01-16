<?php
    session_start();
    $_SESSION["mem_no"] = null;
    $_SESSION["mem_name"] = null;
    $_SESSION["mem_email"] = null;
    $_SESSION["mem_status"] = null;
    $_SESSION["mem_phone"] = null;
    $_SESSION["tea_vote"] = null;
    $_SESSION["milk_vote"] = null;
    $_SESSION["fruit_vote"] = null;
    $_SESSION["mem_img"] = null;
    unset($_SESSION["mem_no"]);
    unset($_SESSION["mem_name"]);
    unset($_SESSION["mem_email"]);
    unset($_SESSION["mem_status"]);
    unset($_SESSION["mem_phone"]);
    unset($_SESSION["tea_vote"]);
    unset($_SESSION["milk_vote"]);
    unset($_SESSION["fruit_vote"]);
    unset($_SESSION["mem_img"]);
    // session_destroy();

?>