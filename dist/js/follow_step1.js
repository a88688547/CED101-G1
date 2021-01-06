
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
        //下層組件增加減少刪除品項，回傳storage至上層，並由addItemList接收，這樣才會動態更新
        //如果刪到沒飲料，則回傳一個false上來，隱藏品項
        parentGetStorage(theAddItemList, state) {
            if (state === false) {
                this.order = false
            }
            this.addItemList = theAddItemList
        },
        //送出訂單資料到後台
        postOrder: async function () {
            await fetch('./php/postOrder.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.postOrderData),
            })
            await this.createNewStorage()
            location.href = './follow_step2.html'
        },
        createNewStorage: async function () {
            console.log("aa")
            let dt = new Date().getTime()
            if (storage['dt'] == null) {
                storage['dt'] = ''
            }
            storage["dt"] = dt
            if (storage[`addItemList${dt}`] == null) {
                storage[`addItemList${dt}`] = ''
            }
            storage[`addItemList${dt}`] = this.addItemList
            storage['addItemList'] = ""
        },
    },
    created() {
        if (storage['addItemList'] == "") {
            this.order = false
        }
    },

    computed: {
        //要送到後台的訂單資料
        postOrderData() {
            //先創一個空陣列,裡面要放多個物件
            let dataArray = []
            //drinkItem裡面有幾個物件
            let drinkItemLength = Object.values(this.drinkItem).length
            //drinkItem裡面的key形成的陣列
            let drinkItemKeys = Object.keys(this.drinkItem);
            //drinkItem裡面的value形成的陣列
            let drinkItemValues = Object.values(this.drinkItem);


            //drinkItem內有幾個品項就做幾次，逐一把drinkItem內的value拿出來放進物件data，最後再把物件塞進陣列
            for (let i = 0; i < drinkItemLength; i++) {
                //要放在陣列裡的物件data
                let postOrderObj = {
                    group_ord_no: 1,
                    mem_no: 1,
                    drink_no: '',
                    one_price: '',
                    ord_qua: '',
                    total_price: '',
                    set_info: '',
                    cup_no: '',
                }
                //把key值取出，分割字串，再把值個別放進物件的data內
                let keyStringArray = drinkItemKeys[i].substr(0, drinkItemKeys[i].length).split(',')
                postOrderObj['drink_no'] = keyStringArray[6]
                postOrderObj['one_price'] = keyStringArray[5]
                postOrderObj['ord_qua'] = drinkItemValues[i]
                postOrderObj['total_price'] = postOrderObj['one_price'] * postOrderObj['ord_qua']
                //處理當沒有加料時的字串顯示
                if (keyStringArray[4] == "") {
                    postOrderObj['set_info'] = `${keyStringArray[2]},${keyStringArray[3]},${keyStringArray[1]},$${keyStringArray[5]}`
                } else {
                    postOrderObj['set_info'] = `${keyStringArray[2]},${keyStringArray[3]},加${keyStringArray[4]},${keyStringArray[1]},$${keyStringArray[5]}`
                }
                postOrderObj['cup_no'] = keyStringArray[1]
                //把物件塞進陣列
                dataArray.push(postOrderObj)
            }
            return dataArray
        },
        //飲品的項目及其數量
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
        //總共幾杯
        total_num() {
            let theTotalNum = 0
            for (let i = 0; i < Object.values(this.drinkItem).length; i++) {
                theTotalNum += Object.values(this.drinkItem)[i]
            }
            return theTotalNum
        },
        //總價格
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
                    <person-drink v-for="(value,key) in drinkItem" :key_="key" :value_="value" @childStorageToParent="parentGetStorage"></person-drink>
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
                            <!-- <input type="button" value="確認送出" onclick="location.href='./follow_step2.html'"> -->
                            <input type="button" value="確認送出" @click="postOrder">
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>
    `,
})

//購買的飲料清單
Vue.component('personDrink', {
    //上層組件傳了drinkItem裡的key跟value來，下層組件使用props接收
    props: ['key_', 'value_'],
    data() {
        return {
            //飲品的詳細資訊，將其切割成陣列
            propsKey: this.key_.substr(0, this.key_.length).split(','),
            //每個飲品的數量
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
            //修改storage的資料後，將storage傳遞至上層組件，藉此更新drinkItem
            this.$emit('childStorageToParent', storage['addItemList'])
        },

        //增加杯數
        handlePlus() {
            this.num++
            storage['addItemList'] += `${this.key_}|`
            //修改storage的資料後，將storage傳遞至上層組件，藉此更新drinkItem
            this.$emit('childStorageToParent', storage['addItemList'])
        },

        //刪除飲品
        deleteItem() {
            let state = false
            storage['addItemList'] = storage['addItemList'].replaceAll(`${this.key_}|`, "")
            //修改storage的資料後，將storage傳遞至上層組件，藉此更新drinkItem，由於可能是刪到沒有飲品，
            //因此多傳遞一個false給上層，判斷將飲品資料都隱藏
            if (storage['addItemList'] == "") {
                this.$emit('childStorageToParent', storage['addItemList'], state)
            } else {
                this.$emit('childStorageToParent', storage['addItemList'])
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

//燈箱內的飲品資訊
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