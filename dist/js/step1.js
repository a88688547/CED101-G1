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
      {text:"AM:11", value: "11" },
      {text:"AM:12", value: "12" },
      {text:"PM:01",value: "13" },
      {text:"PM:02",value: "14" },
      {text:"PM:03", value: "15" },
      {text:"PM:04", value: "16" },
      {text:"PM:05", value: "17" },
      {text:"PM:06", value: "18" },
      {text:"PM:07", value: "19" },
      {text:"PM:08", value: "20" },
      {text:"PM:09", value: "21" },
      {text:"PM:10", value: "22" },
    ],
    //分鐘
    mm: "00",
    minuterOptions: [
      { text:"00", value: "00" },
      { text:"15", value: "15" },
      { text:"30", value: "30" },
      { text:"45", value:"45"},
    ],
    //秒
    ss: "00",
    //日期
    date: "",
    //到達hh
    arrive_hh: "11",
    arrive_h_Options: [
      {text:"AM:11", value: "11" },
      {text:"AM:12", value: "12" },
      {text:"PM:01",value: "13" },
      {text:"PM:02",value: "14" },
      {text:"PM:03", value: "15" },
      {text:"PM:04", value: "16" },
      {text:"PM:05", value: "17" },
      {text:"PM:06", value: "18" },
      {text:"PM:07", value: "19" },
      {text:"PM:08", value: "20" },
      {text:"PM:09", value: "21" },
      {text:"PM:10", value: "22" },
    ],
    //到達mm
    arrive_mm: "00",
    arrive_mm_Options: [
      { text:"00", value: "00" },
      { text:"15", value: "15" },
      { text:"30", value: "30" },
      { text:"45", value: "45" },
    ],
    newDate: 0,
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
    //地址
    GroupAddress: "",
    //收單時間
    DeadLine_Time: "",
    //到達時間
    Arrive_Time: "",
    //收單日期時間
    daedLine_DateTime: "",
    //到達日期時間
    arrive_DateTime: "",
    //抓現在時間yyyy-mm-dd mm-hh-ss
    currentDate:"",
    getTodayDateTime:new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate() + '') +" "+ new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
    geTodayTime:new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
    getTodayDate:new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate() + ''),
  },
  computed: {
    //抓現在時間yyyy-mm-dd hh:mm:ss
    formatTime: function() {
      var date = new Date();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      this.currentDate = date.getFullYear() + "-" + month + "-" + strDate
              + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      return this.currentDate;
      },
    //預計送達時間hh:mm:ss
    arriveTime(){
      this.Arrive_Time =`${this.arrive_hh}:${this.arrive_mm}:${this.ss}`;
      return this.Arrive_Time;
    },
     //收單時間hh:mm:ss
    deadlineTime() {
      this.DeadLine_Time =`${this.hh}:${this.mm}:${this.ss}`;
      return this.DeadLine_Time;
    },
    //預計送達時間yy-mm-dd + hh:mm:ss
    arriveDateTime(){
      this.arrive_DateTime =`${this.date} ${this.Arrive_Time}`;
      return this.arrive_DateTime;
    },
    //收單時間yy-mm-dd + hh:mm:ss
    deadlineDateTime()
    {
      this.daedLine_DateTime =`${this.date} ${this.DeadLine_Time}`;
      return this.daedLine_DateTime;
    },
    
    //送後台資料
    JoinGroup(){
      let obj = {

        //團長會員編號
        head_mem_no: "",
        //團名
        group_name: this.GroupName,
        //成團時間
        group_datetime: this.currentDate,
        //截止時間
        deadline_time: this.daedLine_DateTime,
        //預計到達時間
        arrive_time: this.arrive_DateTime,
        //送達地址
        group_adress: this.GroupAddress,
        //目標杯數
        goal_cup: this.GoalCup,
        //
        
      }
      return obj         
    },
    getGroup()
    {
      
    }
  },
  watch: {

    currentDate: function ()
    {
      
    },
    mm:function () {
      this.DeadLine_Time =`${this.hh}:${this.mm}:${this.ss}`;
      this.daedLine_DateTime =`${this.date} ${this.hh}:${this.mm}:${this.ss}`;
    },
    hh:function () {
      this.DeadLine_Time =`${this.hh}:${this.mm}:${this.ss}`;
      this.daedLine_DateTime =`${this.date} ${this.hh}:${this.mm}:${this.ss}`;
    },
    date: function ()
    {
      this.daedLine_DateTime =`${this.date} ${this.DeadLine_Time}`
      this.arrive_DateTime =`${this.date} ${this.Arrive_Time}`
    },
    arrive_mm:function () {
      this.Arrive_Time =`${this.arrive_hh}:${this.arrive_mm}:${this.ss}`;
      this.arrive_DateTime =`${this.date} ${this.arrive_hh}:${this.arrive_mm}:${this.ss}`;
    },
    arrive_hh:function () {
      this.Arrive_Time =`${this.arrive_hh}:${this.arrive_mm}:${this.ss}`;
      this.arrive_DateTime =`${this.date} ${this.arrive_hh}:${this.arrive_mm}:${this.ss}`;
    },
   
  },
  methods: {

    //抓現在時間轉格式yyyy-mm-dd hh:mm:ss
   
    //jq日期套件傳資料
    updateDate: function (date) {
      this.date = date;
    },
    //警告視窗開關
    XError: function () {
      let oops = document.querySelector(".oops"); //警告視窗
      oops.style.display = "none";
    },
    //預計送達時間需要大於收單時間至少30分
    GroupTime()
    {
      let daedLineTime = (Date.parse(this.daedLine_DateTime));
      let arrTime = (Date.parse(this.arrive_DateTime));
      let groupDateTime =  (Date.parse(this.currentDate));
      console.log(groupDateTime)
      console.log(daedLineTime);
      console.log(arrTime);
      console.log(((Date.parse(this.arrive_DateTime)) - (Date.parse(this.daedLine_DateTime))));

      // if ((((Date.parse(this.arrive_DateTime)) - (Date.parse(this.daedLine_DateTime)))) < 1800000)
      // {
      //   alert("準備時間需30分鐘以上!");
      //   return
      // }
    },

    check: function ()
    {
      this.GroupTime();
      let text;
      let oops = document.querySelector(".oops"); //警告視窗
      let ErrorText = document.querySelector(".error"); //警告視窗文字
      let GroupData = document.querySelector(".group_data"); //fomr表單
      if (this.GroupName == "" || this.GroupName == null)
      {
        // oops.style.display = "block";
        this.ErrorText = "請輸入團名";
        return;
      } else if (this.GroupName.length > 10){
          // oops.style.display = "block";
          this.ErrorText = "團名不可以超過十個字";
          this.GroupName = "";
          return;
      }
      else if (this.date == ""){
          // oops.style.display = "block";
          this.ErrorText = "請選擇日期";
          return;       
      }
      else if ((Date.parse(this.daedLine_DateTime)) < (Date.parse(this.currentDate))){
        this.ErrorText = "請選擇正確時間";
        alert("請選擇正確時間")
        return
        }
      else if ((((Date.parse(this.arrive_DateTime)) - (Date.parse(this.daedLine_DateTime)))) < 1800000)
      {
        this.ErrorText = "準備時間需30分鐘以上!";
        alert("準備時間需30分鐘以上!");
        return
      }
        else if (this.GoalCup == "1"){
        // oops.style.display = "block";
        this.ErrorText = "請選擇目標杯數";
        return;
      } else if (this.GroupAddress == "" || this.GroupAddress == null) {
        // oops.style.display = "block";
        this.ErrorText = "請輸入地址";
        return;
      } else if (this.GroupAddress.length > 30){
        // oops.style.display = "block";
        this.ErrorText = "地址太長";
        this.GroupAddress = "";
        return;
      }
      //   GroupData.submit();
    },
  },
  
});