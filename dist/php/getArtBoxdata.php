<?php
    try{
        require_once "./connect_join_database.php";
        $sql = "SELECT art_name,art_intro,art_img,art_time,art_like_count,art_look_count,art_msg_count,
        (SELECT COUNT(*) from artlike WHERE art_no = :art_no AND mem_no = :mem_no) 'isLike',
        mem_name,mem_img
        FROM art a JOIN member m ON a.mem_no = m.mem_no
        WHERE art_no = :art_no AND art_status = 1";
        $msg = $pdo->prepare($sql);
        $msg->bindValue(":art_no", $_GET["art_no"]);
        $msg->bindValue(":mem_no", $_GET["mem_no"]);
        $msg->execute();
        if ($msg->rowCount() == 0){
            //傳回空的JSON字串
            echo "{}";
        }else{ //找得到
            //取回一筆資料
            $msgRow = $msg->fetch(PDO::FETCH_ASSOC);

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