window.addEventListener('load', function () {
    //側邊導覽列 -- 組件
    Vue.component('my-aside', {
        data() {
            return {
                // show: 'manager',
            }
        },
        props: ['show'],
        template: `
                        <aside>
                          <ul class="tag_list">
                            <li @click="changeTag($event)" id="manager" >管理員帳號管理</li>
                            <li @click="changeTag($event)" id="member" >會員帳號管理</li>
                            <li @click="changeTag($event)" id="drink">商品管理</li>
                            <li @click="changeTag($event)" id="drink_type">商品規格管理</li>
                            <li @click="changeTag($event)" id="group_ord_list">揪團訂單管理</li>
                            <li @click="changeTag($event)" id="self" >一般訂單管理</li>
                            <li @click="changeTag($event)" id="article">文章檢舉審核</li>
                            <li @click="changeTag($event)" id="message">留言檢舉審核</li>
                          </ul>
                        </aside>`,
        methods: {
            changeTag(event) {
                //獲取被點擊的 ID值，並傳送至上層 (new Vue)
                this.$emit('change', event.currentTarget.id)
            },
        },
    })
    //-----------------------------------------------------

    //管理員帳號管理 -- 組件
    Vue.component('manager', {
        data() {
            return {
                //撈出來的 管理員資料
                managers: '',
            }
        },
        props: ['show'],

        template: `<section v-if=" show === 'manager' ">
                    <h1 class="title">管理員帳號管理</h1>
                    <div class="manager_list_box">
                        <div class="manager_title_row">
                            <div>管理員編號</div>
                            <div>管理員名稱</div>
                            <div>管理員帳號</div>
                            <div>管理員密碼</div>
                            <div>帳號狀態</div>
                        </div>
                        <div class="manager_per" v-for="(value,key) in managers">
                            <div>{{value.mar_no}}</div>
                            <div>{{value.mar_name}}</div>
                            <div>{{value.mar_id}}</div>
                            <div>{{value.mar_psw}}</div>
                            <div class="toggle">
                                <input checked type="checkbox" :id="key" />
                                <label :for="key"></label>
                            </div>
                        </div>
                    </div>

                  </section>`,
        methods: {
            //呼叫php程式，取回 管理員帳號 相關資料，並用json()轉回一般陣列
            get_mar: async function () {
                const res = await fetch('./php/bs_getall_manager.php', {}).then(function (data) {
                    return data.json()
                })
                // 取回res值後，呼叫另一隻函式
                this.change_mar(res)
            },
            // 將值寫入data中
            change_mar: function (data) {
                this.managers = data
            },
        },
        // template 渲染前 會先去執行以下函式
        created() {
            this.get_mar()
        },
    })
    //-----------------------------------------------------

    //會員帳號管理 -- 組件
    Vue.component('member', {
        data() {
            return {
                members: '',
            }
        },
        props: ['show'],

        template: `<section v-if=" show === 'member' ">
                    <h1 class="title">會員帳號管理</h1>
                    <div class="member_list_box">
                        <div class="member_title_row">
                            <div>會員編號</div>
                            <div>會員名稱</div>
                            <div>會員信箱</div>
                            <div>會員密碼</div>
                            <div>會員電話</div>
                            <div>帳號狀態</div>
                        </div>
                        <div class="member_per" v-for="(value,key) in members">
                            <div>{{value.mem_no}}</div>
                            <div>{{value.mem_name}}</div>
                            <div>{{value.mem_email}}</div>
                            <div>{{value.mem_psw}}</div>
                            <div>{{value.mem_phone}}</div>
                            <div class="toggle">
                                <input checked type="checkbox" :id="key" />
                                <label :for="key"></label>
                            </div>
                        </div>
                    </div>

                  </section>`,
        methods: {
            //呼叫php程式，取回 管理員帳號 相關資料，並用json()轉回一般陣列
            get_mar: async function () {
                const res = await fetch('./php/bs_getall_member.php', {}).then(function (data) {
                    return data.json()
                })
                // 取回res值後，呼叫另一隻函式
                this.change_mar(res)
            },
            // 將值寫入data中
            change_mar: function (data) {
                this.members = data
            },
        },
        // template 渲染前 會先去執行以下函式
        created() {
            this.get_mar()
        },
    })
    //-----------------------------------------------------

    //商品管理 -- 組件
    Vue.component('drink', {
        data() {
            return {
                //撈出來的 飲料資料
                drinks: '',
            }
        },
        props: ['show', 'drinkno'],

        template: `
                  <section v-if=" show === 'drink' ">
                    <h1 class="title">商品管理</h1>
                    <div class="btn_box"><div class="add_btn" @click="additem">新增商品</div></div>
                    <div class="drink_list_box">
                        <div class="drink_title_row">
                            <div>飲料編號</div>
                            <div>飲料名稱</div>
                            <div>飲料類別</div>
                            <div>大杯金額</div>
                            <div>小杯金額</div>
                            <div>上架狀態</div>
                            <div></div>
                        </div>
                        <div class="drink_item" v-for="(value,key) in drinks">
                            <div>{{value.drink_no}}</div>
                            <div>{{value.drink_title_ch}}</div>
                            <div>{{value.drink_type_title}}</div>
                            <div>{{value.drink_big_price}}</div>
                            <div>{{value.drink_small_price}}</div>
                            <div class="toggle">
                                <input checked type="checkbox" :id="key" />
                                <label :for="key"></label>
                            </div>
                            <div class="edit_btn" @click="changeTag(),changedrinkno(value.drink_no)">編輯</div>
                        </div>
                    </div>
                  </section>`,
        methods: {
            //切換至 編輯商品頁面
            changeTag() {
                //將drink_edit 傳送至上層 (new Vue)
                this.$emit('change', 'drink_edit')
            },
            //傳送點擊飲料編號
            changedrinkno(drinkno) {
                this.$emit('changedrinkno', drinkno)
                // console.log('changedrinkno', drinkno)
            },
            //切換至 新增商品頁面
            additem() {
                //傳送至上層 (new Vue)
                this.$emit('change', 'drink_add')
            },
            //呼叫php程式，取回 飲料 相關資料，並用json()轉回一般陣列
            get_mar: async function () {
                const res = await fetch('./php/bs_getall_drink.php', {}).then(function (data) {
                    return data.json()
                })
                // 取回res值後，呼叫另一隻函式
                this.get_drink(res)
            },
            // 將值寫入data中
            get_drink: function (data) {
                this.drinks = data
            },
        },
        created() {
            this.get_mar()
        },
    })
    //-----------------------------------------------------

    //---  編輯商品 -- 組件
    Vue.component('drink_edit', {
        data() {
            return {
                // 存放撈出來的飲料資訊
                drink: '',
                type_info: [
                    {
                        type_no: 1,
                        type_title: '甜度',
                        type_detail: [
                            { type_no: 1, detail_no: 2, detail_title: '全糖' },
                            { type_no: 1, detail_no: 3, detail_title: '全糖' },
                            { type_no: 1, detail_no: 4, detail_title: '全糖' },
                            { type_no: 1, detail_no: 5, detail_title: '全糖' },
                            { type_no: 1, detail_no: 5, detail_title: '全糖' },
                            { type_no: 1, detail_no: 5, detail_title: '全糖' },
                            { type_no: 1, detail_no: 5, detail_title: '全糖' },
                        ],
                    },
                    {
                        type_no: 2,
                        type_title: '冰度',
                        type_detail: [
                            { type_no: 1, detail_no: 2, detail_title: '全糖' },
                            { type_no: 1, detail_no: 3, detail_title: '全糖' },
                            { type_no: 1, detail_no: 4, detail_title: '全糖' },
                            { type_no: 1, detail_no: 5, detail_title: '全糖' },
                        ],
                    },
                    {
                        type_no: 3,
                        type_title: '加料',
                        type_detail: [
                            { type_no: 1, detail_no: 2, detail_title: '全糖' },
                            { type_no: 1, detail_no: 3, detail_title: '全糖' },
                            { type_no: 1, detail_no: 4, detail_title: '全糖' },
                            { type_no: 1, detail_no: 5, detail_title: '全糖' },
                        ],
                    },
                ],
            }
        },
        props: ['show', 'drinkno'],

        template: `
                  <section v-if=" show === 'drink_edit' ">
                    <h1 class="title">商品編輯 -- {{drink[0].drink_title_ch}}</h1>
                    <div class="return_btn_box"><div class="return_btn" @click="changeTag">返回商品列表</div></div>
                    <form class="drink_edit_box">
                      <div>
                        <div class="drink_edit_row">
                            <label>飲料編號</label>
                            <div>{{drink[0].drink_no}}</div>
                        </div>
                        <div class="drink_edit_row">
                            <label for="name_ch">飲料名稱(中)</label>
                            <input type="text" id="name_ch" :value="drink[0].drink_title_ch" />
                        </div>
                        <div class="drink_edit_row">
                            <label for="name_en">飲料名稱(英)</label>
                            <input type="text" id="name_en"  />
                        </div>
                        <div class="drink_edit_row">
                            <label for="type">飲料類別</label>
                            <select name="type" id="type">
                              <option value="">-----請選擇飲料類別-----</option>
                              <option value="1">奶類</option>
                              <option value="2">茶類</option>
                              <option value="3">果茶類</option>
                            </select>
                        </div>
                        <div class="drink_edit_row">
                            <label for="big_price">大杯金額</label>
                            <input type="text" id="big_price" :value="drink[0].drink_big_price" />
                        </div>
                        <div class="drink_edit_row">
                            <label for="small_price">小杯金額</label>
                            <input type="text" id="small_price" :value="drink[0].drink_small_price" />
                        </div>
                        <div class="type_box">
                            <div class="type_box_title">選取 商品規格:</div>
                            <div class="type_name_box" :id="value.type_no" v-for="(value,key) in type_info">
                                <div class="type_name">{{value.type_title}} : </div>
                                <div v-for="(value,key) in value.type_detail" class="detali_list">
                                    <input type="checkbox" :name="value.detail_no" :value="value.detail_no"></input>
                                    {{value.detail_title}}
                                </div>
                            </div>
                        </div>
                      </div>
                      <div class="addinfo_right_box">
                        <div>
                          <label for="upFile">上傳飲料照片</label>
                          <input type="file" id="upFile" name="upFile" @change="changeimg($event)"/><br />
                        </div>
                        <div class="upFile_img_box">
                          <img :src="drink[0].drink_img" alt="尚未新增任何照片" id="image" />
                        </div>
                      </div>
                      <button class="drink_edit_btn">確認修改</button>
                    </form>
                  </section>`,
        methods: {
            // 切換頁面
            changeTag() {
                //傳送至上層 (new Vue)
                this.$emit('change', 'drink')
            },
            //預覽  上傳圖片
            changeimg(event) {
                let file = event.target.files
                reader = new FileReader()
                reader.readAsDataURL(file[0])
                reader.onload = function (event) {
                    document.getElementById('image').src = event.target.result
                }
                console.log('changeimg')
            },
            //呼叫php程式，取回 飲料 相關資料，並用json()轉回一般陣列
            get_mar: async function (drinkno) {
                console.log('send2', drinkno)
                const res = await fetch('./php/bs_getone_drink.php', {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'same-origin', // no-cors, *cors, same-origin
                    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json', // sent request
                        // Accept: 'application/json', // expected data sent back
                    },
                    // redirect: 'follow', // manual, *follow, error
                    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify({
                        drink_no: drinkno,
                    }), // body data type must match "Content-Type" header
                }).then(function (data) {
                    return data.json()
                })
                // 取回res值後，呼叫另一隻函式
                this.get_drink(res)
            },
            // 將值寫入data中
            get_drink: function (data) {
                this.drink = data
            },
        },
        created() {
            // 渲染前 先去撈取資料
            this.get_mar(this.drinkno)
            // console.log('send:', this.drinkno)
        },
        // 監聽數值變化
        watch: {
            // 當選取的飲料不同時，重新撈取一次 單一飲品的資料
            drinkno: function (newdrinkno) {
                this.get_mar(newdrinkno)
            },
        },
    })
    //-----------------------------------------------------

    //---  新增商品 -- 組件
    Vue.component('drink_add', {
        data() {
            return {
                //切換Tag
                // show: 'show',
                //撈出來的 會員資料
            }
        },
        props: ['show'],

        template: `
                  <section v-if=" show === 'drink_add' ">
                    <h1 class="title">新增商品</h1>
                    <div class="return_btn_box"><div class="return_btn" @click="changeTag_drink">返回商品列表</div></div>
                    <form class="drink_edit_box">
                      <div>
                        <div class="drink_edit_row">
                            <label for="name_ch">飲料名稱(中)</label>
                            <input type="text" id="name_ch"  />
                        </div>
                        <div class="drink_edit_row">
                            <label for="name_en">飲料名稱(英)</label>
                            <input type="text" id="name_en"  />
                        </div>
                        <div class="drink_edit_row">
                            <label for="type">飲料類別</label>
                            <select name="type" id="type">
                              <option value="">-----請選擇飲料類別-----</option>
                              <option value="1">奶類</option>
                              <option value="2">茶類</option>
                              <option value="3">果茶類</option>
                            </select>
                        </div>
                        <div class="drink_edit_row">
                            <label for="big_price">大杯金額</label>
                            <input type="text" id="big_price"  />
                        </div>
                        <div class="drink_edit_row">
                            <label for="small_price">小杯金額</label>
                            <input type="text" id="small_price"  />
                        </div>
                      </div>
                      <div class="addinfo_right_box">
                        <div>
                          <label for="upFile">上傳飲料照片</label>
                          <input type="file" id="upFile" name="upFile" @change="changeimg($event)"/><br />
                        </div>
                        <div class="upFile_img_box">
                          <img src="" alt="尚未新增任何照片" id="image" />
                        </div>
                      </div>
                      <button class="drink_add_btn">新增商品</button>
                    </form>
                  </section>`,
        methods: {
            changeTag_drink() {
                //傳送至上層 (new Vue)
                this.$emit('change', 'drink')
            },
            changeimg(event) {
                let file = event.target.files
                reader = new FileReader()
                reader.readAsDataURL(file[0])
                reader.onload = function (event) {
                    document.getElementById('image').src = event.target.result
                }
                console.log('changeimg')
            },
        },
    })
    //-----------------------------------------------------
    // 商品規格 管理 -- 組件
    Vue.component('drink_type', {
        data() {
            return {
                types: '',
            }
        },
        props: ['show', 'type_no'],

        template: `
                  <section v-if=" show === 'drink_type' ">
                    <h1 class="title">商品規格管理</h1>
                    <div class="btn_box"><div class="add_btn" @click="addtype">新增商品規格</div></div>
                    <div class="type_list_box">
                        <div class="type_item" v-for="(value,key) in types" @click="changeTag(),changetypeno(value.type_no,value.type_title)">
                            {{value.type_title}}
                        </div>
                    </div>
                  </section>`,
        methods: {
            //切換至 編輯商品規格頁面
            changeTag() {
                //將drink_edit 傳送至上層 (new Vue)
                this.$emit('change', 'type_edit')
            },
            //傳送點擊飲料編號
            changetypeno(type_no, type_title) {
                this.$emit('changetypeno', type_no, type_title)
                // console.log('changedrinkno', drinkno)
            },
            //切換至 新增商品規格頁面
            addtype() {
                //傳送至上層 (new Vue)
                this.$emit('change', 'type_add')
            },
            //呼叫php程式，取回 飲料 相關資料，並用json()轉回一般陣列
            get_data: async function () {
                const res = await fetch('./php/bs_getall_type.php', {}).then(function (data) {
                    return data.json()
                })
                // 取回res值後，呼叫另一隻函式
                this.types = res
                // this.get_type(res)
            },
            // 將值寫入data中
            // get_type: function (data) {
            //     this.types = data
            // },
        },
        created() {
            this.get_data()
        },
    })
    //-----------------------------------------------------

    //---  編輯  商品規格 -- 組件
    Vue.component('type_edit', {
        data() {
            return {
                type: '',
            }
        },
        props: ['show', 'type_no', 'type_title'],

        template: `
                  <section v-if=" show === 'type_edit' ">
                    <h1 class="title">編輯 商品規格 -- {{type_title}}</h1>
                    <div class="return_btn_box"><div class="return_btn" @click="changeTag">返回 商品規格列表</div></div>
                    <div class="type_detail_box">
                        <form class="type_detail_box_left">
                            <label for="type_title_edit">規格名稱 : </label>
                            <input name="type_title_edit" id="type_title_edit" :value="type_title"></input>
                            <button id="edit_type_title">修改名稱</button>
                        </form>
                        <form class="type_detail_box_right">
                            <div>已擁有的細項 :</div>
                            <ul class="show_type_detail">
                                <li v-for="(value,key) in type">
                                    <div>{{value.detail_title}}</div><button>刪除</button>
                                </li>
                            </ul>
                            <input name="type_drtail_edit" id="type_drtail_edit" placeholder="輸入新增規格之名稱"></input>
                            <button id="add_type_detail">新增細項</button>
                            
                        </form>

                    </div>
                  </section>`,
        methods: {
            // 切換頁面
            changeTag() {
                //傳送至上層 (new Vue)
                this.$emit('change', 'drink_type')
            },
            //呼叫php程式，取回 飲料 相關資料，並用json()轉回一般陣列
            get_mar: async function (type_no) {
                const res = await fetch('./php/bs_getone_type.php', {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'same-origin', // no-cors, *cors, same-origin
                    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json', // sent request
                        // Accept: 'application/json', // expected data sent back
                    },
                    // redirect: 'follow', // manual, *follow, error
                    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify({
                        type_no: type_no,
                    }), // body data type must match "Content-Type" header
                }).then(function (data) {
                    return data.json()
                })
                // 取回res值後，呼叫另一隻函式
                this.get_drink(res)
            },
            // 將值寫入data中
            get_drink: function (data) {
                this.type = data
            },
        },
        created() {
            this.get_mar(this.type_no)
            // console.log('send:', this.drinkno)
        },
        // 監聽數值變化
        watch: {
            // 當選取的飲料不同時，重新撈取一次 單一飲品的資料
            type_no: function (new_type_no) {
                this.get_mar(new_type_no)
            },
        },
    })
    //-----------------------------------------------------

    //---  新增商品規格 -- 組件
    Vue.component('type_add', {
        data() {
            return {}
        },
        props: ['show'],

        template: `
                  <section v-if=" show === 'type_add' ">
                    <h1 class="title">新增商品規格</h1>
                    <div class="return_btn_box"><div class="return_btn" @click="changeTag_drink">返回商品列表</div></div>
                    <form class="type_add_box">
                        <div class="type_add_row">
                            <label for="type_add_title">規格名稱 :</label>
                            <input type="text" id="type_add_title" placeholder="請輸入規格名稱(1~6字)" />
                        </div>
                        <button>新增商品規格</button>
                    </form>
                  </section>`,
        methods: {
            changeTag_drink() {
                //傳送至上層 (new Vue)
                this.$emit('change', 'drink_type')
            },
        },
    })
    //-----------------------------------------------------

    //管理員帳號管理 -- 組件
    Vue.component('group_ord_list', {
        data() {
            return {
                //撈出來的 揪團訂單資料
                group_ord_bs: 0,
                group_ords: '',
            }
        },
        props: ['show'],

        template: `<section v-if=" show === 'group_ord_list' ">
                    <h1 class="title">揪團訂單管理</h1>
                    <div class="group_ord_type_box">
                        <div @click="group_ord_bs = 0,changecolor(0)">未處理</div>
                        <div @click="group_ord_bs = 1,changecolor(1)">已完成</div>
                    </div>
                    <div class="group_ord_list_box">
                        <div class="group_ord_title_row">
                            <div>訂單編號</div>
                            <div>訂單日期時間</div>
                            <div>外送地址</div>
                            <div>總杯數</div>
                            <div>備註</div>
                            <div>訂單狀態</div>
                            <div></div>
                        </div>
                        <div class="group_ord_row" v-for="(value,key) in group_ords">
                            <div>{{value.group_ord_no}}</div>
                            <div>{{value.arrive_time}}</div>
                            <div>{{value.group_adress}}</div>
                            <div>{{value.now_cup}}</div>
                            <div>{{value.note}}</div>
                            <div>{{checkstate(value.group_ord_bs)}}</div>
                            <div @click="changegroupordno(value.group_ord_no),changeTag()">詳情</div>
                        </div>
                    </div>

                  </section>`,
        methods: {
            //切換至 揪團訂單 詳情頁面
            changeTag() {
                //將drink_edit 傳送至上層 (new Vue)
                this.$emit('change', 'group_ord_info')
                console.log('00')
            },
            //點擊 傳送 訂單編號
            changegroupordno(group_ord_no) {
                this.$emit('changegroupordno', group_ord_no)
            },
            get_mar: async function (group_ord_bs) {
                const res = await fetch('./php/bs_getall_done_group_ord.php', {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'same-origin', // no-cors, *cors, same-origin
                    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json', // sent request
                        // Accept: 'application/json', // expected data sent back
                    },
                    // redirect: 'follow', // manual, *follow, error
                    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify({
                        group_ord_bs: group_ord_bs,
                    }), // body data type must match "Content-Type" header
                }).then(function (data) {
                    return data.json()
                })
                // 取回res值後，呼叫另一隻函式
                this.get_ord_type(res)
            },
            // 將值寫入data中
            get_ord_type: function (data) {
                this.group_ords = data
            },
            //判斷 訂單狀態 回傳 對應值
            checkstate: function (group_ord_bs) {
                if (group_ord_bs == 1) {
                    return '已完成'
                } else if (group_ord_bs == 0) {
                    return '未處理'
                }
            },
            //類型 點擊後 切換顏色
            changecolor: function (num) {
                let test = document.querySelectorAll('.group_ord_type_box>div').forEach(function (e) {
                    e.style.color = '#B3925B'
                    e.style.backgroundColor = '#fff'
                })

                let item = document.querySelectorAll('.group_ord_type_box>div')[num]
                item.style.color = '#fff'
                item.style.backgroundColor = '#B3925B'
            },
        },
        // template 渲染前 會先去執行以下函式
        created() {
            this.get_mar(this.group_ord_bs)
        },
        watch: {
            // 當選取的不同類型時，重新撈取一次 該類型的資料
            group_ord_bs: function (group_ord_bs) {
                this.get_mar(group_ord_bs)
            },
        },
    })
    //-----------------------------------------------------

    //---  編輯商品 -- 組件
    Vue.component('group_ord_info', {
        data() {
            return {
                // 訂單資料
                group_ord_info: '',
                // 訂單明細
                item_info: '',
            }
        },
        props: ['show', 'group_ord_no'],

        template: `
                  <section v-if=" show === 'group_ord_info' ">
                    <h1 class="title">訂單詳情 ( No: {{group_ord_info[0].group_ord_no}} )</h1>
                    <div class="return_btn_box"><div class="return_btn" @click="changeTag">返回訂單列表</div></div>
                    <div class="group_ord_info_box">
                        <div class="group_ord_info_first_box">
                            <div class="group_ord_info_row">
                                <div>訂單編號</div>
                                <div>{{group_ord_info[0].group_ord_no}}</div>
                            </div>
                            <div class="group_ord_info_row">
                                <div>期望送達時間</div>
                                <div>{{group_ord_info[0].arrive_time}}</div>
                            </div>
                        </div>
                        <div class="group_ord_info_sec_box">
                            <div class="group_ord_info_row">
                                <div>建立訂單日期</div>
                                <div>{{group_ord_info[0].group_datetime}}</div>
                            </div>
                            <div class="group_ord_info_row">
                                <div>連絡電話</div>
                                <div></div>
                            </div>
                             <div class="group_ord_info_row">
                                <div>總共杯數</div>
                                <div>{{group_ord_info[0].now_cup}}</div>
                            </div>
                             <div class="group_ord_info_row">
                                <div>杯數折扣</div>
                                <div>{{check_discount(group_ord_info[0].now_cup)}}</div>
                            </div>
                             <div class="group_ord_info_row">
                                <div>優惠券</div>
                                <div></div>
                            </div>
                            <div class="group_ord_info_row">
                                <div>訂單總金額</div>
                                <div>{{group_ord_info[0].group_ord_price_2}}</div>
                            </div>
                            <div class="group_ord_info_row">
                                <div>訂單狀態</div>
                                <div>{{chech_group_ord_bs(group_ord_info[0].group_ord_bs)}}</div>
                            </div>

                            <div class=" long_info">
                                <div>備註</div>
                                <div>{{group_ord_info[0].note}}</div>
                            </div>
                            <div class=" long_info">
                                <div>取貨地點</div>
                                <div>{{group_ord_info[0].group_adress}}</div>
                            </div>
                        </div>
                        <div class="group_ord_info_thr_box">
                            <div class="group_ord_item" v-for="(value,key) in item_info">
                                <div class="group_ord_item_left">
                                    <div>{{value.drink_title_ch}}-{{checkcup(value.cup_no)}}</div>
                                    <div>{{value.set_info}}</div>
                                </div>
                                <div class="group_ord_item_right">
                                    <div>{{value.ord_qua}}杯</div>
                                    <div>$ {{value.total_price}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="group_ord_info_four_box">
                            <div class="group_ord_info_four_row">
                                <div>原價</div>
                                <div>{{group_ord_info[0].group_ord_price}}</div>
                            </div>
                            <div class="group_ord_info_four_row">
                                <div>杯數折扣</div>
                                <div>x {{group_ord_info[0].dis_count}}</div>
                            </div>
                            <div class="group_ord_info_four_row">
                                <div>折扣後</div>
                                <div>{{group_ord_info[0].group_ord_price_1}}</div>
                            </div>
                            <div class="group_ord_info_four_row">
                                <div>優惠卷折扣</div>
                                <div>x {{group_ord_info[0].cou_discount}}</div>
                            </div>
                            <div class="group_ord_info_four_row group_ord_info_four_row_last">
                                <div>總計</div>
                                <div class="group_ord_info_four_row_last_count">
                                    <div>共{{group_ord_info[0].now_cup}}杯</div>
                                    <div>$ {{group_ord_info[0].group_ord_price_2}}</div>
                                </div>
                            </div>
                        </div>
                    
                    </div>

                  </section>`,
        methods: {
            // 切換頁面
            changeTag() {
                //傳送至上層 (new Vue)
                this.$emit('change', 'group_ord_list')
            },

            //呼叫php程式，
            get_mar: async function (group_ord_no) {
                // 取回 單一訂單 相關資料，並用json()轉回一般陣列
                const res = await fetch('./php/bs_getone_group_ord_info.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        group_ord_no: group_ord_no,
                    }),
                }).then(function (data) {
                    return data.json()
                })
                // 取回 單一 訂單明細 相關資料，並用json()轉回一般陣列
                const info = await fetch('./php/bs_gteone_ord_item.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        group_ord_no: group_ord_no,
                    }),
                }).then(function (data) {
                    return data.json()
                })

                // 取回res值後，呼叫另一隻函式
                this.get_drink(res, info)
            },
            // 將值寫入data中
            get_drink: function (data, info) {
                this.group_ord_info = data
                this.item_info = info
            },
            //判斷實際杯數 顯示折扣數
            check_discount: function (data) {
                if (data < 20) {
                    console.log('QQQ')
                    return '無優惠'
                } else if (20 <= data && data < 30) {
                    return '九折優惠'
                } else if (30 <= data && data < 40) {
                    return '八折優惠'
                } else if (40 <= data && data < 50) {
                    return '七折優惠'
                } else if (50 <= data) {
                    return '六折優惠'
                }
            },
            //判斷 訂單狀態
            chech_group_ord_bs: function (data) {
                if (data == 0) {
                    return '未處理'
                } else {
                    return '已完成'
                }
            },
            //判斷 飲料是大杯還小杯
            checkcup: function (data) {
                if (data == 0) {
                    return '中杯'
                } else if (data == 1) {
                    return '大杯'
                }
            },
        },
        created() {
            // 渲染前 先去撈取資料
            this.get_mar(this.group_ord_no)
            // console.log('send:', this.drinkno)
        },
        // 監聽數值變化
        watch: {
            // 當選取的飲料不同時，重新撈取一次 單一飲品的資料
            group_ord_no: function (group_ord_no) {
                this.get_mar(group_ord_no)
            },
        },
    })
    //-----------------------------------------------------

    //New Vue
    new Vue({
        el: '#app',
        data: {
            show: 'manager',
            drinkno: 1,
            type_no: 1,
            type_title: '',
            group_ord_no: 1,
        },
        methods: {
            //接受到 下層傳遞的值 變更data值
            changeTag(show) {
                this.show = show
            },
            changedrinkno(drinkno) {
                this.drinkno = drinkno
            },
            changetypeno(type_no, type_title) {
                this.type_no = type_no
                this.type_title = type_title
            },
            changegroupordno(group_ord_no) {
                this.group_ord_no = group_ord_no
            },
        },
        components: {},
    })
    //--------------------------------------------
})
