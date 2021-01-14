<?php
try {
    require_once "./connect_join_database.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    $drink_no = $decoded["drink_no"];
    $drink_title_ch = $decoded["drink_title_ch"];
    $drink_title_en = $decoded["drink_title_en"];
    $drink_type_no = $decoded["drink_type_no"];
    $drink_big_price = $decoded["drink_big_price"];
    $drink_small_price = $decoded["drink_small_price"];
    // $drink_src = $decoded["drink_src"];
    $update_detail = $decoded["update_detail"];

    $sql = "update drink
            set drink_title_ch = :drink_title_ch,drink_title_en = :drink_title_en,drink_type_no = :drink_type_no,drink_big_price = :drink_big_price,drink_small_price = :drink_small_price
            where drink_no = :drink_no
            ";
    // $grouporddata = $pdo->query($sql);
    $per_ord_data = $pdo->prepare($sql);
    $per_ord_data->bindValue(":drink_no", $drink_no);
    $per_ord_data->bindValue(":drink_title_ch", $drink_title_ch);
    $per_ord_data->bindValue(":drink_title_en", $drink_title_en);
    $per_ord_data->bindValue(":drink_type_no", $drink_type_no);
    $per_ord_data->bindValue(":drink_big_price", $drink_big_price);
    $per_ord_data->bindValue(":drink_small_price", $drink_small_price);
    // $per_ord_data->bindValue(":drink_src", $drink_src);

    $per_ord_data->execute();

    // 先刪除 該飲料的所有配置 ----------------------------
    $sql1 = "delete
                from drink_set
                where drink_no = :drink_no";
    // $grouporddata = $pdo->query($sql);
    $per_ord_data = $pdo->prepare($sql1);
    $per_ord_data->bindValue(":drink_no", $drink_no);
    $per_ord_data->execute();

    //將本次 勾選的項目 寫入 --------------------------------

    foreach ($update_detail as $key => $value) {

        $sql2 = "insert into drink_set (drink_no,type_no,detail_no)
                       values (:drink_no,:type_no,:detail_no)";
        $per_ord_data = $pdo->prepare($sql2);
        $per_ord_data->bindValue(":drink_no", $drink_no);
        $per_ord_data->bindValue(":type_no", $value);
        $per_ord_data->bindValue(":detail_no", $key);

        $per_ord_data->execute();

    }

    //上傳照片 ------------------------------------------------------------
    //.......確定是否上傳成功
    // $formData = $decoded["formData"];
    // echo json_encode($formData["upFile"]["error"]);

    // if ($formData["upFile"]["error"] == UPLOAD_ERR_OK) {
    //     //決定檔案名稱
    //     $fileInfoArr = pathinfo($formData["upFile"]["name"]);
    //     $imageNo = uniqid();
    //     $fileName = "{$imageNo}.{$fileInfoArr["extension"]}"; //312543544.gif
    //     //先檢查images資料夾存不存在
    //     if (file_exists("images") === false) {
    //         mkdir("images");
    //     }
    //     //將檔案copy到要放的路徑
    //     $from = $formData["upFile"]["tmp_name"];
    //     $to = "images/drinkphoto/$fileName";
    //     if (copy($from, $to) === true) {
    //         $sql3 = "update drink
    //                     set drink_src = './images/drinkphoto/:drink_src'
    //                     where drink_no = :drink_no";
    //         $products = $pdo->prepare($sql3);
    //         $products->bindValue(":drink_no", $drink_no);
    //         $products->bindValue(":drink_src", $fileName);
    //         $products->execute();
    //         // echo "新增成功~";
    //     } else {
    //         // echo "失敗~";
    //     }

    // } else {
    //     // echo "錯誤代碼 : {$_FILES["upFile"]["error"]} <br>";
    //     // echo "新增失敗<br>";
    // }

    echo json_encode("修改成功~!!");

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
