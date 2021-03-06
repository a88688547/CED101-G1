<?php
try {
    require_once "./connect_join_database.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    $drink_title_ch = $decoded["drink_title_ch"];
    $drink_title_en = $decoded["drink_title_en"];
    $drink_type_no = $decoded["drink_type_no"];
    $drink_big_price = $decoded["drink_big_price"];
    $drink_small_price = $decoded["drink_small_price"];
    // $drink_src = $decoded["drink_src"];
    // $detail_info = $decoded["detail_info"];

    $sql = "insert into drink (drink_title_ch,drink_title_en,drink_type_no,drink_big_price,drink_small_price)
            values (:drink_title_ch,:drink_title_en,:drink_type_no,:drink_big_price,:drink_small_price)
            ";
    // $grouporddata = $pdo->query($sql);
    $per_ord_data = $pdo->prepare($sql);
    $per_ord_data->bindValue(":drink_title_ch", $drink_title_ch);
    $per_ord_data->bindValue(":drink_title_en", $drink_title_en);
    $per_ord_data->bindValue(":drink_type_no", $drink_type_no);
    $per_ord_data->bindValue(":drink_big_price", $drink_big_price);
    $per_ord_data->bindValue(":drink_small_price", $drink_small_price);
    // $per_ord_data->bindValue(":drink_src", $drink_src);

    $per_ord_data->execute();

    $drink_no = $pdo->lastInsertId();

    echo json_encode($drink_no);

    // echo "修改成功~!!";
    // if ($per_ord_data->rowCount() == 0) { //找不到
    //     //傳回空的JSON字串
    //     echo "{}";

    // } else { //找得到
    //     //取回一筆資料
    //     $per_ord_datarow = $per_ord_data->fetchAll(PDO::FETCH_ASSOC);

    //     //送出json字串
    //     echo json_encode($per_ord_datarow);
    //     // echo $managerdatarow;
    // }

} catch (PDOException $e) {
    echo "系統錯誤, 請通知系維護人員~<br>";
    // echo "錯誤行號 : " . $e->getLine() . "<br>";
    // echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
