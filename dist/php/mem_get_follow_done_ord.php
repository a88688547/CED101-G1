<?php
try {
    require_once "./connect_join_database.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
    $mem_no = $decoded["mem_no"];

    $sql = "SELECT *
            FROM participants p
            join group_ord g on p.group_ord_no = g.group_ord_no
            where p.mem_no = :mem_no
                  and p.mem_no != g.head_mem_no
                  and g.group_state = 2
            order by g.arrive_time";
    // $memberdata = $pdo->query($sql);
    $memberdata = $pdo->prepare($sql);
    $memberdata->bindValue(":mem_no", $mem_no);
    $memberdata->execute();

    if ($memberdata->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";

    } else { //找得到
        //取回一筆資料
        $memberdatarow = $memberdata->fetchAll(PDO::FETCH_ASSOC);

        for ($i = 0; $i < count($memberdatarow); $i++) {

            $group_ord_no = $memberdatarow[$i]["group_ord_no"];
            $dis_count = $memberdatarow[$i]["dis_count"];

            $sql1 = "SELECT (sum(total_price) * :dis_count) 'per_total_price'
                      FROM group_order_item gi
                      join drink d on gi.drink_no = d.drink_no
                      where gi.mem_no = :mem_no
                        and gi.group_ord_no = :group_ord_no";
            // $memberdata = $pdo->query($sql);
            $memberdata = $pdo->prepare($sql1);
            $memberdata->bindValue(":group_ord_no", $group_ord_no);
            $memberdata->bindValue(":dis_count", $dis_count);
            $memberdata->bindValue(":mem_no", $mem_no);
            $memberdata->execute();

            $pertotalprice = $memberdata->fetchAll(PDO::FETCH_ASSOC);

            $memberdatarow[$i]["per_total_price"] = $pertotalprice[0]["per_total_price"];

        }

        //送出json字串
        echo json_encode($memberdatarow);
        // echo $managerdatarow;
    }

} catch (PDOException $e) {
    //echo "系統錯誤, 請通知系維護人員~<br>";
    echo "錯誤行號 : " . $e->getLine() . "<br>";
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
