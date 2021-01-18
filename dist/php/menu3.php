<?php
    try{
        session_start();
        require_once "./connect_join_database.php";
        $content = trim(file_get_contents("php://input"));
        $data = json_decode($content, true);

        $mem_no = $data['mem_no'];
        $vote_count_now= $data['vote_count_now'];
        $drink_no= $data['drink_no'];
        $vote_time = $data['vote_time'];
        $dirnk_type_no = $data['dirnk_type_no'];
        
        $sql = "update drink 
        set vote_count_now = :vote_count_now
        where drink_no = :drink_no";

        $drinks = $pdo->prepare($sql);
        $drinks->bindValue(":vote_count_now", $vote_count_now);
        $drinks->bindValue(":drink_no", $drink_no);

        $drinks->execute();

        echo json_encode($drink_no);

        if($dirnk_type_no == 1){
            $_SESSION["fruit_vote"] = $vote_time;
            $sql = "update member 
                    set milk_vote = :vote_time
                    where mem_no = :mem_no";
    
            $votetime = $pdo->prepare($sql);
            $votetime->bindValue(":mem_no", $mem_no);
            $votetime->bindValue(":vote_time",  $vote_time);
            $_SESSION["milk_vote"] = $vote_time;
            $votetime->execute();
            echo json_encode("送出成功");
        }
        if($dirnk_type_no == 2){
            $_SESSION["tea_vote"] = $vote_time;
            $sql = "update member 
                    set tea_vote = :vote_time 
                    where mem_no = :mem_no";
    
            $votetime = $pdo->prepare($sql);
            $votetime->bindValue(":mem_no", $mem_no);
            $votetime->bindValue(":vote_time",  $vote_time);
            $votetime->execute();
            echo json_encode("送出成功");
        }
        if($dirnk_type_no == 3){
            $_SESSION["fruit_vote"] = $vote_time;
            $sql = "update member 
                    set fruit_vote = :vote_time 
                    where mem_no = :mem_no";
    
            $votetime = $pdo->prepare($sql);
            $votetime->bindValue(":mem_no", $mem_no);
            $votetime->bindValue(":vote_time",  $vote_time);              
            $votetime->execute();
            echo json_encode("送出成功");
        }


    }
    catch (PDOException $e) {
        //echo "系統錯誤, 請通知系維護人員~<br>";
        echo "錯誤行號 : " . $e->getLine() . "<br>";
        echo "錯誤原因 : " . $e->getMessage() . "<br>";
    }
    
?>