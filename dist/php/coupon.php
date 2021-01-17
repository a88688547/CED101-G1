<?php
    try{
        
        require_once "./connect_join_database.php";
        $content = trim(file_get_contents("php://input"));
        $data = json_decode($content, true);

        $mem_no = $data['mem_no'];
        $cou_code = $data['cou_code'];
        $cou_discount = $data['cou_discount'];

        $sql = "INSERT INTO coupon(mem_no,cou_code,cou_discount) 
        VALUES (:mem_no,:cou_code,:cou_discount)";
        
        $cou = $pdo->prepare($sql);
        $cou->bindValue(":mem_no",  $mem_no);
        $cou->bindValue(":cou_code", $cou_code);
        $cou->bindValue(":cou_discount", $cou_discount);
        $cou->execute();

    
        

        echo json_encode("成功");
    }
    catch (PDOException $e) {
        //echo "系統錯誤, 請通知系維護人員~<br>";
        echo "錯誤行號 : " . $e->getLine() . "<br>";
        echo "錯誤原因 : " . $e->getMessage() . "<br>";
    }
    
?>