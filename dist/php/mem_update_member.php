<?php
try {

    session_start();
    require_once "./connect_join_database.php";

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
    $mem_no = $decoded["mem_no"];
    $mem_name = $decoded["mem_name"];
    $mem_email = $decoded["mem_email"];

    // 接收舊密碼
    $mem_old_psw = $decoded["mem_old_psw"];
    // 接收新密碼
    $mem_new_psw = $decoded["mem_new_psw"];
    // 判斷如果新密碼為空值
    if ($mem_new_psw == "") {
        $mem_psw = $mem_old_psw;
    } else {
        $mem_psw = $mem_new_psw;
    }
    ;

    $mem_phone = $decoded["mem_phone"];

    $sql = "update member
            set mem_name = :mem_name,mem_email = :mem_email
            ,mem_psw = :mem_psw,mem_phone = :mem_phone
            where mem_no = :mem_no";
    // $grouporddata = $pdo->query($sql);
    $per_ord_data = $pdo->prepare($sql);
    $per_ord_data->bindValue(":mem_no", $mem_no);
    $per_ord_data->bindValue(":mem_name", $mem_name);
    $per_ord_data->bindValue(":mem_email", $mem_email);
    $per_ord_data->bindValue(":mem_psw", $mem_psw);
    $per_ord_data->bindValue(":mem_phone", $mem_phone);
    $per_ord_data->execute();

    $_SESSION["mem_name"] = $mem_name;

    echo "修改成功~!!";
    // if ($per_ord_data->rowCount() == 0) { //找不到
    //     //傳回空的JSON字串
    //     echo "{}";

    // } else { //找得到
    //     //取回一筆資料
    //     $per_ord_datarow = $per_ord_data->fetchAll(PDO::FETCH_ASSOC);

    //     //送出json字串
    //     echo json_encode($per_ord_datarow);
    //     // echo $managerdatarow;
    // }

} catch (PDOException $e) {
    echo "修改失敗~!!";
    // echo "錯誤行號 : " . $e->getLine() . "<br>";
    // echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
