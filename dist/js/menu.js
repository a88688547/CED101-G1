let a = 0
Vue.component('group-info', {
    data() {
        return {
            groupInfo: [],
            nowTime: new Date().getTime(),
            watchNum: 0,
            timer: null,
            inTime: true,
        }
    },
    mounted() {
        //後台撈出團的資料
        fetch('./php/group_menu.php', {
            method: 'GET', // or 'PUT'
            // body: JSON.stringify(this.item_type), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .then(res => this.groupInfo = res);
        this.timer = setInterval(this.getData, 1000)
    },
    beforeDestroy() {
        clearInterval(this.timer)

    },
    methods: {
        showNoSeconds(time) {
            let secondsIndex = time.length - 3
            let noSecondsTime = time.substring(0, secondsIndex)
            return noSecondsTime
        },

        getData() {
            this.watchNum++
        },
    },
    watch: {
        watchNum() {
            this.nowTime = new Date().getTime()
        }
    },
    computed: {

        phone() {

            let phone1 = this.groupInfo[0].mem_phone.substr(0, 4)
            let phone2 = this.groupInfo[0].mem_phone.substr(4, 3)
            let phone3 = this.groupInfo[0].mem_phone.substr(7, 3)
            thePhone = `${phone1}-${phone2}-${phone3}`
            return thePhone
        },
        group_img() {
            let goal_cup = this.groupInfo[0].goal_cup - 10
            return `./Images/coupon//${goal_cup}off@2x.jpg`
        },
        countDown() {
            let endTime = new Date(this.groupInfo[0].deadline_time)
            let endTimeSec = endTime.getTime() //節單時間總毫秒數
            let offsetTime = (endTimeSec - this.nowTime) / 1000 // ** 以秒為單位
            let sec = parseInt(offsetTime % 60); // 秒
            let min = parseInt((offsetTime / 60) % 60); // 分 ex: 90秒
            let hr = parseInt(offsetTime / 60 / 60); // 時
            let toatal = [{
                theHr: hr,
                theMin: min,
                theSec: sec,
            }]
            if (offsetTime <= 0) {
                this.inTime = false
            }
            return toatal
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
                                <span id="cup_max_num">{{item.goal_cup}}</span>杯以上
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
                                    截單時間:
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
const bus = new Vue();
let storage = sessionStorage;
if (storage['addItemList'] == null) {
    storage['addItemList'] = ''
}
//菜單組件
Vue.component('menu_carshop', {
    data() {
        return {
            //購物車的飲料總數
            shopping_num_total: 0,
            // 飲料類別
            item_type: [],
        }
    },
    methods: {
        //點擊飲品後把資料從菜單送出，之後燈箱接收
        lightBox_handle(item) {
            bus.$emit('lightBox_handle_parent', item)
        },
    },

    mounted() {
        // 購物車按鈕接收燈箱的飲品數量
        bus.$on('addToCar_parent', (numx) => this.shopping_num_total = numx);

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
        let itemString = storage.getItem('addItemList');
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
                :value="parent_item.drink_type_no">
                <!-- 飲料標題 -->
                <div class="drink_type_text">
                    <span>{{parent_item.drink_type_title}}</span><span>{{parent_item.drink_type_text_en}}</span>
                </div>
                <!-- 手機板飲料標題 -->
                <div class="drink_type_text_mob">
                    <span class="type_mob">{{parent_item.drink_type_text}}</span>
                    <div class="size_mob"><span>M</span><span>L</span></div>
                </div>
                <!-- 中杯大杯 -->
                <div class="size"><span>M</span><span>L</span></div>
                <ul class="drink">
                    <!-- v-for生成飲品名稱-->
                    <li class="drink_item" v-for="(item,index) in parent_item.itemList" :value="item.drink_no"
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
    <button id="shopping_btn"><span v-if="shopping_num_total >= 1"
            id="shopping_num_total">{{shopping_num_total}}</span><img src="./Images/cart.svg" alt=""><div>前往購物車</div></button>

    </div>

    `
})

Vue.component('light_box', {
    data() {
        return {
            // 燈箱飲料名
            shop_drink_name: "",
            shop_drink_title_en: "",
            imgSrc: "",
            // 燈箱開啟後的飲料金額
            shop_price: "",
            // 燈箱開啟後的飲品數量
            num_feedback: 1,
            shopBtn_num_feedback: 1,
            //燈箱關閉
            closeLightBox: false,
            //toDoInput父層組件接收大小杯價格的變數
            task: "",
            //飲品編號
            drink_no: "",
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
            this.shop_price = item.drink_small_price
            this.imgSrc = item.imgSrc
            this.closeLightBox = true
            this.drink_no = item.drink_no
            //將大小杯價格存入task變數，讓toDoInput父層組件使用
            this.task = [item.drink_small_price, item.drink_big_price]
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
            let ice = document.getElementById('ice')
            let iceInput = ice.querySelectorAll('input')
            //選到飲品溫度的值
            let selectIceValue
            for (let i = 0; i < iceInput.length; i++) {
                if (iceInput[i].checked) {
                    selectIce = true
                    selectIceValue = iceInput[i].value
                }
            }

            //是否有勾選甜度
            let selectSugar = false
            let sugar = document.getElementById('sugar')
            let sugarInput = sugar.querySelectorAll('input')
            //選到甜度的值
            let selectSugarValue
            for (let i = 0; i < sugarInput.length; i++) {
                if (sugarInput[i].checked) {
                    selectSugar = true
                    selectSugarValue = sugarInput[i].value
                }
            }

            //都有勾選的話就可以正常新增飲品至購物車
            if (selectIce && selectSugar) {
                //關閉燈箱
                this.closeLightBox = false
                //關閉燈箱後，所有input取消勾選
                document.querySelectorAll('input').checked = false
                //呼叫存入storage函式
                this.addToStorage(selectIceValue, selectSugarValue)

                let itemString = storage.getItem('addItemList');
                let items = itemString.substr(0, itemString.length - 1).split('|');
                //把飲品杯數傳回菜單組件
                bus.$emit('addToCar_parent', items.length)
                //關閉燈箱後，飲品數目預設回1杯
                this.num_feedback = 1
            } else if (selectIce == false) {
                alert("請選擇飲品溫度")
            } else {
                alert("請選擇甜度")
            }

        },
        addToStorage(_selectIceValue, _selectSugarValue) {
            let cup = document.getElementById('cup')
            let cupInput = cup.querySelectorAll('input')
            // 選到大杯還是小杯
            let selectCupValue
            for (let i = 0; i < cupInput.length; i++) {
                if (cupInput[i].checked) {
                    selectCupValue = cupInput[i].parentNode.innerText
                }
            }

            // 選到的加料
            let selectIngredientValue
            let ingredient = document.getElementById('ingredient')
            let ingredientInput = ingredient.querySelectorAll('input')
            for (let i = 0; i < ingredientInput.length; i++) {
                if (ingredientInput[i].checked) {
                    selectIngredientValue = ingredientInput[i].value
                    break;
                } else {
                    selectIngredientValue = ""
                }
            }

            //選擇的飲料項目加成字串存到storage
            let drinkInDetail_first = `${this.shop_drink_name},${selectCupValue},${_selectSugarValue},${_selectIceValue},${selectIngredientValue},${this.shop_price},${this.drink_no}|`
            let drinkInDetail = ""
            for (let i = 1; i <= this.num_feedback; i++) {
                drinkInDetail += drinkInDetail_first
            }
            storage['addItemList'] += `${drinkInDetail}`

        },
        //燈箱內飲料杯數*單價的總價錢
        addTask(item_num) {
            this.shop_price = item_num
        },
        //關閉燈箱，把input全部取消勾選，飲品數量變成1
        cancel_shop() {
            document.querySelectorAll('input').checked = false
            this.closeLightBox = false
            this.num_feedback = 1
        },
    },
    // v-if="closeLightBox"
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
                <div class="set_title"><img src="./Images/drop-3.svg" alt="" /><span>大小</span></div>
                <div id="cup" class="set_item">
                    <!-- toDoInput父層組件, toDoInputPrice 由上往下傳的參數名稱, toDoInputNum 由下往上傳的參數名稱-->
                    <toDoInput :toDoInputPrice ="task" @toDoInputNum="addTask"></toDoInput>
                </div>
            </div>
            <!-- 冰度 -->
            <div class="drink_set">
                <div class="set_title"><img src="./Images/drop-3.svg" alt="" /><span>飲品溫度</span></div>
                <div id="ice" class="set_item">
                    <input type="radio" value="正常" id="normal" name="ice" /><label
                        for="normal">正常</label><input type="radio" value="少冰" id="less_ice"
                        name="ice" /><label for="less_ice">少冰</label><input type="radio" value="微冰" id="low_ice"
                        name="ice" /><label for="low_ice">微冰</label><input type="radio" value="去冰" id="no_ice"
                        name="ice" /><label for="no_ice">去冰</label><input type="radio" value="熱飲" id="hot"
                        name="ice" /><label for="hot">熱飲</label>
                </div>
            </div>
            <!-- 甜度 -->
            <div class="drink_set">
                <div class="set_title"><img src="./Images/drop-3.svg" alt="" /><span>甜度</span></div>
                <div id="sugar" class="set_item">
                    <input type="radio" value="正常" id="standard" name="sugar" /><label
                        for="standard">正常</label><input type="radio" value="少糖" id="less_sugar"
                        name="sugar" /><label for="less_sugar">少糖</label><input type="radio" value="微糖"
                        id="low_sugar" name="sugar" /><label for="low_sugar">微糖</label><input type="radio"
                        value="無糖" id="no_sugar" name="sugar" /><label for="no_sugar">無糖</label>
                </div>
            </div>
            <!-- 配料 -->
            <div class="drink_set">
                <div class="set_title"><img src="./Images/drop-3.svg" alt="" /><span>加料</span></div>
                <div id="ingredient" class="set_item">
                    <input type="radio" value="珍珠" id="tapioca_pearl" name="ingredient" /><label
                        for="tapioca_pearl">珍珠</label><input type="radio" value="紅豆" id="red_beams"
                        name="ingredient" /><label for="red_beams">紅豆</label><input type="radio" value="愛玉"
                        id="aiyu" name="ingredient" /><label for="aiyu">愛玉</label><input type="radio" value="椰果"
                        id="cococut" name="ingredient" /><label for="cococut">椰果</label>
                </div>
            </div>
            <div id="num_btn_wrapper">
                <!-- 新增數量按鈕 -->
                <div id="num_btn">
                    <button @click="handleSub">
                        <div></div>
                    </button>
                    <div id="num_feedback">{{num_feedback}}</div>
                    <button @click="handlePlus">+</button>
                </div>
                <!-- 新增至購物車 -->
                <div id="num_btn_text">
                    <button @click="addToCar">新增<span>{{num_feedback}}</span>杯飲品至購物車<span>$<span
                                id="shop_price">{{shop_price * num_feedback}}</span></span></button>
                </div>
            </div>
        </div>
    </div>
</div>
    `

})

Vue.component('toDoInput', {
    props: ['toDoInputPrice'],
    template: `
    <div>
    <!-- input的value接收toDoInputPrice大小杯的價錢 -->
    <label for="medium_cup"><input type="radio"  @change="chooseSize($event)" :value="toDoInputPrice[0]" id="medium_cup" name="cup" checked/>中杯</label>
    <label for="large_cup"><input type="radio"  @change="chooseSize($event)" :value="toDoInputPrice[1]" id="large_cup" name="cup" />大杯</label>
    </div>
    `,
    methods: {
        //選擇大小杯，把input的value值往上傳
        chooseSize(e) {
            this.$emit('toDoInputNum', e.target.value)
        },
    }
})
new Vue({
    el: "#app",
})