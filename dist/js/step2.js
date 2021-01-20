var app = new Vue({
  el: "#app",
data: function ()
{ 
  return {
    tital2:"",
    group_total:0,
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
    let group_state = this.group_ord.group_state;
    let headMan = this.group_ord.head_mem_no;
    let mem = this.mem_no
    console.log(group_state);
    console.log(headMan);
    console.log(mem);
    if (mem != headMan ) 
    {
      location.href = `./join_list.html`
    //訂單狀態已結束
    } else if (group_state == 1)
    {
      location.href = `./join_list.html`
    }
    else if (group_state == 2)
    {
      location.href = `./join_list.html`
    }
  },
  
  //時間超過更改訂單狀態state -> 2
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
      this.get_order_total();
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
      btn_f5(){
        //抓總計
        this.get_order_total();
        //抓飲料item
        this.get_group_ord_item();
        // 抓團資訊
        this.selectGroupNo();
      },
      checkout()
      {
        //抓總計
        this.get_order_total();
        //抓飲料item
        this.get_group_ord_item();
        // 抓團資訊
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
          //訂單狀態改為2(false)
          this.change_state();
          this.TimeError = true;
          console.log("已超過時間")
          
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
    
    //用訂單編號抓飲料資料
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
    //用訂單編號抓訂單資料
  selectGroupNo: async function (group_ord_no)
  {
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
    //抓完團的資料判段團長跟訂單狀態
      this.ckeckWho();
    },
   
 //抓總價
    get_order_total: async function () {
      const res = await fetch('./php/get_order_total.php', {
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
      .then(function (data) {
        return data.json()
      })
      console.log(res)
      this.group_total = res.group_ord_total
        // .then((res) => res.json())
        // .then((res) => console.log(res.group_ord_total))
        // .then((res) => (this.group_total = res))
  },
  
  get_mem_info(data){
    this.mem_info = data
    this.mem_no = data.mem_no
  }
  },
computed: {
  // total()
  // {
  //   this.total2 = this.group_order_item[0].group_ord_no
  //   return this.total2 
  // },
  },
  watch:{
    watchNum() {
      this.nowTime = new Date().getTime()
    },
  },
  created()
  {
    
    member.$on('memberInfo', this.get_mem_info)
    //切割字串
    this.group_ord_no = window.location.search.split("=")[1];
    
  },
  mounted()
  {
    //
    this.selectGroupNo();
    this.get_group_ord_item();
    //總計
    this.get_order_total();
    //計時器
    this.timer = setInterval(this.getWatchNum, 1000);
    
  },
  updated()
  {
    
    this.g_cup();
  },
});