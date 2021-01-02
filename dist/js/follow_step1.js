
let storage = sessionStorage;
Vue.component('orderlist', {
    data() {
        return {
            // 是否有品項，沒有的話就不顯示list
            order: true,
            //把storage['addItemList']存在data的變數，變動時drinkItem才會跟著變動
            addItemList: storage['addItemList'],
            // 燈箱開關
            lightBoxOpen: false,
        }
    },
    methods: {
        xyz(theAddItemList, state) {
            if (state === false) {
                this.order = false
            }
            this.addItemList = theAddItemList
        }
    },
    created() {
        if (storage['addItemList'] == "") {
            this.order = false
        }
    },

    computed: {

        drinkItem() {
            let itemString = this.addItemList
            let items = itemString.substr(0, itemString.length - 1).split('|');
            let obj = {}
            //判斷陣列中飲料品項是否重複
            //把陣列中每個item拿出來執行
            items.forEach((item, index) => {
                // 若obj內有這個item，就跳出迴圈
                if (obj[item]) {
                    return
                }
                //再把陣列中每個item拿出來執行
                for (i = 0; i < items.length; i++) {
                    //第i個item有與陣列其他item重複，才執行以下
                    if (item === items[i]) {
                        //如果obj有這個item，這個item(key)的數量就加1(value)
                        if (obj[item]) {
                            obj[item] = obj[item] + 1
                        } else {
                            //因為原本obj內什麼都沒有，因此第一個item一定會加到obj內
                            //如果obj內沒有這個item，就把這個item加入新的key值，其value為1
                            obj[item] = 1
                        }
                    }
                }
            })
            //最後結果 => 例: arr = [a,a,b,c,c] obj={a:2,b:1,c:2}
            // console.log(obj)
            return obj


        },
        total_num() {
            let theTotalNum = 0
            for (let i = 0; i < Object.values(this.drinkItem).length; i++) {
                theTotalNum += Object.values(this.drinkItem)[i]
            }
            return theTotalNum
        },
        total_price() {
            let theTotalPrice = 0

            let objKeys = Object.keys(this.drinkItem)
            if (objKeys == "") {
                objKeys = 0
            }
            for (let i = 0; i < objKeys.length; i++) {
                theTotalPrice += objKeys[i].substr(0, objKeys[i].length).split(',')[5] * Object.values(this.drinkItem)[i]
            }

            return theTotalPrice
        },

    },
    template: `
    <div>
        <div id="order_list" v-if="order">
            <!-- 每個人  -->
            <div class="group_order_done_person">
                <div class="group_order_done_person_upbox">
                    <div class="group_order_done_person_img"><img src="./Images/user_big.svg" /></div>
                    <div class="group_order_done_person_name">徐朝亭</div>
                </div>
                <div class="group_order_done_person_downbox">
                    <!-- 購買的 飲料 -->
                    <person-drink v-for="(value,key) in drinkItem" :key_="key" :value_="value" @abc="xyz"></person-drink>
                </div>
                <div class="group_order_done_person_total" >
                    <div>總計</div>
                    <div class="group_order_done_person_total_cup">{{total_num}}杯</div>
                    <div class="group_order_done_person_total_price">&#36 {{total_price}}</div>
                </div>
            </div>
        </div>

        <div id="ListTotal_wrapper">
            <div class="ListTotal">
                <div class="payTotal">
                    <h2>應付金額</h2>
                </div>
                <div id="line">
                    <hr>
                </div>
                <div>
                    <h2><span>$.</span><span id="ordPrice">{{total_price}}</span></h2>
                </div>
            </div>
            <div class="orderbtn">
                <div><a href="orderPaymentGroup.html">繼續加購</a></div>
                <div class="nextStep" @click="lightBoxOpen = true"><a href="#" >建立訂單</a></div>
            </div>
        </div>
        
        <!-- 燈箱 -->
        <div class="orderModal" v-if="lightBoxOpen">
            <div class="modalContent">
                <div class="Top">
                    <h5>訂單明細</h5>
                    <img src="Images/close.svg" class="close" @click="lightBoxOpen = false">
                </div>
                <form>
                    <div class="orderList">
                        <!-- 購買列表 -->
                        <div class="listInfo">
                            <!-- 每個人  -->
                            <div class="Modal_group_order_done_person" v-if="order">
                                <div class="Modal_group_order_done_person_upbox">
                                    <div class="Modal_group_order_done_person_infobox">
                                        <div class="Modal_group_order_done_person_img"><img src="./Images/user_big.svg" />
                                        </div>
                                        <div class="Modal_group_order_done_person_name">徐朝亭</div>
                                    </div>
                                    <div class="Modal_group_order_done_person_total">
                                        <div class="Modal_group_order_done_person_total_cup">{{total_num}}杯</div>
                                        <div class="Modal_group_order_done_person_total_price">&#36 {{total_price}}</div>
                                    </div>
                                </div>
                                <div class="Modal_group_order_done_person_downbox">
                                    <!-- 購買的 飲料 -->
                                    <modal-person-drink v-for="(value,key) in drinkItem" :key_="key" :value_="value"></modal-person-drink>
                                </div>
                            </div>
                        </div>


                        <div class="amount">
                            <div class="totalAmount">
                                <h4>應付金額</h4>
                            </div>
                            <div class="modalLine">
                                <hr>
                            </div>
                            <div class="totalPrice">
                                <h4>$<span>{{total_price}}</span></h4>
                            </div>
                        </div>
                        <div class="sendbtn">
                            <input type="button" value="確認送出" onclick="location.href='./follow_step2.html'">
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>
    `,
})

Vue.component('personDrink', {
    props: ['key_', 'value_'],
    data() {
        return {
            propsKey: this.key_.substr(0, this.key_.length).split(','),
            num: this.value_,

        }
    },
    methods: {
        //減少杯數
        handleSub() {

            if (this.num <= 1) {
                this.num = 1
            } else {
                this.num--
                storage['addItemList'] = storage['addItemList'].replace(`${this.key_}|`, "_")
                storage['addItemList'] = storage['addItemList'].replace(`${this.key_}|`, "")
                storage['addItemList'] = storage['addItemList'].replace("_", `${this.key_}|`)
            }
            this.$emit('abc', storage['addItemList'])

        },

        //增加杯數
        handlePlus() {
            this.num++
            storage['addItemList'] += `${this.key_}|`
            this.$emit('abc', storage['addItemList'])
        },

        deleteItem() {
            let state = false
            storage['addItemList'] = storage['addItemList'].replaceAll(`${this.key_}|`, "")
            if (storage['addItemList'] == "") {
                this.$emit('abc', storage['addItemList'], state)
            } else {
                this.$emit('abc', storage['addItemList'])
            }
        }
    },
    computed: {
        drink_name() {
            return this.propsKey[0]
        },
        cup() {
            return this.propsKey[1]
        },
        sugar() {
            return this.propsKey[2]
        },
        ice() {
            return this.propsKey[3]
        },
        ingredient() {
            return this.propsKey[4]
        },
        price() {
            return this.propsKey[5]
        },
    },
    template: `
    <div class="group_order_done_person_drink">
        <section id="drink_title_wrapper">
            <div class="group_order_done_person_drink_title">{{drink_name}}-{{cup}}</div>
            <div class="group_order_done_person_drink_note" v-if="ingredient">{{ice}}/{{sugar}}/加{{ingredient}}</div>
            <div class="group_order_done_person_drink_note" v-else>{{ice}}/{{sugar}}</div>
        </section>
        <section id="num_btn">
            <button @click="handleSub">
                <div></div>
            </button>
            <div id="num_feedback">{{num}}</div>
            <button @click="handlePlus">+</button>
            <span>杯</span>
        </section>
        <section id="mob_line">
        </section>
        <section id="item_single_price">
            &#36{{price * num}}
        </section>
        <section class="order_delete_btn" @click="deleteItem">
            <img src="./Images/trash_big.svg" alt="" >
            <img src="./Images/trash_small.svg" alt="">
        </section>
    </div>
    `,

})

Vue.component('modalPersonDrink', {
    props: ['key_', 'value_'],
    data() {
        return {
            propsKey: this.key_.substr(0, this.key_.length).split(','),
            num: this.value_,

        }
    },
    computed: {
        drink_name() {
            return this.propsKey[0]
        },
        cup() {
            return this.propsKey[1]
        },
        sugar() {
            return this.propsKey[2]
        },
        ice() {
            return this.propsKey[3]
        },
        ingredient() {
            return this.propsKey[4]
        },
        price() {
            return this.propsKey[5]
        },
    },
    template: `
    <div class="Modal_group_order_done_person_drink">
        <div class="Modal_group_order_done_person_drink_title">{{drink_name}}-{{cup}}</div>
        <div class="Modal_group_order_done_person_drink_note" v-if="ingredient">{{ice}}/{{sugar}}/加{{ingredient}}/&#36{{price * num}}/{{num}}杯</div>
        <div class="Modal_group_order_done_person_drink_note" v-else>{{ice}}/{{sugar}}/&#36{{price * num}}/{{num}}杯</div>
    </div>
    `,
})

new Vue({
    el: "#app",
    // data: {
    //     isShow: true,
    // },
    // provide() {
    //     return {
    //         reload: this.reload
    //     }
    // },
    // methods: {
    //     reload() {
    //         // 先隱藏
    //         this.isShow = false
    //         // $nextTick() 將回調延遲到下次 DOM 更新循環之後執行
    //         this.$nextTick(() => {
    //             this.isShow = true
    //         })
    //     },
    // },
})