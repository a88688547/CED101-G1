<?php
try {
    require_once "./connect_join_database.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
    $mem_email = $decoded["mem_email"];
    $mem_psw = $decoded["mem_psw"];

    $sql = "select * from member where mem_email=:mem_email and mem_psw=:mem_psw";
    $login = $pdo->prepare($sql);
    $member->bindValue(":memId", $mem_email);
    $member->bindValue(":memPsw", $memPsw);
    $login->execute();

    echo "修改成功~!!";

    // if( $member->rowCount() == 0 ){//找不到
    //     $errMsg .= "帳密錯誤, <a href='sessionLogin.html'>重新登入</a><br>";
    // }else{
    //     $memRow = $member->fetch(PDO::FETCH_ASSOC);
    //     //登入成功,將登入者的資料寫入session
    //     session_start();
    //     $_SESSION["memNo"] = $memRow["no"];
    //     $_SESSION["memId"] = $memRow["memId"];
    //     $_SESSION["memName"] = $memRow["memName"];
    //     $_SESSION["email"] = $memRow["email"];
    //     $_SESSION["birthday"] = $memRow["birthday"];
    // }

} catch (PDOException $e) {
    echo "系統錯誤, 請通知系維護人員~<br>";
}
?>