<?php
    try{
        require_once "./connect_join_database.php";
        $content = trim(file_get_contents("php://input"));
        $data = json_decode($content, true);

        $vote_count_now= $data['vote_count_now'];
        $drink_no= $data['drink_no'];


        $sql = "update drink 
                set vote_count_now = :vote_count_now
                where drink_no = :drink_no";

        $drinks = $pdo->prepare($sql);
        $drinks->bindValue(":vote_count_now", $vote_count_now);
        $drinks->bindValue(":drink_no", $drink_no);

        $drinks->execute();

        echo json_encode("送出成功");


        if($drink_no == 1){
            $sql = "update member 
                    set milk_vote = milk_vote + 1 
                    where member_no = 1";
    
            $drinks = $pdo->prepare($sql);
            // $drinks->bindValue(":member_no", $member_no);
            // $drinks->bindValue(":drink_no", $drink_no);
            $drinks->execute();
            echo json_encode("送出成功");
        }



    }
    catch (PDOException $e) {
        //echo "系統錯誤, 請通知系維護人員~<br>";
        echo "錯誤行號 : " . $e->getLine() . "<br>";
        echo "錯誤原因 : " . $e->getMessage() . "<br>";
    }
    
?>