<?php
try {
	require_once "./connect_join_database.php";
	$content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

	$group_ord_no = $decoded["group_ord_no"];

	$sql = "select
	SUM(total_price) group_ord_total from group_order_item
	where group_ord_no = :group_ord_no";
	$group_ord_total = $pdo->prepare($sql);
    $group_ord_total ->bindValue(":group_ord_no", $group_ord_no);
	$group_ord_total->execute();

	$group_ord_total = $group_ord_total->fetch(PDO::FETCH_ASSOC);

	echo json_encode($group_ord_total);

} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
//   echo "系統錯誤, 請通知系統維護人員<br>";
  
}
?>