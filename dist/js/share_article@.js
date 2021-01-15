//熱門文章
Vue.component('hot_article', {
    data() {
        return {
            top3_article: [], //喜歡數前三名的文章
            show: false, //是否開啟文章燈箱
            theClickArtNo: "", //被點擊的文章編號
            mem_no: "",
            parentAlert: false,
            alertText: "",
        }
    },
    mounted() {
        //網頁掛載的時候呼叫取前三名的文章資料
        this.getTop3_article()
        member.$on('memberInfo', (memberInfo) => this.mem_no = memberInfo.memNo)
    },
    methods: {
        //文章內容只顯示50個字
        showWords(art_intro) {
            let theShowWords
            if (art_intro.length <= 50) {
                theShowWords = art_intro
            } else {
                theShowWords = art_intro.substr(0, 50) + "..."
            }
            return theShowWords
        },
        //撈取後台資料，存放喜歡前三名的文章資料
        getTop3_article() {
            let that = this
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                that.top3_article = JSON.parse(xhr.responseText);
            }
            xhr.open("get", "php/getTop3_article.php", true);
            xhr.send(null);
        },
        //點擊文章後，theClickArt存放被點擊的文章資料，並開啟文章燈箱
        clickWhichOne: async function (item) {
            if (this.mem_no === undefined) {
                this.parentAlert = true
                this.alertText = "請登入會員"
            } else {
                this.theClickArtNo = item.art_no
                await fetch('php/postLookArt.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        art_no: item.art_no,
                    }),
                })
                this.show = true
            }
        },

        parentGetCloseAlert() {
            this.parentAlert = false
        },
        parentCloseArtBox() {
            this.getTop3_article()
            this.show = false
        }

    },

    template: `
    <section class="section_4">
    <div class="s2_title">
        <img src="./Images/hot.svg" alt="" />
        <div>熱門文章</div>
    </div>

    <div class="article_item" v-for="item in top3_article" :key="item.art_no" @click="clickWhichOne(item)"> 
        <div class="article_img"><img :src="item.art_img" alt="" /></div>
        <div class="article_right" >
            <div class="article_time">{{item.art_time}}</div>
            <div class="article_info">
                <div class="article_info_left">
                    <div class="article_memimg"><img :src="item.mem_img" /></div>
                    <div class="article_memname">{{item.mem_name}}</div>
                </div>

            </div>
            <div class="article_count">
                <div>
                    <div class="article_icon"><img src="./Images/eyes_big.svg" /></div>
                    <span class="article_num">{{item.art_look_count}}</span>
                </div>
                <div>
                    <div class="article_icon"><img src="./Images/message_big.svg" /></div>
                    <span class="article_num">{{item.art_msg_count}}</span>
                </div>
                <div>
                    <div class="article_icon"><img src="./Images/like_big.svg" /></div>
                    <span class="article_num">{{item.art_like_count}}</span>
                </div>
            </div>
            <div class="article_detail">
                <div class="article_title">{{item.art_name}}</div>
            </div>
            <div class="article_text">
                {{showWords(item.art_intro)}}
            </div>
        </div>

    </div>
    <!-- 文章詳情 -->
    <article_box :item="theClickArtNo" v-if="show" @childCloseArtBox="parentCloseArtBox" :mem_no="mem_no"></article_box>
    <alert_lightbox :parentAlert_ = "parentAlert" :_alertText="alertText" @childSendCloseAlert="parentGetCloseAlert"></alert_lightbox>
</section>
    `,
})

//文章內容燈箱
Vue.component('article_box', {
    props: ["item", "mem_no"],  //上層傳來被點擊的文章資料
    data() {
        return {
            artMsgdata: [], //存放撈取的留言資料
            message: "", //留言區的留言
            parentAlert: false, //是否開啟警示視窗
            alertText: "", //警示視窗內的提示字
            artBoxData: "",
            parentReport: false,
        }
    },

    mounted() {
        this.getArtMsgdata() //呼叫撈取留言的函式
        this.getArtBoxData() //呼叫文章燈箱的函式

    },
    methods: {
        //開啟文章時撈取文章燈箱內的資料
        getArtBoxData() {
            let that = this
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                that.artBoxData = JSON.parse(xhr.responseText);
            }
            xhr.open("get", `php/getArtBoxdata.php?art_no=${this.item}&mem_no=${this.mem_no}`, true);
            xhr.send(null);
        },
        //從資料庫撈取留言資料
        getArtMsgdata() {
            let that = this
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                that.artMsgdata = JSON.parse(xhr.responseText);
            }
            xhr.open("get", `php/getArtMsgdata.php?art_no=${that.item}`, true);
            xhr.send(null);
        },
        //點送出留言，會把parentAlert改成true，，此data變動會開啟警示視窗
        doubleCheck() {
            this.parentAlert = true

            //如果留言為空，則送出"請輸入留言"讓下層接收，若有值則送出"確定要送出留言?"
            if (this.message.trim() == "") {
                this.alertText = "請輸入留言"
            } else {
                this.alertText = "確定要送出留言?"
            }

        },
        //警示視窗點確認，往上層傳遞並呼叫此函式
        //如果是送出留言則呼叫postMsg方法，將留言送到後台，並關閉警示視窗
        //如果是沒輸入留言，按確認或關閉都只會關閉警示視窗
        parentGetCloseAlert(status) {
            if (status === "toDo") {
                this.postMsg()
            }
            this.parentAlert = false
        },
        //把留言送到後台，再呼叫更新燈箱內資料的函式，並將留言區的留言清空
        postMsg: async function () {
            await fetch('php/postMsg.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.postMsgData),
            })
            await this.getArtMsgdata()
            await this.getArtBoxData()
            // this.item.art_msg_count++
            this.message = ""
        },

        //點擊喜歡文章或取消喜歡文章
        //把會員喜歡文章或取消喜歡文章送到資料庫
        //再呼叫更新燈箱內資料的函式
        likeArt: async function () {
            await this.postLikeArt(this.everClickLike)
            await this.getArtBoxData()
        },
        //把會員喜歡文章或取消喜歡文章送到資料庫
        postLikeArt: async function (_everClickLike) {
            await fetch('php/postLikeArt.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mem_no: this.mem_no,
                    art_no: this.item,
                    everClickLike: _everClickLike,
                }),
            })
        },
        sendChildCloseArtBox() {
            this.$emit('childCloseArtBox')
        },

        parentGetCloseReport() {
            this.parentReport = false
        },

    },

    computed: {
        //提示留言區還有幾個字可以輸入
        msg_hint() {
            let textLength = this.message.length >= 100 ? 0 : 100 - this.message.length
            return textLength
        },
        //存放要送到資料庫的留言資料
        postMsgData() {
            let dt = new Date()
            let now = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
            let dataObj = {
                art_no: this.item,
                mem_no: this.mem_no,
                msg_time: now,
                msg_text: this.message,
            }
            return dataObj
        },
        //點喜歡會更換愛心圖片
        heart() {
            if (this.everClickLike) {
                return "./Images/like_big.svg"
            } else {
                return "./Images/heart_gray.png"
            }
        },
        //點喜歡會更換愛心及喜歡文字的透明度
        like_btn_style() {
            if (this.everClickLike) {
                return "opacity: 1;"
            } else {
                return "opacity: 0.6;"
            }
        },
        //isLike = 1代表有點過喜歡，everClickLike就是true，= 0 就是false
        everClickLike() {
            if (this.artBoxData.isLike == 1) {
                return true
            } else {
                return false
            }
        },

    },
    template: `
    <div class="article_box">
        <section class="section_6">
            <div class="article_img_big">
                <img :src="artBoxData.art_img" />
                <div id="close_btn" @click="sendChildCloseArtBox"><img src="Images/close.svg" /></div>
            </div>
            <div class="article_down">
                <div class="article_time">{{artBoxData.art_time}}</div>
                <div class="article_info">
                    <div class="article_info_left">
                        <div class="article_memimg"><img :src="artBoxData.mem_img" /></div>
                        <div class="article_memname">{{artBoxData.mem_name}}</div>
                    </div>

                </div>
                <div class="article_count">
                    <div>
                        <div class="article_icon"><img src="./Images/eyes_big.svg" /></div>
                        <span class="article_num">{{artBoxData.art_look_count}}</span>
                    </div>
                    <div>
                        <div class="article_icon"><img src="./Images/message_big.svg" /></div>
                        <span class="article_num">{{artBoxData.art_msg_count}}</span>
                    </div>
                    <div>
                        <div class="article_icon"><img src="./Images/like_big.svg" /></div>
                        <span class="article_num">{{artBoxData.art_like_count}}</span>
                    </div>
                </div>
                <div class="article_detail">
                    <div class="article_title">{{artBoxData.art_name}}</div>

                </div>
                <div class="article_text">
                    {{artBoxData.art_intro}}
                </div>
                <div class="like_btn" >
                    <div @click="likeArt" :style="like_btn_style">
                        <div class="like_img"><img :src="heart"></div>
                        <div>喜歡</div>
                    </div>
                </div>
            </div>
            <div class="mseeage_box" v-for="data in artMsgdata" :key="data.msg_no">
                <div class="msg_mem">
                    <div class="msg_time">{{data.msg_time}}</div>
                    <div class="msg_text_box">
                        <div class="msg_memimg">
                            <img :src="data.mem_img">
                        </div>
                        <div class="msg_memname">{{data.mem_name}}</div>
                    </div>
                    <div class="msg_info">
                        <div class="msg_memmsg">
                        {{data.msg_text}}
                        </div>
                    </div>

                    <div class="msg_action">
                        <div class="msg_report" @click="parentReport = true">檢舉</div>
                    </div>

                </div>
            </div>
            <div class="comment_box">
                <div class="comment_title_box">
                    <div class="pen_img"><img src="./Images/pen-blue.svg"></div>
                    <div class="comment_title">發表留言</div>
                </div>
                <textarea id="comment" oninput="if(value.length>100) value=value.substr(0,100)" cols="50" rows="5" v-model="message"
                    style="max-width:750px;height:120px;width:100%;border-radius: 10px;overflow: hidden;outline: none; padding:15px;font-size:16px;">
                    </textarea>
                <div id="msg_hint">剩餘{{msg_hint}}字可輸入</div>
                <button class="sendbtn" @click="doubleCheck" OnClientClick="this.disabled=true" UseSubmitBehavior="false">
                    <div class="sendbtn_img"><img src="./Images/send.svg"></div>
                    <div class="sendbtn_text" >送出</div>
                </button>
            </div>

            <!-- 警示視窗 -->
            <!-- parentAlert為是否開啟警示視窗的變數，往下層傳遞 -->
            <!-- alertText為警示視窗的內文，往下層傳遞 -->
            <!-- childSendCloseAlert為警示內點擊確認或關閉時，會往上傳遞並接收的事件，接收後呼叫parentGetCloseAlert這個方法 -->
            <alert_lightbox :parentAlert_ = "parentAlert" :_alertText="alertText" @childSendCloseAlert="parentGetCloseAlert"></alert_lightbox>


            <report_lightbox :parentReport_ = "parentReport" @childSendCloseReport="parentGetCloseReport"></report_lightbox>
        </section>
    </div>
    `,
})

//警示視窗
Vue.component('alert_lightbox', {
    //接收來自上層是"否開啟警示視窗"及"視窗內文字"的參數
    props: ["parentAlert_", "_alertText"],
    data() {
        return {

        }
    },
    methods: {
        //點選關閉視窗
        closeAlertLightbox() {
            this.$emit('childSendCloseAlert', "close")
        },
        //如果是請使用者輸入留言的訊息，點選確認就呼叫父層組件childSendCloseAlert的方法，直接關閉視窗
        //若是確認送出，點確認就會傳遞toDo參數，父層組件會判斷是否有這個參數，才會執行送留言到資料庫的動作
        sureToDo() {
            if (this._alertText == "請輸入留言") {
                this.$emit('childSendCloseAlert', "close")
            } else {
                this.$emit('childSendCloseAlert', "toDo")

            }

        },
    },
    computed: {
        //下層由alertLightbox接收來自上層的parentAlert，若為true開啟燈箱，false則關閉
        alertLightbox() {
            return this.parentAlert_
        },
        //警示視窗內的文字，
        alertText() {
            return this._alertText
        }
    },
    template: `
    <div class="alertLightbox_black" v-if="alertLightbox">
        <div class="alertLightboxWrapper">
            <div class="manager_lightbox_close_img" @click="closeAlertLightbox" ><img src="./Images/close.svg" ></div>
            <div class="alertLightbox" >
                <div>{{alertText}}</div>
                <div @click="sureToDo">確定</div>
            </div>
        </div>
    </div>
    `,
})


Vue.component('report_lightbox', {
    //接收來自上層是"否開啟警示視窗"及"視窗內文字"的參數
    props: ["parentReport_"],
    data() {
        return {
            reasonText: ""
        }
    },
    methods: {
        //點選關閉視窗
        closeReportLightbox() {
            this.$emit('childSendCloseReport', "close")
        },

        sureToDo() {
            await fetch('php/postLookArt.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reasonText: this.reasonText,
                }),
            })

        },
    },
    computed: {
        //下層由alertLightbox接收來自上層的parentAlert，若為true開啟燈箱，false則關閉
        reportLightbox() {
            return this.parentReport_
        },
        // //警示視窗內的文字，
        // alertText() {
        //     return this._alertText
        // }
    },
    template: `
    <div class="alertLightbox_black report" v-if="reportLightbox">
        <div class="alertLightboxWrapper">
            <div class="manager_lightbox_close_img" @click="closeReportLightbox" ><img src="./Images/close.svg" ></div>
            <div class="alertLightbox" >
                <div>檢舉原因</div>
                <ul>
                    <li> 
                    <input type="radio" name="reason" id="reason1" v-model="reasonText" value="此留言與該文章不相關">
                    <label for="reason1">此留言與該文章不相關</label>
                    </li>
                    <li> 
                    <input type="radio" name="reason" id="reason2" v-model="reasonText" value="此留言為不當發言">
                    <label for="reason2">此留言為不當發言</label>
                    </li>
                    <li> 
                    <input type="radio" name="reason" id="reason3" v-model="reasonText" value="此留言帶有污辱性文字">
                    <label for="reason3">此留言帶有污辱性文字</label>
                    </li>
                </ul>
                <div @click="sureToDo" id="sure">確定</div>
            </div>
        </div>
    </div>
    `,
})
//檢舉燈箱

new Vue({
    el: "#app"
})
