Vue.component('group_info', {
    data() {
        return {
            groupInfo: [],
        }
    },
    mounted() {
        //後台撈出團的資料
        fetch(`./php/group_menu.php?group_ord_no=${web_group_no}`, {
            method: 'GET', // or 'PUT'
            // body: JSON.stringify(this.item_type), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        })
            .then((res) => res.json())
            .then((res) => (this.groupInfo = res))
    },
    methods: {
        showNoSeconds(time) {
            let secondsIndex = time.length - 3
            let noSecondsTime = time.substring(0, secondsIndex)
            return noSecondsTime
        },
    },
    computed: {
        count() {
            switch (this.groupInfo[0].goal_cup) {
                case '20':
                    return '9折'
                case '30':
                    return '8折'
                case '40':
                    return '7折'
                case '50':
                    return '6折'
                default:
                    return '無'
            }
        },
    },
    template: `
    <div id="group_info">
        <ul v-for="(item,index) in groupInfo">
            <li id="order_state"><span>訂單狀態</span>
                <button>準備中</button>
            </li>
            <li><span>團名</span><span>{{item.group_name}}</span></li>
            <li><span>結單時間</span><span class="time">{{showNoSeconds(item.deadline_time)}}</span></li>
            <li><span>預計送達時間</span><span class="time">{{showNoSeconds(item.arrive_time)}}</span></li>
            <li><span>目標杯數</span><span>{{item.goal_cup}}杯 / {{count}}優惠</span></li>
            <li><span>取貨地點</span><span>{{item.group_adress}}</span></li>
        </ul>
    </div>
    `,
})

let storage = sessionStorage
let dt = storage['dt']
let web_group_no = window.location.search.split("=")[1]
let storage_key = `addItemList_group=${web_group_no}`
Vue.component('orderlist', {
    data() {
        return {
            //把storage['addItemList']存在data的變數，變動時drinkItem才會跟著變動
            addItemList: storage[`${storage_key}${dt}`],
            mem_info: "",
        }
    },
    methods: {
        xyz(theAddItemList, state) {
            if (state === false) {
                this.order = false
            }
            this.addItemList = theAddItemList
        },
    },
    mounted() {
        member.$on('memberInfo', (data) => {
            this.mem_info = data
            if (this.mem_info === "") {
                location.href = 'homepage.html'
            }
        })
    },
    created() {
        if (storage[`${storage_key}${dt}`] == '') {
            this.order = false
        }
    },

    computed: {
        drinkItem() {
            let itemString = this.addItemList
            let items = itemString.substr(0, itemString.length - 1).split('|')
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
            if (objKeys == '') {
                objKeys = 0
            }
            for (let i = 0; i < objKeys.length; i++) {
                theTotalPrice +=
                    objKeys[i].substr(0, objKeys[i].length).split(',')[5] * Object.values(this.drinkItem)[i]
            }

            return theTotalPrice
        },
    },
    template: `
    <div>
        <div id="order_list">
            <!-- 每個人  -->
            <div class="group_order_done_person">
                <div class="group_order_done_person_upbox">
                    <div class="group_order_done_person_img"><img :src="mem_info.memImg" /></div>
                    <div class="group_order_done_person_name">{{mem_info.memName}}</div>
                </div>
                <div class="group_order_done_person_downbox">
                    <!-- 購買的 飲料 -->
                    <person-drink v-for="(value,key) in drinkItem" :key_="key" :value_="value"></person-drink>
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
            <div id="num_feedback">{{num}}</div>
            <span>杯</span>
        </section>
        <section id="item_single_price">
            &#36{{price * num}}
        </section>
    </div>
    `,
})

new Vue({
    el: '#app',
})
