
const bus = new Vue();
let storage = sessionStorage;
if (storage['addItemList'] == null) {
    storage['addItemList'] = ''
}
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
                            imgSrc: "./Images/drinkphoto/milktea/brownsugarmilktea.jpg",
                        },
                        {
                            drink_name: "港式厚奶",
                            drink_name_en: "Milk Tea2",
                            medium_price: "20",
                            large_price: "30",
                            id: "2",
                            imgSrc: "./Images/drinkphoto/milktea/caffeelattebanner.jpg",
                        },
                        {
                            drink_name: "紅茶拿鐵",
                            drink_name_en: "Milk Tea3",
                            medium_price: "50",
                            large_price: "60",
                            id: "3",
                            imgSrc: "./Images/drinkphoto/milktea/greentealattebanner.jpg",
                        },
                        {
                            drink_name: "鮮奶茶",
                            drink_name_en: "Milk Tea4",
                            medium_price: "20",
                            large_price: "30",
                            id: "4",
                            imgSrc: "./Images/drinkphoto/milktea/jellymilkteabanner.jpg",
                        },
                        {
                            drink_name: "烏龍拿鐵",
                            drink_name_en: "Milk Tea5",
                            medium_price: "20",
                            large_price: "35",
                            id: "5",
                            imgSrc: "./Images/drinkphoto/milktea/machalattebanner.jpg",
                        },
                    ],
                },
                {
                    drink_type_text: "果茶類",
                    drink_type_text_en: "Fruit",
                    type: "2",
                    itemList_milk: [
                        {
                            drink_name: "水果茶",
                            drink_name_en: "Milk Tea6",
                            medium_price: "40",
                            large_price: "50",
                            id: "1",
                            imgSrc: "./Images/drinkphoto/fruit/fruitteaa.jpg",
                            // imgSrc: "./Images/20off.jpg",
                        },
                        {
                            drink_name: "清寧香茶",
                            drink_name_en: "Milk Tea7",
                            medium_price: "20",
                            large_price: "30",
                            id: "2",
                            imgSrc: "./Images/drinkphoto/fruit/dragonfruit.jpg",
                        },
                        {
                            drink_name: "香柚綠茶",
                            drink_name_en: "Milk Tea8",
                            medium_price: "50",
                            large_price: "60",
                            id: "3",
                            imgSrc: "./Images/drinkphoto/fruit/lemontea.jpg",
                        },
                        {
                            drink_name: "冬瓜檸檬",
                            drink_name_en: "Milk Tea9",
                            medium_price: "20",
                            large_price: "30",
                            id: "4",
                            imgSrc: "./Images/drinkphoto/fruit/passionfruit.jpg",
                        },
                        {
                            drink_name: "柳丁綠茶",
                            drink_name_en: "Milk Tea10",
                            medium_price: "20",
                            large_price: "35",
                            id: "5",
                            imgSrc: "./Images/drinkphoto/fruit/strawberrysmoothie.jpg",
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
                            imgSrc: "./Images/drinkphoto/fruit/strawberrysmoothie.jpg",
                        },
                        {
                            drink_name: "茉莉綠茶",
                            drink_name_en: "Milk Tea12",
                            medium_price: "20",
                            large_price: "30",
                            id: "2",
                            imgSrc: "./Images/drinkphoto/fruit/strawberrysmoothie.jpg",
                        },
                        {
                            drink_name: "高峰烏龍",
                            drink_name_en: "Milk Tea13",
                            medium_price: "50",
                            large_price: "60",
                            id: "3",
                            imgSrc: "./Images/drinkphoto/fruit/strawberrysmoothie.jpg",
                        },
                        {
                            drink_name: "四季春茶",
                            drink_name_en: "Milk Tea14",
                            medium_price: "20",
                            large_price: "30",
                            id: "4",
                            imgSrc: "./Images/drinkphoto/fruit/strawberrysmoothie.jpg",
                        },
                        {
                            drink_name: "金萱茶",
                            drink_name_en: "Milk Tea15",
                            medium_price: "20",
                            large_price: "35",
                            id: "5",
                            imgSrc: "./Images/drinkphoto/fruit/strawberrysmoothie.jpg",
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
            id="shopping_num_total">{{shopping_num_total}}</span><img src="./Images/cart.svg" alt=""><div>前往購物車</div></button>

    </div>

    `
})

Vue.component('light_box', {
    data() {
        return {
            // 燈箱飲料名
            shop_drink_name: "",
            shop_drink_name_en: "",
            imgSrc: "",
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
            this.imgSrc = item.imgSrc
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
                //把飲品杯數傳回菜單組件
                bus.$emit('addToCar_parent', this.num_feedback)
                //關閉燈箱
                this.closeLightBox = false
                //關閉燈箱後，所有input取消勾選
                document.querySelectorAll('input').checked = false
                //呼叫存入storage函式
                this.addToStorage(selectIceValue, selectSugarValue)
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
            let drinkInDetail_first = `${this.shop_drink_name},${selectCupValue},${_selectSugarValue},${_selectIceValue},${selectIngredientValue},${this.shop_price}|`
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
        <button id="cancel_shop_btn" @click="cancel_shop">X</button>
        <!-- 飲料圖 -->
        <div id="drink_img"><img :src="imgSrc" alt="" /></div>
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