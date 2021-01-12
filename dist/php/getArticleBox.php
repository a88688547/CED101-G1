<?php
    try{
        require_once "./connect_join_database.php";
        $sql = "SELECT * FROM art_msg a JOIN member m on a.mem_no = m.mem_no 
        WHERE a.art_no = :art_no AND a.msg_status = 1 ORDER BY a.msg_time";
        $msg = $pdo->prepare($sql);
        $msg->bindValue(":art_no", $_GET["art_no"]);
        $msg->execute();
        if ($msg->rowCount() == 0){
            //傳回空的JSON字串
            echo "{}";
        }else{ //找得到
            //取回一筆資料
            $msgRow = $msg->fetchAll(PDO::FETCH_ASSOC);

            //送出json字串
            echo json_encode($msgRow);
        }	
    }
    catch (PDOException $e) {
        //echo "系統錯誤, 請通知系維護人員~<br>";
        echo "錯誤行號 : " . $e->getLine() . "<br>";
        echo "錯誤原因 : " . $e->getMessage() . "<br>";
    }
    
?>