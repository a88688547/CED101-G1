<?php
try {

	require_once("./php/connect_join_database.php");


// 建立個人訂單
$sql = "INSERT INTO personal_order 
(mem_no,
dis_count,
cou_discount,
cou_no,
ord_price,
ord_time,
adress,
note,
phone,
ord_price_1,
ord_price_2,
total_cup)

VALUES
(1,
:cup_dis,
:cou_dis,
:couname,
:totalprice,
NOW(),
:info_address,
:info_note,
:info_phone,
:discuptotal,
:discoutotal,
:totalcup)";


$orderdata = $pdo->prepare($sql);
$orderdata->bindValue(":cup_dis", $_POST["cup_dis"]);
$orderdata->bindValue(":cou_dis", $_POST["cou_dis"]);
$orderdata->bindValue(":couname", $_POST["couname"]);
$orderdata->bindValue(":totalprice", $_POST["totalprice"]);
$orderdata->bindValue(":info_address", $_POST["info_address"]);
$orderdata->bindValue(":info_note", $_POST["info_note"]);
$orderdata->bindValue(":info_phone", $_POST["info_phone"]);
$orderdata->bindValue(":discuptotal", $_POST["discuptotal"]);
$orderdata->bindValue(":discoutotal", $_POST["discoutotal"]);
$orderdata->bindValue(":totalcup", $_POST["totalcup"]);

$orderdata->execute();


// 找出最新建立的個人訂單編號
$sql="select per_ord_no from personal_order where mem_no=1 order by per_ord_no desc limit 1";

$coupondata = $pdo->prepare($sql);
$coupondata->execute();

$orderno=$coupondata->fetch(PDO::FETCH_ASSOC);

$orderno=$orderno["per_ord_no"];




// 訂購的飲料

// 取得回傳的飲料list(陣列資料)
$drinklist=$_POST["drinklist"];


$j=count($drinklist["title"]);

for( $i=0 ; $i<$j ;$i++){
	
	$title=$drinklist["title"][$i];
	$size=$drinklist["size"][$i];
	$cup=$drinklist["cup"][$i];
	$price=$drinklist["price"][$i];
	$listset=$drinklist["set"][$i];
	$drinkno=$drinklist["drinkno"][$i];
	
	$sql2="INSERT INTO personal_order_list
			(
			per_ord_no,
			drink_no,
			cup_no,
			set_info,
			price,
			ord_list_qua,
			total_price
			)
			VALUES
			(
			:orderno,
			:drinkno,
			:size,
			:listset,
			:price,
			:cup,
			:total_price
			)
			";

$list = $pdo->prepare($sql2);
$list->bindValue(":orderno", $orderno);
$list->bindValue(":drinkno", $drinkno);
$list->bindValue(":size", $size);
$list->bindValue(":listset",$listset);
$list->bindValue(":price", $price);
$list->bindValue(":cup", $cup);
$list->bindValue(":total_price", $price*$cup);
$list->execute();
	
};

$url  ='orderDoneP.html';


echo "<script language ='javascript' type ='text/javascript'> window.location.href = '$url' </script>";  


}
catch(PDOException $e){
	echo "系統錯誤, 請通知系維護人員~<br>";
	echo "錯誤行號 : " . $e->getLine() . "<br>";
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
?>