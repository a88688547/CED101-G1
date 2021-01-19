<?php
try {
	require_once "./connect_join_database.php";
	$content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    $group_ord_item_no = $decoded["group_ord_item_no"];
    $group_ord_no = $decoded["group_ord_no"];
    $ord_qua = $decoded["ord_qua"];

	$sql = "delete  
	from group_order_item 
    where group_ord_no = :group_ord_no
    and group_ord_item_no = :group_ord_item_no";
    
	$group_ord_item_no_row = $pdo->prepare($sql);
    $group_ord_item_no_row ->bindValue(":group_ord_item_no", $group_ord_item_no);
    $group_ord_item_no_row ->bindValue(":group_ord_no", $group_ord_no);
	$group_ord_item_no_row->execute();

    // $group_ord_item_no = $group_ord_item_no->fetch(PDO::FETCH_ASSOC);
    $sql1 ="UPDATE group_ord SET now_cup = now_cup - :ord_qua WHERE group_ord_no = :group_ord_no";
    $group_ord_item_no_row1 = $pdo->prepare($sql1);
    $group_ord_item_no_row1 ->bindValue(":group_ord_no", $group_ord_no);
    $group_ord_item_no_row1 ->bindValue(":ord_qua", $ord_qua);
    $group_ord_item_no_row1->execute();
    

    echo "修改成功~!!";

} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
//   echo "系統錯誤, 請通知系統維護人員<br>";
  
}
?>
