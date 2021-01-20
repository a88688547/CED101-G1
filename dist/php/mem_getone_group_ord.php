<?php
try {
    require_once "./connect_join_database.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
    $group_ord_no = $decoded["group_ord_no"];

    $sql = "select *
            from group_ord
            where group_ord_no = :group_ord_no";
    // $memberdata = $pdo->query($sql);
    $memberdata = $pdo->prepare($sql);
    $memberdata->bindValue(":group_ord_no", $group_ord_no);
    $memberdata->execute();

    if ($memberdata->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";

    } else { //找得到

        //取回一筆資料
        $memberdatarow = $memberdata->fetch(PDO::FETCH_ASSOC);

        // 判斷該訂單內 有沒有選擇 優惠券使用
        if ($memberdatarow["cou_no"] === null) {

            $memberdatarow["cou_text"] = "沒有使用";

        } else {
            //有選擇優惠券 就去 join table
            $sql = "select *
            from group_ord g join coupon c on g.cou_no = c.cou_no
            where g.group_ord_no = :group_ord_no";
            $memberdata = $pdo->prepare($sql);
            $memberdata->bindValue(":group_ord_no", $group_ord_no);
            $memberdata->execute();
            $memberdatarow = $memberdata->fetch(PDO::FETCH_ASSOC);

            if ($memberdatarow["cou_discount"] == 0.9) {
                $memberdatarow["cou_text"] = "九折優惠";
            } else if ($memberdatarow["cou_discount"] == 0.8) {
                $memberdatarow["cou_text"] = "八折優惠";
            } else if ($memberdatarow["cou_discount"] == 0.7) {
                $memberdatarow["cou_text"] = "七折優惠";
            } else if ($memberdatarow["cou_discount"] == 0.6) {
                $memberdatarow["cou_text"] = "六折優惠";
            }
            ;

        }

        if ($memberdatarow["group_ord_bs"] == 0) {
            $memberdatarow["ischecked"] = true;
        } else if ($memberdatarow["group_ord_bs"] == 1) {
            $memberdatarow["ischecked"] = false;
        }
        ;

        //送出json字串
        echo json_encode($memberdatarow);
        // echo $managerdatarow;
    }

} catch (PDOException $e) {
    //echo "系統錯誤, 請通知系維護人員~<br>";
    echo "錯誤行號 : " . $e->getLine() . "<br>";
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
