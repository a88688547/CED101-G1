var app = new Vue({
    el: "#app",
    data: {
      firstQR:true,
      confirm: false,
      group_order_item:"",
      group_ord: [],
      group_ord_no: "",
        msg: "123",
      cup_text:"",
      //QR網址
      URL: window.location.search,
    },
  methods: {
    test()
    {
      console.log(this.group_ord)
        },
        closeBox()
        {
            this.confirm = false;
        },
        close_btn()
        {
            this.firstQR = false;
        },
        change(){
            this.confirm = true;
        },
        addDrink()
        {
            location.href = `./menu.html?group_ord_no=${this.group_ord_no}`
        },
        nextStep(){
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
    },
    computed: {
     
    },
    watch:{
      
    },
    created() {
      //切割字串
      
      this.group_ord_no = window.location.search.split("=")[1];
      
    },
    mounted()
    {
      console.log(this.group_ord);
      this.selectGroupNo();
      this.get_group_ord_item();
    },
  });