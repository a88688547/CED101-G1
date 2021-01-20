<?php
try {
    require_once "./connect_join_database.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
    $mem_no = $decoded["mem_no"];

    $sql = "select *
            from group_ord
            where head_mem_no = :mem_no and (group_state = 0 or group_state = 1)";
    // $memberdata = $pdo->query($sql);
    $memberdata = $pdo->prepare($sql);
    $memberdata->bindValue(":mem_no", $mem_no);
    $memberdata->execute();

    if ($memberdata->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";

    } else { //找得到
        //取回一筆資料
        $memberdatarow = $memberdata->fetchAll(PDO::FETCH_ASSOC);

        //送出json字串
        echo json_encode($memberdatarow);
        // echo $managerdatarow;
    }

} catch (PDOException $e) {
    //echo "系統錯誤, 請通知系維護人員~<br>";
    echo "錯誤行號 : " . $e->getLine() . "<br>";
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
