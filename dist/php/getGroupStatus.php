<?php
    try{
        // $data = json_decode(file_get_contents('php://input'),true);
        require_once "./connect_join_database.php";
        $sql = "SELECT group_state
        from group_ord 
        where group_ord_no = :group_ord_no";

        $group = $pdo->prepare($sql);
        $group->bindValue(":group_ord_no", $_GET["group_ord_no"]);
        $group->execute();
        if ($group->rowCount() == 0){
            //傳回空的JSON字串
            echo "{}";
        }else{ //找得到
            //取回一筆資料
            $groupRow = $group->fetch(PDO::FETCH_ASSOC);

            //送出json字串
            echo json_encode($groupRow);
            // print_r($menuRow);

        }	
    }
    catch (PDOException $e) {
        //echo "系統錯誤, 請通知系維護人員~<br>";
        echo "錯誤行號 : " . $e->getLine() . "<br>";
        echo "錯誤原因 : " . $e->getMessage() . "<br>";
    }
    
?>