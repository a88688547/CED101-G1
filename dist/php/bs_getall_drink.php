<?php
try {
    require_once "./connect_join_database.php";

    $sql = "select *
            from drink d join drink_type t on d.drink_type_no = t.drink_type_no
            order by d.drink_no";
    $drinkdata = $pdo->query($sql);
    // $managerdata = $pdo->prepare($sql);
    // $managerdata->execute();

    if ($drinkdata->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";

    } else { //找得到
        //取回一筆資料
        $drinkdatarow = $drinkdata->fetchAll(PDO::FETCH_ASSOC);

        //送出json字串
        echo json_encode($drinkdatarow);
        // echo $managerdatarow;
    }

} catch (PDOException $e) {
    //echo "系統錯誤, 請通知系維護人員~<br>";
    echo "錯誤行號 : " . $e->getLine() . "<br>";
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
