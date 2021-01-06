window.addEventListener("load", function () {
    var app = new Vue({
      el: ".w-338",
      data: {
        ErrorText: "警告字",
        OnOff: "1",
        GroupName: "",
        GoalCup: "1",
        options: [
          { text: "--請選擇目標杯數--", value: "1" },
          { text: "20杯/9折優惠", value: "20" },
          { text: "30杯/8折優惠", value: "30" },
          { text: "40杯/7折優惠", value: "40" },
          { text: "50杯/6折優惠", value: "50" },
        ],
        GroupAddress: "",
      },
      methods: {
        XError: function () {
          let oops = document.querySelector(".oops"); //警告視窗
          oops.style.display = "none";
        },
        check: function () {
          let text;
          let oops = document.querySelector(".oops"); //警告視窗
          let ErrorText = document.querySelector(".error"); //警告視窗文字
          let GroupData = document.querySelector(".group_data"); //fomr表單
          if (this.GroupName == "" || this.GroupName == null) {
            // text = "請輸入團名"
            // ErrorText.innerText = text;
            oops.style.display = "block";
            app.ErrorText = "請輸入團名";
            return;
          } else if (this.GroupName.length > 10) {
            oops.style.display = "block";
            app.ErrorText = "團名不可以超過十個字";
            this.GroupName = "";
            return;
          } else if (this.GoalCup == "1") {
            oops.style.display = "block";
            app.ErrorText = "請選擇目標杯數";
            return;
          } else if (this.GroupAddress == "" || this.GroupAddress == null) {
            oops.style.display = "block";
            app.ErrorText = "請輸入地址";
            return;
          } else if (this.GroupAddress.length > 30) {
            oops.style.display = "block";
            app.ErrorText = "地址太長";
            this.GroupAddress = "";
            return;
          }
          GroupData.submit();
        },
      },
    });
  });
  //-----------------
  // var jsonStr = '[{"psn":"1","pname":"PHP4+MySQL\u52d5\u614b\u7db2\u9801\u5165\u9580\u5be6\u52d9","price":"220","author":"\u99ac\u5b5d\u7440","pages":"600","image":"1.gif"},{"psn":"2","pname":"Acess2000 \u7a0b\u5f0f\u8a2d\u8a08","price":"710","author":"\u90ed\u5c1a\u541b","pages":"1100","image":"2.gif"},{"psn":"3","pname":"VisualC++ \u5165\u9580\u9032\u968e","price":"620","author":"\u90ed\u5c1a\u541b","pages":"1000","image":"3.gif"},{"psn":"4","pname":"Visio5.0\u8f15\u9b06\u5b78\u7fd2","price":"310","author":"\u4f4d\u5143\u6587\u5316","pages":"470","image":"4.gif"},{"psn":"5","pname":"PHP\u7955\u7b08","price":"710","author":"\u8463\u8463","pages":"600","image":"5.gif"},{"psn":"6","pname":"\u7cbe\u901aVB.NET\u5b8c\u5168\u624b\u518a","price":"960","author":"\u738b\u5c0f\u660e","pages":"750","image":"6.gif"},{"psn":"7","pname":"JavaScript\u5927\u7d76\u62db","price":"998","author":"\u8463\u8463","pages":"888","image":"7.gif"}]';