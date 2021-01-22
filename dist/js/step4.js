var app = new Vue({
  el: "#app",
  data: {
    cou_dis:"",
    discountText:"",
    couNo:"",
    cup_count:"",
    group_order_item: "",
    group_ord_no: "",
    group_ord: "",
    mem_info:"",
    mem_no: "",
    imgId:"",
  },
  computed: {
    // discount_text()
    // {
    //   switch (this.discountText[0].cou_discount)
    // {
    //   case "":
    //     return "無折扣"
    //   case "0.6":
    //     return  "六折"
    //   case "0.7":
    //     return  "七折"  
    //   case "0.8":
    //     return  "八折"  
    //   case "0.9":
    //     return  "九折" 
    // }
    // },
    group_img()
    {
      this.imgId = this.mem_info.mem_img
      return this.imgId
    },
    getCouno()
    {
      this.couNo = this.group_ord.cou_no
      return this.couNo
    },
    //優惠卷
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
    //杯數優惠
    count_text() {
      switch (this.group_ord.goal_cup)
      {
        case "10":
          $(".count").text("無折扣");
          return this.cup_count = "無折扣"
        case "20":
          $(".count").text("0.9");
          return this.cup_count = "九折"
        case "30":
          $(".count").text("0.8");
          return this.cup_count = "八折"
        case "40":
          $(".count").text("0.7");
          return this.cup_count = "七折"
        case "50":
          $(".count").text("0.6");
          return this.cup_count = "六折"
          
      }
    },
  },
  methods: {
    //優惠卷折扣
    discount_text()
    {
      switch (this.discountText[0].cou_discount)
    {
      case "":
        $(".countA").text("無折扣")
      case "0.6":
        $(".countA").text("六折")
      case "0.7":
        $(".countA").text("七折")  
      case "0.8":
        $(".countA").text("八折")  
      case "0.9":
        $(".countA").text("九折") 
    }
    },
    select_cou: async function ()
    {
      console.log(this.group_ord.cou_no);
      const res = await fetch("./php/select_discount.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cou_no: this.getCouno,
        }),
      }) .then((res) => res.json())
        .then((res) => (this.discountText = res));
      this.discount_text();
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
          this.select_cou();
      },
      get_mem_info(data){
        this.mem_info = data
        this.mem_no = data.mem_no
        
      }
  },
  mounted()
  {
    // 進來就抓團的資料
    this.selectGroupNo();
    // 進來就飲料的資料
    this.get_group_ord_item();
    // this.select_cou();
  },
  created() {
    //抓會員資料
    member.$on('memberInfo', this.get_mem_info)
    //切割字串
    this.group_ord_no = window.location.search.split("=")[1];
    
    },
})