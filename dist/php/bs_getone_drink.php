<?php
try {
    require_once "./connect_join_database.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
    $drink_no = $decoded["drink_no"];

    $sql = "select *
            from drink d
              join drink_type t on d.drink_type_no = t.drink_type_no
            where drink_no=:drink ";
    // $drinkdata = $pdo->query($sql);
    $drinkdata = $pdo->prepare($sql);
    $drinkdata->bindValue(":drink", $drink_no);
    $drinkdata->execute();

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
