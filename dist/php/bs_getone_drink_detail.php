<?php
try {
    require_once "./connect_join_database.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
    $drink_no = $decoded["drink_no"];

    $sql = "select *
            from drink_set
            where drink_no = :drink_no";
    // $per_ord_data = $pdo->query($sql);
    $per_ord_data = $pdo->prepare($sql);
    $per_ord_data->bindValue(":drink_no", $drink_no);
    $per_ord_data->execute();
    // 先宣告一個 陣列，將會回傳回去 做完 v-model的依據。
    $detail_info = array();

    if ($per_ord_data->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo json_encode($detail_info);

    } else { //找得到
        //取回一筆資料
        $per_ord_datarow = $per_ord_data->fetchAll(PDO::FETCH_ASSOC);

        for ($i = 0; $i < count($per_ord_datarow); $i++) {

            array_push($detail_info, $per_ord_datarow[$i]["detail_no"]);

            // $detail_info[$i] = per_ord_datarow[$i]["detail_no"];
            // echo json_encode($typedatarow1);

        }

        //送出json字串
        // echo json_encode($per_ord_datarow);

        echo json_encode($detail_info);
        // echo $detail_info;
        // echo print_r($detail_info);
    }

} catch (PDOException $e) {
    //echo "系統錯誤, 請通知系維護人員~<br>";
    echo "錯誤行號 : " . $e->getLine() . "<br>";
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
