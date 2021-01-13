var app = new Vue({
    el:"#app",
    data:{
    //訂單編號
    group_ord_no: "",
    //訂單資料
    group_order_item:"",
    oldNum:"",
      phone:"",
      message:"",
      name:"",
      card1:"",
      card2:"",
      card3:"",
      card4:"",
      full_card:"",
      deal_date:"",
      month:"",
      year:"",
      safeNumber:"",
      
      type: "10",
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
      },
    methods: {
      return_data(){
            this.type = 10;
        },
      close_total(){
            this.closeTotal = false;
      },
      check_total(){
            this.closeTotal = true;
      },
      confirmData(){
        if(this.phone == ""){
          console.log(this.phone.length);
          alert("請輸入電話");
          return
        }
        this.type = 11;
        
        },
        step4()
        {
            location.href = `./join_step4.html?group_ord_no=${this.group_ord_no}`
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
     
     }
  })