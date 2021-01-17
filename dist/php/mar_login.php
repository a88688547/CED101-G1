<?php
try {
    require_once "./connect_join_database.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    $mar_id = $decoded["mar_id"];
    $mar_psw = $decoded["mar_psw"];

    $sql = "select *
                from manager
                where mar_id = :mar_id
                and mar_psw = :mar_psw
                and mar_status = 1";

    $member = $pdo->prepare($sql);
    $member->bindValue(":mar_id", $mar_id);
    $member->bindValue(":mar_psw", $mar_psw);
    $member->execute();
    // echo $sql;

    if ($member->rowCount() == 0) { //找不到
        echo "登入失敗";
    } else {
        $memRow = $member->fetch(PDO::FETCH_ASSOC);
        //登入成功,將登入者的資料寫入session
        session_start();
        $_SESSION["mar_no"] = $memRow["mar_no"];
        $_SESSION["mar_id"] = $memRow["mar_id"];
        $_SESSION["mar_name"] = $memRow["mar_name"];

        // echo "登入成功~!!";

        echo "登入成功";
        // $result = true;
    }

} catch (PDOException $e) {
    echo "系統錯誤, 請通知系維護人員~<br>";
}
