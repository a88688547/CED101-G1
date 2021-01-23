<?php 
 
try {
    require_once("./connect_join_database.php");
    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
    $group_name = $decoded["group_name"];

    

	$sql = "select *
            from group_ord
            WHERE NOW() BETWEEN group_datetime AND deadline_time
            AND group_state = 0 
            AND group_name like '%$group_name%'
            order by deadline_time;";
            
    $grouporddata = $pdo->prepare($sql);
    $grouporddata ->bindValue(":group_name", $group_name);
	$grouporddata->execute();
	$grouporddata = $grouporddata->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($grouporddata);
    
} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";

	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>