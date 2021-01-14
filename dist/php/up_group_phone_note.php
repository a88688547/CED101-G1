<?php
try{
   
    require_once "./connect_join_database.php";
    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
    // --------------------
   
    $group_ord_no = $decoded["group_ord_no"];
    $group_ord_phone = $decoded["group_ord_phone"];
    $note = $decoded["note"];

    $sql = "update group_ord 
            set group_ord_phone = :group_ord_phone,
            note = :note,
            group_state = 1
            where group_ord_no = :group_ord_no";

    $group_ord_data = $pdo->prepare($sql);
    $group_ord_data->bindValue(":group_ord_no", $group_ord_no);
    $group_ord_data->bindValue(":group_ord_phone", $group_ord_phone);
    $group_ord_data->bindValue(":note", $note);

    $group_ord_data->execute();
    

}
catch (PDOException $e) {
    //echo "系統錯誤, 請通知系維護人員~<br>";
    echo "錯誤行號 : " . $e->getLine() . "<br>";
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
?>