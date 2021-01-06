<?php 
 
try {
	require_once("./connect_join_database.php");
	$sql = "select *
            from group_ord
            WHERE NOW() BETWEEN group_datetime AND deadline_time;";
            
	$grouporddata = $pdo->prepare($sql);
	$grouporddata->execute();
	$grouporddata = $grouporddata->fetchAll(PDO::FETCH_ASSOC);
    // $grouporddata->bindValue(":group_ord_no", $group_ord_no);
    
        
    echo json_encode($grouporddata);
    
} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";

	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>