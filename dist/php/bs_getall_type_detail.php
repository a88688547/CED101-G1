<?php
try {
    require_once "./connect_join_database.php";

    // $content = trim(file_get_contents("php://input"));
    // $decoded = json_decode($content, true);

    $sql = "select *
            from type";
    $typedata = $pdo->query($sql);
    // $per_ord_data = $pdo->prepare($sql);
    // $per_ord_data->execute();

    if ($typedata->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";

    } else { //找得到
        //取回一筆資料
        // echo "{找得到}";
        $typedatarow = $typedata->fetchAll(PDO::FETCH_ASSOC);
        for ($i = 0; $i < count($typedatarow); $i++) {
            $sql1 = "select *
                       from detail
                       where type_no = :type_no";
            $typedata1 = $pdo->prepare($sql1);
            $typedata1->bindValue(':type_no', $typedatarow[$i]["type_no"]);
            $typedata1->execute();
            $typedatarow1 = $typedata1->fetchAll(PDO::FETCH_ASSOC);
            $typedatarow[$i]["detail_title_list"] = $typedatarow1;
            // echo json_encode($typedatarow1);

        }
        //送出json字串
        echo json_encode($typedatarow);
        // echo $managerdatarow;
    }

} catch (PDOException $e) {
    echo "系統錯誤, 請通知系維護人員~<br>";
    // echo "錯誤行號 : " . $e->getLine() . "<br>";
    // echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
