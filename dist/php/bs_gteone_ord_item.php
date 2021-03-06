<?php
try {
    require_once "./connect_join_database.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
    $group_ord_no = $decoded["group_ord_no"];

    $sql = "select *
            from group_order_item g
              join drink d on g.drink_no = d.drink_no
            where group_ord_no = :group_ord_no";
    // $grouporddata = $pdo->query($sql);
    $grouporddata = $pdo->prepare($sql);
    $grouporddata->bindValue(":group_ord_no", $group_ord_no);
    $grouporddata->execute();

    if ($grouporddata->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";

    } else { //找得到
        //取回一筆資料
        $grouporddatarow = $grouporddata->fetchAll(PDO::FETCH_ASSOC);

        //送出json字串
        echo json_encode($grouporddatarow, true);
        // echo $managerdatarow;
    }

} catch (PDOException $e) {
    //echo "系統錯誤, 請通知系維護人員~<br>";
    echo "錯誤行號 : " . $e->getLine() . "<br>";
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
