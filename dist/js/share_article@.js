//文章組件
Vue.component('article_list', {
    props: ["child_mem_no"],
    data() {
        return {
            show: false, //是否開啟文章燈箱
            showNewArticleBox: false, //是否開啟投稿文章燈箱
            theClickArtNo: "", //被點擊的文章編號
            mem_no: this.child_mem_no,
            parentAlert: false,
            alertText: "",
            allArticle: [],//全部文章
            selected: "art_time", //篩選排序
            anotherAllArticle: [],
            pagination: {
                currentPage: "",
                pageTotal: "",
                per_page: 3,
                totalResult: "",
            },
            selectedArticle: [],
            theCurrentPage: 1,
        }
    },
    mounted() {
        //網頁掛載的時候呼叫全部文章資料
        this.getAllArticle()

        member.$on('memberInfo', (memberInfo) => this.mem_no = memberInfo.mem_no)
    },
    methods: {
        //文章內容顯示個字
        showWords(data, name_or_intro) {
            let theShowWords

            let showHowManyWords = (name_or_intro == "art_intro") ? 50 : 15
            if (data.length <= showHowManyWords) {
                theShowWords = data
            } else {
                theShowWords = data.substr(0, showHowManyWords) + "..."
            }
            return theShowWords
        },
        //撈取後台資料，存放全部文章資料
        getAllArticle() {
            let that = this
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                that.allArticle = JSON.parse(xhr.responseText);

                that.getSelectedArticle(JSON.parse(xhr.responseText))

                that.getPagination(that.theCurrentPage)
            }
            xhr.open("get", "php/getAllArticle.php", true);
            xhr.send(null);
        },
        getNowCurrentPage(currentPage) {
            this.theCurrentPage = currentPage
            this.getPagination(currentPage)
        },
        getPagination(currentPage = 1) {
            let that = this
            let handleArt = that.selectedArticle
            //總共幾筆文章
            that.pagination.totalResult = handleArt.length
            //每頁要有幾筆
            // that.pagination.per_page = 3
            //總共幾頁
            that.pagination.pageTotal = Math.ceil(that.pagination.totalResult / that.pagination.per_page)
            //當前頁數，預設1
            that.pagination.currentPage = currentPage
            // 但是要注意，當前頁數是不可能超過總頁數，所以需要做一個判斷來避免
            if (that.pagination.currentPage > that.pagination.pageTotal) {
                that.pagination.currentPage = that.pagination.pageTotal
            }

            if (that.pagination.currentPage < 1) {
                that.pagination.currentPage = 1
            }

            // 接下來當我們目前位於第二頁時，資料會是 11~20
            // 所以這邊會有一段公式來做計算
            // 假設當前位於第二頁，所以就是 (10 * 2) - 10 = 10，最後 + 1，所以最小頁數就是 11 開始
            let minPage = (that.pagination.currentPage * that.pagination.per_page) - that.pagination.per_page + 1
            let maxPage = (that.pagination.currentPage * that.pagination.per_page)
            that.anotherAllArticle = []
            handleArt.forEach((item, index) => {
                // 由於 index 是從 0 開始，所以要建立一個變數儲存正確的數量
                let num = index + 1
                // 接下來寫上判斷式
                // 當 num 比 minPage 大並且比 maxPage 小的時候，就 push 資料進去
                if (num >= minPage && num <= maxPage) {
                    that.anotherAllArticle.push(item);
                }
            });
        },
        getSelectedArticle(data) {
            //深層拷貝，不會動到原本的陣列
            let theSelectedArticle = [...data]
            let theSelected = this.selected
            if (this.selected == "art_time") {
                theSelectedArticle.sort(function (a, b) {
                    return new Date(b.art_time).getTime() - new Date(a.art_time).getTime()
                })
            } else {
                theSelectedArticle.sort(function (a, b) {
                    return b[theSelected] - a[theSelected]
                })
            }

            this.selectedArticle = theSelectedArticle
        },
        parentGetPerPage(data) {
            this.pagination.per_page = data
            this.getPagination(this.theCurrentPage)
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
            this.getAllArticle()
            this.show = false
        },
        parentCloseNewArtBox() {
            this.getAllArticle()
            this.showNewArticleBox = false
        },
        openNewArticleBox() {
            if (this.mem_no === undefined) {
                this.parentAlert = true
                this.alertText = "請登入會員"
            } else {
                this.showNewArticleBox = true
            }

        }

    },
    watch: {
        selected() {
            this.getSelectedArticle(this.allArticle)
            this.getPagination(this.theCurrentPage)
        }
    },
    computed: {
        //喜歡數前三名的文章
        top3_article() {
            let top3 = this.allArticle.slice(0, 3)

            return top3
        },
    },
    template: `
    <div>
        <!-- 熱門文章前三 -->
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
                        {{showWords(item.art_intro,"art_intro")}}
                    </div>
                </div>

            </div>

            <!-- 文章詳情 -->
            <article_box :item="theClickArtNo" v-if="show" @childCloseArtBox="parentCloseArtBox" :mem_no="mem_no"></article_box>
            <!-- 警示視窗 -->
            <alert_lightbox :parentAlert_ = "parentAlert" :_alertText="alertText" @childSendCloseAlert="parentGetCloseAlert"></alert_lightbox>
        </section>

        <!-- 搜尋BAR -->
        <section class="section_3">
            <div class="show_article_btn">
                <div class="show_img"><img src="./Images/article.svg" /></div>
                <div class="show_text">所有文章列表</div>
            </div>
            <div class="filter_big_box">
                <div class="filter_box">
                    <label for="filter">篩選</label>
                    <select name="filter" id="filter" v-model="selected">
                        <option value="art_time">時間新到舊</option>
                        <option value="art_like_count">按讚數</option>
                        <option value="art_msg_count">留言數</option>
                        <option value="art_look_count">瀏覽數</option>
                    </select>
                </div>
            </div>
            <div class="write_article_btn" @click="openNewArticleBox">
                <div class="write_img"><img src="./Images/pen-white.svg" /></div>
                <div class="write_text">投稿</div>
            </div>
        </section>

        <!-- 撰寫文章 -->
        <new_article :mem_no="mem_no" 
                    v-if="showNewArticleBox" 
                    @childCloseNewArtBox="parentCloseNewArtBox" 
                    ></new_article>

        <!-- 文章列表 -->
        <section class="section_2">
            <div class="s2_hotitem_box">
                <div class="s2_hotitem" v-for="item in anotherAllArticle" :key="item.art_no" @click="clickWhichOne(item)">
                    <div class="hotimg"><img
                            :src="item.art_img" />
                    </div>
                    <div class="hotinfo">
                        <div class="memimg"><img :src="item.mem_img" /></div>
                        <div class="hotright">
                            <div class="texttime">{{item.art_time}}</div>
                            <div class="memname">{{item.mem_name}}</div>
                            <div class="hotcount">
                                <div>
                                    <div class="hot_icon"><img src="./Images/eyes_small.svg" /></div>
                                    <span class="hot_num">{{item.art_look_count}}</span>
                                </div>
                                <div>
                                    <div class="hot_icon"><img src="./Images/message_small.svg" /></div>
                                    <span class="hot_num">{{item.art_msg_count}}</span>
                                </div>
                                <div>
                                    <div class="hot_icon"><img src="./Images/like_small.svg" /></div>
                                    <span class="hot_num">{{item.art_like_count}}</span>
                                </div>
                            </div>
                            <div class="hot_text">{{showWords(item.art_name,"art_name")}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 分頁選擇 -->
        <paginationComponents 
        :paginationService='pagination' 
        @pageService="getNowCurrentPage"
        @childSendPerPage="parentGetPerPage"></paginationComponents>
    </div>

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
            reportData: "",

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
                this.alertText = "確定要送出?"
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
        sendReport(_report_no, _msg_or_art) {
            this.parentReport = true
            this.reportData = {
                mem_no: this.mem_no,
                report_no: _report_no,
                msg_or_art: _msg_or_art,
            }
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
            if (this.artBoxData.isLike >= 1) {
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
                    <div class="msg_action" id="art_report">
                        <div class="msg_report" @click="sendReport(item,'art')">檢舉</div>
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
                        <div class="msg_report" @click="sendReport(data.msg_no,'msg')">檢舉</div>
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


            <report_lightbox :parentReport_ = "parentReport" :reportData_="reportData" @childSendCloseReport="parentGetCloseReport"></report_lightbox>
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
            this.$emit('childSendCloseAlert')
        },
        //如果是請使用者輸入留言的訊息，點選確認就呼叫父層組件childSendCloseAlert的方法，直接關閉視窗
        //若是確認送出，點確認就會傳遞toDo參數，父層組件會判斷是否有這個參數，才會執行送留言到資料庫的動作
        sureToDo() {
            if (this._alertText == "確定要送出?") {
                this.$emit('childSendCloseAlert', "toDo")
            } else {
                this.$emit('childSendCloseAlert')

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

//檢舉燈箱
Vue.component('report_lightbox', {
    //接收來自上層是"否開啟警示視窗"及"視窗內文字"的參數
    props: ["parentReport_", "reportData_"],
    data() {
        return {
            reasonText: "",
            noChoose: false,
        }
    },
    methods: {
        //點選關閉視窗
        closeReportLightbox() {
            this.$emit('childSendCloseReport')
            this.reasonText = ""
        },

        sureToDo() {
            if (!this.reasonText) {
                this.noChoose = true
            } else {
                let dt = new Date()
                let now = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
                let theReportData = {
                    mem_no: this.reportData_.mem_no,
                    report_no: this.reportData_.report_no,
                    reason: this.reasonText,
                    reportTime: now,
                    msg_or_art: this.reportData_.msg_or_art,
                }


                fetch('php/postReport.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(theReportData),
                })


                this.$emit('childSendCloseReport')
                this.reasonText = ""
            }
        },
    },
    computed: {
        //下層由alertLightbox接收來自上層的parentAlert，若為true開啟燈箱，false則關閉
        reportLightbox() {
            return this.parentReport_
        },
        reportReason() {
            if (this.reportData_.msg_or_art == "msg") {
                return {
                    reason1: "此留言與該文章不相關",
                    reason2: "此留言為不當發言",
                    reason3: "此留言帶有污辱性文字",
                }
            } else {
                return {
                    reason1: "該文章為不實訊息",
                    reason2: "該文章含有暴力、色情內容",
                    reason3: "該文章帶有仇視言論",
                }
            }
        },

    },
    template: `
    <div class="alertLightbox_black report" v-if="reportLightbox">
        <div class="alertLightboxWrapper">
            <div class="manager_lightbox_close_img" @click="closeReportLightbox" ><img src="./Images/close.svg" ></div>
            <div class="alertLightbox" >
                <div>檢舉原因</div>
                <ul>
                    <li v-for="(value,key) in reportReason"> 
                    <input type="radio" name="reason" :id="key" v-model="reasonText" :value="value" @change="noChoose = false">
                    <label :for="key">{{value}}</label>
                    </li>
                </ul>
                <div @click="sureToDo" id="sure">確定</div>
                <span id="hint" v-if="noChoose">請選擇一個!</span>
            </div>
        </div>
    </div>
    `,
})

//分頁選擇
Vue.component('paginationComponents', {
    props: {
        paginationService: {
            type: Object,
        },
    },
    data() {
        return {
            limitPage: 5, //只能是奇數
            per_page: 3,
        }
    },

    methods: {
        getPagesService(item) {
            this.$emit('pageService', item);
        },
        select_per_page() {
            console.log(this.per_page)
            this.$emit('childSendPerPage', this.per_page)
            // console.log('a')
            // @change="select_per_page"
        },
    },
    computed: {
        theCurrentPage() {
            return this.paginationService.currentPage
        },
        theTotalPage() {
            return this.paginationService.pageTotal
        },
        pageArray() {
            let num = new Array
            num = Array(this.paginationService.pageTotal).fill().map((value, index) => index + 1)

            if (this.theTotalPage > this.limitPage) {
                if (this.theCurrentPage > (this.limitPage / 2) && this.theCurrentPage < (this.theTotalPage - this.limitPage / 2 + 1)) {
                    return num.slice((this.theCurrentPage - Math.ceil(this.limitPage / 2)), (this.theCurrentPage + Math.round(this.limitPage / 2) - 1))
                } else if (this.theCurrentPage < (this.limitPage / 2)) {
                    return num.slice(0, this.limitPage)
                } else {
                    return num.slice(this.theTotalPage - this.limitPage, this.theTotalPage)
                }
            } else {
                return num
            }

        },

    },
    template: `
    <section class="section_5">
        <ul>
            <img id="leftRow" style="transform: rotateY(180deg);" v-if="theCurrentPage != 1" src="./Images/page.svg" @click="getPagesService(paginationService.currentPage - 1)"/>
            <li v-for="pages in pageArray" :key='pages' @click='getPagesService(pages)' :class="{'active':paginationService.currentPage === pages}" >{{pages}}</li>
            <img v-if="theCurrentPage != theTotalPage" src="./Images/page.svg" @click="getPagesService(paginationService.currentPage + 1)"/>
        </ul>
        <div id="howManyData">                  
            <div>每頁顯示</div>  
            <select name="filter" v-model="per_page" @change="select_per_page">
                <option :value="3">3</option>
                <option :value="6">6</option>
                <option :value="9">9</option>
            </select>
            <div>筆</div>  
        </div>
    </section>
    `,
})

//撰寫文章
Vue.component('new_article', {
    props: ["mem_no"],
    data() {
        return {
            art_name: "",
            art_intro: "",
            parentAlert: false,
            alertText: "",
            art_img: "",
            upLoadImgOk: false, //是否有上傳圖片
        }
    },
    methods: {
        parentGetCloseAlert(status) {
            if (status === "toDo") {
                this.postArt()
            }
            this.parentAlert = false
        },
        checkToPostArt() {
            if (!this.upLoadImgOk) {
                this.parentAlert = true
                this.alertText = "請上傳圖片"
            } else if (!this.art_name || !this.art_intro) {
                this.parentAlert = true
                this.alertText = "請填寫完整內容"
            } else {
                this.parentAlert = true
                this.alertText = "確定要送出?"
            }
        },
        postArt() {
            let dt = new Date()
            let now = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`

            let formData = new FormData()
            formData.append('upFile', document.getElementById('upfile').files[0])
            formData.append('mem_no', this.mem_no)
            formData.append('art_time', now)
            formData.append('art_name', this.art_name)
            formData.append('art_intro', this.art_intro)

            //=====ajax
            let that = this
            let xhr = new XMLHttpRequest()
            xhr.onload = function () {
                if (xhr.status == 200) {
                    that.parentAlert = true
                    that.alertText = "上傳成功"

                    //清空資料
                    that.art_name = ""
                    that.art_intro = ""
                    document.getElementById('art_img').src = "./Images/unnamed.png"
                } else {
                    return
                }
            }
            xhr.open('post', './php/postArt.php')
            xhr.send(formData)
        },
        changeimg(e) {
            let file = e.target.files
            reader = new FileReader()
            reader.readAsDataURL(file[0])

            //取得 上傳照片之檔案格式，以利送出時判斷
            let img_type = file[0].type.split('/').pop()

            // 確認 上傳照片之格式
            let array = ['jpg', 'jpeg', 'png', 'svg']
            if (array.indexOf(img_type) != -1) {

                this.upLoadImgOk = true
            } else {
                this.parentAlert = true
                this.alertText = "請確認上傳照片之格式 (jpg,jpeg,png,svg)"
                return ''
            }


            //顯示 照片預覽
            reader.onload = function (event) {
                document.getElementById('art_img').src = event.target.result
            }

        },
        closeNewArtBox() {
            this.$emit('childCloseNewArtBox')
        },
    },
    template: `
    <div class="new_article">
        <section class="section_7">
            <div class="close_img" @click="closeNewArtBox"><img src="Images/close.svg"></div>
            <div class="publish">發表文章</div>
            <div class="sendimg_box"><img src="./Images/unnamed.png" id="art_img"></div>
            <div class="sendimgbtn_box">
                <label class="sendimgbtn">
                    <div class="image_img"><img src="./Images/image.svg"></div>
                    <input type="file" id="upfile" name="upfile" @change="changeimg($event)"/>
                    <div>上傳封面</div>
                </label>
            </div>
            <input type="text" class="set_title" placeholder="請輸入文章標題限20字" oninput="if(value.length>20) value=value.substr(0,20)" v-model="art_name">
            <textarea type="textarea" class="set_con" placeholder="請輸入文章內容限100字" oninput="if(value.length>100) value=value.substr(0,100)" v-model="art_intro"></textarea>
            <div class="sendform_btn">
                <button class="sendformbtn" id="sendformbtn" @click="checkToPostArt">
                    <div class="sendbtn_img"><img src="./Images/send.svg"></div>
                    <div class="sendbtn_text" >送出</div>
                </button>
            </div>
        </section>

        <!-- 警示視窗 -->
        <!-- parentAlert為是否開啟警示視窗的變數，往下層傳遞 -->
        <!-- alertText為警示視窗的內文，往下層傳遞 -->
        <!-- childSendCloseAlert為警示內點擊確認或關閉時，會往上傳遞並接收的事件，接收後呼叫parentGetCloseAlert這個方法 -->
        <alert_lightbox :parentAlert_ = "parentAlert" :_alertText="alertText" @childSendCloseAlert="parentGetCloseAlert"></alert_lightbox>
    </div>
    `,
})
new Vue({
    el: "#app",
    data: {
        parent_mem_no: '',
    },
    methods: {
        checked_mem(data) {
            this.parent_mem_no = data.mem_no
        },
    },
})
