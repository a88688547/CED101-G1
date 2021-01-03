<?php
try {
    require_once "./connect_join_database.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
    $per_ord_bs = $decoded["per_ord_bs"];

    $sql = "select *
            from personal_order
            where ord_state = :per_ord_bs
            order by ord_time desc";
    // $grouporddata = $pdo->query($sql);
    $grouporddata = $pdo->prepare($sql);
    $grouporddata->bindValue(":per_ord_bs", $per_ord_bs);
    $grouporddata->execute();

    if ($grouporddata->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";

    } else { //找得到
        //取回一筆資料
        $grouporddatarow = $grouporddata->fetchAll(PDO::FETCH_ASSOC);

        //送出json字串
        echo json_encode($grouporddatarow);
        // echo $managerdatarow;
    }

} catch (PDOException $e) {
    //echo "系統錯誤, 請通知系維護人員~<br>";
    echo "錯誤行號 : " . $e->getLine() . "<br>";
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
