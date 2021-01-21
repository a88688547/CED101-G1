<?php
try {
    require_once "./connect_join_database.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
    $mem_no = $decoded["mem_no"];
    $ord_state = $decoded["ord_state"];

    if ($ord_state == 0) {
        $sql = "select *
            from personal_order
            where mem_no = :mem_no
             and ord_state = 0 or ord_state = 1
             order by ord_time desc";
    } else {
        $sql = "select *
            from personal_order
            where mem_no = :mem_no
             and ord_state = 2
             order by ord_time desc";
    }
    ;

    // $sql = "select *
    //         from personal_order
    //         where mem_no = :mem_no
    //          and (ord_state = :ord_state)
    //          order by ord_time desc";
    // $memberdata = $pdo->query($sql);
    $memberdata = $pdo->prepare($sql);
    $memberdata->bindValue(":mem_no", $mem_no);
    // $memberdata->bindValue(":ord_state", $ord_state);
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
