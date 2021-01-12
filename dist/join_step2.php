<?php
try {
	require_once("./php/connect_join_database.php");
	$sql = "select * from group_ord where group_ord_no = ?";
	$group_ord = $pdo->prepare($sql);
	$group_ord->bindValue(1, $_GET["group_ord_no"]);
  $group_ord->execute();
  $group_ord = $group_ord->fetch(PDO::FETCH_ASSOC);

  echo json_encode($group_ord);
} catch (PDOException $e) {
	echo "錯誤原因 : ", $e->getMessage(), "<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
  echo "系統錯誤, 請通知系統維護人員<br>";
  
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>2.完成開團</title>
    <script src="./vendors/Vue/vue.js"></script>
    <script src="vendors/jQuery/js/jquery-3.5.1.js"></script>
    <link rel="stylesheet" href="./css/list_data.css" />
    <link rel="stylesheet" href="./css/join_step2.css" />
    <link rel="stylesheet" href="./css/style.css" />
  </head>

  <body>
    <header id="header"><my-header></my-header></header>
    <!-- ==============header================= -->
    
    <div class="w-338" id="app">
      <!-- =====一進來的QR== -->
      <div class="fist_QR">
        <div class="fist_QR_box">
          <h2>分享QR，立馬揪飲</h2>
          <div class="fist_QR_main">
            <img
              src="http://chart.apis.google.com/chart?cht=qr&choe=UTF-8&chs=300x300&chl=`./join_step2.php?group_ord_no=${this.GroupNo}`"
            />
          </div>
          <img src="./Images/cancel.svg" alt="" class="close_btn" />
          <h2>分享網址揪團喝飲料!</h2>
          <div class="QR_link">
            <div class="QR_link_text">https://www.foodomres</div>
            <div class="QR_copy"></div>
          </div>
        </div>
      </div>

      <!-- =====一進來的QR== -->
      <!-- ==============進度條================= -->
      <div class="step_box">
        <ul class="step_ball">
          <li class="on">
            <img src="./Images/join_list/step_1_icon.svg" alt="" />
            <h5>1.建立揪團</h5>
          </li>

          <li>
            <img src="./Images/join_list/step_2_icon.svg" alt="" />
            <h5>2.完成開團</h5>
          </li>

          <li>
            <img src="./Images/join_list/step_3_icon.svg" alt="" />
            <h5>3.結帳資訊</h5>
          </li>

          <li>
            <img src="./Images/join_list/step_4_icon.svg" alt="" />
            <h5>4.訂單明細</h5>
          </li>
        </ul>
      </div>
      <!-- ==============進度條================= -->
      <!-- ==============開團資料================= -->

      <div class="group_data">
        <div class="group_data_row">
          <!-- ===QR==== -->
          <div class="QR_box">
            <div class="QR_main">
              <img
                src="http://chart.apis.google.com/chart?cht=qr&choe=UTF-8&chs=300x300&chl=http://127.0.0.1:5502/dist/menu.html"
              />
            </div>
            <h2>分享網址揪團喝飲料!</h2>
            <div class="QR_link">
              <div class="QR_link_text">https://www.f111111111111oodomres</div>
              <div class="QR_copy"></div>
            </div>
          </div>
          <!-- ===QR==== -->
          <!-- ===團的資料==== -->
          <ul>
            <li>
              <div>團名</div>
              <div><?=$group_ord["group_name"]?></div>
            </li>
            <li>
              <div>編號</div>
              <div><?=$group_ord["group_ord_no"]?></div>
            </li>
            
            <li>
              <div>截單時間</div>
              <div><?=$group_ord["deadline_time"]?></div>
            </li>
            <li>
              <div>預計送達時間</div>
              <div><?=$group_ord["arrive_time"]?></div>
            </li>
            <li>
              <div>目標杯數</div>
              <div><?=$group_ord["goal_cup"]?></div>
            </li>
            <li>
              <div>取貨地點</div>
              <div><?=$group_ord["group_adress"]?></div>
            </li>
            
          </ul>
        </div>
        <!-- ===團的資料==== -->

        <!-- ==============開團資料================= -->
        <div class="line"></div>
        <!-- ==============團長&團員飲料================= -->
        <div class="Head_data">
          <div id="order_list">
            <!-- 每個人  -->
            <div class="group_order_done_person">
              <div class="group_order_done_person_upbox">
                <div class="group_order_done_person_infobox">
                  <div class="group_order_done_person_img">
                    <img src="./Images/user_big.svg" />
                  </div>
                  <div class="group_order_done_person_name">Yu Lee</div>
                </div>
                <div class="group_order_done_person_total">
                  <div class="group_order_done_person_total_cup">2杯</div>
                  <div class="group_order_done_person_total_price">$115</div>
                </div>
              </div>
              <div class="group_order_done_person_downbox">
                <!-- 購買的 飲料 -->
                <div class="group_order_done_person_drink">
                  <div class="group_order_done_person_drink_title">
                    珍珠奶茶-大杯
                  </div>
                  <div class="group_order_done_person_drink_note">
                    少冰/微糖/加珍珠/$65/1杯
                  </div>
                  <button class="order_delete_btn">刪除</button>
                </div>
                <div class="group_order_done_person_drink">
                  <div class="group_order_done_person_drink_title">
                    紅茶-大杯
                  </div>
                  <div class="group_order_done_person_drink_note">
                    去冰/無糖/加QQ/$50/1杯
                  </div>
                  <button class="order_delete_btn">刪除</button>
                </div>
              </div>
            </div>
            <div class="group_order_done_person">
              <div class="group_order_done_person_upbox">
                <div class="group_order_done_person_infobox">
                  <div class="group_order_done_person_img">
                    <img src="./Images/user_big.svg" />
                  </div>
                  <div class="group_order_done_person_name">徐朝亭</div>
                </div>
                <div class="group_order_done_person_total">
                  <div class="group_order_done_person_total_cup">2杯</div>
                  <div class="group_order_done_person_total_price">$150</div>
                </div>
              </div>
              <div class="group_order_done_person_downbox">
                <!-- 購買的 飲料 -->
                <div class="group_order_done_person_drink">
                  <div class="group_order_done_person_drink_title">
                    珍珠奶茶-大杯
                  </div>
                  <div class="group_order_done_person_drink_note">
                    少冰/微糖/加珍珠/$65/1杯
                  </div>
                  <button class="order_delete_btn">刪除</button>
                </div>
                <div class="group_order_done_person_drink">
                  <div class="group_order_done_person_drink_title">
                    紅茶-大杯
                  </div>
                  <div class="group_order_done_person_drink_note">
                    去冰/無糖/加QQ/$50/1杯
                  </div>
                  <button class="order_delete_btn">刪除</button>
                </div>
              </div>
            </div>
          </div>
          <div class="group_button">
            <input
              type="button"
              value="添加飲品"
              class="btn_back_drink"
              onclick="location.href='./menu.html'"
            />
            <div class="btn_f5">
              <img src="./Images/drink.svg" alt="" /> 重新整理
            </div>
            <input
              type="button"
              value="結帳"
              class="btn_cleckout"
              onclick="location.href='./join_step3A.html?groud_ord_no=<?=$group_ord["group_ord_no"]?>'"
            />
          </div>
        </div>
      </div>
      <!-- ==============團長飲料================= -->
    </div>

    <!-- ==============footer================= -->
   
    <footer id="footer"><my-footer></my-footer></footer>
    <script>

        $(document).ready(function () {
          $(".close_btn").click(function () {
            $(".fist_QR").hide();
          });
        });
    </script>
    <script>
     
      var app = new Vue({
        el:"#app",
        data:{
          group_ord:[],
          group_no:"<?=$group_ord["group_ord_no"]?>",
        },
        methods:{
          
        }
      })
    </script>
    <script src="./layout/header.vue"></script>
    <script src="./layout/footer.vue"></script>
  </body>
</html>
