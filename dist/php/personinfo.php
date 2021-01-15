<?php 
 header("Access-Control-Allow-Origin: *");
try {
	require_once("./connect_join_database.php");
	$sql = "select *
            from coupon
            WHERE mem_no=1 AND cou_status=0";
            
	$coupondata = $pdo->prepare($sql);
    //待會員登入資料
    // $coupondata->bindValue(":mem_no", $mem_no);
	$coupondata->execute();
	
    if ($coupondata->rowCount() == 0) { //找不到
        //傳回空的JSON字串
        echo "{}";

    } else { //找得到
        //取回一筆資料

        $coupondataRow = $coupondata->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($coupondataRow);


         

    }
    
} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";

	// echo "系統錯誤, 請通知系統維護人員<br>";
}
?>

