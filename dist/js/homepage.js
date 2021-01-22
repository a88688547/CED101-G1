window.addEventListener('load', function () {
    // ---  揪團喝   ----
    Vue.component('join_drink', {
        data() {
            return {
                groups: '',
                nowDateTime: '',
                now_Time: '',
                nowDay: '',
                watchNum: 0,
                nowTime: new Date().getTime(), //現在時間毫秒
                timer: null, //計時器
                msg: 1,
                endTime: '',
                offsetTime: '',
                ght: '',
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

            // 得到當下時間
            timeFormate(timeStamp) {
                let newdate = new Date(timeStamp)
                let week = ['日', '一', '二', '三', '四', '五', '六']
                let year = newdate.getFullYear()
                let month = newdate.getMonth() + 1 < 10 ? '0' + (newdate.getMonth() + 1) : newdate.getMonth() + 1
                let date = newdate.getDate() < 10 ? '0' + newdate.getDate() : newdate.getDate()
                let hh = newdate.getHours() < 10 ? '0' + newdate.getHours() : newdate.getHours()
                let mm = newdate.getMinutes() < 10 ? '0' + newdate.getMinutes() : newdate.getMinutes()
                let ss = newdate.getSeconds() < 10 ? '0' + newdate.getSeconds() : newdate.getSeconds()

                this.now_Time = hh + ':' + mm + ':' + ss
                this.nowDay = year + '-' + month + '-' + date
                this.nowDateTime = `${this.nowDay} ${this.now_Time}`
            },
            // 定時器函數
            nowTimes() {
                let self = this
                self.timeFormate(new Date())
                setInterval(function () {
                    self.timeFormate(new Date())
                }, 1000)
            },
            getWatchNum() {
                this.watchNum++
            },
            checkcup(data) {
                // if (data == 0) {
                //     let text = `<span>tets1</span>`
                //     return text
                // } else if (data == 1) {
                //     return '測試二'
                // } else if (data == 2) {
                //     return '測試二'
                // }
                // if (goal_cup == 10) {
                //     let count = goal_cup - 10 -now_cup
                //     return `差<span>{{check_cup(value.goal_cup,value.now_cup)}}</span>杯成團`
                // } else {
                //     return data
                // }
            },
        },
        computed: {
            grouporddataLenght() {
                //長度
                this.ght = this.groups.length
                return this.ght
            },
            count_Down() {
                this.ght = this.groups.length
                // console.log(this.ght)
                // console.log(this.nowTime)
                let Time = new Array()
                for (i = 0; i < this.ght; i++) {
                    // new Date(this.grouporddata[i].deadline_time.replaceAll('-', '/'));
                    let endTime = new Date(this.groups[i].deadline_time.replaceAll('-', '/'))
                    let endTimeSec = endTime.getTime()
                    let offsetTime = (endTimeSec - this.nowTime) / 1000 // ** 以秒為單位
                    this.endTime[i] = endTimeSec // ** 以秒為單位
                    let sec = parseInt(offsetTime % 60) // 秒
                    let min = parseInt((offsetTime / 60) % 60) // 分 ex: 90秒
                    let hr = parseInt(offsetTime / 60 / 60) // 時
                    let total = {
                        theHr: hr,
                        theMin: min,
                        theSec: sec,
                    }
                    // console.log(total);
                    Time[i] = total
                }
                return Time
            },
        },
        mounted() {
            this.nowTimes()
            this.timer = setInterval(this.getWatchNum, 1000)
        },
        created() {
            this.get_group()
        },
        watch: {
            watchNum() {
                this.nowTime = new Date().getTime()
            },
        },
        //離開時清除定時器
        beforeDestroy() {
            clearInterval(this.timer)
        },
        template: `
    <section class="join_drink">
      <div class="title_block">
        <h2>跟團喝</h2>
        <h5>想喝飲料卻找不到夥伴嗎?跟團喝飲料，杯杯有折扣!</h5>
      </div>
      <div class="drinkbar_block" >
        <div class="drink_bar" v-for="(value,key) in groups"  @click="join_drink(value.group_ord_no)">
            <div class="top_img"><img  :src="value.img" alt="" /></div>
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
                        <h6 v-if="value.now_cup >= value.goal_cup">{{value.count}}</h6>
                        <h6 v-if="value.now_cup < value.goal_cup && value.goal_cup == 10">{{value.count}}</h6>
                        <h6 v-if="value.now_cup < value.goal_cup && value.goal_cup != 10">差<span>{{value.count}}</span>杯成團</h6>

                    </div>

                    <div class="status_title">
                        <img class="complited_cups" src="./Images/drop-1.svg" alt="" />
                        <h6>已有<span>{{value.now_cup}}</span>杯跟團</h6>
                    </div>
                </div>

                <div class="join_drink_btm">
                    <h6 class="time">
                        剩餘時間:
                        <span class="Countdown time">
                        {{count_Down[key].theHr}}小時
                        {{count_Down[key].theMin}}分
                        {{count_Down[key].theSec}}秒</span>
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

    // ---  分享區   ----
    Vue.component('my_article', {
        data() {
            return {
                articles: '',
            }
        },

        mounted() {},
        created() {
            this.get_article()
        },
        watch: {},
        template: `
    <section class="article">
        <div class="title_block">
            <h2>分享區</h2>
            <h5>大家都喝了什麼?立即記錄你的JOIN時光吧!</h5>
        </div>

        <div class="article_block">
            <div class="card_big" v-for="(value,key) in articles.slice(0, 3)">
                <a href="./share_article.html" style="text-decoration: none">
                    <div class="art_img_big"><img :src="value.art_img" alt="" /></div>

                    <div class="text_block">
                        <div class="user"><img :src="value.mem_img" alt="" /></div>
                        <div class="user_info_block">
                            <p class="article_time">{{value.art_time}}</p>
                            <div class="article_descirption">
                                <h6>{{value.art_name}}</h6>
                                <p>{{value.art_intro}}</p>
                            </div>

                            <div class="user_info">
                                <div class="user_status">
                                    <div class="status_icon">
                                        <img src="./Images/eyes_big.svg" alt="" />
                                        <p class="number">{{value.art_look_count}}</p>
                                    </div>
                                    <div class="status_icon">
                                        <img src="./Images/message_big.svg" alt="" />
                                        <p class="number">{{value.art_msg_count}}</p>
                                    </div>
                                    <div class="status_icon">
                                        <img src="./Images/like_big.svg" alt="" />
                                        <p class="number">{{value.art_like_count}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>

            
            <div class="card_small_block">
                <div class="card_small" v-for="(value,key) in articles.slice(1, 4)" onclick="javascript:location.href='./share_article.html'">
                    <div class="art_img_small"><img :src="value.art_img" alt="" /></div>

                    <div class="text_block">
                        <div class="user"><img :src="value.mem_img" alt="" /></div>
                        <div class="user_info_block">
                            <p class="article_time">{{value.art_time}}</p>
                            <div class="article_descirption">
                                <h6>{{value.art_name}}</h6>
                                <p>{{value.art_intro}}</p>
                            </div>

                            <div class="user_info">
                                <div class="user_status">
                                    <div class="status_icon">
                                        <img src="./Images/eyes_big.svg" alt="" />
                                        <p class="number">{{value.art_look_count}}</p>
                                    </div>
                                    <div class="status_icon">
                                        <img src="./Images/message_big.svg" alt="" />
                                        <p class="number">{{value.art_msg_count}}</p>
                                    </div>
                                    <div class="status_icon">
                                        <img src="./Images/like_big.svg" alt="" />
                                        <p class="number">{{value.art_like_count}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bottom_block">
            <button class="seemore color-2" onclick="javascript:location.href='./share_list.html'">
                查看更多內容
            </button>
        </div>
    </section>`,
        methods: {
            // 撈出 揪團資料
            async get_article() {
                const res = await fetch('./php/home_get_top4_article.php', {
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
                this.articles = res
            },
        },
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
                settings_1: {
                    autoplay: true,
                    dots: true,
                    focusOnSelect: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    touchThreshold: 5,
                },
                drinks: '',
                ready: false,
            }
        },
        methods: {
            async get_top3_drink() {
                const res = await fetch('./php/home_get_top3_drink.php', {
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
                this.drinks = res
            },
        },
        created() {
            this.get_top3_drink()
        },
        watch: {
            drinks() {
                if (this.drinks.length > 0) {
                    this.ready = true
                }
            },
        },
    })
})
