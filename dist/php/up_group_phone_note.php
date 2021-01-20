<?php
try{
   
    require_once "./connect_join_database.php";
    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
    // --------------------
    $group_ord_no = $decoded["group_ord_no"];
    $group_ord_phone = $decoded["group_ord_phone"];
    $note = $decoded["note"];
    $group_ord_price = $decoded["group_ord_price"];
    $group_ord_price_1 = $decoded["group_ord_price_1"];
    $group_ord_price_2 = $decoded["group_ord_price_2"];
   
   if($decoded["cou_no"] == ""){
    $cou_no = null;
   }else{
    $cou_no = $decoded["cou_no"];
   };
   
   

    $sql = "update group_ord 
            set group_ord_phone = :group_ord_phone,
            note = :note,
            group_ord_price = :group_ord_price,
            group_ord_price_1 = :group_ord_price_1,
            group_ord_price_2 = :group_ord_price_2,
            cou_no = :cou_no,
            group_state = '2'
            where group_ord_no = :group_ord_no";

    $group_ord_data = $pdo->prepare($sql);
    $group_ord_data->bindValue(":group_ord_no", $group_ord_no);
    $group_ord_data->bindValue(":group_ord_phone", $group_ord_phone);
    $group_ord_data->bindValue(":note", $note);
    $group_ord_data->bindValue(":group_ord_price", $group_ord_price);
    $group_ord_data->bindValue(":group_ord_price_1", $group_ord_price_1);
    $group_ord_data->bindValue(":group_ord_price_2", $group_ord_price_2);
    $group_ord_data->bindValue(":cou_no", $cou_no);

    $group_ord_data->execute();

    // ------修改優惠卷編號-----

    $sql1 ="UPDATE coupon SET cou_status = '1' WHERE cou_no = :cou_no";
    $group_ord_data1 = $pdo->prepare($sql1);
    $group_ord_data1 ->bindValue(":cou_no", $cou_no);
    $group_ord_data1->execute();
    

    echo "修改成功~!!";
    
    

}
catch (PDOException $e) {
    //echo "系統錯誤, 請通知系維護人員~<br>";
    echo "錯誤行號 : " . $e->getLine() . "<br>";
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
?>