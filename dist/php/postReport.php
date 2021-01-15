<?php
    try{
        
        require_once "./connect_join_database.php";
        $content = trim(file_get_contents("php://input"));
        $data = json_decode($content, true);
        if($data["msg_or_art"] == "msg"){
            $sql = "INSERT INTO msgreport(mem_no,msg_no,msg_report_reason,msg_report_date) 
            VALUES (:mem_no,:msg_no,:msg_report_reason,:msg_report_date)";
            $msg = $pdo->prepare($sql);
            $msg->bindValue(":mem_no", $data["mem_no"]);
            $msg->bindValue(":msg_no", $data["report_no"]);
            $msg->bindValue(":msg_report_reason", $data["reason"]);
            $msg->bindValue(":msg_report_date", $data["reportTime"]);
            $msg->execute();
        }else{
            $sql = "INSERT INTO articlereport(mem_no,art_no,art_report_reason,art_report_date) 
            VALUES (:mem_no,:art_no,:art_report_reason,:art_report_date)";
            $art = $pdo->prepare($sql);
            $art->bindValue(":mem_no", $data["mem_no"]);
            $art->bindValue(":art_no", $data["report_no"]);
            $art->bindValue(":art_report_reason", $data["reason"]);
            $art->bindValue(":art_report_date", $data["reportTime"]);
            $art->execute();
        }

    
        

        // echo json_encode($data);
    }
    catch (PDOException $e) {
        //echo "系統錯誤, 請通知系維護人員~<br>";
        echo "錯誤行號 : " . $e->getLine() . "<br>";
        echo "錯誤原因 : " . $e->getMessage() . "<br>";
    }
    
?>