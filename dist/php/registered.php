<?php
    try{
        require_once "./connect_join_database.php";

        $content = trim(file_get_contents("php://input"));
        $decoded = json_decode($content, true);

        $email = $decoded['account'];
        $password = $decoded['password'];
        $name = $decoded['name'];
        $phone = $decoded['phone'];

        $sql = "select * from member where mem_email = :mem_email";

        $rows = $pdo->prepare($sql);
        $rows->bindValue(":mem_email",$email);
        $rows->execute();

        if($rows->rowCount()>0){
            echo json_encode("信箱已被使用過，請重新註冊!");
        }else{//無重複即可註冊

            $sql = "INSERT INTO member ( mem_email, mem_psw, mem_name, mem_phone) 
            VALUES( :mem_email, :mem_psw, :mem_name,  :mem_phone)";       
    
            $register = $pdo->prepare($sql);
            $register->bindValue(":mem_email",$email);
            $register->bindValue(":mem_psw",$password);
            $register->bindValue(":mem_name",$name);
            $register->bindValue(":mem_phone",$phone);
            $register->execute();
    
            echo json_encode("註冊成功");
        }


    } catch (PDOException $e) {
        echo "系統錯誤, 請通知系維護人員~<br>";
        echo "錯誤行號 : " . $e->getLine() . "<br>";
        echo "錯誤原因 : " . $e->getMessage() . "<br>";
    }
?>