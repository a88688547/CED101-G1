//熱門文章
Vue.component('hot_article', {
    data() {
        return {
            top3_article: [], //喜歡數前三名的文章
            theClickArt: [],  //被點擊的文章資料
            show: false, //是否開啟文章燈箱
            theClickArtNo: "", //被點擊的文章編號
            mem_no: "",
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
        clickWhichOne(item) {
            this.theClickArt = item
            this.show = true
        },
        //若下層(文章燈箱)有送出留言到資料庫，則會呼叫上層的該方法
        //下層傳遞了目前開啟燈箱的文章編號，存入theClickArtNo
        //呼叫更新熱門文章，但不會更新theClickArt(被點擊的文章存放的資料)，所以文章燈箱也不會更新
        //解決方法: watch熱門文章的資料
        parentUpdate(_art_no) {
            this.theClickArtNo = _art_no
            this.getTop3_article()
        },

    },
    watch: {
        //當熱門文章資料變動(parentUpdate方法呼叫才會變動)
        //藉由theClickArtNo尋找熱門文章的該筆文章，再存入theClickArt，下層props就會跟著更新
        top3_article(newData) {
            for (let i = 0; i < newData.length; i++) {
                if (newData[i].art_no == this.theClickArtNo) {
                    this.theClickArt = newData[i]
                    break;
                }
            }

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
    <!-- theClickArt被點擊的文章資料往下層傳 -->
    <!-- childUpdate若下層有送出留言到資料庫，則會呼叫上層的parentUpdate方法 -->
    <article_box :item="theClickArt" v-if="show" @childUpdate="parentUpdate" :mem_no="mem_no"></article_box>

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
            MemberLike: [], //存放該會員是否有喜歡開啟的燈箱文章
            // mem_no: this.mem_no,
        }
    },

    mounted() {
        this.getArtMsgdata() //呼叫撈取留言的函式
        this.updateLike()

    },
    methods: {
        //從資料庫撈取留言資料
        getArtMsgdata() {
            let that = this
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                that.artMsgdata = JSON.parse(xhr.responseText);
            }
            xhr.open("get", `php/getArtMsgdata.php?art_no=${that.item.art_no}`, true);
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
        parentGetClose(status) {
            if (status === "toDo") {
                this.postMsg()
            }
            this.parentAlert = false
        },
        //把留言送到後台，並將留言區的留言清空
        //並使用childUpdate，傳遞本次開啟的文章編號讓上層接收
        //接收後會及時更新文章的資料(主要是留言數)，上層有更新由於下層是用props接收
        //所以燈箱內的文章資料也會跟著更新
        postMsg: async function () {
            await fetch('php/postMsg.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.postMsgData),
            })
            await this.getArtMsgdata()
            await this.$emit('childUpdate', this.item.art_no)
            // this.item.art_msg_count++
            this.message = ""
        },
        //開啟文章時會判斷該會員是否有點過該文章喜歡，並存放到MemberLike
        updateLike() {
            let that = this
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                that.MemberLike = JSON.parse(xhr.responseText);
            }
            xhr.open("get", `php/getMemberLike.php?mem_no=${this.mem_no}&art_no=${this.item.art_no}`, true);
            xhr.send(null);
        },
        //點擊喜歡文章或取消喜歡文章
        //1.把會員喜歡文章或取消喜歡文章送到資料庫
        //2.開啟文章時會判斷該會員是否有點過該文章喜歡，並存放到MemberLike => 再次呼叫的原因是要更改紅色愛心或灰色愛心
        //3.呼叫父層組件更新文章燈箱(邏輯與留言數一樣)
        likeArt: async function () {
            await this.postLikeArt(this.everClickLike)
            await this.updateLike()
            await this.$emit('childUpdate', this.item.art_no)
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
                    art_no: this.item.art_no,
                    everClickLike: _everClickLike,
                }),
            })
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
                art_no: this.item.art_no,
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
        //MemberLike:開啟文章時會判斷該會員是否有點過該文章喜歡
        //如果有，MemberLike內就有資料，everClickLike就是true
        //如果沒有，MemberLike內就沒有資料，everClickLike就是false
        everClickLike() {
            if (Object.keys(this.MemberLike).length != 0) {
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
                <img :src="item.art_img" />
                <div id="close_btn"><img src="http://fakeimg.pl/25x25" /></div>
            </div>
            <div class="article_down">
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
                    {{item.art_intro}}
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
                        <div class="msg_report">檢舉</div>
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
            <!-- childSendClose為警示內點擊確認或關閉時，會往上傳遞並接收的事件，接收後呼叫parentGetClose這個方法 -->
            <alert_lightbox :parentAlert_ = "parentAlert" :_alertText="alertText" @childSendClose="parentGetClose"></alert_lightbox>

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
            this.$emit('childSendClose', "close")
        },
        //如果是請使用者輸入留言的訊息，點選確認就呼叫父層組件childSendClose的方法，直接關閉視窗
        //若是確認送出，點確認就會傳遞toDo參數，父層組件會判斷是否有這個參數，才會執行送留言到資料庫的動作
        sureToDo() {
            if (this._alertText == "請輸入留言") {
                this.$emit('childSendClose', "close")
            } else {
                this.$emit('childSendClose', "toDo")
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
            <div class="manager_lightbox_close_img" @click="closeAlertLightbox"><img src="./Images/close.svg" ></div>
            <div class="alertLightbox" >
                <div>{{alertText}}</div>
                <div @click="sureToDo">確定</div>
            </div>
        </div>
    </div>
    `,
})
new Vue({
    el: "#app"
})
