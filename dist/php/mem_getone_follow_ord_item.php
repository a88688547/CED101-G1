<?php
try {
    require_once "./connect_join_database.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
    $group_ord_no = $decoded["group_ord_no"];
    $mem_no = $decoded["mem_no"];

    $sql = "select *,sum(ord_qua) total_cup,sum(total_price) total_price_2
                from group_order_item g
                join member m on g.mem_no = m.mem_no
                where group_ord_no = :group_ord_no
                      and m.mem_no = :mem_no";
    // $memberdata = $pdo->query($sql);
    $memberdata = $pdo->prepare($sql);
    $memberdata->bindValue(":group_ord_no", $group_ord_no);
    $memberdata->bindValue(":mem_no", $mem_no);
    $memberdata->execute();

    if ($memberdata->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";

    } else { //找得到
        //取回一筆資料
        $memberdatarow = $memberdata->fetch(PDO::FETCH_ASSOC);

        // for ($i = 0; $i < count($memberdatarow); $i++) {

        $mem_no = $memberdatarow["mem_no"];

        $sql1 = "select *
                        from group_order_item g
                        join drink d on g.drink_no = d.drink_no
                        where g.group_ord_no = :group_ord_no and g.mem_no = :mem_no
                        order by group_ord_item_no";
        // $memberdata = $pdo->query($sql);
        $grouporderitem = $pdo->prepare($sql1);
        $grouporderitem->bindValue(":mem_no", $mem_no);
        $grouporderitem->bindValue(":group_ord_no", $group_ord_no);
        $grouporderitem->execute();

        $grouporderitemrow = $grouporderitem->fetchAll(PDO::FETCH_ASSOC);

        $memberdatarow["items"] = $grouporderitemrow;
        // }

        //送出json字串
        echo json_encode($memberdatarow);
        // echo $managerdatarow;
    }

} catch (PDOException $e) {
    //echo "系統錯誤, 請通知系維護人員~<br>";
    echo "錯誤行號 : " . $e->getLine() . "<br>";
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
