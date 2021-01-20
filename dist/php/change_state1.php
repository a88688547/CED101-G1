<?php
try {
	require_once "./connect_join_database.php";
	$content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
    $group_ord_no = $decoded["group_ord_no"];
    

    // $group_ord_item_no = $group_ord_item_no->fetch(PDO::FETCH_ASSOC);
    $sql ="UPDATE group_ord SET group_state = '1' WHERE group_ord_no = :group_ord_no";
    $group_ord_row = $pdo->prepare($sql);
    $group_ord_row ->bindValue(":group_ord_no", $group_ord_no);
    $group_ord_row->execute();
    

    echo "修改成功~!!";

} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
//   echo "系統錯誤, 請通知系統維護人員<br>";
  
}
?>
