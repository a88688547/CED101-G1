window.addEventListener('load', function () {
    // ---  揪團喝   ----
    Vue.component('join_drink', {
        data() {
            return {
                groups: '',
            }
        },
        methods: {
            // 撈出 揪團資料
            async get_group() {
                const res = await fetch('./php/home_get_group.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(function (data) {
                    return data.json()
                })
                // 取回res值後，呼叫另一隻函式
                this.groups = res
            },
            // 點擊跳轉至 該團頁面
            join_drink(data) {
                location.href = `menu.html?group_ord_no=${data}`
            },
        },
        mounted() {},
        created() {
            this.get_group()
        },
        template: `
    <section class="join_drink">
      <div class="title_block">
        <h2>跟團喝</h2>
        <h5>想喝飲料卻找不到夥伴嗎?跟團喝飲料，杯杯有折扣!</h5>
      </div>
      <div class="drinkbar_block" >
        <div class="drink_bar" v-for="(value,key) in groups"  @click="join_drink(value.group_ord_no)">
            <img class="top_img" :src="value.img" alt="" />

            <div class="drinkbar_textblock">
                <div class="bar_title">
                    <h6>{{value.group_name}}</h6>
                </div>

                <hr />

                <h6>
                    取貨地點:<br />
                    <span class="address">{{value.group_adress}}</span>
                </h6>

                <h6>
                    預計送達時間:<br />
                    <span class="time">{{value.arrive_time}}</span>
                </h6>

                <div class="drink_status">
                    <div class="status_title">
                        <img src="./Images/drop-1.svg" alt="" />
                        <h6>差<span>{{value.goal_cup - value.now_cup}}</span>杯成團</h6>
                    </div>

                    <div class="status_title">
                        <img class="complited_cups" src="./Images/drop-1.svg" alt="" />
                        <h6>已有<span>{{value.now_cup}}</span>杯跟團</h6>
                    </div>
                </div>

                <div class="join_drink_btm">
                    <h6 class="time">
                        限時
                        <span class="Countdown time">還在測試中</span>
                    </h6>

                    <button type="button" class="join_drink color-1">
                        <a style="text-decoration: none; display: inline-flex">
                            <img src="./Images/drink.svg" alt="" />
                            <h6>跟團喝</h6>
                        </a>
                    </button>
                </div>
            </div>
        </div>
      </div>
      <div class="bottom_block">
        <button class="seemore color-2" onclick="javascript:location.href='./join_list.html'">
          <h6>查看更多內容</h6>
        </button>
      </div>
    </section>`,
    })
    //-----------------------------------------------------

    //New Vue
    var app = new Vue({
        el: '#app',
        components: {
            VueSlickCarousel: window['vue-slick-carousel'],
        },
        data() {
            return {
                settings: {
                    autoplay: true,
                    dots: true,
                    focusOnSelect: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    touchThreshold: 5,
                },
            }
        },
        methods: {},
        components: {},
        created() {},
        mounted() {},
        beforeUpdate() {},
        beforeCreate() {},
        watch: {},
    })
})
