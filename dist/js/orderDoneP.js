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
        el: "#app",
        data: {
            mem_info: "",
            mem_no: "",
            per_ord_no: "",
            per_ord: "",
            order_item: "",
        },
        methods: {
            clear() {
                sessionStorage.clear()
            },
            checked_mem(data) {
                this.memberInfo = data
                if (this.memberInfo.mem_no === undefined) {
                    location.href = `./homepage.html`
                }
            },

            get_mem_info(data) {
                this.mem_info = data
                this.mem_no = data.mem_no
            },
            get_ord_item: async function () {
                const res = await fetch('./php/getpersonitem.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        per_ord_no: this.per_ord_no,
                    }),
                }).then(function (data) {
                    return data.json()
                })
                this.order_item = res
            },

            get_ord: async function () {
                const res = await fetch("./php/mem_getone_ord.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        per_ord_no: this.per_ord_no,
                    }),
                })
                    .then((res) => res.json())
                    .then((res) => (this.per_ord = res));
            },


        },

        mounted() {

            this.get_ord_item()
            this.get_ord()
        },
        created() {
            member.$on('memberInfo', this.get_mem_info)
            this.per_ord_no = window.location.search.split("=")[1];
            this.clear()

        },
    })