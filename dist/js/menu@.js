const bus = new Vue();
let storage = sessionStorage;
let web_group_no = window.location.search.split("=")[1]
let storage_key = `addItemList_group=${web_group_no}`
if (storage[`${storage_key}`] == null) {
    storage[`${storage_key}`] = ''
}

Vue.component('group-info', {
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
            // body: JSON.stringify({ group_ord_no: 1 }), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .then(res => this.groupInfo = res);
        this.timer = window.setInterval(this.getWatchNum, 1000)
    },
    //離開時清除定時器
    beforeDestroy() {
        clearInterval(this.timer)
    },
    methods: {
        //把秒數隱藏
        showNoSeconds(time) {
            let secondsIndex = time.length - 3
            let noSecondsTime = time.substring(0, secondsIndex)
            return noSecondsTime
        },

        getWatchNum() {
            this.watchNum++
        },
    },
    watch: {
        watchNum() {
            this.nowTime = new Date().getTime()
        }
    },
    computed: {
        //處理手機號碼
        phone() {
            let phone1 = this.groupInfo[0].mem_phone.substr(0, 4)
            let phone2 = this.groupInfo[0].mem_phone.substr(4, 3)
            let phone3 = this.groupInfo[0].mem_phone.substr(7, 3)
            thePhone = `${phone1}-${phone2}-${phone3}`
            return thePhone
        },
        //依據目標杯數處理跟團圖片
        group_img() {
            let goal_cup = this.groupInfo[0].goal_cup - 10
            return `./Images/coupon//${goal_cup}off@2x.jpg`
        },
        //倒數結單時間
        countDown() {
            let endTime = new Date(this.groupInfo[0].deadline_time.replaceAll('-', '/'))

            let endTimeSec = endTime.getTime() //節單時間總毫秒數

            let offsetTime = (endTimeSec - this.nowTime) / 1000 // ** 以秒為單位
            let sec = parseInt(offsetTime % 60); // 秒
            let min = parseInt((offsetTime / 60) % 60); // 分 ex: 90秒
            let hr = parseInt(offsetTime / 60 / 60); // 時
            let total = [{
                theHr: hr,
                theMin: min,
                theSec: sec,
            }]
            //如果現在時間晚於結單時間
            if (offsetTime <= 0) {
                //inTime為false，限時會顯示已截止
                this.inTime = false
                //並傳送一個false參數給menu組件
                bus.$emit('intimeGoFollow_step1', this.inTime)
            }
            return total
        },
    },
    template: `
    <div>
        <div  v-for="(item,index) in groupInfo">
            <!-- 揪團限時時間 -->
            <div v-if="inTime">
                <div id="countDown" v-for="(timeItem,index) in countDown"><span>限時:</span><span>{{timeItem.theHr}}</span>小時 <span>{{timeItem.theMin}}</span>分 <span>{{timeItem.theSec}}</span>秒</div>
            </div>
            <div v-else>
                <div id="countDown"><span>限時:</span><span id="inTime">已截止</span></div>
            </div>

            <div id="group_info">
                <!-- 揪團圖片 -->
                <div id="group_img"><img :src=group_img alt="" id="img_group" /></div>
                <div class="group_info_inner">
                    <!-- 團名 -->
                    <div id="name_time_wrapper">
                        <span id="group_name">{{item.group_name}}</span>
                        <div id="start_time_wrapper">
                            <span>建單時間: </span><span id="start_time">{{showNoSeconds(item.group_datetime)}}</span>
                        </div>
                    </div>
                    <div id="info_text_wrapper">
                        <section id="info_text_left">
                            <!-- 團長名稱和電話 -->
                            <div id="name_phone">
                                <div id="user_img"><img :src=item.mem_img alt="" /></div>
                                <div id="name_phone_inner">
                                    <div id="group_leader_name_wrapper">
                                        <span id="group_leader_name">{{item.mem_name}}</span><span>團長</span>
                                    </div>
                                    <div id="phone_wrapper">
                                        <img src="./Images/tell_big.svg" id="tell_img" alt="" /><span
                                            id="phone">{{phone}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 杯數門檻 -->
                            <div class="cup_wrapper">
                                <img src="./Images/drop-group-gold.svg" alt="" />集杯數:
                                <span id="cup_max_num" v-if="item.goal_cup == 10">不限制</span>
                                <span id="cup_max_num" v-else>{{item.goal_cup}}杯以上</span>
                            </div>
                            <div class="cup_wrapper">
                                <img src="./Images/drop-group-orange.svg" alt="" />已達杯數:
                                <span id="cup_now_num">{{item.now_cup}}</span>杯
                            </div>
                        </section>
                        <section id="info_text_right">
                            <!-- 取貨地址 -->
                            <div class="info_text_right_inner">
                                <span>
                                    <img src="./Images/place.svg" alt="">
                                    取貨地點:
                                </span>
                                <span id="adress">
                                    {{item.group_adress}}
                                </span>
                                <!-- 桃園市中壢區復興路46號9樓 -->
                                <!-- 桃園市中壢區復興路號號2號3桃園市中壢區復興路1樓號樓樓一號 -->
                            </div>
                            <!-- 送達時間 -->
                            <div class="info_text_right_inner">
                                <span>
                                    <img src="./Images/timer.svg" alt="">
                                    預計送達時間:
                                </span>
                                <span id="arrive_time">
                                {{showNoSeconds(item.arrive_time)}}
                                </span>
                            </div>
                            <!-- 結單時間 -->
                            <div class="info_text_right_inner">
                                <span style="color: #B3925B;">
                                    <img src="./Images/group_list.svg" alt="">
                                    結單時間:
                                </span>
                                <span id="deadline_time" style="color: #B3925B;">
                                {{showNoSeconds(item.deadline_time)}}
                                </span>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,

})




//菜單組件
Vue.component('menu_carshop', {
    props: ["child_mem_info"],
    data() {
        return {
            shopping_num_total: 0, //購物車的飲料總數
            item_type: [], // 飲料類別
            intimeCart: true, //現在時間是否早於結單時間，以此判斷是否要前往下一頁
            mem_info: this.child_mem_info, //登入的會員
        }
    },
    methods: {
        //點擊飲品後把資料從菜單送出，之後燈箱接收
        lightBox_handle(item) {
            if (this.mem_info == "") {
                bus.$emit('getAlert', "請登入會員")
            } else {
                bus.$emit('lightBox_handle_parent', item)
            }

        },
        //前往訂單頁面
        goFollow_step1() {
            if (this.intimeCart == false) {
                bus.$emit('getAlert', '跟團時間已截止')
            } else {
                if (this.shopping_num_total >= 1) {
                    location.href = `follow_step1.html?group_ord_no=${web_group_no}`
                } else {
                    bus.$emit('getAlert', '請選擇飲品')
                }
            }
        },
    },

    mounted() {
        // 購物車按鈕接收燈箱的飲品數量
        bus.$on('addToCar_parent', (numx) => this.shopping_num_total = numx);

        //若現在時間晚於結單時間，從group_info接收false參數，帶入本身intimeCart
        bus.$on('intimeGoFollow_step1', (intime) => this.intimeCart = intime);

        //從header接收會員的資料
        member.$on('memberInfo', (memberInfo) => this.mem_info = memberInfo)

        //後台撈出menu資料
        fetch('./php/menu.php', {
            method: 'GET', // or 'PUT'
            // body: JSON.stringify(this.item_type), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .then(res => this.item_type = res);

    },
    //網頁重整的時候，購物車按鈕的飲品數會更新
    created() {
        let itemString = storage.getItem(`${storage_key}`);
        let items = itemString.substr(0, itemString.length - 1).split('|');
        if (itemString == '') {
            this.shopping_num_total = 0
        } else {
            this.shopping_num_total = items.length
        }

    },
    template: `
    <div id="menu">
        <div id="menu_title"><span>menu</span></div>
        <div id="menu_table" class="container">
            <div class="row">
                <!-- v-for生成飲料類別 -->
                <section class="drink_type col-md-4" v-for="(parent_item,index) in item_type"
                    :key="parent_item.drink_type_no">
                    <!-- 飲料標題 -->
                    <div class="drink_type_text">
                        <span>{{parent_item.drink_type_title}}</span><span>{{parent_item.drink_type_text_en}}</span>
                    </div>
                    <!-- 手機板飲料標題 -->
                    <div class="drink_type_text_mob">
                        <span class="type_mob">{{parent_item.drink_type_title}}</span>
                        <div class="size_mob"><span>M</span><span>L</span></div>
                    </div>
                    <!-- 中杯大杯 -->
                    <div class="size"><span>M</span><span>L</span></div>
                    <ul class="drink">
                        <!-- v-for生成飲品名稱-->
                        <li class="drink_item" v-for="(item,index) in parent_item.itemList" :key="item.drink_no"
                            @click="lightBox_handle(item)">
                            <button>+</button><span class="drink_name">{{item.drink_title_ch}}</span>
                            <!-- 中杯價錢 -->
                            <div class="medium_price_wrapper">
                                <span>$</span><span class="medium_price">{{item.drink_small_price}}</span>
                            </div>
                            <!-- 大杯價錢 -->
                            <div class="large_price_wrapper"><span>$</span><span
                                    class="large_price">{{item.drink_big_price}}</span></div>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
        <button id="shopping_btn" @click="goFollow_step1"><span v-if="shopping_num_total >= 1"
                id="shopping_num_total">{{shopping_num_total}}</span><img src="./Images/cart.svg" alt=""><div>前往購物車</div></button>
    </div>

    `
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

//飲品燈箱
Vue.component('light_box', {
    data() {
        return {
            shop_drink_name: "", // 燈箱飲料名
            shop_drink_title_en: "", // 燈箱飲料英文名
            imgSrc: "", //飲料圖片
            num_feedback: 1, // 燈箱開啟後的飲品數量
            shopBtn_num_feedback: 1, //購物車按鈕的飲料數目
            closeLightBox: false, //燈箱關閉
            drink_no: "", //飲品編號
            drinkSet: [], //飲料配置
            modelArray: [],//飲料配置的v-model
            drink_small_price: "", //小杯價錢
            drink_big_price: "", //大杯價錢
            cup: "", //大小杯價錢的v-model
        }
    },
    computed: {
        // 燈箱開啟後的飲料金額
        shop_price() {
            return this.cup * this.num_feedback
        }
    },
    // 燈箱接收點擊菜單飲品的資料
    mounted() {
        bus.$on('lightBox_handle_parent', this.lightBox_handle_child);
    },
    methods: {
        lightBox_handle_child(item) {
            this.shop_drink_name = item.drink_title_ch
            this.shop_drink_title_en = item.drink_title_en
            this.imgSrc = item.imgSrc
            this.closeLightBox = true
            this.drink_no = item.drink_no
            this.drink_small_price = item.drink_small_price
            this.drink_big_price = item.drink_big_price
            this.cup = item.drink_small_price

            fetch('./php/bs_getall_type_detail.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ drink_no: item.drink_no }),
            }).then(res => res.json())
                .then(res => this.drinkSet = res);
        },
        //減少杯數
        handleSub() {
            this.num_feedback--
            if (this.num_feedback <= 1) {
                this.num_feedback = 1
            }
        },

        //增加杯數
        handlePlus() {
            this.num_feedback++
        },
        //新增飲品數量至購物車，並關閉燈箱
        addToCar() {
            //是否有勾選飲品溫度
            let selectIce = false
            if (this.modelArray[1]) {
                selectIce = true
            }

            //是否有勾選甜度
            let selectSugar = false
            if (this.modelArray[0]) {
                selectSugar = true
            }

            //都有勾選的話就可以正常新增飲品至購物車
            if (selectIce && selectSugar) {
                //關閉燈箱
                this.closeLightBox = false

                //呼叫存入storage函式
                this.addToStorage()

                //關閉燈箱後，所有input取消勾選
                this.modelArray = []

                let itemString = storage.getItem(`${storage_key}`);
                let items = itemString.substr(0, itemString.length - 1).split('|');
                //把飲品杯數傳回菜單組件
                bus.$emit('addToCar_parent', items.length)
                //關閉燈箱後，飲品數目預設回1杯
                this.num_feedback = 1
            } else if (selectIce == false && selectSugar == false) {
                bus.$emit('getAlert', `請選擇${this.drinkSet[1].type_title}和${this.drinkSet[0].type_title}`)
            } else if (selectSugar == false) {
                bus.$emit('getAlert', `請選擇${this.drinkSet[0].type_title}`)
            } else {
                bus.$emit('getAlert', `請選擇${this.drinkSet[1].type_title}`)
            }

        },
        addToStorage() {
            // 選到大杯還是小杯
            let selectCupValue
            if (this.cup > this.drink_small_price) {
                selectCupValue = "大杯"
            } else {
                selectCupValue = "小杯"
            }

            //飲料配置
            let setItem = ""
            for (let j = 0; j < this.modelArray.length; j++) {
                if (this.modelArray[j]) {
                    setItem += `,${this.modelArray[j]}`
                }
            }


            //選擇的飲料項目加成字串存到storage
            let drinkInDetail_first = `${this.shop_drink_name},${this.drink_no},${selectCupValue},${this.cup}${setItem}|`
            let drinkInDetail = ""
            for (let i = 1; i <= this.num_feedback; i++) {
                drinkInDetail += drinkInDetail_first
            }
            storage[`${storage_key}`] += `${drinkInDetail}`

        },

        //關閉燈箱，把input全部取消勾選，飲品數量變成1
        cancel_shop() {
            this.modelArray = []
            this.closeLightBox = false
            this.num_feedback = 1
        },
        showSetTitle(set) {
            let show = false

            for (let j = 0; j < set.detail_title_list.length; j++) {
                if (set.detail_title_list[j].ischecked) {
                    show = true
                    break;
                }
            }

            return show
        }
    },

    template: `
    <!-- v-if 控制開關燈箱 -->
    <div id="light_box_wrapper" v-if="closeLightBox">
    <!-- 刪除按鈕 -->
    <div id="drink_light_box">
        <div id="cancel_shop_btn" @click="cancel_shop"><img src="Images/close.svg" /></div>
        <!-- 飲料圖 -->
        <div id="drink_img"><img :src="imgSrc" alt="" /></div>
        <div id="drink_data">
            <!-- 飲品名稱 -->
            <div id="shop_drink_name_title">
                <h2 id="shop_drink_name">{{shop_drink_name}}</h2>
                <h3 id="shop_drink_title_en">{{shop_drink_title_en}}</h3>
            </div>
            <!-- 飲品配置 -->
            <!-- 大小 -->
            <div class="drink_set">
                <div class="set_title"><img src="./Images/Drop-3.svg" alt="" /><span>大小</span></div>
                <div id="cup" class="set_item">
                    <div>
                        <label for="medium_cup"><input type="radio" :value="drink_small_price" id="medium_cup" v-model="cup"/>中杯</label>
                        <label for="large_cup"><input type="radio" :value="drink_big_price" id="large_cup"  v-model="cup"/>大杯</label>
                    </div>
                    
                </div>
            </div>
            
            <!-- 冰度甜度配料 -->
            <div class="drink_set" v-for="(set,index) in drinkSet" :key="set.type_no">
                <div class="set_title" v-if="showSetTitle(set)"><img src="./Images/Drop-3.svg" alt="" /><span>{{set.type_title}}</span></div>
                 <div class="set_item">
                    <div v-for="setInput in set.detail_title_list" :key="setInput.detail_no">
                        <div v-if="setInput.ischecked"><input type="radio" :value="setInput.detail_title" :id="setInput.detail_no" v-model="modelArray[index]" /><label :for="setInput.detail_no">{{setInput.detail_title}}</label></div>
                    </div>
                </div>
            </div>
          
            <div id="num_btn_wrapper">
                <!-- 新增數量按鈕 -->
                <div id="num_btn">
                    <button @click="handleSub">
                        <div></div>
                    </button>
                    <div id="num_feedback">{{num_feedback}}</div>
                    <button @click="handlePlus"><span>+</span></button>
                </div>
                <!-- 新增至購物車 -->
                <div id="num_btn_text">
                    <button @click="addToCar">新增<span>{{num_feedback}}</span>杯飲品至購物車<span>$<span
                                id="shop_price">{{shop_price}}</span></span></button>
                </div>
            </div>
        </div>
    </div>
</div>
    `

})


let app = new Vue({
    el: "#app",
    data: {
        parent_mem_info: '',
    },
    methods: {
        checked_mem(data) {
            this.parent_mem_info = data
        },
    },
})
