<?php
try {
    require_once "./connect_join_database.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
    $per_ord_no = $decoded["per_ord_no"];

    $sql = "select *
            from personal_order
            where per_ord_no = :per_ord_no";
    // $grouporddata = $pdo->query($sql);
    $per_ord_data = $pdo->prepare($sql);
    $per_ord_data->bindValue(":per_ord_no", $per_ord_no);
    $per_ord_data->execute();

    if ($per_ord_data->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";

    } else { //找得到
        //取回一筆資料
        $per_ord_datarow = $per_ord_data->fetch(PDO::FETCH_ASSOC);

        // 判斷該訂單內 有沒有選擇 優惠券使用
        if ($per_ord_datarow["cou_no"] === null) {

            $per_ord_datarow["cou_text"] = "沒有使用";

        } else {
            //有選擇優惠券 就去 join table
            $sql = "select *
            from group_ord g join coupon c on g.cou_no = c.cou_no
            where g.group_ord_no = :group_ord_no";
            $memberdata = $pdo->prepare($sql);
            $memberdata->bindValue(":group_ord_no", $group_ord_no);
            $memberdata->execute();
            $per_ord_datarow = $memberdata->fetch(PDO::FETCH_ASSOC);

            if ($per_ord_datarow["cou_discount"] == 0.9) {
                $per_ord_datarow["cou_text"] = "九折優惠";
            } else if ($per_ord_datarow["cou_discount"] == 0.8) {
                $per_ord_datarow["cou_text"] = "八折優惠";
            } else if ($per_ord_datarow["cou_discount"] == 0.7) {
                $per_ord_datarow["cou_text"] = "七折優惠";
            } else if ($per_ord_datarow["cou_discount"] == 0.6) {
                $per_ord_datarow["cou_text"] = "六折優惠";
            }
            ;

        }

        //送出json字串
        echo json_encode($per_ord_datarow);
        // echo $managerdatarow;
    }

} catch (PDOException $e) {
    //echo "系統錯誤, 請通知系維護人員~<br>";
    echo "錯誤行號 : " . $e->getLine() . "<br>";
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
