var app = new Vue({
  el:"#app",
  data:{
    //訂單編號
    group_ord_no: "",
    //訂單資料
    group_order_item: "",
    //警告框
    Error_show: false,
    ErrorText: "警告字",
    //會員資料
    mem_info:"",
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
    console.log(this.card1.length);
    this.get_group_ord_item();
    // 持卡姓名
    if (localStorage.name) {
      this.name = localStorage.name;
      }
    //卡號
    if(localStorage.card1){
       this.card1 = localStorage.card1;
    }
    if(localStorage.card2){
       this.card2 = localStorage.card2;
    }
    if(localStorage.card3){
       this.card3 = localStorage.card3;
    }
    if(localStorage.card4){
       this.card4 = localStorage.card4;
    }
    //有效期限
    
  },
  watch: {
    //持卡姓名
    name(newName) {
      localStorage.name = newName;
    },
    //卡號
    card1(newCard1){
      localStorage.card1 = newCard1;
    },
    card2(newCard2){
      localStorage.card2 = newCard2;
    },
    card3(newCard3){
      localStorage.card3 = newCard3;
    },
    card4(newCard4){
      localStorage.card4 = newCard4;
    },
    
    //有效期限
    dealDate(newdealDate){
      localStorage.dealDate = newdealDate;
    },
    //安全碼
    
    
  },
  created() {
      //切割字串
      this.group_ord_no = window.location.search.split("=")[1];
      //接會員資料
      member.$on('memberInfo', this.get_mem_info);
    },
methods: {
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
          this.ErrorText = "請輸入信用卡有效期限";
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
      this.ErrorText = "電話錯誤";
      return;
    }
    },
    //下一步
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
          note:this.message
        })
      })
      location.href = `./join_step4.html?group_ord_no=${this.group_ord_no}`
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
    this.mem_no = data.memNo
    }
   
}
})