<?php
session_start();

if (!isset($_SESSION["mar_no"]) || ($_SESSION["mar_no"] == "")) {
    echo '{}';
} else {
    echo json_encode($_SESSION);
}
