<?php
    try{
        $data = json_decode(file_get_contents('php://input'),true);
        require_once "./connect_join_database.php";
        $sql = "INSERT INTO artmsg(art_no,mem_no,msg_time,msg_text) VALUES(:art_no,:mem_no,:msg_time,:msg_text)";
        $msg = $pdo->prepare($sql);
        $msg->bindValue(":msg_text", $data["msg_text"]);
        $msg->bindValue(":art_no", $data["art_no"]);
        $msg->bindValue(":msg_time", $data["msg_time"]);
        $msg->bindValue(":mem_no", $data["mem_no"]);
        $msg->execute();

        $sql1 = "UPDATE art SET art_msg_count = (SELECT COUNT(*) FROM artmsg WHERE art_no = :art_no AND msg_status = 1) WHERE art_no = :art_no";
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