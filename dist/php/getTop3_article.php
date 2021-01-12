<?php
    try{
        require_once "./connect_join_database.php";
        $sql = "SELECT a.art_no,a.mem_no,a.art_name,a.art_intro,a.art_img,a.art_time,a.art_status,a.art_like_count,a.art_look_count,a.art_msg_count,m.mem_name,m.mem_img 
        FROM art a JOIN member m on a.mem_no = m.mem_no Where a.art_status = 1 ORDER BY a.art_like_count DESC LIMIT 3";
        $art = $pdo->prepare($sql);
        $art->execute();
        if ($art->rowCount() == 0){
            //傳回空的JSON字串
            echo "{}";
        }else{ //找得到
            //取回一筆資料
            $artRow = $art->fetchAll(PDO::FETCH_ASSOC);

            //送出json字串
            echo json_encode($artRow);
        }	
    }
    catch (PDOException $e) {
        //echo "系統錯誤, 請通知系維護人員~<br>";
        echo "錯誤行號 : " . $e->getLine() . "<br>";
        echo "錯誤原因 : " . $e->getMessage() . "<br>";
    }
    
?>