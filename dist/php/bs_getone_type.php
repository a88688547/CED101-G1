<?php
try {
    require_once "./connect_join_database.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    $type_no = $decoded["type_no"];

    $sql = "select *
            from detail d
              join type t on d.type_no = t.type_no
            where d.type_no = :type_no";
    // $typedata = $pdo->query($sql);
    $typedata = $pdo->prepare($sql);
    $typedata->bindValue(":type_no", $type_no);
    $typedata->execute();

    if ($typedata->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";

    } else { //找得到
        //取回一筆資料
        $typedatarow = $typedata->fetchAll(PDO::FETCH_ASSOC);

        //送出json字串
        echo json_encode($typedatarow);
        // echo $managerdatarow;
    }

} catch (PDOException $e) {
    //echo "系統錯誤, 請通知系維護人員~<br>";
    echo "錯誤行號 : " . $e->getLine() . "<br>";
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
