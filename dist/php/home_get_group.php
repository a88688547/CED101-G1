<?php
try {
    require_once "./connect_join_database.php";

    // $content = trim(file_get_contents("php://input"));
    // $decoded = json_decode($content, true);

    // $mem_no = $decoded["mem_no"];

    $sql = "select *
            from group_ord
            WHERE NOW() BETWEEN group_datetime AND deadline_time
			AND group_state = 0
            order by deadline_time
            LIMIT 4";
    // $memberdata = $pdo->query($sql);
    $memberdata = $pdo->prepare($sql);
    // $memberdata->bindValue(":mem_no", $mem_no);
    $memberdata->execute();

    if ($memberdata->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo json_encode("{}");

    } else { //找得到
        //取回一筆資料
        $memberdatarow = $memberdata->fetchAll(PDO::FETCH_ASSOC);

        for ($i = 0; $i < count($memberdatarow); $i++) {
            if ($memberdatarow[$i]["goal_cup"] == 20) {
                $memberdatarow[$i]["img"] = "./Images/coupon/index/10off_frontpage.jpg";
            } else if ($memberdatarow[$i]["goal_cup"] == 30) {
                $memberdatarow[$i]["img"] = "./Images/coupon/index/20off_frontpage.jpg";
            } else if ($memberdatarow[$i]["goal_cup"] == 40) {
                $memberdatarow[$i]["img"] = "./Images/coupon/index/30off_frontpage.jpg";
            } else if ($memberdatarow[$i]["goal_cup"] == 50) {
                $memberdatarow[$i]["img"] = "./Images/coupon/index/40off_frontpage.jpg";
            } else if ($memberdatarow[$i]["goal_cup"] < 20) {
                $memberdatarow[$i]["img"] = "./Images/coupon/index/0off_frontpage.jpg";
            }
            ;

            if ($memberdatarow[$i]["now_cup"] > $memberdatarow[$i]["goal_cup"]) {
                $memberdatarow[$i]["count"] = "已達標";
                // $memberdatarow[$i]["count"] = 0;

            } else {

                if ($memberdatarow[$i]["goal_cup"] == 10) {
                    // $count = $memberdatarow[$i]["goal_cup"] - 10 - $memberdatarow[$i]["now_cup"];
                    $memberdatarow[$i]["count"] = "無目標";
                    // $memberdatarow[$i]["count"] = echo "<p>無目標</p>";

                    // $memberdatarow[$i]["count"] = 0;

                } else if() {
                    $count = $memberdatarow[$i]["goal_cup"] - $memberdatarow[$i]["now_cup"];
                    $memberdatarow[$i]["count"] = $count;
                    // $memberdatarow[$i]["count"] = 0;

                }
                ;
            }
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
