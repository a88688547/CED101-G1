window.addEventListener('load', function () {
    //側邊導覽列 -- 組件
    Vue.component('my-aside', {
        data() {
            return {}
        },
        props: [],
        template: `
                        <aside>
                          <ul class="tag_list">
                            <li class="tag_list_on" @click="changeTag($event)" id="manager" >管理員帳號管理</li>
                            <li @click="changeTag($event)" id="member" >會員帳號管理</li>
                            <li @click="changeTag($event)" id="drink">商品管理</li>
                            <li @click="changeTag($event)" id="drink_type">商品規格管理</li>
                            <li @click="changeTag($event)" id="group_ord_list">揪團訂單管理</li>
                            <li @click="changeTag($event)" id="per_ord_list" >一般訂單管理</li>
                            <li @click="changeTag($event)" id="art_report_list">文章檢舉審核</li>
                            <li @click="changeTag($event)" id="msg_report_list">留言檢舉審核</li>
                          </ul>
                        </aside>`,
        methods: {
            changeTag(event) {
                //獲取被點擊的 ID值，並傳送至上層 (new Vue)
                this.$emit('change', event.currentTarget.id)

                //改變 被點擊之樣式
                document.querySelectorAll('.tag_list>li').forEach(function (e) {
                    e.classList.remove('tag_list_on')
                })

                event.currentTarget.classList.add('tag_list_on')
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
                checked: '',
                lightbox: false,
                lightbox_mar_no: '',
                lightbox_status: '',
                lightbox_mar_name: '',
                lightbox_text: '',
            }
        },
        props: ['mar_info'],

        template: `<section>
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
                            <div>*****{{value.mar_psw.substr(-3,3)}}</div>
                            <div class="toggle" @click="lightbox_show(value.mar_no,value.mar_name,value.mar_status)">
                                <input v-model="value.ischecked" type="checkbox"   />
                                <label ></label>
                            </div>
                        </div>
                    </div>
                    <div class="lightbox_black" v-if="lightbox">
                        <div class="lightbox" >
                            <div class="manager_lightbox_close_img" @click="lightbox = false"><img src="./Images/close.svg" ></div>
                            <div>確定要將  管理員 : <span>{{lightbox_mar_name}}</span>。<span>{{lightbox_text}}</span> 嗎??</div>
                            <div @click="change_status(lightbox_mar_no,lightbox_status)">確定修改</div>
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
                this.managers = res
            },
            // 點擊修改後，顯示燈箱 並帶入值

            lightbox_show: function (mar_no, mar_name, mar_status) {
                this.lightbox = true
                this.lightbox_mar_no = mar_no
                this.lightbox_mar_name = mar_name

                if (mar_status == 0) {
                    this.lightbox_status = 1
                    this.lightbox_text = '啟用'
                } else if (mar_status == 1) {
                    this.lightbox_status = 0
                    this.lightbox_text = '停權'
                }
            },

            // 點擊 確定修改後 觸發 php程式。完成後 重新撈取一次資料
            change_status: async function (mar_no, status) {
                const res = await fetch('./php/bs_update_manger.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mar_no: mar_no,
                        mar_status: status,
                    }),
                })
                //關閉燈箱
                this.lightbox = false
                //完成後 重新撈取一次資料
                this.get_mar()
            },
        },
        watch: {
            mar_info() {
                if (this.mar_info.mar_no) {
                    // console.log('有-會員資料')
                    this.get_mar()
                } else {
                    // console.log('沒有-會員資料')
                }
            },
        },
        // template 渲染前 會先去執行以下函式
        created() {
            if (this.mar_info.mar_no) {
                // console.log('有-會員資料')
                this.get_mar()
            } else {
                // console.log('沒有-會員資料')
            }
        },
    })
    //-----------------------------------------------------

    //會員帳號管理 -- 組件
    Vue.component('member', {
        data() {
            return {
                members: '',
                checked: '',
                lightbox: false,
                lightbox_mem_no: '',
                lightbox_status: '',
                lightbox_mem_name: '',
                lightbox_text: '',
            }
        },
        props: [],

        template: `<section>
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
                            <div>*****{{value.mem_psw.substr(-3,3)}}</div>
                            <div>*****{{value.mem_phone.substr(-3,3)}}</div>
                            <div class="toggle" @click="lightbox_show(value.mem_no,value.mem_name,value.mem_status)">
                                <input v-model="value.ischecked" type="checkbox"   />
                                <label ></label>
                            </div>
                        </div>
                    </div>
                    <div class="lightbox_black" v-if="lightbox">
                        <div class="lightbox" >
                            <div class="manager_lightbox_close_img" @click="lightbox = false"><img src="./Images/close.svg" ></div>
                            <div>確定要將  管理員 : <span>{{lightbox_mem_name}}</span>。<span>{{lightbox_text}}</span> 嗎??</div>
                            <div @click="change_status(lightbox_mem_no,lightbox_status)">確定修改</div>
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
            // 點擊修改後，顯示燈箱 並帶入值
            lightbox_show: function (mem_no, mem_name, mem_status) {
                this.lightbox = true
                this.lightbox_mem_no = mem_no
                this.lightbox_mem_name = mem_name

                if (mem_status == 0) {
                    this.lightbox_status = 1
                    this.lightbox_text = '啟用'
                } else if (mem_status == 1) {
                    this.lightbox_status = 0
                    this.lightbox_text = '停權'
                }
            },
            // 點擊 確定修改後 觸發 php程式。完成後 重新撈取一次資料
            change_status: async function (mem_no, status) {
                const res = await fetch('./php/bs_update_member.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mem_no: mem_no,
                        mem_status: status,
                    }),
                })
                //關閉燈箱
                this.lightbox = false
                //完成後 重新撈取一次資料
                this.get_mar()
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
                checked: '',
                lightbox_drink_no: '',
                lightbox_status: '',
                lightbox_drink_title_ch: '',
                lightbox_text: '',
            }
        },
        props: [, 'drinkno', 'lightbox'],

        template: `
                  <section>
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
                            <div class="toggle" @click="lightbox_show(value.drink_no,value.drink_title_ch,value.status)">
                                <input  :checked="value.ischecked" type="checkbox"   />
                                <label ></label>
                            </div>
                            <div class="edit_btn" @click="changeTag(),changedrinkno(value.drink_no)">編輯</div>
                        </div>
                    </div>
                    <div class="lightbox_black" v-if="lightbox">
                        <div class="lightbox" >
                            <div class="manager_lightbox_close_img" @click="changelightbox(false)"><img src="./Images/close.svg" ></div>
                            <div>確定要將  商品 : <span>{{lightbox_drink_title_ch}}</span>。<span>{{lightbox_text}}</span> 嗎??</div>
                            <div @click="change_status(lightbox_drink_no,lightbox_status)">確定修改</div>
                        </div>
                    </div>
                  </section>`,
        methods: {
            //切換至 編輯商品頁面
            changeTag() {
                //將drink_edit 傳送至上層 (new Vue)
                this.$emit('change', 'drink_edit')
            },
            //開關燈箱
            changelightbox(data) {
                this.$emit('changelightbox', data)
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
            // 點擊修改後，顯示燈箱 並帶入值
            lightbox_show: function (drink_no, drink_title_ch, status) {
                this.changelightbox(true)
                this.lightbox_drink_no = drink_no
                this.lightbox_drink_title_ch = drink_title_ch

                if (status == 0) {
                    this.lightbox_status = 1
                    this.lightbox_text = '上架'
                } else if (status == 1) {
                    this.lightbox_status = 0
                    this.lightbox_text = '下架'
                }
            },
            // 點擊 確定修改後 觸發 php程式。完成後 重新撈取一次資料
            change_status: async function (drink_no, status) {
                const res = await fetch('./php/bs_update_drink_status.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        drink_no: drink_no,
                        status: status,
                    }),
                })
                //關閉燈箱
                this.changelightbox(false)
                //完成後 重新撈取一次資料
                this.get_mar()
            },
            //依照 商品狀態 顯示已經勾選或尚未勾選
            checked_test(data) {
                if (data == 0) {
                    this.checked = false
                } else if (data == 1) {
                    this.checked = true
                }
            },
        },
        created() {
            this.get_mar()
        },
        watch: {
            show: function () {
                this.get_mar()
            },
        },
    })
    //-----------------------------------------------------

    //---  編輯商品 -- 組件
    Vue.component('drink_edit', {
        data() {
            return {
                // 存放撈出來的飲料資訊
                drink_no: '',
                drink_title_ch: '',
                drink_title_en: '',
                drink_type_no: '',
                drink_big_price: '',
                drink_small_price: '',
                drink_src: '',
                error_text: '',
                type_info: '',
                detail_info: '',
                update_detail: [],
                img_type: '',

                test: '',
                check_sweet: false,
                check_ice: false,
            }
        },
        props: ['drinkno', 'lightbox'],
        template: `
                  <section >
                    <h1 class="title">商品編輯 -- {{drink_title_ch}}</h1>
                    <div class="return_btn_box"><div class="return_btn" @click="changeTag">返回商品列表</div></div>
                    <div class="drink_edit_box">
                      <div>
                        <div class="drink_edit_row">
                            <label>飲料編號</label>
                            <div>{{drink_no}}</div>
                        </div>
                        <div class="drink_edit_row">
                            <label for="name_ch">飲料名稱(中)</label>
                            <input type="text" id="name_ch" v-model="drink_title_ch"   />
                        </div>
                        <div class="drink_edit_row">
                            <label for="name_en">飲料名稱(英)</label>
                            <input type="text" id="name_en" v-model="drink_title_en" />
                        </div>
                        <div class="drink_edit_row">
                            <label for="type">飲料類別</label>
                            <select name="type" id="type" v-model="drink_type_no">
                              <option value="">-----請選擇飲料類別-----</option>
                              <option value="1">奶類</option>
                              <option value="2">茶類</option>
                              <option value="3">果茶類</option>
                            </select>
                        </div>
                        <div class="drink_edit_row">
                            <label for="big_price">大杯金額</label>
                            <input type="text" id="big_price" v-model="drink_big_price"/>
                        </div>
                        <div class="drink_edit_row">
                            <label for="small_price">小杯金額</label>
                            <input type="text" id="small_price" v-model="drink_small_price" />
                        </div>
                        <div class="type_box">
                            <div class="type_box_title">選取 商品規格:</div>
                            <div class="type_name_box" :id="value.type_no" v-for="(value,key) in type_info">
                                <div class="type_name">{{value.type_title}} : </div>
                                <div v-for="(value,key) in value.detail_title_list" class="detali_list" >
                                    <input type="checkbox" v-model="detail_info" :id="value.detail_no" :name="value.detail_no" :value="value.detail_no"></input>
                                    <label :for="value.detail_no"> {{value.detail_title}}</label>
                                </div>
                            </div>
                        </div>
                      </div>
                      <div class="addinfo_right_box">
                        <div>
                          <label for="upfile">上傳飲料照片</label>
                          <input type="file" id="upfile" name="upfile" @change="changeimg($event)"/><br />
                        </div>
                        <div class="upFile_img_box">
                          <img :src="drink_src" alt="尚未新增任何照片" id="image" />
                        </div>
                      </div>
                      <div class="drink_edit_btn" @click="drink_edit(drink_no,drink_title_ch, drink_title_en, drink_type_no, drink_big_price, drink_small_price,update_detail)">確認修改</div>
                    </div>
                    <div class="lightbox_black" v-if="lightbox">
                        <div class="lightbox" >
                            <div class="manager_lightbox_close_img" @click="changelightbox(false)"><img src="./Images/close.svg" ></div>
                            <div><span></span><span>{{error_text}}</span></div>
                            <div @click="changelightbox(false)">確認</div>
                        </div>
                    </div>
                  </section>`,
        methods: {
            // 切換頁面
            changeTag() {
                //傳送至上層 (new Vue)
                this.$emit('change', 'drink')
            },
            changelightbox(data) {
                this.$emit('changelightbox', data)
            },

            //上傳照片 及 更改 預覽圖片
            changeimg(event) {
                let file = event.target.files
                reader = new FileReader()
                reader.readAsDataURL(file[0])

                //取得 上傳照片之檔案格式，以利送出時判斷
                this.img_type = file[0].type.split('/').pop()

                // 確認 上傳照片之格式
                let array = ['jpg', 'jpeg', 'png', 'svg']
                if (array.indexOf(this.img_type) != -1) {
                    // console.log('格式正確')
                } else {
                    this.changelightbox(true)
                    this.error_text = '請確認上傳照片之格式 (jpg,jpeg,png,svg)'
                    return ''
                }
                //顯示 照片預覽
                reader.onload = function (event) {
                    document.getElementById('image').src = event.target.result
                }

                // 上傳會員照片 -----------------------
                let file_2 = document.getElementById('upfile').files[0]
                let formData = new FormData()
                formData.append('drink_no', this.drink_no)
                formData.append('upFile', file_2)

                //=====ajax
                let xhr = new XMLHttpRequest()
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        console.log(xhr.responseText)
                        //需要顯示 提示燈箱 (待改) --------------------
                        // this.$emit('changelightbox', true)
                        // this.error_text = '上傳照片成功!!'
                    } else {
                        return
                        alert(xhr.status)
                    }
                }
                xhr.open('post', './php/bs_update_drink_img.php')
                xhr.send(formData)

                this.$emit('changelightbox', true)
                this.error_text = '上傳照片成功!!'
            },

            //呼叫php程式，取回 飲料 相關資料，並用json()轉回一般陣列
            get_mar: async function (drinkno) {
                // console.log('send2', drinkno)
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
                this.drink_no = data[0].drink_no
                this.drink_title_ch = data[0].drink_title_ch
                this.drink_title_en = data[0].drink_title_en
                this.drink_type_no = data[0].drink_type_no
                this.drink_big_price = data[0].drink_big_price
                this.drink_small_price = data[0].drink_small_price
                this.drink_src = data[0].imgSrc
                this.img_type = data[0].imgSrc.split('.').pop()
            },

            // 撈取類型資料
            get_type: async function (drink_no) {
                const res = await fetch('./php/bs_getall_type_detail.php', {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'same-origin', // no-cors, *cors, same-origin
                    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    // redirect: 'follow', // manual, *follow, error
                    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify({
                        drink_no: drink_no,
                    }), // body data type must match "Content-Type" header
                }).then(function (data) {
                    return data.json()
                })
                // 取回res值後，呼叫另一隻函式
                this.type_info = res
            },
            // 將值寫入data中
            get_detail_info: async function (drink_no) {
                const res = await fetch('./php/bs_getone_drink_detail.php', {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'same-origin', // no-cors, *cors, same-origin
                    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    // redirect: 'follow', // manual, *follow, error
                    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify({
                        drink_no: drink_no,
                    }), // body data type must match "Content-Type" header
                }).then(function (data) {
                    return data.json()
                })
                // 取回res值後，呼叫另一隻函式
                this.detail_info = res
            },

            //點擊 修改商品
            drink_edit: async function (
                drink_no,
                drink_title_ch,
                drink_title_en,
                drink_type_no,
                drink_big_price,
                drink_small_price,
                update_detail
            ) {
                //新增前 確認欄位 是否符合規定

                //中文名稱 (1~15字)
                if (
                    drink_title_ch.replace(/[^\u4e00-\u9fa5]/g, '') &&
                    drink_title_ch.length >= 1 &&
                    drink_title_ch.length <= 15
                ) {
                    console.log('中文 成功')
                } else {
                    this.lightbox = true
                    this.error_text = '飲料名稱(中)，請輸入中文(1~15字)'
                    return ''
                }
                //英文名稱 (1~50字)
                if (
                    drink_title_en.replace(/[^a-zA-Z]/g, '') &&
                    drink_title_en.length >= 1 &&
                    drink_title_en.length <= 50
                ) {
                    console.log('英文 成功')
                } else {
                    this.changelightbox(true)
                    this.error_text = '飲料名稱(英)，請輸入英文(1~50字)'
                    return ''
                }

                //選擇 飲料類型
                if (drink_type_no != '') {
                    console.log('類型 成功')
                } else {
                    this.changelightbox(true)
                    this.error_text = '請選擇飲料類別'
                    return ''
                }

                //輸入大杯金額
                if (drink_big_price != '' && drink_big_price > 0) {
                    console.log('大杯 成功')
                } else {
                    this.changelightbox(true)
                    this.error_text = '請輸入大杯金額(不得為負數)'
                    return ''
                }

                //輸入小杯金額
                if (drink_small_price != '' && drink_small_price > 0) {
                    console.log('小杯 成功')
                } else {
                    this.changelightbox(true)
                    this.error_text = '請輸入小杯金額(不得為負數)'
                    return ''
                }

                // 大杯金額 必須 大於 小杯金額
                if (drink_big_price > drink_small_price) {
                    console.log('大小 成功')
                } else {
                    this.changelightbox(true)
                    this.error_text = '請確認飲料金額 (大杯金額 > 小杯金額)'
                    return ''
                }
                // 大杯金額 必須 大於 小杯金額
                if (drink_big_price > drink_small_price) {
                    console.log('大小 成功')
                } else {
                    this.changelightbox(true)
                    this.error_text = '請確認飲料金額 (大杯金額 > 小杯金額)'
                    return ''
                }

                //-----------------
                //判斷 甜度 和 冰度 至少要勾選一種類型

                // 甜度陣列
                var sweet = new Array()
                for (let k = 0; k < this.type_info[0].detail_title_list.length; k++) {
                    sweet.push(this.type_info[0].detail_title_list[k].detail_no)
                }
                // 冰度陣列
                var ice = new Array()
                for (let j = 0; j < this.type_info[1].detail_title_list.length; j++) {
                    ice.push(this.type_info[1].detail_title_list[j].detail_no)
                }

                // 將 this.update_detail 原Obj 轉成 陣列
                let array_update_detail = Object.keys(this.update_detail)
                // 若有勾選 冰度 或 甜度 其中之一的會 將會改變 判斷狀態
                for (let q = 0; q < array_update_detail.length; q++) {
                    if (sweet.indexOf(array_update_detail[q]) != -1) {
                        this.check_sweet = true
                    }
                    if (ice.indexOf(array_update_detail[q]) != -1) {
                        this.check_ice = true
                    }
                }
                // 檢視勾選的內容 甜度 和 冰度 是否有勾選至少一個
                if (this.check_sweet == true && this.check_sweet == true) {
                    // 確實都有勾選至少一個
                } else {
                    // 若都無勾選至少一個 跳出視窗提示
                    this.changelightbox(true)
                    this.error_text = '甜度 及 冰度 請至少勾選一種格式'
                    return ''
                }

                const res = await fetch('./php/bs_update_drink.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        drink_no: drink_no,
                        drink_title_ch: drink_title_ch,
                        drink_title_en: drink_title_en,
                        drink_type_no: drink_type_no,
                        drink_big_price: drink_big_price,
                        drink_small_price: drink_small_price,
                        update_detail: update_detail,
                    }),
                }).then(function (data) {
                    return data.json()
                })
                this.test = res
                //修改成功跳出 燈箱
                this.changelightbox(true)
                this.error_text = '修改成功'

                // 修改成功後 把data內的植 修正
                this.check_sweet = false
                this.check_ice = false

                //編輯完成後，重新撈取資料
                // await this.get_mar(this.drinkno)
            },

            //整理 將要修改的 配置設定
            update_detail_info() {
                let obj = {}
                console.log('000')
                for (i = 0; i < this.type_info.length; i++) {
                    for (j = 0; j < this.type_info[i].detail_title_list.length; j++) {
                        for (k = 0; k < this.detail_info.length; k++) {
                            if (this.detail_info[k] == this.type_info[i].detail_title_list[j].detail_no) {
                                obj[`${this.type_info[i].detail_title_list[j].detail_no}`] = this.type_info[
                                    i
                                ].detail_title_list[j].type_no
                            }
                        }
                    }
                }
                this.update_detail = obj
            },
        },
        created() {
            // 渲染前 先去撈取資料
            this.get_mar(this.drinkno)
            // console.log('send:', this.drinkno)
            this.get_type(this.drinkno)

            this.get_detail_info(this.drinkno)
        },
        // 監聽數值變化
        watch: {
            // 當選取的飲料不同時，重新撈取一次 單一飲品的資料
            drinkno: function (newdrinkno) {
                this.get_mar(newdrinkno)
                this.get_type(this.drinkno)
                this.get_detail_info(this.drinkno)
            },
            detail_info: function () {
                this.update_detail_info()
            },
        },
    })
    //-----------------------------------------------------

    //---  新增商品 -- 組件
    Vue.component('drink_add', {
        data() {
            return {
                //同步儲存 將要新增的商品資料
                drink_no: '',
                drink_title_ch: '',
                drink_title_en: '',
                drink_type_no: '',
                drink_big_price: '',
                drink_small_price: '',
                drink_src: '',
                error_text: '',
                img_type: '',
                lightbox: false,
                add_drink_no: '',
            }
        },
        props: [],

        template: `
                  <section >
                    <h1 class="title">新增商品</h1>
                    <div class="return_btn_box"><div class="return_btn" @click="changeTag_drink">返回商品列表</div></div>
                    <div class="drink_edit_box">
                      <div>
                        <div class="drink_edit_row">
                            <label for="name_ch">飲料名稱(中)</label>
                            <input id="name_ch" v-model="drink_title_ch" type="text" placeholder="請輸入中文(1~15字)">
                        </div>
                        <div class="drink_edit_row">
                            <label for="name_en">飲料名稱(英)</label>
                            <input type="text" id="name_en" v-model="drink_title_en" placeholder="請輸入英文(1~50字)"> 
                        </div>
                        <div class="drink_edit_row">
                            <label for="type">飲料類別</label>
                            <select name="type" id="type" v-model="drink_type_no">
                              <option value="">-----請選擇飲料類別-----</option>
                              <option value="1">奶類</option>
                              <option value="2">茶類</option>
                              <option value="3">果茶類</option>
                            </select>
                        </div>
                        <div class="drink_edit_row">
                            <label for="big_price">大杯金額</label>
                            <input type="number" id="big_price" v-model="drink_big_price" placeholder="請輸入飲料大杯金額">
                           
                        </div>
                        <div class="drink_edit_row">
                            <label for="small_price">小杯金額</label>
                            <input type="number" id="small_price" v-model="drink_small_price" placeholder="請輸入飲料小杯金額">
                        </div>
                      </div>
                      <div class="addinfo_right_box">
                        <div>
                          <label for="upfile">上傳飲料照片</label>
                          <input type="file" id="upfile" name="upfile" @change="changeimg($event)"/><br />
                        </div>
                        <div class="upFile_img_box">
                          <img src="" alt="尚未新增任何照片" id="image" />
                        </div>
                      </div>
                      <div class="drink_add_btn" @click="drink_add(drink_title_ch, drink_title_en, drink_type_no, drink_big_price, drink_small_price)">新增商品</div>
                    </div>
                    <div class="lightbox_black" v-if="lightbox">
                        <div class="lightbox" >
                            <div class="manager_lightbox_close_img" @click="lightbox = false"><img src="./Images/close.svg" ></div>
                            <div><span></span><span>{{error_text}}</span></div>
                            <div @click="close_lightbox">確認</div>
                        </div>
                    </div>
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

                //取得 上傳照片之檔案格式，以利送出時判斷
                this.img_type = file[0].type.split('/').pop()
                // console.log(file[0].name.split('.')[0])

                if (file[0].name.split('.')[0].replace(/[^\u4e00-\u9fa5]/g, '')) {
                    this.lightbox = true
                    this.error_text = '請確認上傳照片之檔名 (不能有中文)'
                    return ''
                } else {
                    // console.log('檔名正確')
                }

                // 確認 上傳照片之格式
                let array = ['jpg', 'jpeg', 'png', 'svg']
                if (array.indexOf(this.img_type) != -1) {
                    // console.log('格式正確')
                } else {
                    this.lightbox = true
                    this.error_text = '請確認上傳照片之格式 (jpg,jpeg,png,svg)'
                    return ''
                }

                reader.onload = function (event) {
                    document.getElementById('image').src = event.target.result
                    this.drink_src = event.target.result
                    // console.log(event.target.result)
                }
                // console.log('changeimg')
            },

            // 點擊新增商品 觸發 php事件，並跳轉頁面

            drink_add: async function (
                drink_title_ch,
                drink_title_en,
                drink_type_no,
                drink_big_price,
                drink_small_price
            ) {
                //新增前 確認欄位 是否符合規定

                //中文名稱 (1~15字)
                if (
                    drink_title_ch.replace(/[^\u4e00-\u9fa5]/g, '') &&
                    drink_title_ch.length >= 1 &&
                    drink_title_ch.length <= 15
                ) {
                    // console.log('中文 成功')
                } else {
                    this.lightbox = true
                    this.error_text = '飲料名稱(中)，請輸入中文(1~15字)'
                    return ''
                }
                //英文名稱 (1~50字)
                if (
                    drink_title_en.replace(/[^a-zA-Z]/g, '') &&
                    drink_title_en.length >= 1 &&
                    drink_title_en.length <= 50
                ) {
                    // console.log('英文 成功')
                } else {
                    this.lightbox = true
                    this.error_text = '飲料名稱(英)，請輸入英文(1~50字)'
                    return ''
                }

                //選擇 飲料類型
                if (drink_type_no != '') {
                    // console.log('類型 成功')
                } else {
                    this.lightbox = true
                    this.error_text = '請選擇飲料類別'
                    return ''
                }

                //輸入大杯金額
                if (drink_big_price != '' && drink_big_price > 0) {
                    // console.log('大杯 成功')
                } else {
                    this.lightbox = true
                    this.error_text = '請輸入大杯金額(不得為負數)'
                    return ''
                }

                //輸入小杯金額
                if (drink_small_price != '' && drink_small_price > 0) {
                    // console.log('小杯 成功')
                } else {
                    this.lightbox = true
                    this.error_text = '請輸入小杯金額(不得為負數)'
                    return ''
                }

                // 大杯金額 必須 大於 小杯金額
                if (drink_big_price > drink_small_price) {
                    // console.log('大小 成功')
                } else {
                    this.lightbox = true
                    this.error_text = '請確認飲料金額 (大杯金額 > 小杯金額)'
                    return ''
                }

                //一定要上傳照片才可以新增商品
                if (this.img_type == '') {
                    this.lightbox = true
                    this.error_text = '請上傳 商品照片'
                    return ''
                }

                const res = await fetch('./php/bs_insert_drink.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        drink_title_ch: drink_title_ch,
                        drink_title_en: drink_title_en,
                        drink_type_no: drink_type_no,
                        drink_big_price: drink_big_price,
                        drink_small_price: drink_small_price,
                    }),
                })
                    .then((res) => res.json())
                    .then((res) => (this.add_drink_no = res))
                // console.log(this.add_drink_no)

                // 將新增商品之 商品編號 取回寫入

                // console.log('傳值')

                // console.log(this.add_drink_no)

                // 呼叫上傳照片之動作
                await this.add_drink_img()

                //修改成功  跳出提示燈箱
                // this.lightbox = true
                // this.error_text = '新增商品成功'

                // 新增成功後 把data內的植 都清空
                this.drink_title_ch = ''
                this.drink_title_en = ''
                this.drink_type_no = ''
                this.drink_big_price = ''
                this.drink_small_price = ''
            },

            add_drink_img() {
                // console.log('上傳照片動作')
                // 上傳飲料照片 -----------------------
                let file_2 = document.getElementById('upfile').files[0]
                let formData = new FormData()
                formData.append('add_drink_no', this.add_drink_no)
                formData.append('upFile', file_2)

                // =====ajax
                let xhr = new XMLHttpRequest()
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        // console.log(xhr.responseText)
                        this.lightbox = true
                        this.error_text = '新增商品成功'
                    } else {
                        this.lightbox = true
                        this.error_text = '上傳照片失敗'
                        // alert(xhr.status)
                    }
                }
                xhr.open('post', './php/bs_insert_drink_img.php')
                xhr.send(formData)
                // console.log('上傳照片 結束')

                // 依照上傳照片之結果 判斷顯示
                if (xhr.status == 200) {
                    // console.log(xhr.responseText)
                    this.lightbox = true
                    this.error_text = '新增商品成功'
                } else {
                    this.lightbox = true
                    this.error_text = '上傳照片失敗'
                    // alert(xhr.status)
                }
            },
            //關閉燈箱之判斷
            close_lightbox() {
                if (this.error_text === '新增商品成功') {
                    this.lightbox = false
                    //跳轉頁面
                    this.$emit('change', 'drink')
                } else {
                    this.lightbox = false
                }
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
        props: ['type_no'],

        template: `
                  <section>
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
                detail_title: '',
                lightbox: false,
                error_text: '',
            }
        },
        props: ['type_no', 'type_title'],

        template: `
                  <section >
                    <h1 class="title">編輯 商品規格 -- {{type_title}}</h1>
                    <div class="return_btn_box"><div class="return_btn" @click="changeTag">返回 商品規格列表</div></div>
                    <div class="type_detail_box">
                        <form class="type_detail_box_left">
                            <label for="type_title_edit">規格名稱 : </label>
                            <input name="type_title_edit" id="type_title_edit" :value="type_title"></input>
                            <button id="edit_type_title">修改名稱</button>
                        </form>
                        <div class="type_detail_box_right">
                            <div>已擁有的細項 :</div>
                            <ul class="show_type_detail">
                                <li v-for="(value,key) in type">
                                    <div>{{value.detail_title}}</div><div class="detail_title_delete_btn" @click="detail_title_delete(value.detail_no)">刪除</div>
                                </li>
                            </ul>
                            <input name="type_drtail_edit" id="type_drtail_edit" placeholder="請輸入細項名稱(中文 1~5字)" v-model="detail_title"></input>
                            <div id="add_type_detail" @click="detail_title_add(type_no,detail_title)">新增細項</div>
                        </div>
                    </div>
                    <div class="lightbox_black" v-if="lightbox">
                        <div class="lightbox" >
                            <div class="manager_lightbox_close_img" @click="lightbox = false"><img src="./Images/close.svg" ></div>
                            <div><span></span><span>{{error_text}}</span></div>
                            <div @click="lightbox = false">確認</div>
                        </div>
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
            //新增 細項
            async detail_title_add(type_no, detail_title) {
                if (
                    detail_title.replace(/[^\u4e00-\u9fa5]/g, '') &&
                    detail_title.length >= 1 &&
                    detail_title.length <= 5
                ) {
                    console.log('中文 成功')
                } else {
                    this.lightbox = true
                    this.error_text = '請輸入中文(1~5字)'
                    return ''
                }

                const res = await fetch('./php/bs_insert_detail.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        type_no: type_no,
                        detail_title: detail_title,
                    }),
                })
                this.lightbox = true
                this.error_text = '新增成功'

                // 新增成功後 把data內的植 都清空
                this.detail_title = ''

                //重新撈取一次 細項列表
                this.get_mar(this.type_no)
            },
            async detail_title_delete(detail_no) {
                const res = await fetch('./php/bs_delete_detail.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        detail_no: detail_no,
                    }),
                })
                //重新撈取一次 細項列表
                this.get_mar(this.type_no)
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
            return {
                type_title: '',
                lightbox: false,
                error_text: '',
            }
        },
        props: [],

        template: `
                  <section >
                    <h1 class="title">新增商品規格</h1>
                    <div class="return_btn_box"><div class="return_btn" @click="changeTag_drink">返回商品列表</div></div>
                    <div class="type_add_box">
                        <div class="type_add_row">
                            <label for="type_add_title">規格名稱 :</label>
                            <input type="text" id="type_add_title" placeholder="請輸入規格名稱(中文 1~5字)" v-model="type_title" />
                        </div>
                        <div @click="drink_type_add(type_title)">新增商品規格</div>
                    </div>
                    <div class="lightbox_black" v-if="lightbox">
                        <div class="lightbox" >
                            <div class="manager_lightbox_close_img" @click="lightbox = false"><img src="./Images/close.svg" ></div>
                            <div><span></span><span>{{error_text}}</span></div>
                            <div @click="close_lightbox">確認</div>
                        </div>
                    </div>
                  </section>`,
        methods: {
            changeTag_drink() {
                //傳送至上層 (new Vue)
                this.$emit('change', 'drink_type')
            },
            //點擊新增商品規格
            async drink_type_add(type_title) {
                //中文名稱 (1~5字)
                if (type_title.replace(/[^\u4e00-\u9fa5]/g, '') && type_title.length >= 1 && type_title.length <= 5) {
                    console.log('中文 成功')
                } else {
                    this.lightbox = true
                    this.error_text = '請輸入中文(1~5字)'
                    return ''
                }

                const res = await fetch('./php/bs_insert_type.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        type_title: type_title,
                    }),
                })
                this.lightbox = true
                this.error_text = '新增成功'

                // 新增成功後 把data內的植 都清空
                this.type_title = ''
            },
            close_lightbox() {
                this.lightbox = false

                if (this.error_text === '新增成功') {
                    this.$emit('change', 'drink_type')
                }
            },
        },
    })
    //-----------------------------------------------------

    // 揪團 訂單列表 -- 組件
    Vue.component('group_ord_list', {
        data() {
            return {
                //撈出來的 揪團訂單資料
                group_ord_bs: 0,
                group_ords: '',
            }
        },
        props: [],

        template: `<section >
                    <h1 class="title">揪團訂單管理</h1>
                    <div class="group_ord_type_box">
                        <div class="group_ord_type_box_on" @click="group_ord_bs = 0,changecolor($event)">未處理</div>
                        <div @click="group_ord_bs = 1,changecolor($event)">已完成</div>
                    </div>
                    <div class="group_ord_list_box">
                        <div class="group_ord_title_row">
                            <div>訂單編號</div>
                            <div>期望飲料送達時間</div>
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
                this.group_ords = res
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
            changecolor: function (event) {
                document.querySelectorAll('.group_ord_type_box>div').forEach(function (e) {
                    e.classList.remove('group_ord_type_box_on')
                })

                event.currentTarget.classList.add('group_ord_type_box_on')
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

    //---  揪團 訂單詳情 -- 組件
    Vue.component('group_ord_info', {
        data() {
            return {
                // 訂單資料
                group_ord_info: '',
                // 訂單明細
                item_info: '',
            }
        },
        props: ['group_ord_no'],

        template: `
                  <section>
                    <h1 class="title">訂單詳情 ( No: {{group_ord_info.group_ord_no}} )</h1>
                    <div class="return_btn_box"><div class="return_btn" @click="changeTag">返回訂單列表</div></div>
                    <div class="group_ord_info_box">
                        <div class="group_ord_info_first_box">
                            <div class="group_ord_info_row">
                                <div>訂單編號</div>
                                <div>{{group_ord_info.group_ord_no}}</div>
                            </div>
                            <div class="group_ord_info_row">
                                <div>期望送達時間</div>
                                <div>{{group_ord_info.arrive_time}}</div>
                            </div>
                        </div>
                        <div class="group_ord_info_sec_box">
                            <div class="group_ord_info_row">
                                <div>建立訂單日期</div>
                                <div>{{group_ord_info.group_datetime}}</div>
                            </div>
                            <div class="group_ord_info_row">
                                <div>連絡電話</div>
                                <div></div>
                            </div>
                             <div class="group_ord_info_row">
                                <div>總共杯數</div>
                                <div>{{group_ord_info.now_cup}}</div>
                            </div>
                             <div class="group_ord_info_row">
                                <div>杯數折扣</div>
                                <div>{{check_discount(group_ord_info.now_cup)}}</div>
                            </div>
                             <div class="group_ord_info_row">
                                <div>優惠券</div>
                                <div></div>
                            </div>
                            <div class="group_ord_info_row">
                                <div>訂單總金額</div>
                                <div>{{group_ord_info.group_ord_price_2}}</div>
                            </div>
                            <div class="group_ord_info_row">
                                <div>訂單狀態</div>
                                <div>{{chech_group_ord_bs(group_ord_info.group_ord_bs)}}</div>
                            </div>

                            <div class=" long_info">
                                <div>備註</div>
                                <div>{{group_ord_info.note}}</div>
                            </div>
                            <div class=" long_info">
                                <div>取貨地點</div>
                                <div>{{group_ord_info.group_adress}}</div>
                            </div>
                        </div>
                        <div class="group_ord_info_thr_box">
                            <div class="group_ord_item" v-for="(value,key) in item_info">
                                <div class="group_ord_item_left">
                                    <div>{{value.drink_title_ch}}-{{value.cup_no}}</div>
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
                                <div>{{group_ord_info.group_ord_price}}</div>
                            </div>
                            <div class="group_ord_info_four_row">
                                <div>杯數折扣</div>
                                <div>x {{group_ord_info.dis_count}}</div>
                            </div>
                            <div class="group_ord_info_four_row">
                                <div>折扣後</div>
                                <div>{{group_ord_info.group_ord_price_1}}</div>
                            </div>
                            <div class="group_ord_info_four_row">
                                <div>優惠卷折扣</div>
                                <div>x {{group_ord_info.cou_discount}}</div>
                            </div>
                            <div class="group_ord_info_four_row group_ord_info_four_row_last">
                                <div>總計</div>
                                <div class="group_ord_info_four_row_last_count">
                                    <div>共{{group_ord_info.now_cup}}杯</div>
                                    <div>$ {{group_ord_info.group_ord_price_2}}</div>
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

    // 一般 訂單列表 -- 組件
    Vue.component('per_ord_list', {
        data() {
            return {
                //撈出來的 揪團訂單資料
                per_ord_bs: 0,
                per_ords: '',
            }
        },
        props: [],

        template: `<section >
                    <h1 class="title">一般訂單管理</h1>
                    <div class="per_ord_type_box">
                        <div class="per_ord_type_box_on" @click="per_ord_bs = 0,changecolor($event)">未處理</div>
                        <div  @click="per_ord_bs = 1,changecolor($event)">已完成</div>
                    </div>
                    <div class="per_ord_list_box">
                        <div class="per_ord_title_row">
                            <div>訂單編號</div>
                            <div>訂單日期時間</div>
                            <div>外送地址</div>
                            <div>總杯數</div>
                            <div>備註</div>
                            <div>訂單狀態</div>
                            <div></div>
                        </div>
                        <div class="per_ord_row" v-for="(value,key) in per_ords">
                            <div>{{value.per_ord_no}}</div>
                            <div>{{value.ord_time}}</div>
                            <div>{{value.adress}}</div>
                            <div>{{value.total_cup}}</div>
                            <div>{{value.note}}</div>
                            <div>{{checkstate(value.ord_state)}}</div>
                            <div @click="changeperordno(value.per_ord_no),changeTag()">詳情</div>
                        </div>
                    </div>

                  </section>`,
        methods: {
            //切換至 揪團訂單 詳情頁面
            changeTag() {
                //將drink_edit 傳送至上層 (new Vue)
                this.$emit('change', 'per_ord_info')
            },
            //點擊 傳送 訂單編號
            changeperordno(per_ord_no) {
                this.$emit('changeperordno', per_ord_no)
            },
            get_mar: async function (per_ord_bs) {
                const res = await fetch('./php/bs_getall_per_ord.php', {
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
                        per_ord_bs: per_ord_bs,
                    }), // body data type must match "Content-Type" header
                }).then(function (data) {
                    return data.json()
                })
                // 取回res值後，呼叫另一隻函式
                this.get_ord_type(res)
            },
            // 將值寫入data中
            get_ord_type: function (data) {
                this.per_ords = data
            },
            //判斷 訂單狀態 回傳 對應值
            checkstate: function (per_ord_bs) {
                if (per_ord_bs == 1) {
                    return '已完成'
                } else if (per_ord_bs == 0) {
                    return '未處理'
                }
            },
            //類型 點擊後 切換顏色
            changecolor: function (event) {
                document.querySelectorAll('.per_ord_type_box>div').forEach(function (e) {
                    e.classList.remove('per_ord_type_box_on')
                })

                event.currentTarget.classList.add('per_ord_type_box_on')
            },
        },
        // template 渲染前 會先去執行以下函式
        created() {
            this.get_mar(this.per_ord_bs)
        },
        watch: {
            // 當選取的不同類型時，重新撈取一次 該類型的資料
            per_ord_bs: function (per_ord_bs) {
                this.get_mar(per_ord_bs)
            },
        },
    })
    //-----------------------------------------------------

    //---  一般 訂單詳情 -- 組件
    Vue.component('per_ord_info', {
        data() {
            return {
                // 訂單資料
                per_ord_info: '',
                // 訂單明細
                item_info: '',
            }
        },
        props: ['per_ord_no'],

        template: `
                  <section >
                    <h1 class="title">訂單詳情 ( No: {{per_ord_info.per_ord_no}} )</h1>
                    <div class="return_btn_box"><div class="return_btn" @click="changeTag">返回訂單列表</div></div>
                    <div class="per_ord_info_box">
                        <div class="per_ord_info_first_box">
                            <div class="per_ord_info_row">
                                <div>訂單編號</div>
                                <div>{{per_ord_info.per_ord_no}}</div>
                            </div>
                            <div class="per_ord_info_row">
                                <div>建立訂單日期</div>
                                <div>{{per_ord_info.ord_time}}</div>
                            </div>
                        </div>
                        <div class="per_ord_info_sec_box">
                            
                            <div class="per_ord_info_row">
                                <div>連絡電話</div>
                                <div>{{per_ord_info.phone}}</div>
                            </div>
                             <div class="per_ord_info_row">
                                <div>總共杯數</div>
                                <div>{{per_ord_info.total_cup}}</div>
                            </div>
                             <div class="per_ord_info_row">
                                <div>杯數折扣</div>
                                <div>{{check_discount(per_ord_info.total_cup)}}</div>
                            </div>
                             <div class="per_ord_info_row">
                                <div>優惠券</div>
                                <div></div>
                            </div>
                            <div class="per_ord_info_row">
                                <div>訂單總金額</div>
                                <div>{{per_ord_info.ord_price_2}}</div>
                            </div>
                            <div class="per_ord_info_row">
                                <div>訂單狀態</div>
                                <div>{{chech_per_ord_bs(per_ord_info.ord_state)}}</div>
                            </div>

                            <div class=" long_info">
                                <div>備註</div>
                                <div>{{per_ord_info.note}}</div>
                            </div>
                            <div class=" long_info">
                                <div>取貨地點</div>
                                <div>{{per_ord_info.adress}}</div>
                            </div>
                        </div>
                        <div class="per_ord_info_thr_box">
                            <div class="per_ord_item" v-for="(value,key) in item_info">
                                <div class="per_ord_item_left">
                                    <div>{{value.drink_title_ch}}-{{value.cup_no}}</div>
                                    <div>{{value.set_info}}</div>
                                </div>
                                <div class="per_ord_item_right">
                                    <div>{{value.ord_list_qua}}杯</div>
                                    <div>$ {{value.total_price}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="per_ord_info_four_box">
                            <div class="per_ord_info_four_row">
                                <div>原價</div>
                                <div>{{per_ord_info.ord_price}}</div>
                            </div>
                            <div class="per_ord_info_four_row">
                                <div>杯數折扣</div>
                                <div>x {{per_ord_info.dis_count}}</div>
                            </div>
                            <div class="per_ord_info_four_row">
                                <div>折扣後</div>
                                <div>{{per_ord_info.ord_price_1}}</div>
                            </div>
                            <div class="per_ord_info_four_row">
                                <div>優惠卷折扣</div>
                                <div>x {{per_ord_info.cou_discount}}</div>
                            </div>
                            <div class="per_ord_info_four_row per_ord_info_four_row_last">
                                <div>總計</div>
                                <div class="per_ord_info_four_row_last_count">
                                    <div>共{{per_ord_info.total_cup}}杯</div>
                                    <div>$ {{per_ord_info.ord_price_2}}</div>
                                </div>
                            </div>
                        </div>
                    
                    </div>

                  </section>`,
        methods: {
            // 切換頁面
            changeTag() {
                //傳送至上層 (new Vue)
                this.$emit('change', 'per_ord_list')
            },

            //呼叫php程式，
            get_mar: async function (per_ord_no) {
                // 取回 單一訂單 相關資料，並用json()轉回一般陣列
                const res = await fetch('./php/bs_getone_per_ord_info.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        per_ord_no: per_ord_no,
                    }),
                }).then(function (data) {
                    return data.json()
                })
                // 取回 單一 訂單明細 相關資料，並用json()轉回一般陣列
                const info = await fetch('./php/bs_gteone_per_ord_item.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        per_ord_no: per_ord_no,
                    }),
                }).then(function (data) {
                    return data.json()
                })

                // 取回res值後，呼叫另一隻函式
                this.get_drink(res, info)
            },
            // 將值寫入data中
            get_drink: function (data, info) {
                this.per_ord_info = data
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
            chech_per_ord_bs: function (data) {
                if (data == 0) {
                    return '未處理'
                } else {
                    return '已完成'
                }
            },
        },
        created() {
            // 渲染前 先去撈取資料
            this.get_mar(this.per_ord_no)
            // console.log('send:', this.drinkno)
        },
        // 監聽數值變化
        watch: {
            // 當選取的飲料不同時，重新撈取一次 單一飲品的資料
            per_ord_no: function (per_ord_no) {
                this.get_mar(per_ord_no)
            },
        },
    })
    //-----------------------------------------------------

    // 文章 檢舉審核 -- 組件
    Vue.component('art_report_list', {
        data() {
            return {
                //撈出來的 管理員資料
                art_reports: '',
                lightbox: false,
                lightbox_art_report_no: '',
                lightbox_art_no: '',
                lightbox_mem_name: '',
                lightbox_art_report_reason: '',
            }
        },
        props: [],

        template: `<section>
                <h1 class="title">文章檢舉審核</h1>
                <div class="art_report_list_box">
                    <div class="art_report_title_row">
                        <div>編號</div>
                        <div>檢舉時間</div>
                        <div>文章編號</div>
                        <div>檢舉人名稱</div>
                        <div>檢舉原因</div>
                        <div>審核狀態</div>
                    </div>
                    <div class="art_report_per" v-for="(value,key) in art_reports">
                        <div>{{value.art_report_no}}</div> 
                        <div>{{value.art_report_date}}</div>
                        <div>{{value.art_no}}</div>
                        <div>{{value.mem_name}}</div>
                        <div>{{value.art_report_reason}}</div>
                        <div :class="checkstatusclass(value.art_report_status)" @click="lightbox_show(value.art_no,value.mem_name,value.art_report_reason,value.art_report_no,value.art_report_status)">{{checkstatus(value.art_report_status)}}</div>
                    </div>
                </div>
                <div class="lightbox_black" v-if="lightbox">
                    <div class="lightbox_art_report" >
                        <div class="manager_lightbox_close_img" @click="lightbox = false"><img src="./Images/close.svg" ></div>
                        <div>
                            <div class="report_title">檢舉人名稱:</div>
                            <div class="report_text">{{lightbox_mem_name}}</div>
                        </div>
                        <div>
                            <div class="report_title" >文章編號:</div>
                            <div class="report_text">{{lightbox_art_no}}</div>
                        </div>
                        <div class="report_title">檢舉原因:</div>
                        <div>{{lightbox_art_report_reason}}</div>
                        <div>
                            <div @click="change_status(lightbox_art_no,lightbox_art_report_no,2)">駁回</div>
                            <div @click="change_status(lightbox_art_no,lightbox_art_report_no,1)">通過</div>
                        </div>
                    </div>
                </div>

              </section>`,
        methods: {
            //呼叫php程式，取回 管理員帳號 相關資料，並用json()轉回一般陣列
            get_mar: async function () {
                const res = await fetch('./php/bs_getall_art_report.php', {}).then(function (data) {
                    return data.json()
                })
                // 取回res值後，呼叫另一隻函式
                this.change_mar(res)
            },
            // 將值寫入data中
            change_mar: function (data) {
                this.art_reports = data
            },

            // 判斷 審核的狀態為何
            checkstatus: function (status) {
                if (status == 0) {
                    return '未處理'
                } else if (status == 1) {
                    return '已通過'
                } else if (status == 2) {
                    return '駁回'
                }
            },
            // 根據審核狀態不同 給予不同的 class名稱
            checkstatusclass: function (status) {
                if (status == 0) {
                    return 'art_report_status_notyet'
                } else {
                    return 'done'
                }
            },

            // 點擊修改後，顯示燈箱 並帶入值
            lightbox_show: function (art_no, mem_name, art_report_reason, art_report_no, status) {
                if (status == 0) {
                    console.log('進入審核判斷')
                    this.lightbox = true
                    this.lightbox_art_report_no = art_report_no
                    this.lightbox_art_no = art_no
                    this.lightbox_mem_name = mem_name
                    this.lightbox_art_report_reason = art_report_reason
                } else {
                    return ''
                }
            },
            // 點擊 確定修改後 觸發 php程式。完成後 重新撈取一次資料
            change_status: async function (art_no, art_report_no, status) {
                const res = await fetch('./php/bs_update_articleReport.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        art_no: art_no,
                        art_report_no: art_report_no,
                        art_report_status: status,
                    }),
                })
                //關閉燈箱
                this.lightbox = false
                //完成後 重新撈取一次資料
                this.get_mar()
            },
        },
        // template 渲染前 會先去執行以下函式
        created() {
            this.get_mar()
        },
    })
    //-----------------------------------------------------

    // 留言 檢舉審核 -- 組件
    Vue.component('msg_report_list', {
        data() {
            return {
                //撈出來的 資料
                msg_reports: '',
                lightbox: false,
                lightbox_msg_report_no: '',
                lightbox_msg_no: '',
                lightbox_mem_name: '',
                lightbox_msg_report_reason: '',
            }
        },
        props: [],

        template: `<section >
                <h1 class="title">留言檢舉審核</h1>
                <div class="art_report_list_box">
                    <div class="art_report_title_row">
                        <div>編號</div>
                        <div>檢舉時間</div>
                        <div>留言編號</div>
                        <div>檢舉人名稱</div>
                        <div>檢舉原因</div>
                        <div>審核狀態</div>
                    </div>
                    <div class="art_report_per" v-for="(value,key) in msg_reports">
                        <div>{{value.msg_report_no}}</div> 
                        <div>{{value.msg_report_date }}</div>
                        <div>{{value.msg_no}}</div>
                        <div>{{value.mem_name}}</div>
                        <div>{{value.msg_report_reason}}</div>
                        <div :class="checkstatusclass(value.msg_report_status)" @click="lightbox_show(value.msg_no,value.mem_name,value.msg_report_reason,value.msg_report_no,value.msg_report_status)">{{checkstatus(value.msg_report_status)}}</div>
                    </div>
                </div>
                <div class="lightbox_black" v-if="lightbox">
                    <div class="lightbox_art_report" >
                        <div class="manager_lightbox_close_img" @click="lightbox = false"><img src="./Images/close.svg" ></div>
                        <div>
                            <div class="report_title">檢舉人名稱:</div>
                            <div class="report_text">{{lightbox_mem_name}}</div>
                        </div>
                        <div>
                            <div class="report_title" >文章編號:</div>
                            <div class="report_text">{{lightbox_msg_no}}</div>
                        </div>
                        <div class="report_title">檢舉原因:</div>
                        <div>{{lightbox_msg_report_reason}}</div>
                        <div>
                            <div @click="change_status(lightbox_msg_no,lightbox_msg_report_no,2)">駁回</div>
                            <div @click="change_status(lightbox_msg_no,lightbox_msg_report_no,1)">通過</div>
                        </div>
                    </div>
                </div>

              </section>`,
        methods: {
            //呼叫php程式，取回 管理員帳號 相關資料，並用json()轉回一般陣列
            get_mar: async function () {
                const res = await fetch('./php/bs_getall_msg_report.php', {}).then(function (data) {
                    return data.json()
                })
                // 取回res值後，呼叫另一隻函式
                this.change_mar(res)
            },
            // 將值寫入data中
            change_mar: function (data) {
                this.msg_reports = data
            },

            // 判斷 審核的狀態為何
            checkstatus: function (status) {
                if (status == 0) {
                    return '未處理'
                } else if (status == 1) {
                    return '已通過'
                } else if (status == 2) {
                    return '駁回'
                }
            },
            // 根據審核狀態不同 給予不同的 class名稱
            checkstatusclass: function (status) {
                if (status == 0) {
                    return 'art_report_status_notyet'
                } else {
                    return 'done'
                }
            },

            //根據審核狀態 判斷是否有點擊功能
            //點擊修改後，顯示燈箱 並帶入值
            lightbox_show: function (msg_no, mem_name, msg_report_reason, msg_report_no, status) {
                if (status == 0) {
                    this.lightbox = true
                    this.lightbox_msg_report_no = msg_report_no
                    this.lightbox_msg_no = msg_no
                    this.lightbox_mem_name = mem_name
                    this.lightbox_msg_report_reason = msg_report_reason
                } else {
                    return ''
                }
            },
            // 點擊 確定修改後 觸發 php程式。完成後 重新撈取一次資料
            change_status: async function (msg_no, msg_report_no, status) {
                const res = await fetch('./php/bs_update_msgreport.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        msg_no: msg_no,
                        msg_report_no: msg_report_no,
                        msg_report_status: status,
                    }),
                })
                //關閉燈箱
                this.lightbox = false
                //完成後 重新撈取一次資料
                this.get_mar()
            },
        },
        // template 渲染前 會先去執行以下函式
        created() {
            this.get_mar()
        },
    })
    //-----------------------------------------------------

    // 後台 header 管理員系統 -- 組件
    Vue.component('bs-header', {
        data() {
            return {}
        },
        props: ['mar_info'],

        template: `
        <nav>
          <div class="logo_img"><img src="./Images/logo-header.svg"></div>
          <div class="mar_name_box">
            <div>管理員 : <span>{{mar_info.mar_name}}</span></div>
            <div class="logout_btn" @click="logout">登出</div>
          </div>

        </nav>`,
        methods: {
            logout() {
                const res = fetch('./php/mar_logout.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                location.href = `backstage_login.html`
            },
        },
        created() {},
    })
    //-----------------------------------------------------

    //New Vue
    new Vue({
        el: '#app',
        data: {
            mar_info: '',
            content: 'manager',
            drinkno: 1,
            type_no: 1,
            type_title: '',
            group_ord_no: 1,
            per_ord_no: 5,
            lightbox: false,
        },
        methods: {
            //接受到 下層傳遞的值 變更data值
            changeTag(data) {
                this.content = data
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
            changeperordno(per_ord_no) {
                this.per_ord_no = per_ord_no
            },
            changelightbox(data) {
                this.lightbox = data
            },
            async check_mar() {
                // console.log('確認')
                // const res = await fetch('./php/check_mar.php', {
                //     method: 'POST',
                //     mode: 'same-origin',
                //     credentials: 'same-origin',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                // })
                //     .then(function (data) {
                //         return data.json()
                //     })
                //     .then((data) => {
                //         if (data.mar_no) {
                //             this.mar_info = data
                //             console.log('有')
                //         } else {
                //             console.log('沒有')
                //             location.href = `backstage_login.html`
                //         }
                //     })
            },
        },
        components: {},
        created() {
            // this.check_mar()
            //判斷是否有登入狀態
            const res = fetch('./php/check_mar.php', {
                method: 'POST',
                mode: 'same-origin',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(function (data) {
                    return data.json()
                })
                .then((data) => {
                    if (data.mar_no) {
                        this.mar_info = data
                        if (data.mar_login_time) {
                        }
                        // console.log('有')
                    } else {
                        // console.log('沒有')
                        location.href = `backstage_login.html`
                    }
                })
        },
    })
    //--------------------------------------------
})
