<?php

try {

	require_once("./php/connect_join_database.php");

if($_POST["cou_no"] === ""){

	$sql = "INSERT INTO personal_order 
(mem_no,
dis_count,
cou_discount,
ord_price,
ord_time,
adress,
note,
phone,
ord_price_1,
ord_price_2,
total_cup,
cou_no
)

VALUES
(:mem_no,
:cup_dis,
1,
:totalprice,
NOW(),
:info_address,
:info_note,
:info_phone,
:discuptotal,
:discoutotal,
:totalcup,
NULL
)";


$orderdata = $pdo->prepare($sql);
$orderdata->bindValue(":mem_no", $_POST["mem_no"]);
$orderdata->bindValue(":cup_dis", $_POST["cup_dis"]);
// $orderdata->bindValue(":cou_discount", $_POST["cou_discount"]);
$orderdata->bindValue(":totalprice", $_POST["totalprice"]);
$orderdata->bindValue(":info_address", $_POST["info_address"]);
$orderdata->bindValue(":info_note", $_POST["info_note"]);
$orderdata->bindValue(":info_phone", $_POST["info_phone"]);
$orderdata->bindValue(":discuptotal", $_POST["discuptotal"]);
$orderdata->bindValue(":discoutotal", $_POST["discoutotal"]);
$orderdata->bindValue(":totalcup", $_POST["totalcup"]);
// $orderdata->bindValue(":cou_no", $_POST["cou_no"]);

$orderdata->execute();
}

else{
	// 建立個人訂單
$sql = "INSERT INTO personal_order 
(mem_no,
dis_count,
cou_discount,
ord_price,
ord_time,
adress,
note,
phone,
ord_price_1,
ord_price_2,
total_cup,
cou_no)

VALUES
(:mem_no,
:cup_dis,
:cou_discount,
:totalprice,
NOW(),
:info_address,
:info_note,
:info_phone,
:discuptotal,
:discoutotal,
:totalcup,
:cou_no)";


$orderdata = $pdo->prepare($sql);
$orderdata->bindValue(":mem_no", $_POST["mem_no"]);
$orderdata->bindValue(":cup_dis", $_POST["cup_dis"]);
$orderdata->bindValue(":cou_discount", $_POST["cou_discount"]);
$orderdata->bindValue(":totalprice", $_POST["totalprice"]);
$orderdata->bindValue(":info_address", $_POST["info_address"]);
$orderdata->bindValue(":info_note", $_POST["info_note"]);
$orderdata->bindValue(":info_phone", $_POST["info_phone"]);
$orderdata->bindValue(":discuptotal", $_POST["discuptotal"]);
$orderdata->bindValue(":discoutotal", $_POST["discoutotal"]);
$orderdata->bindValue(":totalcup", $_POST["totalcup"]);
$orderdata->bindValue(":cou_no", $_POST["cou_no"]);

$orderdata->execute();


$sql="UPDATE coupon SET cou_status = '1' WHERE cou_no =:cou_no";

$orderdata = $pdo->prepare($sql);
$orderdata->bindValue(":cou_no", $_POST["cou_no"]);
$orderdata->execute();

}

// 找出最新建立的個人訂單編號
$sql="SELECT per_ord_no FROM personal_order WHERE mem_no=:mem_no ORDER BY per_ord_no DESC LIMIT 1";

$orderdata = $pdo->prepare($sql);
$orderdata->bindValue(":mem_no", $_POST["mem_no"]);

$orderdata->execute();

$orderno=$orderdata->fetch(PDO::FETCH_ASSOC);

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

// echo $orderno;

$url="orderDoneP.html?per_ord_no=$orderno";


echo "<script language ='javascript' type ='text/javascript'> window.location.href = '$url' </script>";  


}
catch(PDOException $e){
	echo "系統錯誤, 請通知系維護人員~<br>";
	echo "錯誤行號 : " . $e->getLine() . "<br>";
    echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
?>