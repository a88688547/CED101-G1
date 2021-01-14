<?php
    try{
        
        require_once "./connect_join_database.php";
        $content = trim(file_get_contents("php://input"));
        $data = json_decode($content, true);

        $art_no = $data["art_no"];
        $mem_no = $data["mem_no"];
        $everClickLike = $data["everClickLike"];
        if($everClickLike == true){
            $sql = "DELETE FROM artlike WHERE art_no = :art_no";
            $art = $pdo->prepare($sql);
            $art->bindValue(":art_no", $art_no);
            $art->execute();

            $sql1 = "UPDATE art SET art_like_count = art_like_count - 1 WHERE art_no = :art_no";
            $art1 = $pdo->prepare($sql1);
            $art1->bindValue(":art_no", $art_no);
            $art1->execute();
        }else{
            $sql = "INSERT INTO artlike(art_no,mem_no) VALUES(:art_no,:mem_no)";
            $art = $pdo->prepare($sql);
            $art->bindValue(":mem_no", $mem_no);
            $art->bindValue(":art_no", $art_no);
            $art->execute();

            $sql1 = "UPDATE art SET art_like_count = art_like_count + 1 WHERE art_no = :art_no";
            $art1 = $pdo->prepare($sql1);
            $art1->bindValue(":art_no", $art_no);
            $art1->execute();
        };
        
    
        

        // echo json_encode($data);
    }
    catch (PDOException $e) {
        //echo "系統錯誤, 請通知系維護人員~<br>";
        echo "錯誤行號 : " . $e->getLine() . "<br>";
        echo "錯誤原因 : " . $e->getMessage() . "<br>";
    }
    
?>