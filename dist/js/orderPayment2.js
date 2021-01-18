let storage = sessionStorage;

Vue.component('top', {
    template: `
<div class="step_box">
        <ul class="step_ball">
            <li>
                <img src="./Images/join_list/step_1_icon.svg" alt="">
                <h5>1.建立訂單</h5>
            </li>
            <li>
                <img src="./Images/join_list/step_3_icon.svg" alt="">
                <h5>2.訂單頁面</h5>
            </li>
            <li>
                <img src="./Images/join_list/step_4_icon.svg" alt="">
                <h5>3.訂單完成</h5>
            </li>
        </ul>
    </div>
`
}),

    // 燈箱內購買的飲料列表
    Vue.component('drinklist', {
        props: ['drink', 'value_', 'key_'],
        data() {
            return {
            }
        },
        template: `
            <div class="Modal_group_order_done_person_drink" >
                <section id="Modal_drink_title_wrapper"  >
                    <div class="Modal_group_order_done_person_drink_title">{{value_.title}}-{{value_.size}}</div> 
                    <div class="Modal_group_order_done_person_drink_note" v-if='this.value_.others === "" '>{{value_.ice}}/{{value_.suger}}/&#36{{value_.price*value_.cup}}/{{value_.cup}}杯</div>
                    <div class="Modal_group_order_done_person_drink_note" v-else>{{value_.ice}}/{{value_.suger}}/加{{value_.others}}/&#36{{value_.price*value_.cup}}/{{value_.cup}}杯</div>                      
                    <input type="hidden" name="drinklist[title][]" :value="this.value_.title">             
                    <input type="hidden" name="drinklist[size][]" :value="this.value_.size"> 

                    <input type="hidden" name="drinklist[cup][]" :value="this.value_.cup"> 
                    <input type="hidden" name="drinklist[price][]" :value="this.value_.price"> 
                    <input type="hidden" name="drinklist[drinkno][]" :value="this.value_.drinkno"> 
                    <input type="hidden" name="drinklist[set][]" :value="this.value_.ice + '/' + this.value_.suger + '/' + this.value_.others"> 
                  
                </section>            
            </div>
       
        `,
    }),

    new Vue({
        el: "#app",

        data() {
            return {
                mem_info: "",
                info_phone: storage["info_phone"],
                info_address: storage["info_address"],
                info_note: storage["info_note"],
                cardno: storage["cardno"],
                exp_month: storage["exp_month"],
                exp_year: storage["exp_year"],
                safeno: storage["safeno"],
                cardname: storage["cardname"],
                totalcup: storage["totalcup"],
                totalprice: storage["totalprice"],
                drink: [],
                cou_discount: storage["cou_discount"],
                cou_code: storage["cou_code"],
                cou_no: storage["cou_no"],
                //燈箱
                show: false,
                // 杯數折扣
                cup_dis: storage["cup_dis"],
            }
        },

        methods: {
            // 修改信用卡後三碼為*
            action() {
                let cardno = storage["cardno"]
                this.cardno = cardno.substr(0, 16) + "***"
            },
            drinklist() {
                let tmp = storage["addDrinkList"]
                let arr = JSON.parse(tmp)
                for (let i = 0; i < arr.length; i++) {
                    this.drink.push({
                        title: arr[i].drink_name,
                        size: arr[i].cup_value,
                        suger: arr[i].sugar_value,
                        ice: arr[i].ice_value,
                        others: arr[i].ingredient_value,
                        price: arr[i].shop_price,
                        cup: arr[i].num_feedback,
                        drinkno: arr[i].drink_no,
                    });
                }
            },
            // 燈箱開關
            check() {
                this.show = true
            },
            close() {
                this.show = false
            },
            // 若未使用折價券，則*1
            count() {
                if (this.cou_discount === "") {
                    this.cou_discount === 1
                }
            },

            // 使用PHP從後台判斷折數
            // cupdis() {
            //     let totalcup = storage["totalcup"]
            //     let xhr = new XMLHttpRequest();
            //     xhr.onload = function () {
            //         if (xhr.status == 200) {
            //             this.cupdis = (xhr.responseText);
            //             let arr = JSON.parse(this.cupdis)
            //             // alert(this.cupdis)
            //             let cup_dis = arr[0].dis_count
            //             // console.log(cup_dis)
            //             storage["cup_dis"] = cup_dis
            //         }
            //         else {
            //             alert(xhr.status);
            //         }
            //     }
            //     //建立好Get連接
            //     var url = "./php/personpayment2.php?dis_cup=" + totalcup;
            //     xhr.open("Get", url, true);
            //     //送出請求 
            //     xhr.send(null);
            // },

            // JS判斷折數
            dis() {
                let discuptotal
                let totalcup = parseInt(this.totalcup)
                switch (true) {
                    case totalcup < 20:
                        this.cup_dis = 1
                        storage["cup_dis"] = 1
                        break;

                    case totalcup >= 20 && totalcup < 30:
                        this.cup_dis = 0.9
                        storage["cup_dis"] = 0.9
                        break;

                    case totalcup >= 30 && totalcup < 40:
                        this.cup_dis = 0.8
                        storage["cup_dis"] = 0.8
                        break;

                    case totalcup >= 40 && totalcu < 50:
                        this.cup_dis = 0.7
                        storage["cup_dis"] = 0.7
                        break;

                    default:
                        this.cup_dis = 0.6
                        storage["cup_dis"] = 0.6
                }

            },
            checked_mem(data) {
                this.mem_info = data
                if (this.mem_info.mem_no === undefined) {
                    location.href = `./homepage.html`
                }
            }
            // ----------test--------------------
            // send() {
            // var arr1 = [];
            // arr1[0] = 1;
            // arr1[1] = 3;
            // arr1[3] = 8;
            // let vm = this;
            // console.log(vm.drink)
            // $.ajax({

            //     url: './php/personsend.php', // 要傳送的頁面
            //     method: 'POST',               // 使用 POST 方法傳送請求
            //     dataType: 'html',             // 回傳資料會是 json 格式
            //     data: { "arr": arr1 },  // 將表單資料用打包起來送出去
            //     success: function (res) {       // 成功以後會執行這個方法
            //         console.log('good');
            //         console.log(res);
            //         app.comList = res;
            //         console.log(app.comList);
            //     },
            //     error: function (res) {
            //         console.log('not good');
            //         console.log(res);
            //     },
            // });

            // }


        },
        computed: {
            discuptotal: function () {
                // console.log(this.totalprice * this.cup_dis)
                return Math.round(this.totalprice * this.cup_dis)
            },
            discoutotal: function () {
                return Math.round(this.totalprice * this.cup_dis * this.cou_discount)
            }
        },

        mounted() {

        },

        created() {
            this.action()
            this.drinklist()
            this.count()
            this.dis()


        },

    })