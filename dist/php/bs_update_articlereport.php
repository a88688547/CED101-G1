<?php
try {
    require_once "./connect_join_database.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    $art_no = $decoded["art_no"];
    $art_report_no = $decoded["art_report_no"];
    $art_report_status = $decoded["art_report_status"];

    // 修改 審核狀態
    $sql = "update articlereport
            set art_report_status = :art_report_status
            where art_report_no = :art_report_no";
    // $grouporddata = $pdo->query($sql);
    $per_ord_data = $pdo->prepare($sql);
    $per_ord_data->bindValue(":art_report_no", $art_report_no);
    $per_ord_data->bindValue(":art_report_status", $art_report_status);
    $per_ord_data->execute();

    //若 審核通過，進而 修改 文章 上下架狀態
    if ($art_report_status == 1) {

        $sql = "update art
            set art_status = :art_status
            where art_no = :art_no";
        // $grouporddata = $pdo->query($sql);
        $per_ord_data = $pdo->prepare($sql);
        $per_ord_data->bindValue(":art_no", $art_no);
        $per_ord_data->bindValue(":art_status", 0);
        $per_ord_data->execute();

    }

    echo "修改成功~!!";
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
