var app = new Vue({
  el:"#app",
  data: {
    coupon_no:"",
    cou_dis:"",
    cou:{
      cou_no: "",
      mem_no: "",
      cou_discount: "",
      cou_status:"",
    },
    
    coupon:[],
    group_ord: [],
    //原價總額
    group_ord_price: 0,
    cou_count:"",
    cup_count: "",
    group_ord_total_cup:0,
    //杯數折扣
    group_ord_price_1: "",
    //杯數折扣+優惠卷
    group_ord_price_2:"",
    //訂單編號
    group_ord_no: "",
    //訂單資料
    group_order_item: "",
    //警告框
    Error_show: false,
    ErrorText: "警告字",
    //團長資料
    head_info:"",
    //會員資料
    mem_info:"",
    mem_no:"",
    oldNum:"",
    phone:"",
    message:"",//備註
    name:"",//持卡人姓名
    card1:"",
    card2:"",
    card3:"",
    card4:"",
    full_card: "",
    testCard:[this.card1],
    deal_date:"",
    month:"",
    year: "",
    //安全碼
    safeNumber: "",
    //切換確認
    type: "10",
    //明細
    closeTotal: false,
  },
  computed: {
    
    group_img()
    {
      this.imgId = this.mem_info.mem_img
      return this.imgId
    },
    //折扣編號
    couponNo()
    {
      this.coupon_no = this.cou.cou_no;
      return this.coupon_no;
    },
    //折扣%數
    couDiscount()
    {
      this.cou_dis = this.cou.cou_discount;
      return this.cou_dis;
    },
    //杯數優惠
    count() {
      switch (this.group_ord.goal_cup)
      {
        case "10":
          $(".count").text("無折扣");
          return this.cup_count = "1"
        case "20":
          $(".count").text("0.9");
          return this.cup_count = "0.9"
        case "30":
          $(".count").text("0.8");
          return this.cup_count = "0.8"
        case "40":
          $(".count").text("0.7");
          return this.cup_count = "0.7"
        case "50":
          $(".count").text("0.6");
          return this.cup_count = "0.6"
          
      }
    },
    //杯數折扣金額
    group_ord_count1()
    {;
      console.log("無折扣");
      this.group_ord_price_1 =  Math.round(this.group_ord_price * this.count)
      return this.group_ord_price_1
    },
    //優惠卷折扣金額
    group_ord_count2()
    {
      //原價 * 杯折 * 優惠卷
      if (this.couDiscount == "")
      {
        this.group_ord_price_2 = this.group_ord_count1 
        return this.group_ord_price_2
      } else
      {
        this.group_ord_price_2 = Math.round(this.group_ord_count1 * this.couDiscount)
        return this.group_ord_price_2
      }
      
    },
    fullCard(){
      this.full_card = `${this.card1}-${this.card2}-${this.card3}-${this.card4}`
      return this.full_card;
    },
    dealDate(){
      this.deal_date= `${this.month}/${this.year}`
      return this.deal_date;
    }
    
  },
  
  mounted()
  {
    // this.selectMemCoupon();
    this.selectGroupNo();
    //總杯數
    this.get_order_total_cup();
    //總價
    this.get_order_total();
    this.get_group_ord_item();
    
    //PHONE
    if (localStorage.phone) {
      this.phone = localStorage.phone;
      }
    // 持卡姓名
    // if (localStorage.name) {
    //   this.name = localStorage.name;
    //   }
    //卡號
    // if(localStorage.card1){
    //    this.card1 = localStorage.card1;
    // }
    // if(localStorage.card2){
    //    this.card2 = localStorage.card2;
    // }
    // if(localStorage.card3){
    //    this.card3 = localStorage.card3;
    // }
    // if(localStorage.card4){
    //    this.card4 = localStorage.card4;
    // }
    //有效期限
    // this.selectMemCoupon();
  },
  created()
  {
    //會員優惠卷
    // this.selectMemCoupon();
  },
  updated()
  {
    //會員優惠卷
    // this.selectMemCoupon();
  },
  watch: {
    cou_dis()
    {
      this.DiscountCOU();
    },
    phone(newphone) {
      localStorage.phone = newphone;
    },
    //持卡姓名
    name(newName) {
      localStorage.name = newName;
    },
    //卡號
    // card1(newCard1){
    //   localStorage.card1 = newCard1;
    // },
    // card2(newCard2){
    //   localStorage.card2 = newCard2;
    // },
    // card3(newCard3){
    //   localStorage.card3 = newCard3;
    // },
    // card4(newCard4){
    //   localStorage.card4 = newCard4;
    // },
    
    //有效期限
    // dealDate(newdealDate){
    //   localStorage.dealDate = newdealDate;
    // },
    //安全碼
    
    
  },
  created() {
      //切割字串
      this.group_ord_no = window.location.search.split("=")[1];
      //接會員資料
      member.$on('memberInfo', this.get_mem_info);
    },
  methods: {
   //優惠卷折扣
   DiscountCOU()
   {
     switch (this.cou_dis)
     {
       case "0.6":
         $(".countA").text("六折");
         return this.cou_count = "0.6";
       case "0.7":
         $(".countA").text("七折");
         return this.cou_count = "0.7";
       case "0.8":
         $(".countA").text("八折");
         return this.cou_count = "0.8";
       case "0.9":
         $(".countA").text("九折");
         return this.cou_count = "0.9";
     }
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
      console.log("會員錯");
      location.href = `./join_list.html`
    } 
    else if (group_state == 2)
    {
      console.log("訂單2");
      location.href = `./join_list.html`
    } else
    {
      console.log("GOOD");
    }
    },
  //抓開團團長編號抓圖片資料
    selectHead_mem_img: async function ()
    {
      console.log(this.group_ord.head_mem_no)
      const res = await fetch("./php/select_img.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mem_no: this.group_ord.head_mem_no,
        }),
      })
      .then((res) => res.json())
      .then((res) => (this.head_info = res));
      // this.group_ord_total_cup = res.group_ord_total_cup
      },
  //用會員編號抓優惠卷
  selectMemCoupon: async function ()
  {
    
    const res = await fetch("./php/select_mem_coupon.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mem_no: this.mem_no,
      }),
    })
      .then((res) => res.json())
      .then((res) => (this.coupon = res));
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
    this.ckeckWho();
    this.selectHead_mem_img();
    },
    //抓總杯數
  get_order_total_cup: async function () {
    const res = await fetch('./php/get_order_total_cup.php', {
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
    this.group_ord_total_cup = res.group_ord_total_cup
      // .then((res) => res.json())
      // .then((res) => console.log(res.group_ord_total))
      // .then((res) => (this.group_total = res))
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
    this.group_ord_price = res.group_ord_total
      // .then((res) => res.json())
      // .then((res) => console.log(res.group_ord_total))
      // .then((res) => (this.group_total = res))
  },
  //警告視窗開關
  XError: function ()
  {
    this.Error_show = false;//警告視窗
  },
  //檢查手機格式
  check_phone()
  {
    let myreg = /^09[0-9]{8}$/;
    let phoneNumber = document.querySelector("phone");
    if (this.phone && myreg.test(this.phone))
    {
      console.log("good")
    }
    else if(this.phone =="")
    {
      this.Error_show = true;
      this.ErrorText = "請輸入電話";
      return;
    } else
    {
      this.Error_show = true;
      this.ErrorText = "電話錯誤!";
      return;
    }
  },
  cardLong()
  {
    console.log(this.fullCard.length);
    console.log(this.phone.length);
  },
    return_data(){
          this.type = 10;
      },
    close_total(){
          this.closeTotal = false;
    },
    check_total(){
          this.closeTotal = true;
  },
    //確認資料
  confirmData()
  {
    
    //20XX年
    let year_reg = /^20[21-40]{2}$/;
    //1-12
    let dateline_reg = /^(0[1-9]|1[0-2])\/[21-99]{2}$/;
    //xxxx-xxxx-xxxx-xxxx
    let card_reg = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    // 09XXXXXXXX
    let phone_reg = /^09[0-9]{8}$/;
    if (this.phone && phone_reg.test(this.phone))
    {
      console.log("phone good")
      // this.type = 11;
      if (this.name == "")
      {
        this.Error_show = true;
        this.ErrorText = "請輸入付款資訊";
        return;
      } else if (this.fullCard && card_reg.test(this.fullCard))//信用卡驗證完
      {
        console.log("card good")
        if (this.dealDate && dateline_reg.test(this.dealDate))
        {
          console.log("dealDate good");
          if (this.safeNumber == "")
          {
            this.Error_show = true;
            this.ErrorText = "請輸入安全碼";
          } else
          {
            this.type = 11; 
          }
        } else
        {
          this.Error_show = true;
          this.ErrorText = "有效期限錯誤";
        }
      } else
      {
        this.Error_show = true;
        this.ErrorText = "請輸入信用卡";
        return
      }
    }
    else if(this.phone =="")
    {
      this.Error_show = true;
      this.ErrorText = "請輸入電話";
      return;
    } else
    {
      this.Error_show = true;
      this.ErrorText = "手機輸入格式有誤";
      return;
    }
    },
    //下一步 //新增原價,折扣價,優惠
    step4 : async function()
    {
      //UP電話 備註
      let test = await fetch('./php/up_group_phone_note.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          group_ord_no: this.group_ord_no,
          group_ord_phone: this.phone,
          note: this.message,
          group_ord_price: this.group_ord_price,
          group_ord_price_1: this.group_ord_price_1,
          group_ord_price_2: this.group_ord_price_2,
          cou_no: this.couponNo,
        })
      })
      // location.href = `./join_step4.html?group_ord_no=${this.group_ord_no}`
  },
  return_step2()
  {
    location.href = `./join_step2.html?group_ord_no=${this.group_ord_no}`
  },
    //抓飲料資料
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
    get_mem_info(data){
    this.mem_info = data
      this.mem_no = data.mem_no
      this.selectMemCoupon();
   
    }
   
}
})