<?php
    try{
        require_once "./connect_join_database.php";
        $content = trim(file_get_contents("php://input"));
        $data = json_decode($content, true);
        $mem_no = $data['mem_no'];
        $vote_count_now= $data['vote_count_now'];
        $drink_no= $data['drink_no'];
        $vote_time = $data['vote_time'];

        if($drink_no == 1){
            $sql = "update member 
                    set milk_vote = :vote_time
                    where mem_no = :mem_no";
    
            $votetime = $pdo->prepare($sql);
            $votetime->bindValue(":mem_no", $mem_no);
            $votetime->bindValue(":vote_time",  $vote_time);
            $votetime->execute();
            echo json_encode("送出成功");
        }
        if($drink_no == 2){
            $sql = "update member 
                    set tea_vote = :vote_time 
                    where mem_no = :mem_no";
    
            $votetime = $pdo->prepare($sql);
            $votetime->bindValue(":mem_no", $mem_no);
            $votetime->bindValue(":vote_time",  $vote_time);
            $votetime->execute();
            echo json_encode("送出成功");
        }
        if($drink_no == 3){
            $sql = "update member 
                    set fruit_vote = :vote_time 
                    where mem_no = :mem_no";
    
            $votetime = $pdo->prepare($sql);
            $votetime->bindValue(":mem_no", $mem_no);
            $votetime->bindValue(":vote_time",  $vote_time);
            $votetime->execute();
            echo json_encode("送出成功");
        }

        $sql = "update drink 
        set vote_count_now = :vote_count_now
        where drink_no = :drink_no";

        $drinks = $pdo->prepare($sql);
        $drinks->bindValue(":vote_count_now", $vote_count_now);
        $drinks->bindValue(":drink_no", $drink_no);

        $drinks->execute();

        echo json_encode("送出成功");


    }
    catch (PDOException $e) {
        //echo "系統錯誤, 請通知系維護人員~<br>";
        echo "錯誤行號 : " . $e->getLine() . "<br>";
        echo "錯誤原因 : " . $e->getMessage() . "<br>";
    }
    
?>