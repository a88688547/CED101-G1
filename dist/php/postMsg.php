<?php
    try{
        $data = json_decode(file_get_contents('php://input'),true);
        require_once "./connect_join_database.php";
        $sql = "INSERT INTO art_msg(art_no,mem_no,msg_time,msg_intro) VALUES(:art_no,:mem_no,:msg_time,:msg_intro)";
        $msg = $pdo->prepare($sql);
        $msg->bindValue(":msg_intro", $data["msg_intro"]);
        $msg->bindValue(":art_no", $data["art_no"]);
        $msg->bindValue(":msg_time", $data["msg_time"]);
        $msg->bindValue(":mem_no", $data["mem_no"]);
        $msg->execute();

        $sql1 = "UPDATE art SET art_msg_count = art_msg_count + 1 WHERE art_no = :art_no";
        $msg1 = $pdo->prepare($sql1);
        $msg1->bindValue(":art_no", $data["art_no"]);
        $msg1->execute();
    }
    catch (PDOException $e) {
        //echo "系統錯誤, 請通知系維護人員~<br>";
        echo "錯誤行號 : " . $e->getLine() . "<br>";
        echo "錯誤原因 : " . $e->getMessage() . "<br>";
    }
    
?>