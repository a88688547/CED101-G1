<?php
try{
    // $data = json_decode(file_get_contents('php://input'),true);
    require_once "./connect_join_database.php";
    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
    // --------------------
    // $id = $decoded["group_name"];
    // echo json_encode($id);
    $head_mem_no = $decoded["head_mem_no"];
    $group_name = $decoded["group_name"];
    $group_datetime = $decoded["group_datetime"];
    $deadline_time = $decoded["deadline_time"];
    $arrive_time = $decoded["arrive_time"];
    $group_adress = $decoded["group_adress"];
    $goal_cup = $decoded["goal_cup"];

    $sql = "insert into group_ord (head_mem_no,group_name,group_datetime,deadline_time,arrive_time
    ,group_adress,goal_cup) values (:head_mem_no,:group_name,:group_datetime,:deadline_time,:arrive_time
    ,:group_adress,:goal_cup)";

    $group_ord_data = $pdo->prepare($sql);
    $group_ord_data->bindValue(":head_mem_no", $head_mem_no);
    $group_ord_data->bindValue(":group_name", $group_name);
    $group_ord_data->bindValue(":group_datetime", $group_datetime);
    $group_ord_data->bindValue(":deadline_time", $deadline_time);
    $group_ord_data->bindValue(":arrive_time", $arrive_time);
    $group_ord_data->bindValue(":group_adress", $group_adress);
    $group_ord_data->bindValue(":goal_cup", $goal_cup);
    $group_ord_data->execute();
    
    $GroupNo = $pdo->lastInsertId();
    echo json_encode($GroupNo);

}
catch (PDOException $e) {
    //echo "系統錯誤, 請通知系維護人員~<br>";
    echo "錯誤行號 : " . $e->getLine() . "<br>";
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
?>