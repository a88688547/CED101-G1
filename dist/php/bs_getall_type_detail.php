<?php
try {
    require_once "./connect_join_database.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    //撈出單一引類 所有類型 細項
    $drink_no = $decoded["drink_no"];

    $sql1 = "select *
            from drink_set
            where drink_no = :drink_no";
    // $per_ord_data = $pdo->query($sql1);
    $per_ord_data = $pdo->prepare($sql1);
    $per_ord_data->bindValue(":drink_no", $drink_no);
    $per_ord_data->execute();
    if ($per_ord_data->rowCount() == 0) {
        //找不到
        //傳回空的JSON字串
        // echo "{}";

    } else { //找得到

        $per_ord_datarow = $per_ord_data->fetchAll(PDO::FETCH_ASSOC);
        // 先宣告為陣列
        $detail_info = array();
        for ($i = 0; $i < count($per_ord_datarow); $i++) {
            // 將值塞進陣列內，以利之後用 函數尋找 陣列內的值
            array_push($detail_info, $per_ord_datarow[$i]["detail_no"]);
            // $detail_info <-- 此為 該飲料 所有已有的配料設定
        }
    }

    //撈出所有 類型
    $sql = "select *
            from type";
    $typedata = $pdo->query($sql);

    if ($typedata->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        // echo "{}";

    } else if ($per_ord_data->rowCount() != 0) { //找得到
        // echo "{找得到}";

        //當 有任何設定時
        $typedatarow = $typedata->fetchAll(PDO::FETCH_ASSOC);
        for ($i = 0; $i < count($typedatarow); $i++) {
            $sql1 = "select *
                       from detail
                       where type_no = :type_no";
            $typedata1 = $pdo->prepare($sql1);
            $typedata1->bindValue(':type_no', $typedatarow[$i]["type_no"]);
            $typedata1->execute();
            $typedatarow1 = $typedata1->fetchAll(PDO::FETCH_ASSOC);
            $typedatarow[$i]["detail_title_list"] = $typedatarow1;
            //以上利用雙迴圈 將值轉換為三為陣列

            //將 三維陣列內的值叫出來(全部已有的設定)，跟該飲料已有的設定做判斷(是否要打勾)，
            //創造新屬性"ischecked" 將值寫入該類型內，以利前端畫面顯示
            for ($j = 0; $j < count($typedatarow[$i]["detail_title_list"]); $j++) {
                if (in_array($typedatarow[$i]["detail_title_list"][$j]["detail_no"], $detail_info)) {
                    $typedatarow[$i]["detail_title_list"][$j]["ischecked"] = true;
                } else {
                    $typedatarow[$i]["detail_title_list"][$j]["ischecked"] = false;
                }
            }
            ;

        }
        //送出json字串
        echo json_encode($typedatarow);
        // echo $managerdatarow;
    } else if ($per_ord_data->rowCount() == 0) {
        //當 沒有任何設定時
        $typedatarow = $typedata->fetchAll(PDO::FETCH_ASSOC);
        for ($i = 0; $i < count($typedatarow); $i++) {
            $sql1 = "select *
                       from detail
                       where type_no = :type_no";
            $typedata1 = $pdo->prepare($sql1);
            $typedata1->bindValue(':type_no', $typedatarow[$i]["type_no"]);
            $typedata1->execute();
            $typedatarow1 = $typedata1->fetchAll(PDO::FETCH_ASSOC);
            $typedatarow[$i]["detail_title_list"] = $typedatarow1;
            //以上利用雙迴圈 將值轉換為三為陣列

            for ($j = 0; $j < count($typedatarow[$i]["detail_title_list"]); $j++) {
                $typedatarow[$i]["detail_title_list"][$j]["ischecked"] = false;
            }
            ;

        }
        echo json_encode($typedatarow);}
} catch (PDOException $e) {
    echo "系統錯誤, 請通知系維護人員~<br>";
    // echo "錯誤行號 : " . $e->getLine() . "<br>";
    // echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
