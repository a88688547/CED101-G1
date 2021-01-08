<?php
    try{
        require_once "./connect_join_database.php";
        $data = json_decode(file_get_contents('php://input'),true);
        $id = $data["id"];
        $sql = "select *
                from drink where drink_type_no = :drink_type_no";
        $menu = $pdo->prepare($sql);
        $menu->bindValue(':drink_type_no',$id);
        $menu->execute();
        $menuRow = $menu->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($menuRow);
    }
    catch (PDOException $e) {
        //echo "系統錯誤, 請通知系維護人員~<br>";
        echo "錯誤行號 : " . $e->getLine() . "<br>";
        echo "錯誤原因 : " . $e->getMessage() . "<br>";
    }
    
?>