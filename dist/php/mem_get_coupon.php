<?php
try {
    require_once "./connect_join_database.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    $mem_no = $decoded["mem_no"];

    $sql = "select *
            from coupon
            where mem_no = :mem_no
            and cou_status = 0";
    // $memberdata = $pdo->query($sql);
    $memberdata = $pdo->prepare($sql);
    $memberdata->bindValue(":mem_no", $mem_no);
    $memberdata->execute();

    if ($memberdata->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo json_encode("{}");

    } else { //找得到
        //取回一筆資料
        $memberdatarow = $memberdata->fetchAll(PDO::FETCH_ASSOC);

        for ($i = 0; $i < count($memberdatarow); $i++) {
            if ($memberdatarow[$i]["cou_discount"] == 0.9) {
                $memberdatarow[$i]["img"] = "./Images/coupon_10off.png";
            } else if ($memberdatarow[$i]["cou_discount"] == 0.8) {
                $memberdatarow[$i]["img"] = "./Images/coupon_20off.png";
            } else if ($memberdatarow[$i]["cou_discount"] == 0.7) {
                $memberdatarow[$i]["img"] = "./Images/coupon_30off.png";
            } else if ($memberdatarow[$i]["cou_discount"] == 0.6) {
                $memberdatarow[$i]["img"] = "./Images/coupon_40off.png";
            }
            ;
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
