<?php
    try{
        session_start();
        require_once "./connect_join_database.php";
        $sql = "select *
                from drink_type";
        $menu = $pdo->prepare($sql);
        $menu->execute();
        if ($menu->rowCount() == 0){
            //傳回空的JSON字串
            echo "{}";
        }else{ //找得到
            //取回一筆資料
            $menuRow = $menu->fetchAll(PDO::FETCH_ASSOC);

            for($i=0; $i<count($menuRow); $i++){
                $sql1 = "select *
                from drink where drink_type_no=:drink_type_no order by vote_count_now desc
                limit 3;";
                $menu1 = $pdo->prepare($sql1);
                $menu1->bindValue(':drink_type_no',$menuRow[$i]["drink_type_no"]);
                $menu1->execute();
                $menu1Row = $menu1->fetchAll(PDO::FETCH_ASSOC);
                $menuRow[$i]["itemList"] = $menu1Row;
            }
            //送出json字串
            echo json_encode($menuRow);
            // print_r($menuRow);

        }	
    }
    catch (PDOException $e) {
        //echo "系統錯誤, 請通知系維護人員~<br>";
        echo "錯誤行號 : " . $e->getLine() . "<br>";
        echo "錯誤原因 : " . $e->getMessage() . "<br>";
    }
    
?>