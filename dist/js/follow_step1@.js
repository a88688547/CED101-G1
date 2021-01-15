
let storage = sessionStorage;
let web_group_no = window.location.search.split("=")[1]
let storage_key = `addItemList_group=${web_group_no}`
const bus = new Vue();
Vue.component('groupinfo', {
    data() {
        return {
            groupInfo: [],
            nowTime: new Date().getTime(), //現在時間毫秒
            watchNum: 0,
            timer: null,   //計時器
            inTime: true, //現在時間還早於結單時間
        }
    },
    mounted() {
        //後台撈出團的資料
        fetch(`./php/group_menu.php?group_ord_no=${web_group_no}`, {
            method: 'GET', // or 'PUT'
            // body: JSON.stringify(this.item_type), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .then(res => this.groupInfo = res);
        this.timer = setInterval(this.getWatchNum, 1000)
    },
    //離開時清除定時器
    beforeDestroy() {
        clearInterval(this.timer)
    },
    methods: {
        showNoSeconds(time) {
            let secondsIndex = time.length - 3
            let noSecondsTime = time.substring(0, secondsIndex)
            return noSecondsTime
        },

        getWatchNum() {
            this.watchNum++
        },
        countDown() {
            let endTime = new Date(this.groupInfo[0].deadline_time)
            let endTimeSec = endTime.getTime() //節單時間總毫秒數
            let offsetTime = (endTimeSec - this.nowTime) / 1000 // ** 以秒為單位
            //如果現在時間晚於結單時間
            if (offsetTime <= 0) {
                //inTime為false，限時會顯示已截止
                this.inTime = false
                //並傳送一個false參數給menu組件
                bus.$emit('intimeGoFollow_step2', this.inTime)
            }
        },
    },
    watch: {
        watchNum() {
            this.nowTime = new Date().getTime()
            this.countDown()
        }
    },
    computed: {
        count() {
            switch (this.groupInfo[0].goal_cup) {
                case "20":
                    return "9折"
                case "30":
                    return "8折"
                case "40":
                    return "7折"
                case "50":
                    return "6折"
                default:
                    return "無"
            }
        }
    },
    template: `
    <div id="group_info">
        <ul v-for="(item,index) in groupInfo">
            <li><span>團名</span><span>{{item.group_name}}</span></li>
            <li><span>結單時間</span><span class="time">{{showNoSeconds(item.deadline_time)}}</span></li>
            <li><span>預計送達時間</span><span class="time">{{showNoSeconds(item.arrive_time)}}</span></li>
            <li><span>目標杯數</span><span>{{item.goal_cup}}杯 / {{count}}優惠</span></li>
            <li><span>取貨地點</span><span>{{item.group_adress}}</span></li>
        </ul>
    </div>
    `,
})
Vue.component('orderlist', {
    data() {
        return {
            // 是否有品項，沒有的話就不顯示list
            order: true,
            //把storage[`${storage_key}`]存在data的變數，變動時drinkItem才會跟著變動
            addItemList: storage[`${storage_key}`],
            // 燈箱開關
            lightBoxOpen: false,
            //現在時間是否早於結單時間，以此判斷是否要前往下一頁
            inTimeCart: true,
            mem_info: "",
        }
    },
    mounted() {
        member.$on('memberInfo', (data) => {
            this.mem_info = data
            if (this.mem_info === "") {
                location.href = 'homepage.html'
            }
        })
        bus.$on('intimeGoFollow_step2', _inTime => this.inTimeCart = _inTime)
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
        //判斷送出的當前時間是否已經截止
        checkIntimeToPostOrder() {
            if (this.inTimeCart) {
                this.postOrder()
            } else {
                bus.$emit('getAlert', "跟團時間已截止")
            }
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
            location.href = `./follow_step2.html?group_ord_no=${web_group_no}`
        },
        //送訂單到後台後，把原本的storage清掉，再使用當前時間創建一個唯一的storage讓下一頁使用
        createNewStorage: async function () {
            let dt = new Date().getTime()
            if (storage['dt'] == null) {
                storage['dt'] = ''
            }
            storage["dt"] = dt
            if (storage[`${storage_key}${dt}`] == null) {
                storage[`${storage_key}${dt}`] = ''
            }
            storage[`${storage_key}${dt}`] = this.addItemList
            storage[`${storage_key}`] = ""
        },
        //建立訂單，開啟確認燈箱
        openLightBox() {
            if (storage[`${storage_key}`] == "") {
                bus.$emit('getAlert', "請加飲料至購物車")
            } else {
                this.lightBoxOpen = true
            }
        },
        //繼續加購
        goToMenu() {
            location.href = `./menu.html?group_ord_no=${web_group_no}`
        },


    },
    created() {
        if (storage[`${storage_key}`] == "") {
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
                //把key值取出，分割字串，再把值個別放進物件的data內
                let keyStringArray = drinkItemKeys[i].substr(0, drinkItemKeys[i].length).split(',')

                //飲料配置處理
                let set_info_text = ""
                for (let j = 4; j < keyStringArray.length; j++) {
                    set_info_text += `${keyStringArray[j]},`
                }
                set_info_text += `${keyStringArray[2]},$${keyStringArray[3]}`

                //要放在陣列裡的物件data
                let postOrderObj = {
                    group_ord_no: web_group_no, //團號
                    mem_no: this.mem_info.memNo, //會員編號
                    drink_no: keyStringArray[1], //飲料編號
                    one_price: keyStringArray[3], //單杯價格
                    ord_qua: drinkItemValues[i], //該品項杯數
                    total_price: keyStringArray[3] * drinkItemValues[i], //總價格
                    set_info: set_info_text, //飲料配置
                    cup_no: keyStringArray[2], //大杯小杯
                }



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
                theTotalPrice += objKeys[i].substr(0, objKeys[i].length).split(',')[3] * Object.values(this.drinkItem)[i]
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
                    <div class="group_order_done_person_img"><img :src="mem_info.memImg" /></div>
                    <div class="group_order_done_person_name">{{mem_info.memName}}</div>
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
                    <h2><span>$</span><span id="ordPrice">{{total_price}}</span></h2>
                </div>
            </div>
            <div class="orderbtn">
                <div @click="goToMenu">繼續加購</div>
                <div class="nextStep" @click="openLightBox"><a href="#" >建立訂單</a></div>
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
                                        <div class="Modal_group_order_done_person_img"><img :src="mem_info.memImg" />
                                        </div>
                                        <div class="Modal_group_order_done_person_name">{{mem_info.memName}}</div>
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
                            <input type="button" value="確認送出" @click="checkIntimeToPostOrder">
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

            num: this.value_, //每個飲品的數量
            alertLightbox: false,
        }
    },
    methods: {
        //減少杯數
        handleSub() {

            if (this.num <= 1) {
                this.num = 1
            } else {
                this.num--
                storage[`${storage_key}`] = storage[`${storage_key}`].replace(`${this.key_}|`, "_")
                storage[`${storage_key}`] = storage[`${storage_key}`].replace(`${this.key_}|`, "")
                storage[`${storage_key}`] = storage[`${storage_key}`].replace("_", `${this.key_}|`)
            }
            //修改storage的資料後，將storage傳遞至上層組件，藉此更新drinkItem
            this.$emit('childStorageToParent', storage[`${storage_key}`])
        },

        //增加杯數
        handlePlus() {
            this.num++
            storage[`${storage_key}`] += `${this.key_}|`
            //修改storage的資料後，將storage傳遞至上層組件，藉此更新drinkItem
            this.$emit('childStorageToParent', storage[`${storage_key}`])
        },

        //刪除飲品
        deleteItem() {
            let state = false
            storage[`${storage_key}`] = storage[`${storage_key}`].replaceAll(`${this.key_}|`, "")
            //修改storage的資料後，將storage傳遞至上層組件，藉此更新drinkItem，由於可能是刪到沒有飲品，
            //因此多傳遞一個false給上層，判斷將飲品資料都隱藏
            if (storage[`${storage_key}`] == "") {
                this.$emit('childStorageToParent', storage[`${storage_key}`], state)
            } else {
                this.$emit('childStorageToParent', storage[`${storage_key}`])
            }
            this.alertLightbox = false
        },

    },

    computed: {
        //飲品的詳細資訊，將其切割成陣列
        propsKey() {
            return this.key_.substr(0, this.key_.length).split(',')
        },
        drink_name() {
            return this.propsKey[0]
        },
        cup() {
            return this.propsKey[2]
        },
        price() {
            return this.propsKey[3]
        },
        setItem() {
            //飲料配置處理
            let set_info_text = ""
            for (let j = 4; j < this.propsKey.length; j++) {
                set_info_text += `${this.propsKey[j]}/`
            }
            return set_info_text.substring(0, set_info_text.length - 1)
        }

    },
    template: `
    <div class="group_order_done_person_drink">
        <section id="drink_title_wrapper">
            <div class="group_order_done_person_drink_title">{{drink_name}}-{{cup}}</div>
            <div class="group_order_done_person_drink_note">{{setItem}}</div>
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
        <section class="order_delete_btn" @click="alertLightbox=true">
            <img src="./Images/trash_big.svg" alt="" >
            <img src="./Images/trash_small.svg" alt="">
        </section>
        <div class="alertLightbox_black" v-if="alertLightbox">
            <div class="alertLightboxWrapper">
                <div class="manager_lightbox_close_img" @click="alertLightbox = false"><img src="./Images/close.svg" ></div>
                <div class="alertLightbox" >
                    <div>確定要刪除?</div>
                    <div @click="deleteItem">確定</div>
                </div>
            </div>
        </div>
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
            return this.propsKey[2]
        },
        price() {
            return this.propsKey[3]
        },
        setItem() {
            //飲料配置處理
            let set_info_text = ""
            for (let j = 4; j < this.propsKey.length; j++) {
                set_info_text += `${this.propsKey[j]}/`
            }
            return set_info_text
        }

    },
    template: `
    <div class="Modal_group_order_done_person_drink">
        <div class="Modal_group_order_done_person_drink_title">{{drink_name}}-{{cup}}</div>
        <div class="Modal_group_order_done_person_drink_note">{{setItem}}&#36{{price * num}}/{{num}}杯</div>
    </div>
    `,
})

//警示視窗
Vue.component('alert_lightbox', {
    data() {
        return {
            alertLightbox: false,
            alertText: "",
        }
    },
    methods: {
        closeAlertLightbox() {
            this.alertLightbox = false
            if (this.alertText == '跟團時間已截止') {
                location.href = 'homepage.html'
            }
        }
    },
    mounted() {
        bus.$on('getAlert', (_alertText) => {
            this.alertText = _alertText
            this.alertLightbox = true
        });
    },
    template: `
    <div class="alertLightbox_black" v-if="alertLightbox">
        <div class="alertLightboxWrapper">
            <div class="alertLightbox" >
                <div>{{alertText}}</div>
                <div @click="closeAlertLightbox">確定</div>
            </div>
        </div>
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