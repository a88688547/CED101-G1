<?php
    try{
        require_once "./connect_join_database.php";

        $content = trim(file_get_contents("php://input"));
        $decoded = json_decode($content, true);

        @$email = $decoded['account'];
        @$password = $decoded['password'];
        @$name = $decoded['name'];
        @$phone = $decoded['phone'];
        
        // $password=md5($password);
        // (mem_email,mem_psw,mem_name,mem_status,mem_phone)

        $sql = "INSERT INTO `member` (`mem_no`, `mem_email`, `mem_psw`, `mem_name`, `mem_status`, `mem_phone`, `tea_vote`, `milk_vote`, `fruit_vote`) 
        VALUES(NULL, :mem_email, :mem_psw, :mem_name, '1', :mem_phone, NULL, NULL, NULL)";       

        $register = $pdo->prepare($sql);
        $register->bindValue(":mem_email",$email);
        $register->bindValue(":mem_psw",$password);
        $register->bindValue(":mem_name",$name);
        $register->bindValue(":mem_phone",$phone);
        $register->execute();

        echo json_encode("送出成功");

    } catch (PDOException $e) {
        echo "系統錯誤, 請通知系維護人員~<br>";
        echo "錯誤行號 : " . $e->getLine() . "<br>";
        echo "錯誤原因 : " . $e->getMessage() . "<br>";
    }
?>