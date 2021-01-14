<?php
    try{
        require_once "./connect_join_database.php";
        $sql = "SELECT * FROM artlike WHERE mem_no = :mem_no AND art_no = :art_no";
        $art = $pdo->prepare($sql);
        $art->bindValue(":mem_no", $_GET["mem_no"]);
        $art->bindValue(":art_no", $_GET["art_no"]);
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