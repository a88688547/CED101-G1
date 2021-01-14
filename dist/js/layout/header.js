const member = new Vue()
Vue.component('my-header', {
    data() {
        return {
            username: '',
            signemail: '',
            signPassword: '',
            phone: '',
            passwordTwo: '',
            loginEmail: '',
            loginPassword: '',
            mem_no: '',
            showLogin: false,
            isActiveTab: 1,
            isLogin: false,
            memberInfo: '',
            voteTime: '',
        }
    },
    methods: {
        openLoginBox() {
            if (this.memberInfo != '') {
                // this.showLogin = false
                location.href = './member.html'
                return
            } else {
                this.showLogin = true
                return
            }
        },
        closeLoginBox() {
            this.showLogin = false
            this.username = ''
            this.signemail = ''
            this.signPassword = ''
            this.phone = ''
            this.passwordTwo = ''
            this.loginEmail = ''
            this.loginPassword = ''
            this.$refs.errorLogin.innerText = ''
        },
        toggleClass(id) {
            this.isActiveTab = id
        },
        clearText() {
            this.username = ''
            this.signemail = ''
            this.signPassword = ''
            this.phone = ''
            this.passwordTwo = ''
            this.loginEmail = ''
            this.loginPassword = ''
            this.$refs.errorLogin.innerText = ''
            this.$refs.signerror.innerText = ''
        },
        async loginMember() {
            let isEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/

            if (this.loginEmail === '' || this.loginPassword === '') {
                this.$refs.errorLogin.innerText = '請輸入帳號密碼!!'
                return
            }
            if (!isEmail.test(this.loginEmail)) {
                this.$refs.errorLogin.innerText = '請輸入正確信箱!!'
                return
            }

            await fetch('./php/login.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mem_email: this.loginEmail,
                    mem_psw: this.loginPassword,
                }),
            })
                .then(function (data) {
                    return data.json()
                })

                .then((res) => {
                    if (res != '查無此帳號') {
                        this.memberInfo = res
                        this.$refs.UserName.innerText = `hi~${res.mem_name}`
                        this.$refs.errorLogin.innerText = ''
                        this.loginEmail = ''
                        this.loginPassword = ''
                        this.isLogin = true
                        this.showLogin = false
                        member.$emit('memberInfo', this.memberInfo)
                        alert('登入成功')
                        // console.log(res);
                    } else {
                        this.$refs.errorLogin.innerText = '帳號密碼錯誤'
                    }
                })
                .catch((err) => {
                    this.$refs.errorLogin.innerText = '帳號密碼錯誤'
                    console.log(err)
                    console.log('失敗')
                })

            // await member.$emit('memberInfo', this.memberInfo)
            // //location.reload()

        },
        signMember() {
            let isEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/
            let isName = /^[\u0391-\uFFE5]+$/
            let isPassword = /^[0-9a-zA-Z]*$/
            let isphonenum = /^09\d{2}?\d{3}?\d{3}$/

            if (!isName.test(this.username) || this.username == '') {
                this.$refs.signerror.innerText = '請輸入中文姓名'
                return
            }
            if (!isEmail.test(this.signemail) || this.signemail == '') {
                this.$refs.signerror.innerText = '請輸入正確信箱'
                return
            }
            if (!isPassword.test(this.signPassword) || this.signPassword == '') {
                this.$refs.signerror.innerText = '請輸入數字英文'
                return
            }

            if (this.signPassword !== this.passwordTwo || this.passwordTwo == '' || this.signPassword == '') {
                this.$refs.signerror.innerText = '密碼不一致'
                return
            }
            if (!isphonenum.test(this.phone) || this.phone == '') {
                this.$refs.signerror.innerText = '請輸入正確手機號碼'
                return
            }
            fetch('./php/registered.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.username,
                    account: this.signemail,
                    password: this.signPassword,
                    phone: this.phone,
                }),
            })
                .then((res) => {
                    return res.json()
                })
                .then((res) => {
                    if (res !== '註冊成功') {
                        this.$refs.signerror.innerText = '此信箱已註冊過'
                    } else {
                        this.username = ''
                        this.signemail = ''
                        this.signPassword = ''
                        this.phone = ''
                        this.passwordTwo = ''
                        this.$refs.signerror.innerText = ''
                        alert('註冊成功')
                        // console.log(res)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        logoutBtn() {
            fetch('./php/logout.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(() => {
                    this.isLogin = false
                    this.$refs.UserName.innerText = ''
                    this.memberInfo = ''
                    // location.href = './homepage.html'
                    sessionStorage.clear()
                    alert('登出成功')
                })
                .catch((err) => {
                    console.log('錯誤')
                    // console.log(err)
                })

        },
        hamburgHandler() {
            this.$refs.hamburg_btn.classList.toggle('btn-on')
            this.$refs.nav_list.classList.toggle('nav-open')
        },

        get_mem: async function () {
            // console.log('send2', drinkno)
            await fetch('./php/checkMember.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    return res.json()
                })
                .then((res) => {
                    if (JSON.stringify(res) !== '{}') {
                        this.isLogin = true
                        this.memberInfo = res
                        this.$refs.UserName.innerText = `hi~${res.memName}`
                        // console.log(this.memberInfo)
                    } else if (JSON.stringify(res) === '{}') {
                        this.isLogin = false
                    }
                })
                .catch((err) => {
                    console.log(err)

                    console.log('錯誤')
                })

            await member.$emit('memberInfo', this.memberInfo)
        },
        unMember() {
            this.showLogin = true;
        },
    },
    mounted() {
        member.$on("plsLogin", this.unMember);
    },
    created() {
        this.get_mem()
    },
    template: `
            <nav>
                <button class="hamburg_btn" ref="hamburg_btn" @click="hamburgHandler">
                    <div class="hamburg_line line_1"></div>
                    <div class="hamburg_line line_2"></div>
                    <div class="hamburg_line line_3"></div>
                </button>
                <a href="./homepage.html" class="logo_img"><img class="logo" src="./Images/logo-header.svg" alt="" /></a>
                <div class="nav_list" id="header_nav" ref="nav_list">
                    <ul>
                        <a href="./menu_self.html"><img src="./Images/drop-header.svg" alt="" />菜單</a>
                        <a href="./join_list.html"><img src="./Images/drop-header.svg" alt="" />揪團喝</a>
                        <a href="./vote.html"><img src="./Images/drop-header.svg" alt="" />飲品排名</a>
                        <a href="./share_article.html"><img src="./Images/drop-header.svg" alt="" />分享區</a>
                        <a href="./custom.html"><img src="./Images/drop-header.svg" alt="" />小遊戲</a>
                        <a href="./brandStory-repair-flex.html"><img src="./Images/drop-header.svg" alt="" />關於揪飲</a>
                    </ul>
                    <div class="user_wrap" v-show="isLogin">
                        <span ref="UserName" class="user"></span>
                        <span id="logout" @click="logoutBtn">登出</span>
                    </div>
                    <a  class="user_logo_img_web" @click="openLoginBox"
                        ><img class="user_logo" src="./Images/login.svg" alt=""
                    /></a>
                </div>
                <a  class="user_logo_img_phone" @click="openLoginBox"
                    ><img class="user_logo" src="./Images/login.svg" alt=""
                /></a>

                <div class="lightbox-container" v-if="showLogin">
                    <div class="lightbox-wrap">
                        <div class="lightbox-top">
                            <div class="tab" :class="{tabbackgroud:isActiveTab==1}" @click="toggleClass(1)">
                                <h3 class="h3" :class="{textcolor:isActiveTab==1}">登入</h3>
                            </div>
                            <div class="tab" :class="{tabbackgroud:isActiveTab==2}" @click="toggleClass(2)">
                                <h3 class="h3":class="{textcolor:isActiveTab==2}">註冊</h3>
                            </div>
                            <div class="close">
                                <i class="fas fa-times-circle" :class="{closeBlock:isActiveTab==1}" @click="closeLoginBox"></i>
                                <i class="far fa-times-circle" :class="{closeBlock:isActiveTab==2}" @click="closeLoginBox"></i>
                            </div>
                        </div>
                        <form class="lightbox-bot" action="">
                            <div class="login tabBody" :class="{tabBodyNone:isActiveTab==1}">
                                <div class="login-email">
                                    <label for="login-email">信箱</label>
                                    <input type="email" id="login-email" v-model.trim="loginEmail" placeholder="Useremail" maxlength="50"/>
                                </div>
                                <div class="login-password">
                                    <label for="password">密碼</label>
                                    <input type="password" id="login-password" v-model.trim="loginPassword" placeholder="Password" maxlength="10"/>
                                </div>
                                <div ref="errorLogin" style="color:red"></div>
                                <div class="sure-cancel">
                                    <button type="button" @click="clearText">清除</button>
                                    <button type="button" @click="loginMember">確認</button>
                                </div>
                            </div>
                            <div class="sign-up tabBody" :class="{tabBodyNone:isActiveTab==2}">
                                <div class="name">
                                    <label for="name">姓名</label>
                                    <input type="text" id="name" v-model.trim="username" name="username" placeholder="Username" maxlength="10" />
                                </div>
                                <div class="email">
                                    <label for="email">信箱</label>
                                    <input type="email" id="email" v-model.trim="signemail" name="email" placeholder="Useremail" maxlength="50" />
                                </div>
                                <div class="password">
                                    <label for="sign-password">密碼</label>
                                    <input type="password" id="sign-password" v-model.trim="signPassword" name="signPassword" placeholder="Password" maxlength="10" />
                                </div>
                                <div class="password_two">
                                    <label for="password_two">確認密碼</label>
                                    <input type="password" id="password_two" v-model.trim="passwordTwo" name="passwordTwo" placeholder="Confirm" maxlength="10"/>
                                </div>
                                <div class="phone">
                                    <label for="phone">手機號碼</label>
                                    <input type="text" id="phone" v-model="phone" name="phone" placeholder="Phone" maxlength="10"/>
                                </div>
                                <div id="signerror" ref="signerror" style="color:red"></div>
                                <div class="sure-cancel">
                                    <button type="button" @click="clearText">清除</button>
                                    <button type="button" @click="signMember">確認</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
            `,
})
