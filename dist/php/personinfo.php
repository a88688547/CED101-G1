<?php 

header('Content-Type: application/json; charset=utf-8');

try {
	require_once("./connect_join_database.php");
	$sql = "SELECT *
            FROM coupon
            WHERE mem_no=:memNo AND cou_status=0";

            
	$coupondata = $pdo->prepare($sql);
    $coupondata->bindValue(":memNo", $_POST["memNo"]); 
	$coupondata->execute();
	
    if ($coupondata->rowCount() == 0) { 
        echo "{}";

    } else { 
        $coupondataRow = $coupondata->fetchAll(PDO::FETCH_BOTH);
        echo json_encode($coupondataRow);
    }
    
} catch (PDOException $e) {
	echo "錯誤行號 : " . $e->getLine() . "<br>";
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
?>

