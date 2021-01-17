var app = new Vue({
  el: "#app",
data: function ()
{ 
  return {
    TimeError:false,
    goal:1,
    joinStage:1,
    watchNum:0,
    timer: null,   //計時器
    nowTime: new Date().getTime(), //現在時間毫秒
    group_ord_item_no:"",
    mem_info:"",
    mem_no:"",
    old:0,
    order_count:0,
    firstQR:true,
    confirm: false,
    group_order_item:"",
    group_ord: [],
    group_ord_no: "",
      msg: "123",
    cup_text:"",
    //QR網址
    URL: window.location.search,
  }
},
methods: {
  //現在時間
  getWatchNum() {
    this.watchNum++
  },
  //是否為團長
  ckeckWho()
  {
    let headMan = this.group_ord.head_mem_no;
    let mem = this.mem_no
    if (mem != headMan)
    {
      location.href = `./join_list.html`
    }
  },
  
  //更改訂單狀態
  change_state: async function () {
    // console.log('send2', drinkno)
    const res = await fetch('./php/change_state.php', {
        method: 'POST',
        mode: 'same-origin',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            group_ord_no: this.group_ord_no,
        }),
    })
  },
  
  //刪除杯數
    del_group_ord_item: async function (group_ord_item_no,ord_qua) {
      // console.log('send2', drinkno)
    console.log(group_ord_item_no);
    console.log(ord_qua);

    const res = await fetch('./php/del_group_item_no.php', {
          method: 'POST',
          mode: 'same-origin',
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            group_ord_item_no: group_ord_item_no,
            group_ord_no: this.group_ord_no,
            ord_qua: ord_qua
          }),
    })
      this.get_group_ord_item();
      this.selectGroupNo();
      },
  //杯數判斷
  g_cup()
  {
    let g_cup = this.group_ord.goal_cup;
    switch (g_cup)
    {
      case "10":
        $(".goal_confirm").text("20杯以下無折扣");
        break;
      case "20":
        $(".goal_confirm").text("20杯/9折優惠");
        break;
      case "30":
        $(".goal_confirm").text("30杯/8折優惠");
        break;
      case "40":
        $(".goal_confirm").text("40杯/7折優惠");
        break;
      case "50":
        $(".goal_confirm").text("50杯/6折優惠");
        break;
    }
    // if (g_cup == 50)
    // {
    //   $(".goal_confirm").text("50杯/6折優惠");
    // }
  },
  test()
  {
    console.log(this.group_ord)
      },
      closeBox()
      {
          this.confirm = false;
       },
      closeBox2()
      {
        location.href = `./join_list.html`
      },
      close_btn()
      {
          this.firstQR = false;
  },
      //時間超過不能送出
  timeCheck()
  {
    
    
    

    
  },
      checkout()
      {
        this.get_group_ord_item();
        this.selectGroupNo();
        let dealTime = (Date.parse(this.group_ord.deadline_time));
        console.log(dealTime);
        console.log(this.nowTime);
        let goalCup = parseInt(this.group_ord.goal_cup);
        let nowCup = parseInt(this.group_ord.now_cup);
        console.log(goalCup)
        console.log(nowCup)
        //如果截止時間還沒到判斷杯數
        if (dealTime > this.nowTime)
        {
          
              if (goalCup > nowCup)
                {
                  this.goal = 1;
                  this.confirm = true;
                  console.log("目標不足")
                  return
                }
                else if (goalCup <= nowCup)
                {
                  this.goal = 2;
                  this.confirm = true;
                  console.log("OK")
                  return
                }
          return
        } else
        //截止時間超過
        {
          this.change_state();
          this.TimeError = true;
          console.log("已超過時間")
          // location.href = `./join_list.html`
        }
        
      },
      addDrink()
      {
          location.href = `./menu.html?group_ord_no=${this.group_ord_no}`
      },
      nextStep()
      {
        
        location.href = `./join_step3A.html?group_ord_no=${this.group_ord_no}`
      },
    
    //抓飲料資訊
    get_group_ord_item: async function () {
          // console.log('send2', drinkno)
          const res = await fetch('./php/mem_getone_group_ord_item.php', {
              method: 'POST',
              mode: 'same-origin',
              credentials: 'same-origin',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  group_ord_no: this.group_ord_no,
              }),
          }).then(function (data) {
              return data.json()
          })
          // 取回res值後，塞入data內
          this.group_order_item = res
      },
    //抓訂單編號資料
    selectGroupNo: async function (group_ord_no) {
      const res = await fetch("./php/group_no.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          group_ord_no: this.group_ord_no,
        }),
      })
        .then((res) => res.json())
        .then((res) => (this.group_ord = res));
    },
  //   //抓飲料筆數
  //   get_order_count: async function () {
  //     const res = await fetch('./php/get_order_count.php', {
  //       method: 'POST',
  //       mode: 'same-origin',
  //       credentials: 'same-origin',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         group_ord_no: this.group_ord_no,
  //       }),
  //     }).then((res) => res.json())
  //       .then((res) => this.old = res.count)
  //       .then((res)=>this.check(res))
  // },
  // check: function (data)
  // { 
  //   if (this.order_count < data)
  //   {
  //     this.order_count = data;
  //   } else
  //   { 
  //     alert('new order');
  //   }
  // },
  get_mem_info(data){
    this.mem_info = data
    this.mem_no = data.memNo
  }
  },
computed: {
  
  },
  watch:{
    watchNum() {
      this.nowTime = new Date().getTime()
    },
  },
  created() {
    //切割字串
    // this.ckeckWho();
    member.$on('memberInfo', this.get_mem_info)
    this.group_ord_no = window.location.search.split("=")[1];
    
  },
  mounted()
  {
    this.timer = setInterval(this.getWatchNum, 1000);
    this.selectGroupNo();
    this.get_group_ord_item();
  },
  updated()
  {
    
    this.g_cup();
  },
});