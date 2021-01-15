<?php 
 header("Access-Control-Allow-Origin: *");

try {
	require_once("./connect_join_database.php");
	$sql = "select dis_count
            from cup_discount
            WHERE :dis_cup BETWEEN dis_cup AND dis_cup+10 ";
    
	$cupdata = $pdo->prepare($sql);
    $cupdata->bindValue(":dis_cup", $_GET["dis_cup"]);
	$cupdata->execute();
	
    if ($cupdata->rowCount() == 0) { //找不到
        echo '[{"dis_count":"1"}]';

    } 
    else { //找得到
        //取回一筆資料
        $cupdataRow = $cupdata->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($cupdataRow);
       
    }
    
} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";

	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>

