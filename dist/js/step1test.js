Vue.component("date-picker", {
    template: `<input/>`,
    props: ["dateFormat"],
    mounted: function () {
      var self = this;
      $(this.$el).datepicker({
        dateFormat: this.dateFormat,
        onSelect: function (date) {
          self.$emit("update-date", date);
        },
      });
    },
    beforeDestroy: function () {
      $(this.$el).datepicker("hide").datepicker("destroy");
    },
});
Vue.component("select-time", {
      
  })

  var app = new Vue({
    el: "#app",
      data: {
      getdate:"123",
      date: "",
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
      updateDate: function (date) {
        this.date = date;
      },
      XError: function () {
        let oops = document.querySelector(".oops"); //警告視窗
        oops.style.display = "none";
      },
      check: function () {
        let text;
        let getdeta = document.querySelector(".getdate");
        console.log(this.date);
        let oops = document.querySelector(".oops"); //警告視窗
          let ErrorText = document.querySelector(".error"); //警告視窗文字
        let GroupData = document.querySelector(".group_data"); //fomr表單
        if (this.GroupName == "" || this.GroupName == null) {
          // text = "請輸入團名"
          // ErrorText.innerText = text;
          oops.style.display = "block";
          app.ErrorText = "請輸入團名";
          return;
        } else if (this.GroupName.length > 10)
        {
            oops.style.display = "block";
            app.ErrorText = "團名不可以超過十個字";
            this.GroupName = "";
            return;
        }
        else if (app.date == "")
        {
            oops.style.display = "block";
            app.ErrorText = "請選擇日期";
            return;       
        }
          else if (this.GoalCup == "1") {
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
        //   GroupData.submit();
      },
    },
  });