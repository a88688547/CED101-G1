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
// Vue.filter('dateString',function(value,format='YYYY-MM-DD HH:mm:ss'){
//   return moment(value).format(format)
// })

var app = new Vue({
  el: "#app",
  data: {
    
    //小時
    hh: "11",
    HourOptions: [
      {text:"AM11", value: 11 },
      {text:"AM12", value: 12 },
      {text:"PM:01",value: 13 },
      {text:"PM:02",value: 14 },
      {text:"PM:03", value: 15 },
      {text:"PM:04", value: 16 },
      {text:"PM:05", value: 17 },
      {text:"PM:06", value: 18 },
      {text:"PM:07", value: 19 },
      {text:"PM:08", value: 20 },
      {text:"PM:09", value: 21 },
      {text:"PM:10", value: 22 },
    ],
    //分鐘
    mm: "00",
    minuterOptions: [
      {  value: "00" },
      {  value: 15 },
      {  value: 30 },
      { value:45},
    ],
    //秒
    ss: "00",
    //日期
    date: "",
    //到達hh
    arrive_hh: "11",
    arrive_h_Options: [
      {text:"AM11", value: 11 },
      {text:"AM12", value: 12 },
      {text:"PM:01",value: 13 },
      {text:"PM:02",value: 14 },
      {text:"PM:03", value: 15 },
      {text:"PM:04", value: 16 },
      {text:"PM:05", value: 17 },
      {text:"PM:06", value: 18 },
      {text:"PM:07", value: 19 },
      {text:"PM:08", value: 20 },
      {text:"PM:09", value: 21 },
      {text:"PM:10", value: 22 },
    ],
    //到達mm
    arrive_mm: "00",
    arrive_mm_Options: [
      {  value: "00" },
      {  value: 15 },
      {  value: 30 },
      { value:45},
    ],
    NowDate:new Date(),
    //警告文字
    ErrorText: "警告字",
    OnOff: "1",
    //團名
    GroupName: "",
    //杯數目標
    GoalCup: "1",
    options: [
      { text: "--請選擇目標杯數--", value: "1" },
      { text: "20杯/9折優惠", value: "20" },
      { text: "30杯/8折優惠", value: "30" },
      { text: "40杯/7折優惠", value: "40" },
      { text: "50杯/6折優惠", value: "50" },
    ],
    
    GroupAddress: "",
    DeadLine_Time:"",
    Arrive_Time:"",
  },
  computed: {
    Arrive:function(){
      this.Arrive_Time = app.date + " " + app.arrive_hh + ":" + app.arrive_mm + ":" + app.ss;
      return this.Arrive_Time
    },
    DeadlineTime:function () {
      this.DeadLine_Time = app.date + " " + app.hh + ":" + app.mm + ":" + app.ss;
      return this.DeadLine_Time
    },
    
    JoinGroup()
    {
      let obj = {
        head_mem_no :"1",
        // group_datetime = "1",
        // arrive_time = DeadlineTime,

      }
      return obj         
    },
  },
  
  methods: {
    updateDate: function (date) {
      this.date = date;
    },
    XError: function () {
      let oops = document.querySelector(".oops"); //警告視窗
      oops.style.display = "none";
    },

    GroupTime()
    {
      let daedLineTime = (Date.parse(this.DeadLine_Time));
      let arrTime = (Date.parse(this.Arrive_Time));
      console.log(daedLineTime);
      console.log(arrTime);
      console.log((arrTime - daedLineTime));

      if ((arrTime - daedLineTime) < 1800000)
      {
        alert("準備時間需30分鐘以上!");
        return
      }
      // alert("QQQ");
      
     
      
    },

    check: function ()
    {
      this.GroupTime();
      let text;
      let getdeta = document.querySelector(".getdate");
      let oops = document.querySelector(".oops"); //警告視窗
      let ErrorText = document.querySelector(".error"); //警告視窗文字
      let GroupData = document.querySelector(".group_data"); //fomr表單
      if (this.GroupName == "" || this.GroupName == null)
      {
        // oops.style.display = "block";
        app.ErrorText = "請輸入團名";
        return;
      } else if (this.GroupName.length > 10){
          // oops.style.display = "block";
          app.ErrorText = "團名不可以超過十個字";
          this.GroupName = "";
          return;
      }
      else if (app.date == ""){
          // oops.style.display = "block";
          app.ErrorText = "請選擇日期";
          return;       
      }
        else if (this.GoalCup == "1"){
        // oops.style.display = "block";
        app.ErrorText = "請選擇目標杯數";
        return;
      } else if (this.GroupAddress == "" || this.GroupAddress == null) {
        // oops.style.display = "block";
        app.ErrorText = "請輸入地址";
        return;
      } else if (this.GroupAddress.length > 30){
        // oops.style.display = "block";
        app.ErrorText = "地址太長";
        this.GroupAddress = "";
        return;
      }
      //   GroupData.submit();
    },
  },
  watch: {
    mm:function () {
      app.Deadline_Time = app.date + " " + app.hh + ":" + app.mm + ":" + app.ss;
    },
    hh:function () {
      app.Deadline_Time = app.date + " " + app.hh + ":" + app.mm + ":" + app.ss;
    },
    date:function () {
      app.Deadline_Time = app.date + " " + app.hh + ":" + app.mm + ":" + app.ss;
      app.Arrive_Time = app.date + " " + app.arrive_hh + ":" + app.arrive_mm + ":" + app.ss;
    },


    arrive_hh: function(){
      app.Arrive_Time = app.date + " " + app.arrive_hh + ":" + app.arrive_mm + ":" + app.ss;
    },
    arrive_mm: function(){
      app.Arrive_Time = app.date + " " + app.arrive_hh + ":" + app.arrive_mm + ":" + app.ss;
    },
    // date: function(){
    //   app.Arrive_Time = app.date + " " + app.arrive_hh + ":" + app.arrive_mm + ":" + app.ss;
    // },
  }
});