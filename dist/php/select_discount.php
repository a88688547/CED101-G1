<?php
try {
	require_once "./connect_join_database.php";
	$content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
	$cou_no = $decoded["cou_no"];

	$sql = "select * 
	from coupon 
    where 
    cou_no = :cou_no";
	$coupon = $pdo->prepare($sql);
    $coupon ->bindValue(":cou_no", $cou_no);
	$coupon->execute();

	$coupon = $coupon->fetch(PDO::FETCH_ASSOC);

	echo json_encode($coupon);

} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
//   echo "系統錯誤, 請通知系統維護人員<br>";
  
}
?>
