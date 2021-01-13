<?php
try {
    require_once "./connect_join_database.php";

    if ($_FILES["upFile"]["error"] == UPLOAD_ERR_OK) {
        //決定檔案名稱
        $fileInfoArr = pathinfo($_FILES["upFile"]["name"]);
        $imageNo = uniqid();
        $fileName = "{$imageNo}.{$fileInfoArr["extension"]}"; //312543544.gif
        //先檢查images資料夾存不存在
        if (file_exists("Images") === false) {
            mkdir("Images");
        }
        //將檔案copy到要放的路徑
        $from = $_FILES["upFile"]["tmp_name"];
        $to = "Images/member/$fileName";
        if (copy($from, $to) === true) {

            $mem_no = $_GET["mem_no"];

            $sql = "update member
                      set mem_img = './images/member/:mem_img'
                      where mem_no = :mem_no";
            $products = $pdo->prepare($sql);
            $products->bindValue(":mem_no", $mem_no);
            $products->bindValue(":mem_img", $fileName);
            $products->execute();
            // echo "新增成功~";
        } else {
            // echo "失敗~";
        }

    } else {
        // echo "錯誤代碼 : {$_FILES["upFile"]["error"]} <br>";
        // echo "新增失敗<br>";
    }

    echo "修改成功~!!";

// echo "['error']: " , $_FILES['upFile']['error'] , "<br>";
    // echo "['name']: " , $_FILES['upFile']['name'] , "<br>";
    // echo "['tmp_name']: " , $_FILES['upFile']['tmp_name'] , "<br>";
    // echo "['type']: " , $_FILES['upFile']['type'] , "<br>";
    // echo "['size']: " , $_FILES['upFile']['size'] , "<br>";
} catch (PDOException $e) {
    echo "修改失敗~!!";
    // echo "錯誤行號 : " . $e->getLine() . "<br>";
    // echo "錯誤原因 : " . $e->getMessage() . "<br>";
}
