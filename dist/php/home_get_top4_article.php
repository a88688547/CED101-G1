<?php
try {
    require_once "./connect_join_database.php";

    // $content = trim(file_get_contents("php://input"));
    // $decoded = json_decode($content, true);

    // $mem_no = $decoded["mem_no"];

    $sql = "select *
            from art a join member m on a.mem_no = m.mem_no
            where art_status = 1
            order by art_look_count desc
            LIMIT 4";
    $memberdata = $pdo->prepare($sql);
    // $memberdata->bindValue(":no", $i);
    $memberdata->execute();

    if ($memberdata->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo json_encode("{}");

    } else { //找得到
        //取回一筆資料
        $memberdatarow = $memberdata->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($memberdatarow);

    }

} catch (PDOException $e) {
    //echo "系統錯誤, 請通知系維護人員~<br>";
    echo "錯誤行號 : " . $e->getLine() . "<br>";
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
