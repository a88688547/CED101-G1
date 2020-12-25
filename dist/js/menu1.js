
const bus = new Vue();

//菜單組件
Vue.component('menu_carshop', {
    data() {
        return {
            // 飲料類別
            item_type: [
                {
                    drink_type_text: "奶類",
                    drink_type_text_en: "Milk Tea",
                    type: "1",
                    itemList_milk: [
                        {
                            drink_name: "麥茶拿鐵",
                            drink_name_en: "Milk Tea1",
                            medium_price: "40",
                            large_price: "50",
                            id: "1",
                        },
                        {
                            drink_name: "港式厚奶",
                            drink_name_en: "Milk Tea2",
                            medium_price: "20",
                            large_price: "30",
                            id: "2",
                        },
                        {
                            drink_name: "紅茶拿鐵",
                            drink_name_en: "Milk Tea3",
                            medium_price: "50",
                            large_price: "60",
                            id: "3",
                        },
                        {
                            drink_name: "鮮奶茶",
                            drink_name_en: "Milk Tea4",
                            medium_price: "20",
                            large_price: "30",
                            id: "4",
                        },
                        {
                            drink_name: "烏龍拿鐵",
                            drink_name_en: "Milk Tea5",
                            medium_price: "20",
                            large_price: "35",
                            id: "5",
                        },
                    ],
                },
                {
                    drink_type_text: "果茶類",
                    drink_type_text_en: "Fruit",
                    type: "2",
                    itemList_milk: [
                        {
                            drink_name: "冰翠柳丁",
                            drink_name_en: "Milk Tea6",
                            medium_price: "40",
                            large_price: "50",
                            id: "1",
                        },
                        {
                            drink_name: "清寧香茶",
                            drink_name_en: "Milk Tea7",
                            medium_price: "20",
                            large_price: "30",
                            id: "2",
                        },
                        {
                            drink_name: "香柚綠茶",
                            drink_name_en: "Milk Tea8",
                            medium_price: "50",
                            large_price: "60",
                            id: "3",
                        },
                        {
                            drink_name: "冬瓜檸檬",
                            drink_name_en: "Milk Tea9",
                            medium_price: "20",
                            large_price: "30",
                            id: "4",
                        },
                        {
                            drink_name: "柳丁綠茶",
                            drink_name_en: "Milk Tea10",
                            medium_price: "20",
                            large_price: "35",
                            id: "5",
                        },
                    ],
                },
                {
                    drink_type_text: "茶類",
                    drink_type_text_en: "Tea",
                    type: "3",
                    itemList_milk: [
                        {
                            drink_name: "大正紅茶",
                            drink_name_en: "Milk Tea11",
                            medium_price: "40",
                            large_price: "50",
                            id: "1",
                        },
                        {
                            drink_name: "茉莉綠茶",
                            drink_name_en: "Milk Tea12",
                            medium_price: "20",
                            large_price: "30",
                            id: "2",
                        },
                        {
                            drink_name: "高峰烏龍",
                            drink_name_en: "Milk Tea13",
                            medium_price: "50",
                            large_price: "60",
                            id: "3",
                        },
                        {
                            drink_name: "四季春茶",
                            drink_name_en: "Milk Tea14",
                            medium_price: "20",
                            large_price: "30",
                            id: "4",
                        },
                        {
                            drink_name: "金萱茶",
                            drink_name_en: "Milk Tea15",
                            medium_price: "20",
                            large_price: "35",
                            id: "5",
                        },
                    ],
                },

            ],
            //購物車的飲料總數
            shopping_num_total: 0,
        }
    },
    methods: {
        //點擊飲品後把資料從菜單送出，之後燈箱接收
        lightBox_handle(item) {
            bus.$emit('lightBox_handle_parent', item)
        },
    },
    // 購物車按鈕接收燈箱的飲品數量
    mounted() {
        bus.$on('addToCar_parent', (num_feedback) => this.shopping_num_total += num_feedback);
    },
    template: `
    <div id="menu">
    <div id="menu_title"><span>menu</span></div>
    <div id="menu_table" class="container">
        <div class="row">
            <!-- v-for生成飲料類別 -->
            <section class="drink_type col-md-4" v-for="(parent_item,index) in item_type"
                :value="parent_item.type">
                <!-- 飲料標題 -->
                <div class="drink_type_text">
                    <span>{{parent_item.drink_type_text}}</span><span>{{parent_item.drink_type_text_en}}</span>
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
                    <li class="drink_item" v-for="(item,index) in parent_item.itemList_milk" :value="item.id"
                        @click="lightBox_handle(item)">
                        <button>+</button><span class="drink_name">{{item.drink_name}}</span>
                        <!-- 中杯價錢 -->
                        <div class="medium_price_wrapper">
                            <span>$</span><span class="medium_price">{{item.medium_price}}</span>
                        </div>
                        <!-- 大杯價錢 -->
                        <div class="large_price_wrapper"><span>$</span><span
                                class="large_price">{{item.large_price}}</span></div>
                        <div style="display: none;" class="data_none">
                            {{item.drink_name}}|{{item.drink_name_en}}|{{item.medium_price}}|{{item.large_price}}
                        </div>
                    </li>
                </ul>
            </section>
        </div>
    </div>
    <button id="shopping_btn"><span v-if="shopping_num_total >= 1"
            id="shopping_num_total">{{shopping_num_total}}</span>購物車</button>

    </div>

    `
})

Vue.component('light_box', {
    data() {
        return {
            // 燈箱飲料名
            shop_drink_name: "",
            shop_drink_name_en: "",
            // 燈箱開啟後的飲料金額
            shop_price: "",
            // 燈箱開啟後的飲品數量
            num_feedback: 1,
            //燈箱關閉
            closeLightBox: false,
            //toDoInput父層組件接收大小杯價格的變數
            task: "",
        }
    },
    // 燈箱接收點擊菜單飲品的資料
    mounted() {
        bus.$on('lightBox_handle_parent', this.lightBox_handle_child);
    },
    methods: {
        lightBox_handle_child(item) {
            this.shop_drink_name = item.drink_name
            this.shop_drink_name_en = item.drink_name_en
            this.shop_price = item.medium_price

            this.closeLightBox = true
            //將大小杯價格存入task變數，讓toDoInput父層組件使用
            this.task = [item.medium_price, item.large_price]
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
            bus.$emit('addToCar_parent', this.num_feedback)
            this.closeLightBox = false
        },
        //燈箱內飲料杯數*單價的總價錢
        addTask(item_num) {
            this.shop_price = item_num
        },
    },
    // v-if="closeLightBox"
    template: `
    <!-- v-if 控制開關燈箱 -->
    <div id="light_box_wrapper" v-if="closeLightBox">
    <!-- 刪除按鈕 -->
    <div id="drink_light_box">
        <button id="cancel_shop_btn" @click="closeLightBox = false">X</button>
        <!-- 飲料圖 -->
        <div id="drink_img"><img src="http://fakeimg.pl/355x180/" alt="" /></div>
        <div id="drink_data">
            <!-- 飲品名稱 -->
            <div id="shop_drink_name_title">
                <h2 id="shop_drink_name">{{shop_drink_name}}</h2>
                <h3 id="shop_drink_name_en">{{shop_drink_name_en}}</h3>
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
                    <input type="radio" value="" id="normal" name="ice" /><label
                        for="medium_cup">正常</label><input type="radio" value="" id="less_ice"
                        name="ice" /><label for="less_ice">少冰</label><input type="radio" value="" id="low_ice"
                        name="ice" /><label for="low_ice">微冰</label><input type="radio" value="" id="no_ice"
                        name="ice" /><label for="no_ice">去冰</label><input type="radio" value="" id="hot"
                        name="ice" /><label for="hot">熱飲</label>
                </div>
            </div>
            <!-- 甜度 -->
            <div class="drink_set">
                <div class="set_title"><img src="./Images/drop-3.svg" alt="" /><span>甜度</span></div>
                <div id="sugar" class="set_item">
                    <input type="radio" value="" id="standard" name="sugar" /><label
                        for="standard">正常</label><input type="radio" value="" id="less_sugar"
                        name="sugar" /><label for="less_sugar">少糖</label><input type="radio" value=""
                        id="low_sugar" name="sugar" /><label for="low_sugar">微糖</label><input type="radio"
                        value="" id="no_sugar" name="sugar" /><label for="no_sugar">無糖</label>
                </div>
            </div>
            <!-- 配料 -->
            <div class="drink_set">
                <div class="set_title"><img src="./Images/drop-3.svg" alt="" /><span>加料</span></div>
                <div id="ingredient" class="set_item">
                    <input type="radio" value="" id="tapioca_pearl" name="ingredient" /><label
                        for="tapioca_pearl">珍珠</label><input type="radio" value="" id="red_beams"
                        name="ingredient" /><label for="red_beams">紅豆</label><input type="radio" value=""
                        id="aiyu" name="ingredient" /><label for="aiyu">愛玉</label><input type="radio" value=""
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
    <input type="radio"  @change="chooseSize($event)" :value="toDoInputPrice[0]" id="medium_cup" name="cup" checked/>
    <label for="medium_cup">中杯</label>
    <input type="radio"  @change="chooseSize($event)" :value="toDoInputPrice[1]" id="large_cup" name="cup" />
    <label for="large_cup">大杯</label>
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