<?php
    session_start();
    $_SESSION["memNo"] = null;
    $_SESSION["memPsw"] = null;
    $_SESSION["memName"] = null;
    $_SESSION["email"] = null;
    $_SESSION["memPhone"] = null;
    $_SESSION["memStatus"] = null;
    $_SESSION["teaVote"] = null;
    $_SESSION["milkVote"] = null;
    $_SESSION["fruitVote"] = null;
    unset($_SESSION["memNo"]);
    unset($_SESSION["memPsw"]);
    unset($_SESSION["memName"]);
    unset($_SESSION["email"]);
    unset($_SESSION["memStatus"]);
    unset($_SESSION["memPhone"]);
    unset($_SESSION["teaVote"]);
    unset($_SESSION["milkVote"]);
    unset($_SESSION["fruitVote"]);
    // session_destroy();

?>