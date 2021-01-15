let storage = sessionStorage;


// 進度
Vue.component('top', {

    template: `
        <div class="step_box">
            <ul class="step_ball">
                <li>
                    <img src="./Images/join_list/step_1_icon.svg" alt="">
                    <h5>1.建立訂單</h5>
                </li>
                <li>
                    <img src="./Images/join_list/step_3_icon.svg" alt="">
                    <h5>2.訂單頁面</h5>
                </li>
                <li>
                    <img src="./Images/join_list/step_4_icon.svg" alt="">
                    <h5>3.訂單完成</h5>
                </li>
            </ul>
        </div>
`
}),



    new Vue({
        el: '#app',

        data() {
            return {
                // 個人資訊
                phone: '',
                address: '',
                note: '',
                // 折扣
                cou_no: "",
                selected: "",
                cardname: "",
                couname: "",
                // 卡號
                card1: "",
                card2: "",
                card3: "",
                card4: "",
                // 年月
                month: "",
                year: "",
                // 安全碼
                safeno: "",
                //燈箱
                show: false,
                errormessage: "",


            }
        },

        methods: {
            action() {
                let pricetmp = storage["totalprice"];
                this.totalprice = pricetmp;
            },

            // 個人資訊
            check() {
                storage["cardname"] = this.cardname
                // 折扣數
                storage["cou_dis"] = this.selected.cou_discount
                storage["couname"] = this.selected.cou_no

                let step = false
                while (step === false) {
                    let allinput = document.querySelectorAll('input')
                    // console.log(allinput[0].value)
                    for (i = 0; i < allinput.length - 2; i++) {
                        if (allinput[i].value === "") {
                            // alert("oops")
                            this.show = true
                            this.errormessage = "尚有資料未填寫，請確認"
                            // console.log(step)
                            return
                        }
                    }
                    step = true
                    // console.log(step)
                }
                while (step === true) {
                    // console.log("step")
                    if (/^[0][9][0-9]{8}$/.test(this.phone)) {
                        console.log("123")
                        storage["info_phone"] = this.phone

                    }
                    else {
                        this.phone = ""
                        this.show = true
                        this.errormessage = "手機輸入格式有誤"
                        step = false
                        return
                    };
                    // 驗證地址長度不超過30字
                    if (this.address.length <= 30) {
                        storage["info_address"] = this.address
                    }
                    else {
                        this.address = ""
                        this.show = true
                        this.errormessage = "字數超過30個字"
                        step = false
                        return
                    }
                    // 驗證給店家的話長度不超過20字
                    if (this.note.length <= 20) {
                        storage["info_note"] = this.note
                    }
                    else {
                        this.note = ""
                        this.show = true
                        this.errormessage = "輸入字數超過20個字"
                        step = false
                        return
                    }
                    // 把錯誤的輸入框清空，並跳到該格
                    if (!/^\d{4}$/.test(this.card1)) {
                        this.card1 = ""
                        // this.$refs.cardno1.focus()
                        this.show = true
                        this.errormessage = "請輸入4碼數字"
                        step = false
                        return
                    }
                    if (!/^\d{4}$/.test(this.card2)) {
                        this.card2 = ""
                        // this.$refs.cardno2.focus()
                        this.show = true
                        this.errormessage = "請輸入4碼數字"
                        step = false
                        return
                    }
                    if (!/^\d{4}$/.test(this.card3)) {
                        this.card3 = ""
                        // this.$refs.cardno3.focus()
                        this.show = true
                        this.errormessage = "請輸入4碼數字"
                        step = false
                        return
                    }
                    if (!/^\d{4}$/.test(this.card4)) {
                        this.card4 = ""
                        // this.$refs.cardno4.focus()
                        this.show = true
                        this.errormessage = "請輸入4碼數字"
                        step = false
                        return
                    }
                    else {
                        storage["cardno"] = this.card1 + "-" + this.card2 + "-" + this.card3 + "-" + this.card4
                    }

                    // 有效期限，需輸入2021年以後，月份需為01-12
                    if (/^[0][1-9]|^[1][0-2]$/.test(this.month)) {
                        storage["exp_month"] = this.month
                    }
                    else {
                        this.month = ""
                        // this.$refs.month.focus()
                        this.show = true
                        this.errormessage = "請輸入2碼數字月份，ex:01"
                        step = false
                        return
                    }
                    if (/^[2][0-9][2-9][1-9]|^[2][1-9][0-9][0-9]/gm.test(this.year)) {
                        storage["exp_year"] = this.year
                    }
                    else {
                        this.year = ""
                        // this.$refs.year.focus()
                        this.show = true
                        this.errormessage = "請輸入4碼年份，ex:2021"
                        step = false
                        return
                    }

                    // 安全碼 驗證3碼
                    if (/^[0-9]{3}/.test(this.safeno)) {
                        storage["safeno"] = this.safeno
                        break
                    } else {
                        this.safeno = ""
                        // this.$refs.safeno.focus()
                        this.show = true
                        this.errormessage = "請輸入3碼數字"
                        step = false
                        return
                    }


                }

                // // 驗證中文地址
                // // if (/[^a-zA-z0-9]|[\u4e00-\u9fcc0-9]{1,}[\u4e00-\u9fcc]/g.test(this.address)) {
                // // storage["info_address"] = this.address
                // // }
                // // else {
                // // alert('oops!輸入address有誤')
                // // }
                window.location.href = "orderPayment2.html"
            },
            // 折扣
            dis() {
                let pricetmp = storage["totalprice"];
                let cuptmp = storage["totalcup"];
                this.totalcup = cuptmp;
                this.totalprice = pricetmp;
            },
            couno() {
                fetch('./php/personinfo.php', {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                })
                    .then(coupondatarow => coupondatarow.json())
                    .then(coupondatarow => this.cou_no = coupondatarow);
            },
            //信用卡//輸入該input設定的字數後，自動跳到下一個輸入框
            // autotab() {
            //     // 卡號
            //     if (this.card1.length == 4) {
            //         this.$refs.cardno2.focus()
            //     }
            //     if (this.card1.length == 4
            //         && this.card2.length == 4) {
            //         this.$refs.cardno3.focus()
            //     }
            //     if (this.card1.length == 4
            //         && this.card2.length == 4
            //         && this.card3.length == 4) {
            //         this.$refs.cardno4.focus()
            //     }
            //     if ((this.card4.length == 4)
            //         && cardlength == 16) {
            //         this.$refs.month.focus()
            //     }
            //     let cardlength = this.card1.length + this.card2.length + this.card3.length + this.card4.length

            //     // 月份
            //     if (cardlength == 16 && this.month.length == 2) {
            //         this.$refs.year.focus()
            //     }
            //     let exp = this.month.length + this.year.length
            //     if (cardlength == 16 && exp == 6) {
            //         this.$refs.safeno.focus()
            //     }
            // },
            closebox() {
                this.show = false
                this.errormessage = " "

            },
        },
        created() {
            this.action()
            this.dis()
            this.couno()
        },
    })