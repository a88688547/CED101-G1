<?php
try {
    require_once "./connect_join_database.php";

    $sql = "select *
            from articlereport a
              join member m on a.mem_no = m.mem_no
              order by art_report_date desc
            ";
    $managerdata = $pdo->query($sql);
    // $managerdata = $pdo->prepare($sql);
    // $managerdata->execute();

    if ($managerdata->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";

    } else { //找得到
        //取回一筆資料
        $managerdatarow = $managerdata->fetchAll(PDO::FETCH_ASSOC);

        //送出json字串
        echo json_encode($managerdatarow);
        // echo $managerdatarow;
    }

} catch (PDOException $e) {
    //echo "系統錯誤, 請通知系維護人員~<br>";
    echo "錯誤行號 : " . $e->getLine() . "<br>";
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
