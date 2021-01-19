<?php
try {
    require_once "./connect_join_database.php";

    // $content = trim(file_get_contents("php://input"));
    // $decoded = json_decode($content, true);

    // $mem_no = $decoded["mem_no"];

    $drinks = [];

    for ($i = 1; $i < 4; $i++) {
        $sql = "select *
            from drink
            where drink_type_no = :no
            order by vote_count_now desc
            LIMIT 3";
        $memberdata = $pdo->prepare($sql);
        $memberdata->bindValue(":no", $i);
        $memberdata->execute();

        if ($memberdata->rowCount() == 0) { //找不到
            //傳回空的JSON字串
            echo json_encode("{}");

        } else { //找得到
            //取回一筆資料
            $memberdatarow = $memberdata->fetchAll(PDO::FETCH_ASSOC);

            for ($j = 0; $j < count($memberdatarow); $j++) {

                $l = $j + 1;
                $memberdatarow[$j]["order"] = "Top{$l}";

                // array_push($drinks, $memberdatarow[$j]);
            }
            ;

            array_push($drinks, $memberdatarow);
            // for($k=0,$k < count($drinks);$k++){

            //    $drinks[$k]["id"] = $k;
            // };

            // array_push($drinks, $memberdatarow);
        }
    }

    echo json_encode($drinks);

} catch (PDOException $e) {
    //echo "系統錯誤, 請通知系維護人員~<br>";
    echo "錯誤行號 : " . $e->getLine() . "<br>";
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
