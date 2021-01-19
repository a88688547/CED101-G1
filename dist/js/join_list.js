window.addEventListener("load", function () {
    let grouporddata;
    //============去server端拿資料
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
      app.grouporddata = JSON.parse(xhr.responseText);
      let total = app.grouporddata.length;
    };
    xhr.open("get", "./php/getGroup.php", true);
    xhr.send(null);
    
  });

  var app = new Vue({
    el: "#join_main",
    data: {
      
      nowDateTime:"",   
      now_Time: "",
      nowDay:"",  
      watchNum: 0,
      nowTime: new Date().getTime(), //現在時間毫秒
      timer: null,   //計時器
      msg: 1,
      grouporddata: [],
      imgSrc10: "./Images/coupon//0off@2x.jpg",
      imgSrc20:
        "./Images/drinkphoto/coupon/drive-download-20201228T062855Z-001/10off.jpg",
      imgSrc30:
        "./Images/drinkphoto/coupon/drive-download-20201228T062855Z-001/20off.jpg",
      imgSrc40:
        "./Images/drinkphoto/coupon/drive-download-20201228T062855Z-001/30off.jpg",
        imgSrc50:
            "./Images/drinkphoto/coupon/drive-download-20201228T062855Z-001/40pff.jpg",
        endTime: "",
        offsetTime: "",
        ght:"",
      },
      computed: {
        grouporddataLenght() //長度
        {
            this.ght = this.grouporddata.length
            return this.ght
        },
        count_Down()
          {
            this.ght = this.grouporddata.length
            // console.log(this.ght)
            // console.log(this.nowTime)
            let Time = new Array;
            for (i = 0 ; i < this.ght ; i++)
            {
            let endTime = new Date(this.grouporddata[i].deadline_time);
            let endTimeSec = endTime.getTime()
            let offsetTime = (endTimeSec - this.nowTime) / 1000 // ** 以秒為單位
            this.endTime[i] = endTimeSec; // ** 以秒為單位
            let sec = parseInt(offsetTime % 60); // 秒
            let min = parseInt((offsetTime / 60) % 60); // 分 ex: 90秒
            let hr = parseInt(offsetTime / 60 / 60); // 時
            let total = {
                theHr: hr,
                theMin: min,
                theSec: sec,
            }
            // console.log(total);
            Time[i] = total;
            } 
            return Time;
           },
        
      },
      methods: {
        //   count_Down()
        //   {
        //     this.ght = this.grouporddata.length
        //     // console.log(this.ght)
        //     // console.log(this.nowTime)
        //     for (i = 0 ; i < this.ght ; i++)
        //     {
        //     let endTime = new Date(this.grouporddata[i].deadline_time);
        //     let endTimeSec = endTime.getTime()
        //     let offsetTime = (endTimeSec - this.nowTime) / 1000 // ** 以秒為單位
        //     this.endTime[i] = endTimeSec; // ** 以秒為單位
        //     let sec = parseInt(offsetTime % 60); // 秒
        //     let min = parseInt((offsetTime / 60) % 60); // 分 ex: 90秒
        //     let hr = parseInt(offsetTime / 60 / 60); // 時
        //     let total = {
        //         theHr: hr,
        //         theMin: min,
        //         theSec: sec,
        //     }
        //     console.log(total);
        //     this.endTime[i] = total;
        //    }            
        //    },
           // 得到當下時間
           timeFormate(timeStamp) {
            let newdate = new Date(timeStamp);
            let week = ['日', '一', '二', '三', '四', '五', '六'];
            let year  = newdate.getFullYear();
            let month = newdate.getMonth() + 1 < 10? "0" + (newdate.getMonth() + 1): newdate.getMonth() + 1;
            let date  = newdate.getDate() < 10? "0" + newdate.getDate(): newdate.getDate();
            let hh    = newdate.getHours() < 10? "0" + newdate.getHours(): newdate.getHours();
            let mm    = newdate.getMinutes() < 10? "0" + newdate.getMinutes(): newdate.getMinutes();
            let ss    = newdate.getSeconds() < 10? "0" + newdate.getSeconds(): newdate.getSeconds();

            this.now_Time = hh+":"+mm + ":" + ss;
            this.nowDay = year + "-" + month + "-" + date;
            this.nowDateTime = `${this.nowDay} ${this.now_Time}`;
          },
          // 定時器函數
            nowTimes(){        
                let self = this;
                self.timeFormate(new Date());
                setInterval(function(){
                self.timeFormate(new Date());
                }, 1000);
          },
            //折扣換圖片
      getimg: function (data) {
        if (data == 20) {
          return this.imgSrc20;
        } else if (data == 30) {
          return this.imgSrc30;
        } else if (data == 40) {
          return this.imgSrc40;
        } else if (data == 50) {
          return this.imgSrc50;
        } else if (data == 10) {
          return this.imgSrc10;
        }
          },
          
        getWatchNum() {
            this.watchNum++
        },
      },
      watch: {
        watchNum() {
            this.nowTime = new Date().getTime()
        }
      },
      mounted()
      {
        this.nowTimes();
        this.timer = setInterval(this.getWatchNum, 1000)
      },
      created() {
        this.nowTimes();
      },
      updated()
      {
        //   this.count_Down();
       }

  });