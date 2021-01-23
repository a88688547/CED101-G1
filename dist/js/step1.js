Vue.component('date-picker', {
    template: `<input/>`,
    props: ['dateFormat'],
    mounted: function () {
        var self = this
        $(this.$el).datepicker({
            dateFormat: this.dateFormat,
            onSelect: function (date) {
                self.$emit('update-date', date)
            },
            //限制最大日期
            minDate: 0
        })
    },
    beforeDestroy: function () {
        $(this.$el).datepicker('hide').datepicker('destroy')
    },
})
// Vue.filter('dateString',function(value,format='YYYY-MM-DD HH:mm:ss'){
//   return moment(value).format(format)
// })

var app = new Vue({
    el: '#app',
    data: {
        nowtime2: '',
        watchNum: 0,
        timer: null, //計時器
        nowTime: new Date().getTime(), //現在時間毫秒
        mem_info: '',
        mem_no: '',
        //確認框
        group_confirm: false,
        //警告框
        Error_show: false,
        group_ord_no: '',
        //小時
        hh: '11',
        HourOptions: [
            // {text:"hh", value: "hh" },
            { text: '11', value: '11' },
            { text: '12', value: '12' },
            { text: '13', value: '13' },
            { text: '14', value: '14' },
            { text: '15', value: '15' },
            { text: '16', value: '16' },
            { text: '17', value: '17' },
            { text: '18', value: '18' },
            { text: '19', value: '19' },
            { text: '20', value: '20' },
            
        ],
        //分鐘
        mm: '00',
        minuterOptions: [
            // { text:"mm", value: "mm" },
            { text: '00', value: '00' },
            { text: '15', value: '15' },
            { text: '30', value: '30' },
            { text: '45', value: '45' },
        ],
        //秒
        ss: '00',
        //日期
        date: '',
        //到達hh
        arrive_hh: '11',
        arrive_h_Options: [
            // {text:"hh", value: "hh" },
            { text: '11', value: '11' },
            { text: '12', value: '12' },
            { text: '13', value: '13' },
            { text: '14', value: '14' },
            { text: '15', value: '15' },
            { text: '16', value: '16' },
            { text: '17', value: '17' },
            { text: '18', value: '18' },
            { text: '19', value: '19' },
            { text: '20', value: '20' },
        ],
        //到達mm
        arrive_mm: '00',
        arrive_mm_Options: [
            // { text:"mm", value: "mm" },
            { text: '00', value: '00' },
            { text: '15', value: '15' },
            { text: '30', value: '30' },
            { text: '45', value: '45' },
        ],
        newDate: 0,
        //警告文字
        ErrorText: '警告字',
        OnOff: '1',
        //團名
        GroupName: '',
        //杯數目標
        GoalCup: '1',
        options: [
            { text: '--請選擇目標杯數--', value: '1' },
            { text: '20杯以下無折扣', value: '10' },
            { text: '20杯/9折優惠', value: '20' },
            { text: '30杯/8折優惠', value: '30' },
            { text: '40杯/7折優惠', value: '40' },
            { text: '50杯/6折優惠', value: '50' },
        ],
        //地址
        GroupAddress: '',
        //收單時間
        DeadLine_Time: '',
        //到達時間
        Arrive_Time: '',
        //收單日期時間
        daedLine_DateTime: '',
        //到達日期時間
        arrive_DateTime: '',
        //抓現在時間yyyy-mm-dd mm-hh-ss
        currentDate: '',
    },
    computed: {
        //預計送達時間hh:mm:ss
        arriveTime() {
            this.Arrive_Time = `${this.arrive_hh}:${this.arrive_mm}:${this.ss}`
            return this.Arrive_Time
        },
        //收單時間hh:mm:ss
        deadlineTime() {
            this.DeadLine_Time = `${this.hh}:${this.mm}:${this.ss}`
            return this.DeadLine_Time
        },
        //預計送達時間yy-mm-dd + hh:mm:ss
        arriveDateTime() {
            this.arrive_DateTime = `${this.date} ${this.Arrive_Time}`
            return this.arrive_DateTime
        },
        //收單時間yy-mm-dd + hh:mm:ss
        deadlineDateTime() {
            this.daedLine_DateTime = `${this.date} ${this.DeadLine_Time}`
            return this.daedLine_DateTime
        },
        nowTimeTest() {
            this.nowtime2 = Date.parse(this.currentDate)
            return this.nowtime2
        },
        //送後台資料
        JoinGroup() {
            let obj = {
                //團長會員編號
                head_mem_no: this.mem_no,
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
    },
    watch: {
        watchNum() {
            this.nowTime = new Date().getTime()
        },
        formatTime: function () {
            this.currentDate = `${date.getFullYear()}-${month}-${strDate} ${strHours}:${strMinutes}:${srtSeconds}`
            return this.currentDate
        },
        mm: function () {
            this.DeadLine_Time = `${this.hh}:${this.mm}:${this.ss}`
            this.daedLine_DateTime = `${this.date} ${this.hh}:${this.mm}:${this.ss}`
        },
        hh: function () {
            this.DeadLine_Time = `${this.hh}:${this.mm}:${this.ss}`
            this.daedLine_DateTime = `${this.date} ${this.hh}:${this.mm}:${this.ss}`
        },
        date: function () {
            this.Arrive_Time = `${this.arrive_hh}:${this.arrive_mm}:${this.ss}`
            this.arrive_DateTime = `${this.date} ${this.arrive_hh}:${this.arrive_mm}:${this.ss}`
            this.DeadLine_Time = `${this.hh}:${this.mm}:${this.ss}`
            this.daedLine_DateTime = `${this.date} ${this.hh}:${this.mm}:${this.ss}`
            this.daedLine_DateTime = `${this.date} ${this.DeadLine_Time}`
            this.arrive_DateTime = `${this.date} ${this.Arrive_Time}`
        },
        arrive_mm: function () {
            this.Arrive_Time = `${this.arrive_hh}:${this.arrive_mm}:${this.ss}`
            this.arrive_DateTime = `${this.date} ${this.arrive_hh}:${this.arrive_mm}:${this.ss}`
        },
        arrive_hh: function () {
            this.Arrive_Time = `${this.arrive_hh}:${this.arrive_mm}:${this.ss}`
            this.arrive_DateTime = `${this.date} ${this.arrive_hh}:${this.arrive_mm}:${this.ss}`
        },
    },
    methods: {
        //抓現在時間yyyy-mm-dd hh:mm:ss
        formatTime: function () {
            var date = new Date()
            //月補0
            var month = date.getMonth() + 1
            //日補0
            var strDate = date.getDate()
            //時補0
            var strHours = date.getHours()
            //分補0
            var strMinutes = date.getMinutes()
            //秒補0
            var srtSeconds = date.getSeconds()
            if (month >= 1 && month <= 9) {
                month = '0' + month
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = '0' + strDate
            }
            if (strHours >= 0 && strHours <= 9) {
                strHours = '0' + strHours
            }
            if (strMinutes >= 0 && strMinutes <= 9) {
                strMinutes = '0' + strMinutes
            }
            if (srtSeconds >= 0 && srtSeconds <= 9) {
                srtSeconds = '0' + srtSeconds
            }
            this.currentDate = `${date.getFullYear()}-${month}-${strDate} ${strHours}:${strMinutes}:${srtSeconds}`
            return this.currentDate
        },
        getWatchNum() {
            this.watchNum++
        },
        updateVal() {
            let goalConfrim = document.querySelector('.goal_confirm')
            console.log(goalConfrim)
            if (this.GoalCup == 10) {
                goalConfrim.innerText = '20杯以下無折扣'
            } else if (this.GoalCup == 20) {
                goalConfrim.innerText = '20杯/9折優惠'
            } else if (this.GoalCup == 30) {
                goalConfrim.innerText = '30杯/8折優惠'
            } else if (this.GoalCup == 40) {
                goalConfrim.innerText = '40杯/7折優惠'
            } else if (this.GoalCup == 50) {
                goalConfrim.innerText = '50杯/6折優惠'
            }
        },
        //jq日期套件傳資料
        updateDate: function (date) {
            this.date = date
        },
        //傳資料到後台
        upGroupData: async function () {
            //
            this.formatTime()
            console.log(this.currentDate)
            let test = await fetch('./php/upGroupData.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.JoinGroup),
            })
                .then((res) => res.json())
                .then((res) => (this.group_ord_no = res))

            console.log(this.group_ord_no)

            location.href = `./join_step2.html?group_ord_no=${this.group_ord_no}`
        },
        //警告視窗開關
        XError: function () {
            this.Error_show = false //警告視窗
        },
        confirmClose: function () {
            this.group_confirm = false
        },
        // 確認框關閉
        //預計送達時間需要大於收單時間至少30分
        GroupTime() {
            let daedLineTime = Date.parse(this.daedLine_DateTime)
            let arrTime = Date.parse(this.arrive_DateTime)
            let groupDateTime = Date.parse(this.currentDate)
            console.log(groupDateTime)
            console.log(daedLineTime)
            console.log(arrTime)
            console.log(Date.parse(this.arrive_DateTime) - Date.parse(this.daedLine_DateTime))
        },

        check: function () {
            this.formatTime()
            this.GroupTime()
            let text
            let oops = document.querySelector('.oops') //警告視窗
            let ErrorText = document.querySelector('.error') //警告視窗文字
            let GroupData = document.querySelector('.group_data') //fomr表單

            if (this.GroupName == '' || this.GroupName == null) {
                this.Error_show = true
                this.ErrorText = '請輸入團名'
                return
            } else if (this.GroupName.length > 10) {
                this.Error_show = true
                this.ErrorText = '團名不可以超過十個字'
                this.GroupName = ''
                return
            } else if (this.date == '') {
                this.Error_show = true
                this.ErrorText = '請選擇日期'
                return
            } else if (Date.parse(this.daedLine_DateTime) < Date.parse(this.currentDate)) {
                this.Error_show = true
                this.ErrorText = '請選擇正確時間'
                // alert("請選擇正確時間")
                return
            } else if (Date.parse(this.arrive_DateTime) - Date.parse(this.daedLine_DateTime) < 1800000) {
                this.Error_show = true
                this.ErrorText = '準備時間需30分鐘以上!'
                // alert("準備時間需30分鐘以上!");
                return
            } else if (this.GoalCup == '0') {
                this.Error_show = true
                this.ErrorText = '請選擇目標杯數'
                return
            } else if (this.GroupAddress == '' || this.GroupAddress == null) {
                this.Error_show = true
                this.ErrorText = '請輸入地址'
                return
            } else if (this.GroupAddress.length > 30) {
                this.Error_show = true
                this.ErrorText = '地址太長'
                this.GroupAddress = ''
                return
            }
            this.group_confirm = true
        },
        get_mem_info(data) {
            this.mem_info = data
            this.mem_no = data.mem_no
        },
    },
    created() {
        member.$on('memberInfo', this.get_mem_info)
    },
    mounted() {
        this.timer = setInterval(this.getWatchNum, 1000)
    },
})
