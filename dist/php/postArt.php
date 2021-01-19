<?php
try {
    require_once "./connect_join_database.php";

    if ($_FILES["upFile"]["error"] == UPLOAD_ERR_OK) {
        // 設定要存照片的路徑(以php檔案為出發點)
        $dir = "../Images/article";
        //取出檔案副檔名(.PNG ...等等)
        $fileInfoArr = pathinfo($_FILES["upFile"]["name"]);
        // 創造不會重複的亂碼
        $imageNo = uniqid();
        //決定檔案名稱
        $fileName = "{$imageNo}.{$fileInfoArr["extension"]}"; //312543544.gif
        //先檢查images資料夾存不存在
        if (file_exists($dir) == false) {
            mkdir($dir, 0777, true); //make directory
        }
        //將檔案copy到要放的路徑
        $from = $_FILES["upFile"]["tmp_name"];
        $to = "{$dir}/$fileName";
        if (copy($from, $to) === true) {

            $sql = "INSERT INTO art(mem_no,art_name,art_intro,art_img,art_time)
            VALUES (:mem_no,:art_name,:art_intro,:art_img,:art_time)";
            $products = $pdo->prepare($sql);
            $products->bindValue(":mem_no", $_POST["mem_no"]);
            $products->bindValue(":art_name", $_POST["art_name"]);
            $products->bindValue(":art_intro", $_POST["art_intro"]);
            $products->bindValue(":art_time", $_POST["art_time"]);
            $products->bindValue(":art_img", "./Images/article/{$fileName}");
            $products->execute();

        } 
    } else {
        // echo "錯誤代碼 : {$_FILES["upFile"]["error"]} <br>";
        // echo "新增失敗<br>";
    }

    echo "照片上傳成功~!!";

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
