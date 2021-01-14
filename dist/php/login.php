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
        // echo $sql;

        if($member->rowCount() == 0 ){//找不到
            echo json_encode('查無此帳號');
        }else{
            $memRow = $member->fetch(PDO::FETCH_ASSOC);
            //登入成功,將登入者的資料寫入session
            session_start();
            $_SESSION["memNo"] = $memRow["mem_no"];
            $_SESSION["memPsw"] = $memRow["mem_psw"];
            $_SESSION["memName"] = $memRow["mem_name"];
            $_SESSION["email"] = $memRow["mem_email"];
            $_SESSION["memStatus"] = $memRow["mem_status"];
            $_SESSION["memPhone"] = $memRow["mem_phone"];
            $_SESSION["teaVote"] = $memRow["tea_vote"];
            $_SESSION["milkVote"] = $memRow["milk_vote"];
            $_SESSION["fruitVote"] = $memRow["fruit_vote"];
            $_SESSION["memImg"] = $memRow["mem_img"];
            // echo "登入成功~!!";
            
            echo json_encode($memRow);
            // $result = true;
        }

    } catch (PDOException $e) {
        echo "系統錯誤, 請通知系維護人員~<br>";
    }
?>