<?php
    try {
        require_once "./connect_join_database.php";

        $content = trim(file_get_contents("php://input"));
        $decoded = json_decode($content, true);
        
        $mem_email = $decoded["mem_email"];
        $mem_psw = $decoded["mem_psw"];

        $sql = "select * 
                from member 
                where mem_email = :mem_email and mem_psw = :mem_psw";
    
        $member = $pdo->prepare($sql);
        $member->bindValue(":mem_email", $mem_email);
        $member->bindValue(":mem_psw", $mem_psw);
        $member->execute();

        // $memRow = $member->fetch(PDO::FETCH_ASSOC);

       
        if($member->rowCount() == 0 ){//找不到
            echo json_encode('查無此帳號');
        }else{
            $memRow = $member->fetch(PDO::FETCH_ASSOC);
            if($memRow["mem_status"] == 0){ //stop
                echo  json_encode('0');
            }else{
                 //登入成功,將登入者的資料寫入session
                session_start();
                $_SESSION["mem_no"] = $memRow["mem_no"];
                $_SESSION["mem_name"] = $memRow["mem_name"];
                $_SESSION["mem_email"] = $memRow["mem_email"];
                $_SESSION["mem_status"] = $memRow["mem_status"];
                $_SESSION["mem_phone"] = $memRow["mem_phone"];
                $_SESSION["tea_vote"] = $memRow["tea_vote"];
                $_SESSION["milk_vote"] = $memRow["milk_vote"];
                $_SESSION["fruit_vote"] = $memRow["fruit_vote"];
                $_SESSION["mem_img"] = $memRow["mem_img"];
                
                echo json_encode($memRow);
            }
           
           
        }

    } catch (PDOException $e) {
        echo "系統錯誤, 請通知系維護人員~<br>";
    }
?>