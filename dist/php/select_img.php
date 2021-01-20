<?php
try {
	require_once "./connect_join_database.php";
	$content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
	$mem_no = $decoded["mem_no"];

	$sql = "select * 
	from member
    where 
    mem_no = :mem_no;";
    
	$memberImg = $pdo->prepare($sql);
    $memberImg ->bindValue(":mem_no", $mem_no);
	$memberImg->execute();

	$memberImg = $memberImg->fetchAll(PDO::FETCH_ASSOC);

	echo json_encode($memberImg);

} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
//   echo "系統錯誤, 請通知系統維護人員<br>";
  
}
?>
