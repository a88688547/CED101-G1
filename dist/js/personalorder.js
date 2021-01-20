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


    Vue.component('order', {
        data() {
            return {
                drink: [],
                totalcup: 0,
                totalprice: 0,
            }
        },
        props: ["mem_info"],
        methods: {
            action() {
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
            total() {
                let tmp = storage["addDrinkList"]
                let arr = JSON.parse(tmp)
                let totalcup = 0
                let totalprice = 0
                for (i = 0; i < arr.length; i++) {
                    totalcup += parseInt(arr[i].num_feedback);
                    totalprice += parseInt(arr[i].shop_price) * parseInt(arr[i].num_feedback);
                }
                this.totalcup = totalcup;
                this.totalprice = totalprice;

                // ===把總杯數、總價 寫入session===

                storage["totalcup"] = this.totalcup
                storage["totalprice"] = this.totalprice
            },


        },
        created() {
            this.action();
            this.total()
        },

        template: `  
    
   
    <div id="order_list" >
        <!-- 每個人  -->
        <div class="group_order_done_person">
            <div class="group_order_done_person_upbox">
                <div class="group_order_done_person_img"><img :src="mem_info.mem_img"></div>
                <div class="group_order_done_person_name">{{this.mem_info.mem_name}}</div>
            </div>
            <div class="group_order_done_person_downbox">
                <!-- 購買的 飲料 -->
                <drinklist  @add-sum="total" @minus-sum="total" @del="total" v-for="(value,key) in drink" :key_="key" :value_="value" :drink="drink"></drinklist>
            </div>
            <div class="group_order_done_person_total">
                <div>總計</div>
                <div class="group_order_done_person_total_cup" >{{totalcup}}杯</div>
                <div class="group_order_done_person_total_price">&#36 {{totalprice}}</div>
            </div>
        </div>
        
        <!-- 按鈕 -->
        <div class="bottombutton">
            <div><input type="button" value="繼續加購" class="back" onclick="window.history.go(-1)"></div>
            <div><input type="button" value="建立訂單" class="go" onclick="javascript:location.href='orderPayment.html'">
            </div>
        </div>     
    </div>
    </div>
     
    `,
    }),

    Vue.component('drinklist', {
        props: ['drink', 'value_', 'key_'],
        data() {
            return {

            }
        },

        methods: {
            minus(index) {
                if (this.value_.cup > 1) {
                    this.value_.cup--;

                    // debugger
                    let tmp = storage['addDrinkList'];
                    let arr = JSON.parse(tmp);
                    arr[index].num_feedback--;
                    storage['addDrinkList'] = JSON.stringify(arr);
                    this.$emit('minus-sum')
                }
            },

            add(index) {
                this.value_.cup++;

                // debugger
                let tmp = storage['addDrinkList'];
                let arr = JSON.parse(tmp);
                arr[index].num_feedback++;
                storage['addDrinkList'] = JSON.stringify(arr);
                this.$emit('add-sum')
            },

            del(index) {
                this.drink.splice(index, 1)
                // console.log(this.drink)

                let tmp = storage['addDrinkList'];
                let arr = JSON.parse(tmp);
                // console.log(arr[index])
                arr.splice(index, 1)
                storage['addDrinkList'] = JSON.stringify(arr);
                // console.log(arr)
                this.$emit('del')
            },
        },

        template: `
        <div class="group_order_done_person_drink">
            <section id="drink_title_wrapper">
                <div class="group_order_done_person_drink_title">{{value_.title}}-{{value_.size}}</div>
                <div class="group_order_done_person_drink_note" v-if='this.value_.others === "" '>{{value_.ice}}/{{value_.suger}}</div>
                <div class="group_order_done_person_drink_note" v-else>{{value_.ice}}/{{value_.suger}}/加{{value_.others}}</div>
            
                </section>
            <section id="num_btn">
                <button @click="minus(key_)">
                    <div></div>
                </button>
                <div id="num_feedback">{{value_.cup}}</div>
                <button @click="add(key_)">+</button>
                <span>杯</span>
            </section>
            <section id="mob_line">
            </section>
            <section id="item_single_price">
                &#36{{value_.price*value_.cup}}
            </section>
            <section class="order_delete_btn" @click="del(key_)" >
                <img src="./Images/trash_big.svg" alt="">
                <img src="./Images/trash_small.svg" alt="">
            </section>
        </div>
        `,
    })

new Vue({
    el: '#app',
    data: {
        mem_info: "",
    },
    methods: {
        checked_mem(data) {
            this.mem_info = data
            // console.log(this.mem_info.memNo)
            if (this.mem_info.mem_no === undefined) {
                location.href = `./homepage.html`
            }
        }

    },
    mounted() {

    },
    created() {
        // checked_mem()
    },

})