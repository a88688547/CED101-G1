window.addEventListener('load', function () {
    //New Vue
    new Vue({
        el: '#app',
        data: {
            account: '',
            password: '',
        },
        template: `
        <div class="loginbox">
            <div>
                <h1>管理員登入</h1>
            </div>
            <div>
                <div class="accountbox account">
                    <i class="fas fa-user"></i>
                    <input type="text" id="adminId" placeholder="account" v-model="account">
                </div>
                <div class="passwordbox account">
                    <i class="fas fa-unlock-alt"></i>
                    <input type="password" id="adminPwd" placeholder="password" v-model="password">
                </div>
            </div>
            <div>
                <button class="loginbtn" type="button" id="adminLogin" name="button" @click="login">登入</button>
            </div>

        </div>
        `,
        methods: {
            async login() {
                // console.log('登入')
                const res = await fetch('./php/mar_login.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mar_id: this.account,
                        mar_psw: this.password,
                    }),
                })
                    .then(function (data) {
                        return data.text()
                    })
                    .then(function (data) {
                        if (data === '登入成功') {
                            // console.log('登入成功')
                            location.href = `./Backstage.html`
                        } else if (data === '登入失敗') {
                            // console.log(res)
                            // console.log('登入失敗')
                        }
                    })
                // console.log('登入結束')
                // console.log(res)

                // if (res === '登入成功') {
                //     console.log('登入成功')
                //     window.location.href = `./Backstage.html`
                // } else if (res === '登入失敗') {
                //     console.log(res)
                //     console.log('登入失敗')
                // }
            },
        },
        components: {},
        created() {},
        mounted() {},
        beforeUpdate() {},
        beforeCreate() {},
        watch: {},
    })
})
