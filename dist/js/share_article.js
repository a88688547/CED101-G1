Vue.component('hot_article', {
    data() {
        return {
            top3_article: [],
            theClickArt: 0,
            show: false,
            nowArt_no: "",
        }
    },
    mounted() {
        this.getTop3_article()
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
        getTop3_article() {
            let that = this
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                that.top3_article = JSON.parse(xhr.responseText);
            }
            xhr.open("get", "php/getTop3_article.php", true);
            xhr.send(null);
        },
        clickWhichOne(item) {
            this.theClickArt = item
            this.show = true
        },
        parentUpdate(_art_no) {
            this.nowArt_no = _art_no
            this.getTop3_article()
        },

    },
    watch: {
        top3_article() {
            let chooseArray = {}
            for (let i = 0; i <= this.top3_article.length; i++) {
                if (this.top3_article[i].art_no == this.nowArt_no) {
                    chooseArray = this.top3_article[i]
                    break;
                }
            }
            this.theClickArt = chooseArray
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
                    <span class="article_num">{{item.art_look}}</span>
                </div>
                <div>
                    <div class="article_icon"><img src="./Images/message_big.svg" /></div>
                    <span class="article_num">{{item.art_msg_count}}</span>
                </div>
                <div>
                    <div class="article_icon"><img src="./Images/like_big.svg" /></div>
                    <span class="article_num">{{item.art_like}}</span>
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
    <article_box :item="theClickArt" v-if="show" @childUpdate="parentUpdate"></article_box>

</section>
    `,
})

Vue.component('article_box', {
    props: ["item"],
    data() {
        return {
            article_box_data: [],
            message: "",
            parentAlert: false,
            alertText: "",
        }
    },
    mounted() {
        this.getArticle_box_data()
    },
    methods: {
        getArticle_box_data() {
            let that = this
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                that.article_box_data = JSON.parse(xhr.responseText);
            }
            xhr.open("get", `php/getArticleBox.php?art_no=${that.item.art_no}`, true);
            xhr.send(null);
        },
        doubleCheck() {
            this.parentAlert = true
            if (this.message.trim() == "") {
                this.alertText = "請輸入留言"
            } else {
                this.alertText = "確定要送出留言?"
            }

        },
        postMsg: async function () {
            await fetch('php/postMsg.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.postMsgData),
            })
            await this.getArticle_box_data()
            await this.$emit('childUpdate', this.item.art_no)
            // this.item.art_msg_count++
            this.message = ""
        },
        parentGetClose(status) {
            if (status === "toDo") {
                this.postMsg()
            }

            this.parentAlert = false
        },
    },

    computed: {
        msg_hint() {
            let textLength = this.message.length >= 100 ? 0 : 100 - this.message.length
            return textLength
        },
        postMsgData() {
            let dt = new Date()
            let now = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
            let dataObj = {
                art_no: this.item.art_no,
                mem_no: 1,
                msg_time: now,
                msg_intro: this.message,
            }
            return dataObj
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
                        <span class="article_num">{{item.art_look}}</span>
                    </div>
                    <div>
                        <div class="article_icon"><img src="./Images/message_big.svg" /></div>
                        <span class="article_num">{{item.art_msg_count}}</span>
                    </div>
                    <div>
                        <div class="article_icon"><img src="./Images/like_big.svg" /></div>
                        <span class="article_num">{{item.art_like}}</span>
                    </div>
                </div>
                <div class="article_detail">
                    <div class="article_title">{{item.art_name}}</div>

                </div>
                <div class="article_text">
                    {{item.art_intro}}
                </div>
                <div class="like_btn">
                    <div class="like_img"><img src="./Images/like_big.svg"></div>
                    <div>喜歡</div>
                </div>
            </div>
            <div class="mseeage_box" v-for="data in article_box_data" :key="data.msg_no">
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
                        {{data.msg_intro}}
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
            <alert_lightbox :parentAlert_ = "parentAlert" :_alertText="alertText" @childSendClose="parentGetClose"></alert_lightbox>

        </section>
    </div>
    `,
})

//警示視窗
Vue.component('alert_lightbox', {
    props: ["parentAlert_", "_alertText"],
    data() {
        return {

        }
    },
    methods: {
        closeAlertLightbox() {
            this.$emit('childSendClose', "close")
        },
        sureToDo() {
            if (this._alertText == "請輸入留言") {
                this.$emit('childSendClose', "close")
            } else {
                this.$emit('childSendClose', "toDo")
            }

        },
    },
    computed: {
        alertLightbox() {
            return this.parentAlert_
        },
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
    el: ".body_box"
})
