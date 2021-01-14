var app = new Vue({
    el: "#app",
    data: {
        group_order_item: "",
        group_ord_no: "",
        group_ord:"",
    },
    methods: {
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
          },
    },
    mounted()
    {
        // 進來就抓團的資料
        this.selectGroupNo();
        // 進來就飲料的資料
        this.get_group_ord_item();
    },
    created() {
        //切割字串
        this.group_ord_no = window.location.search.split("=")[1];
      },
})