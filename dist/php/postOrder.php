<?php
    try{
        $data = json_decode(file_get_contents('php://input'),true);
        require_once "./connect_join_database.php";
        $ord_qua_total = 0;
        $ord_total_price = 0;
        //把團的資料存到資料庫
        for($i=0; $i<count($data); $i++){
            $group_ord_no= $data[$i]['group_ord_no'];
            $mem_no= $data[$i]['mem_no'];
            $drink_no= $data[$i]['drink_no'];
            $one_price= $data[$i]['one_price'];
            $ord_qua= $data[$i]['ord_qua'];
            $total_price= $data[$i]['total_price'];
            $set_info= $data[$i]['set_info'];
            $cup_no= $data[$i]['cup_no'];

            $ord_qua_total = $ord_qua_total + $data[$i]['ord_qua'];
            $ord_total_price = $ord_total_price + $data[$i]['total_price'];

            $sql = "insert into group_order_item(group_ord_no,mem_no,drink_no,one_price,ord_qua,total_price,set_info,cup_no)
            values(:group_ord_no,:mem_no,:drink_no,:one_price,:ord_qua,:total_price,:set_info,:cup_no)";
            $menu = $pdo->prepare($sql);
            $menu->bindValue(":group_ord_no", $group_ord_no);
            $menu->bindValue(":mem_no", $mem_no);
            $menu->bindValue(":drink_no", $drink_no);
            $menu->bindValue(":one_price", $one_price);
            $menu->bindValue(":ord_qua", $ord_qua);
            $menu->bindValue(":total_price", $total_price);
            $menu->bindValue(":set_info", $set_info);
            $menu->bindValue(":cup_no", $cup_no);
            $menu->execute();
        };
        
        //更新團裡現有杯數
        $sql1 ="UPDATE group_ord SET now_cup = now_cup + :now_cup WHERE group_ord_no = :group_ord_no";
        $menu1 = $pdo->prepare($sql1);
        $menu1->bindValue(":now_cup", $ord_qua_total);
        $menu1->bindValue(":group_ord_no", $group_ord_no);
        $menu1->execute();

        //更新團裡現有杯數
        $sql2 ="UPDATE group_ord SET group_ord_price = group_ord_price + :group_ord_price WHERE group_ord_no = :group_ord_no";
        $menu2 = $pdo->prepare($sql2);
        $menu2->bindValue(":group_ord_price", $ord_total_price);
        $menu2->bindValue(":group_ord_no", $group_ord_no);
        $menu2->execute();

                //新增團的參加者
                $sql3 ="INSERT INTO participants(mem_no,group_ord_no)
                VALUES (:mem_no,:group_ord_no)";
                $menu3 = $pdo->prepare($sql3);
                $menu3->bindValue(":mem_no", $mem_no);
                $menu3->bindValue(":group_ord_no", $group_ord_no);
                $menu3->execute();
    }
    catch (PDOException $e) {
        //echo "系統錯誤, 請通知系維護人員~<br>";
        echo "錯誤行號 : " . $e->getLine() . "<br>";
        echo "錯誤原因 : " . $e->getMessage() . "<br>";
    }
    
?>