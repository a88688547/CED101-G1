window.addEventListener('load', function () {
    const bus = new Vue()

    //側邊導覽列 -- 組件
    Vue.component('my-aside', {
        data() {
            return {}
        },
        props: ['content', 'mem_no'],
        template: `
        <aside>
          <ul class="tag_big">
              <li class="tag_big_on" id="mem_info" @click="changecontent($event)">個人資料</li>
              <li id="group_order" @click="changecontent($event)" >揪團紀錄</li>
              <li id="follow_order_box" @click="changecontent($event)" >跟團紀錄</li>
              <li id="self_order_box" @click="changecontent($event)" >自己訂 | 訂單紀錄</li>
              <li id="coupon_box" @click="changecontent($event)" >優惠券查詢</li>
              <li id="article_list" @click="changecontent($event)" >發文紀錄</li>
          </ul>
          <select name="tag_select" id="tag_select" class="tag_select" v-model="content" @change="changecontentselect($event)">
              <option value="mem_info">會員資料</option>
              <option value="group_order">揪團紀錄</option>
              <option value="follow_order_box">跟團紀錄</option>
              <option value="self_order_box">自己訂 | 訂單紀錄</option>
              <option value="coupon_box">優惠券查詢</option>
              <option value="article_list">發文紀錄</option>
          </select>
        </aside>
        `,
        methods: {
            changecontent(event) {
                //獲取被點擊的 ID值，並傳送至上層 (new Vue)
                this.$emit('changecontent', event.currentTarget.id)

                document.querySelectorAll('.tag_big>li').forEach(function (e) {
                    e.classList.remove('tag_big_on')
                    // e.style.opacity = 0.6
                    // e.style.color = 'rgb(161, 161, 161)'
                })

                event.currentTarget.classList.add('tag_big_on')

                // document.querySelectorAll('.tag_big>li').forEach(function (e) {
                //     e.style.opacity = 0.6
                //     e.style.color = 'rgb(161, 161, 161)'
                // })
                // event.currentTarget.style.opacity = 1
                // event.currentTarget.style.color = '#013B4F'
            },
            changecontentselect(event) {
                this.$emit('changecontentselect', event.currentTarget.value)

                document.querySelectorAll('.tag_big>li').forEach(function (e) {
                    // e.style.opacity = 0.6
                    // e.style.color = 'rgb(161, 161, 161)'
                    e.classList.remove('tag_big_on')
                })
                document.querySelectorAll(`#${event.currentTarget.value}`)[0].classList.add('tag_big_on')

                // document.querySelectorAll(`#${event.currentTarget.value}`)[0].style.opacity = 1
                // document.querySelectorAll(`#${event.currentTarget.value}`)[0].style.color = '#013B4F'
            },
        },
    })
    //-----------------------------------------------------

    // --- 會員資料 ---
    Vue.component('mem_info', {
        data() {
            return {
                mem_info: '',
                img_type: '',
                update_mem_name: '',
                update_mem_email: '',
                update_mem_oldPsw: '',
                update_mem_newPsw: '',
                update_mem_newPsw_2: '',
                update_mem_phone: '',
            }
        },
        props: ['mem_no'],
        template: `
                  <section class="mem_info content">
                    <div  id="mem_change_info">
                        <div class="tag_title">修改會員資料</div>
                        <div class="mem_img_box">
                            <div class="mem_img"><img id="image" :src="mem_info.mem_img" /></div>
                        </div>
                        <div class="mem_detail_box">
                            <div class="change_img">
                                <label>更改頭像</label>
                                <input type="file" id="upfile" name="upfile" @change="changeimg($event)"/>
                            </div>
                            <div class="row">
                                <label for="memName">會員名稱</label>
                                <input type="text" id="memName" v-model="update_mem_name"  />
                            </div>
                            <div class="row">
                                <label for="memEmail">電子信箱</label>
                                <input type="text" id="memEmail" v-model="update_mem_email"  />
                            </div>
                            <div class="row">
                                <label for="mem_OldPsw">請輸入舊密碼(<span class="password_note">必要</span>)</label>
                                <input type="text" id="mem_oldPsw" v-model="update_mem_oldPsw" />
                            </div>
                            <div class="row">
                                <label for="mem_NewPsw">請輸入新密碼(非必要)</label>
                                <input type="text" id="mem_newPsw" v-model="update_mem_newPsw" />
                            </div>
                            <div class="row">
                                <label for="mem_NewPsw_2">請再次輸入新密碼(非必要)</label>
                                <input type="text" id="mem_newPsw_2" v-model="update_mem_newPsw_2" />
                            </div>
                            <div class="row">
                                <label for="memPhone">手機號碼</label>
                                <input type="text" id="mem_Phone" v-model="update_mem_phone" />
                            </div>
                        </div>
                        <button type="button" class="change_btn" @click="update_mem_info">
                            <div class="send_img"><img src="./Images/send.svg" /></div>
                            <div >確認修改</div>
                        </button>
                    </div>
                  </section>
      `,
        methods: {
            get_mem: async function () {
                console.log('撈取會員資料')
                //判斷是否有 接收到 會員編號，若無 則跳轉頁面
                if (this.mem_no === undefined) {
                    location.href = `./homepage.html`
                }

                // console.log('get_mem')

                // console.log('send2', drinkno)
                const res = await fetch('./php/mem_getone_member.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mem_no: this.mem_no,
                    }),
                }).then(function (data) {
                    return data.json()
                })
                // 取回res值後，呼叫另一隻函式
                this.mem_info = res

                this.update_mem_name = this.mem_info.mem_name
                this.update_mem_email = this.mem_info.mem_email
                this.update_mem_phone = this.mem_info.mem_phone
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
                    console.log('格式正確')
                } else {
                    bus.$emit('getAlert', '請確認上傳照片之格式 (jpg,jpeg,png,svg)')
                    return
                }
                //顯示 照片預覽
                reader.onload = function (event) {
                    document.getElementById('image').src = event.target.result
                }
            },

            //修改 個人資料
            update_mem_info: async function () {
                //會員名稱長度是否符合
                if (
                    this.update_mem_name.replace(/[^\u4e00-\u9fa5]/g, '') &&
                    this.update_mem_name.length >= 1 &&
                    this.update_mem_name.length <= 10
                ) {
                    // bus.$emit('getAlert', '請輸入會員名稱(1~10字)')
                    // return
                } else {
                    bus.$emit('getAlert', '請輸入會員名稱(中文1~10字)')
                    return
                }
                //判斷 信箱規格是否正確
                let isEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/
                if (!isEmail.test(this.update_mem_email) || this.update_mem_email == '') {
                    this.$refs.signerror.innerText = '請輸入正確信箱'
                    return
                }

                //判斷 舊密碼是否正確
                if (this.update_mem_oldPsw != this.mem_info.mem_psw) {
                    bus.$emit('getAlert', '請輸入正確密碼')
                    return
                }
                //判斷 新密碼兩次是否一致
                if ((this.update_mem_newPsw != '') | (this.update_mem_newPsw_2 != '')) {
                    if (this.update_mem_newPsw != this.update_mem_newPsw_2) {
                        bus.$emit('getAlert', '新密碼 兩次輸入不一致')
                        return
                    }
                }

                //判斷 是否有輸入電話號碼 (10碼)
                if (this.update_mem_phone.length != 10) {
                    bus.$emit('getAlert', '請輸入有效的電話號碼')
                    return
                }

                // console.log('send2', drinkno)
                const res = await fetch('./php/mem_update_member.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mem_no: this.mem_info.mem_no,
                        mem_old_psw: this.mem_info.mem_psw,
                        mem_name: this.update_mem_name,
                        mem_email: this.update_mem_email,
                        mem_new_psw: this.update_mem_newPsw,
                        mem_phone: this.update_mem_phone,
                    }),
                }).then(function (data) {
                    return data.text()
                })

                // 上傳會員照片 -----------------------
                let file_2 = document.getElementById('upfile').files[0]
                let formData = new FormData()
                formData.append('mem_no', this.mem_info.mem_no)
                formData.append('upFile', file_2)

                //=====ajax
                let xhr = new XMLHttpRequest()
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        // console.log(xhr.responseText)
                        // bus.$emit('getAlert', '上傳照片成功!!')
                    } else {
                        alert(xhr.status)
                    }
                }
                xhr.open('post', './php/mem_update_member_img.php')
                xhr.send(formData)

                if (res == '修改成功~!!') {
                    bus.$emit('getAlert', '修改成功')
                } else if (res == '修改失敗~!!') {
                    bus.$emit('getAlert', '修改失敗')
                }

                // 完成修改後，重新撈取資料
                this.get_mem()
            },
            async changememno(data) {
                console.log('mem')
                await member.$emit('getmemberInfo', data)
                await this.get_mem()
            },
        },
        created() {
            // member.$on('memberInfo', this.changememno)
            // alert(this.get_mem())
            // this.get_mem()
            // setTimeout(this.get_mem(), 1000)
            // this.get_mem()
        },
        mounted() {
            // alert(this.get_mem(this.mem_no))
            // this.get_mem(this.mem_no)
            // this.get_mem(this.mem_no)
            // this.get_mem()
            this.get_mem()
        },
        updated() {
            // this.get_mem(this.mem_no)
            // this.get_mem()
            // this.get_mem()
        },
        watch: {
            mem_no() {
                this.get_mem()
            },
        },
    })
    //-----------------------------------------------------

    // --- 揪團訂單 ---
    Vue.component('group_order', {
        data() {
            return {
                content: 'notyet_order_box',
            }
        },
        props: ['mem_no', 'group_ord_no'],
        template: `
          <section class="group_order content">
            <div class="tag_title">揪團紀錄</div>
            <div class="order_box">
                <div class="type_box group_type_box">
                    <div class="type_box_on" id="notyet_order_box" @click="content = 'notyet_order_box',changecolor($event)">揪團中</div>
                    <div id="done_order_box" @click="content = 'done_order_box',changecolor($event)">揪團成功</div>
                </div>
                <component :is="content" :group_ord_no="group_ord_no" @changegroupordno="changegroupordno" @changecontent="changecontent" :mem_no="mem_no"></component>
            </div>
          </section>
        `,
        methods: {
            changegroupordno(group_ord_no) {
                this.$emit('changegroupordno', group_ord_no)
            },
            changecontent(data) {
                this.$emit('changecontent', data)
            },
            changegroupordno(data) {
                this.$emit('changegroupordno', data)
            },

            //改變 被點擊的樣式
            changecolor(event) {
                document.querySelectorAll('.type_box>div').forEach(function (e) {
                    e.classList.remove('type_box_on')

                    // e.style.backgroundColor = '#fff'
                    // e.style.color = '#B3925B'
                })
                event.currentTarget.classList.add('type_box_on')

                // event.currentTarget.style.backgroundColor = '#B3925B'
                // event.currentTarget.style.color = '#fff'
            },
        },
    })
    //-----------------------------------------------------

    // --- 揪團中 列表 ---
    Vue.component('notyet_order_box', {
        data() {
            return {
                group_ord_info: '',
            }
        },
        props: ['mem_no', 'group_ord_no'],
        template: `
                <div class="notyet_order_box">
                    <div class="order_all" v-for="(value,key) in group_ord_info">
                        <div class="order_row groupname">
                            <div class="order_row_title">團名 :</div>
                            <div class="order_groupname">{{value.group_name}}</div>
                        </div>
                        <div class="order_detail_box">
                            <div class="order_row">
                                <div class="order_row_title">截單時間</div>
                                <div class="order_deadline">{{value.deadline_time}}</div>
                            </div>
                            <div class="order_row">
                                <div class="order_row_title">目標杯數</div>
                                <div class="order_goalcup">{{check_cup(value.goal_cup)}}</div>
                            </div>
                            <div class="order_row">
                                <div class="order_row_title">目前杯數</div>
                                <div class="order_nowcup">{{value.now_cup}}</div>
                            </div>
                            <div class="notyet_order_detail_btn detail_btn" @click="change(value.group_ord_no)">詳情</div>
                        </div>
                    </div>
                </div>
  `,
        methods: {
            change(group_ord_no) {
                // 改變上層的 content
                // this.$emit('changegroupordno', group_ord_no)
                location.href = `./join_step2.html?group_ord_no=${group_ord_no}`
            },
            //取得 已揪團的 訂單資訊
            get_mem: async function (mem_no) {
                // console.log('send2', drinkno)
                const res = await fetch('./php/mem_get_notyet_group_ord.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mem_no: mem_no,
                    }),
                }).then(function (data) {
                    return data.json()
                })
                // 取回res值後，呼叫另一隻函式
                this.group_ord_info = res
            },
            check_cup(data) {
                if (data == 10) {
                    return '無'
                } else {
                    return data
                }
            },
        },
        created() {
            this.get_mem(this.mem_no)
        },
    })
    //-----------------------------------------------------

    // --- 已成團 列表 ---
    Vue.component('done_order_box', {
        data() {
            return {
                group_ord_info: '',
            }
        },
        props: ['mem_no', 'group_ord_no'],
        template: `
    <div class="done_order_box">
        <div class="order_all" v-for="(value,key) in group_ord_info">
            <div class="order_row groupname">
                <div class="order_row_title">團名 :</div>
                <div class="order_groupname">{{value.group_name}}</div>
            </div>
            <div class="order_detail_box" >
                <div class="order_row">
                    <div class="order_row_title">訂單編號</div>
                    <div class="order_no">{{value.group_ord_no}}</div>
                </div>
                <div class="order_row">
                    <div class="order_row_title">預計送達時間</div>
                    <div class="order_date">{{value.group_datetime}}</div>
                </div>
                <div class="order_row">
                    <div class="order_row_title">訂單金額</div>
                    <div class="order_totalprice">$ {{value.group_ord_price_2}}</div>
                </div>
                <div class="order_row">
                    <div class="order_row_title">訂單狀態</div>
                    <div class="order_statuse">{{checkstatuse(value.group_ord_bs)}}</div>
                </div>
                <div class="done_order_detail_btn detail_btn" id="group_order_done_page" @click="change(value.group_ord_no,'group_order_done_page')">
                    詳情
                </div>
            </div>
        </div>
    </div>
      `,

        methods: {
            change(group_ord_no, data) {
                // 改變上層的 content
                this.$emit('changecontent', data)
                this.$emit('changegroupordno', group_ord_no)
            },
            // 判斷訂單的狀態
            checkstatuse(data) {
                if (data == 0) {
                    return '準備中'
                } else if (data == 1) {
                    return '運送中'
                } else if (data == 2) {
                    return '已完成'
                }
            },
            //取得 已揪團的 訂單資訊
            get_mem: async function (mem_no) {
                // console.log('send2', drinkno)
                const res = await fetch('./php/mem_get_done_group_ord.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mem_no: mem_no,
                    }),
                }).then(function (data) {
                    return data.json()
                })
                // 取回res值後，呼叫另一隻函式
                this.group_ord_info = res
            },
        },
        created() {
            this.get_mem(this.mem_no)
        },
    })
    //-----------------------------------------------------

    // --- 已成團 詳情頁面 ---
    Vue.component('group_order_done_page', {
        data() {
            return {
                group_ord_info: '',
                group_order_item: '',
            }
        },
        props: ['mem_no', 'group_ord_no'],
        template: `
                  <section class="group_order_done_page content">
                    <div class="tag_title">揪團詳情 - 揪團成功</div>
                    <div class="group_order_done_groupname">
                        <div>團名:</div>
                        <div>{{group_ord_info.group_name}}</div>
                    </div>
                    <div class="group_order_done_info">
                        <div class="group_order_done_row">
                            <div>訂單編號</div>
                            <div>{{group_ord_info.group_ord_no}}</div>
                        </div>
                        <div class="group_order_done_row">
                            <div>訂單日期</div>
                            <div>{{group_ord_info.group_datetime}}</div>
                        </div>
                        <div class="group_order_done_row">
                            <div>連絡電話</div>
                            <div>{{group_ord_info.group_ord_phone}}</div>
                        </div>
                        <div class="group_order_done_row">
                            <div>給店家話</div>
                            <div>{{group_ord_info.note}}</div>
                        </div>
                        <div class="group_order_done_row">
                            <div>目標杯數</div>
                            <div>{{check_goal_cup(group_ord_info.goal_cup)}}</div>
                        </div>
                        <div class="group_order_done_row">
                            <div>目前杯數</div>
                            <div>{{group_ord_info.now_cup}}杯</div>
                        </div>
                        <div class="group_order_done_row">
                            <div>杯數優惠</div>
                            <div>{{check_cup_dis(group_ord_info.dis_count)}}</div>
                        </div>
                        <div class="group_order_done_row">
                            <div>優惠卷</div>
                            <div>{{group_ord_info.cou_text}}</div>
                        </div>
                        <div class="group_order_done_row">
                            <div>預計送達時間</div>
                            <div>{{group_ord_info.arrive_time}}</div>
                        </div>
                        <div class="group_order_done_row">
                            <div>取貨地點</div>
                            <div>{{group_ord_info.group_adress}}</div>
                        </div>
                        <div class="group_order_done_row">
                            <div>訂單金額</div>
                            <div>$ {{group_ord_info.group_ord_price_2}}</div>
                        </div>
                        <div class="group_order_done_row">
                            <div>訂單狀態</div>
                            <div>{{checkstatuse(group_ord_info.group_ord_bs)}}</div>
                        </div>
                    </div>
                    <div id="order_list">
                        <!-- 每個人  -->
                        <div class="group_order_done_person" v-for="(value,key) in group_order_item">
                            <div class="group_order_done_person_upbox">
                                <div class="group_order_done_person_img"><img :src="value.mem_img" /></div>
                                <div class="group_order_done_person_name">{{value.mem_name}}</div>
                            </div>
                            <div class="group_order_done_person_downbox">
                                <!-- 購買的 飲料 -->
                                <div class="group_order_done_person_drink" v-for="(value,key) in value.items">
                                  <section id="drink_title_wrapper">
                                      <div class="group_order_done_person_drink_title">{{value.drink_title_ch}}-{{value.cup_no}}</div>
                                      <div class="group_order_done_person_drink_note" >{{value.set_info}}</div>
                                  </section>
                                  <section id="num_btn">
                                      <div id="num_feedback">{{value.ord_qua}}</div>
                                      <span>杯</span>
                                  </section>
                                  <section id="item_single_price">
                                      &#36{{value.total_price}}
                                  </section>
                                </div>
                            </div>
                            <div class="group_order_done_person_total" >
                                <div>總計</div>
                                <div class="group_order_done_person_total_cup">{{value.total_cup}}杯</div>
                                <div class="group_order_done_person_total_price">&#36{{value.total_price_2}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="group_order_done_total_box">
                        <div class="group_order_done_total">
                            <div>原價</div>
                            <div>$ {{group_ord_info.group_ord_price}}</div>
                        </div>
                        <div class="group_order_done_dis">
                            <div>杯數折扣</div>
                            <div>x {{group_ord_info.dis_count}}</div>
                        </div>
                        <div class="group_order_done_total">
                            <div>杯數折扣後</div>
                            <div>$ {{group_ord_info.group_ord_price_1}}</div>
                        </div>
                        <div class="group_order_done_dis">
                            <div>優惠卷折扣</div>
                            <div>x {{group_ord_info.cou_discount}}</div>
                        </div>
                        <div class="group_order_done_finaltotal">
                            <div>總金額</div>
                            <div>$ {{group_ord_info.group_ord_price_2}}</div>
                        </div>
                    </div>
                    <div class="getitem_btn_box" v-if="group_ord_info.group_ord_bs == 1"><div id="getitem_btn" @click="getitem">收到商品</div></div>
                </section>
      `,
        methods: {
            //取得 單筆訂單的 訂單資訊
            get_mem: async function (group_ord_no) {
                // console.log('send2', drinkno)
                const res = await fetch('./php/mem_getone_group_ord.php', {
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
                // 取回res值後，塞入data內
                this.group_ord_info = res
            },

            //取得 單筆訂單的 所有飲料品項資料
            get_group_ord_item: async function (group_ord_no) {
                // console.log('send2', drinkno)
                const res = await fetch('./php/mem_getone_group_ord_item.php', {
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
                // 取回res值後，塞入data內
                this.group_order_item = res
            },
            // 判斷 目標杯數 為何
            check_goal_cup(data) {
                if (data == 20) {
                    return '20杯/九折優惠'
                } else if (data == 30) {
                    return '30杯/八折優惠'
                } else if (data == 40) {
                    return '40杯/七折優惠'
                } else if (data == 50) {
                    return '50杯/六折優惠'
                }
            },

            // 判斷 杯數折扣 為多少
            check_cup_dis(data) {
                if (data < 20) {
                    return '20杯以下/無優惠'
                } else if (20 <= data && data < 30) {
                    return '20杯以上/九折優惠'
                } else if (30 <= data && data < 40) {
                    return '30杯以下/八折優惠'
                } else if (40 <= data && data < 50) {
                    return '40杯以下/七折優惠'
                } else if (50 <= data) {
                    return '50杯以下/六折優惠'
                }
            },

            // 判斷訂單的狀態
            checkstatuse(data) {
                if (data == 0) {
                    return '準備中'
                } else if (data == 1) {
                    return '運送中'
                } else if (data == 2) {
                    return '已完成'
                }
            },
            //點擊 收到商品 跳出燈箱提示
            getitem: async function () {
                const res = await fetch('./php/mem_update_group_ord_status.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        group_ord_no: this.group_ord_no,
                    }),
                })

                //跳出燈箱
                bus.$emit('getAlert', '確實收到商品')
                //重撈資料
                this.get_mem(this.group_ord_no)
            },
        },
        created() {
            this.get_mem(this.group_ord_no)
            this.get_group_ord_item(this.group_ord_no)
        },
        mounted() {},
    })
    //-----------------------------------------------------

    // --- 跟團訂單 紀錄 ---
    Vue.component('follow_order_box', {
        data() {
            return {
                content: 'follow_notyet_order_box',
            }
        },
        props: ['mem_no', 'group_ord_no'],
        template: `
                <section class="follow_order_box content">
                    <div class="tag_title">跟團紀錄</div>
                    <div class="order_box">
                        <div class="type_box follow_type_box">
                            <div class="type_box_on" id="follow_notyet_order_box" @click="content = 'follow_notyet_order_box',changecolor($event)">跟團中</div>
                            <div id="follow_done_order_box" @click="content = 'follow_done_order_box',changecolor($event)">跟團成功</div>
                        </div>
                        <div class="follow_order_list_box">
                          <component :is="content" :group_ord_no="group_ord_no" @changegroupordno="changegroupordno" @changecontent="changecontent" :mem_no="mem_no"></component>
                        </div>
                    </div>
                </section>
      `,
        methods: {
            changegroupordno(group_ord_no) {
                this.$emit('changegroupordno', group_ord_no)
            },
            changecontent(data) {
                this.$emit('changecontent', data)
            },
            changegroupordno(data) {
                this.$emit('changegroupordno', data)
            },
            //改變 被點擊的樣式
            changecolor(event) {
                document.querySelectorAll('.type_box>div').forEach(function (e) {
                    e.classList.remove('type_box_on')

                    // e.style.backgroundColor = '#fff'
                    // e.style.color = '#B3925B'
                })
                event.currentTarget.classList.add('type_box_on')

                // event.currentTarget.style.backgroundColor = '#B3925B'
                // event.currentTarget.style.color = '#fff'
            },
        },
    })
    //-----------------------------------------------------

    // --- 跟團中 列表 ---
    Vue.component('follow_notyet_order_box', {
        data() {
            return {
                follow_notyet_ord_info: '',
            }
        },
        props: ['mem_no', 'group_ord_no'],
        template: `
      <div class="follow_notyet_order_box">
        <div class="order_all" v-for="(value,key) in follow_notyet_ord_info">
            <div class="order_row groupname">
                <div class="order_row_title">團名 :</div>
                <div class="order_groupname">{{value.group_name}}</div>
            </div>
            <div class="order_detail_box">
                <div class="order_row">
                    <div class="order_row_title">截單時間</div>
                    <div class="order_deadline">{{value.deadline_time}}</div>
                </div>
                <div class="order_row">
                    <div class="order_row_title">目標杯數</div>
                    <div class="order_goalcup">{{check_cup(value.goal_cup)}}</div>
                </div>
                <div class="order_row">
                    <div class="order_row_title">目前杯數</div>
                    <div class="order_nowcup">{{value.now_cup}}</div>
                </div>
                <div class="follow_notyet_detail_btn detail_btn" id="follow_order_notyet_page" @click="change(value.group_ord_no)">
                    詳情
                </div>
            </div>
        </div>
      </div>
`,
        methods: {
            change(group_ord_no) {
                // 改變上層的 content
                this.$emit('changecontent', 'follow_order_notyet_page')
                this.$emit('changegroupordno', group_ord_no)
            },
            //取得 已揪團的 訂單資訊
            get_mem: async function (mem_no) {
                // console.log('send2', drinkno)
                const res = await fetch('./php/mem_get_follow_notyet_ord.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mem_no: mem_no,
                    }),
                }).then(function (data) {
                    return data.json()
                })
                // 取回res值後，呼叫另一隻函式
                this.follow_notyet_ord_info = res
            },
            check_cup(data) {
                if (data == 10) {
                    return '無'
                } else {
                    return data
                }
            },
        },
        created() {
            this.get_mem(this.mem_no)
        },
    })
    //-----------------------------------------------------

    // --- 成功跟團 列表 ---
    Vue.component('follow_done_order_box', {
        data() {
            return {
                follow_done_ord_info: '',
            }
        },
        props: ['mem_no', 'group_ord_no'],
        template: `
      <div class="follow_done_order_box">
        <div class="order_all" v-for="(value,key) in follow_done_ord_info">
            <div class="order_row groupname">
                <div class="order_row_title">團名 :</div>
                <div class="order_groupname">{{value.group_name}}</div>
            </div>
            <div class="order_detail_box">
                <div class="order_row">
                    <div class="order_row_title">訂單編號</div>
                    <div class="order_no">{{value.group_ord_no}}</div>
                </div>
                <div class="order_row">
                    <div class="order_row_title">預計送達時間</div>
                    <div class="order_date">{{value.arrive_time}}</div>
                </div>
                <div class="order_row">
                    <div class="order_row_title">應付金額</div>
                    <div class="order_totalprice">$ {{value.per_total_price}}</div>
                </div>
                <div class="order_row">
                    <div class="order_row_title">訂單狀態</div>
                    <div class="order_statuse">{{checkstatuse(value.group_ord_bs)}}</div>
                </div>
                <div class="follow_done_detail_btn detail_btn" id="follow_order_done_page" @click="change(value.group_ord_no)">
                    詳情
                </div>
            </div>
        </div>
      </div>
    `,

        methods: {
            change(group_ord_no) {
                // 改變上層的 content
                this.$emit('changecontent', 'follow_order_done_page')
                this.$emit('changegroupordno', group_ord_no)
            },
            // 判斷訂單的狀態
            checkstatuse(data) {
                if (data == 0) {
                    return '準備中'
                } else if (data == 1) {
                    return '運送中'
                } else if (data == 2) {
                    return '已完成'
                }
            },
            //取得 已揪團的 訂單資訊
            get_mem: async function (mem_no) {
                // console.log('send2', drinkno)
                const res = await fetch('./php/mem_get_follow_done_ord.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mem_no: mem_no,
                    }),
                }).then(function (data) {
                    return data.json()
                })
                // 取回res值後，呼叫另一隻函式
                this.follow_done_ord_info = res
            },
        },
        created() {
            this.get_mem(this.mem_no)
        },
    })
    //-----------------------------------------------------

    // --- 跟團中 詳情頁面 ---
    Vue.component('follow_order_notyet_page', {
        data() {
            return {
                follow_order_notyet_ord_info: '',
                follow_order_notyet_ord_item: '',
            }
        },
        props: ['mem_no', 'group_ord_no'],
        template: `
      <section class="follow_order_notyet_page content">
        <div class="tag_title">跟團詳情 - 跟團中</div>
        <div class="group_order_done_groupname">
            <div>團名:</div>
            <div>{{follow_order_notyet_ord_info.group_name}}</div>
        </div>
        <div class="group_order_done_info">
            <div class="group_order_done_row">
                <div>揪團編號</div>
                <div>{{follow_order_notyet_ord_info.group_ord_no}}</div>
            </div>
            <div class="group_order_done_row">
                <div>預計送達時間</div>
                <div>{{follow_order_notyet_ord_info.arrive_time}}</div>
            </div>
            <div class="group_order_done_row">
                <div>截止時間</div>
                <div>{{follow_order_notyet_ord_info.deadline_time}}</div>
            </div>
            
            <div class="group_order_done_row">
                <div>取貨地點</div>
                <div>{{follow_order_notyet_ord_info.group_adress}}</div>
            </div>
            <div class="group_order_done_row">
                <div>目標杯數</div>
                <div>{{check_goal_cup(follow_order_notyet_ord_info.goal_cup)}}</div>
            </div>
            <div class="group_order_done_row">
                <div>目前杯數</div>
                <div>{{follow_order_notyet_ord_info.now_cup}}杯</div>
            </div>
            <div class="group_order_done_row">
                <div>杯數優惠</div>
                <div>{{check_cup_dis(follow_order_notyet_ord_info.now_cup)}}</div>
            </div>
            <div class="group_order_done_row">
                <div>應付金額</div> <!-- 原價*杯數折扣  -->
                <div>$ {{follow_order_notyet_ord_item.total_price_2 * follow_order_notyet_ord_info.dis_count}}</div>
            </div>
            <div class="group_order_done_row">
                <div>狀態</div>
                <div>揪團中</div>
            </div>
        </div>
        <div id="order_list">
          <!-- 每個人  -->
          <div class="group_order_done_person">
            <div class="group_order_done_person_upbox">                
              <div class="group_order_done_person_img"><img :src="follow_order_notyet_ord_item.mem_img" /></div>
              <div class="group_order_done_person_name">{{follow_order_notyet_ord_item.mem_name}}</div>
            </div>                                                    
            <div class="group_order_done_person_downbox">                  
              <!-- 購買的 飲料 -->                      
              <div class="group_order_done_person_drink" v-for="(value,key) in follow_order_notyet_ord_item.items">                      
                <section id="drink_title_wrapper">                        
                  <div class="group_order_done_person_drink_title">{{value.drink_title_ch}}-{{value.cup_no}}</div>                          
                  <div class="group_order_done_person_drink_note" >{{value.set_info}}</div>
                </section>
                <section id="num_btn">
                  <div id="num_feedback">{{value.ord_qua}}</div>
                  <span>杯</span>
                </section>
                <section id="item_single_price">
                  &#36{{value.total_price}}
                </section>
              </div>
            </div>
            <div class="group_order_done_person_total" >
              <div>總計</div>
              <div class="group_order_done_person_total_cup">{{follow_order_notyet_ord_item.total_cup}}杯</div>
              <div class="group_order_done_person_total_price">&#36{{follow_order_notyet_ord_item.total_price_2}}</div>
            </div>
          </div>
        </div>                            
        <div class="group_order_done_total_box">
            <div class="group_order_done_total">
                <div>原價</div>
                <div>$ {{follow_order_notyet_ord_item.total_price_2}}</div>
            </div>
            <div class="group_order_done_dis">
                <div>杯數折扣</div>
                <div>x {{follow_order_notyet_ord_info.dis_count}}</div>
            </div>
            <div class="group_order_done_finaltotal">
                <div>總金額</div>
                <div>$ {{follow_order_notyet_ord_item.total_price_2 * follow_order_notyet_ord_info.dis_count}}</div>
            </div>
        </div>
      </section>
    `,
        methods: {
            //取得 單筆訂單的 訂單資訊
            get_mem: async function (group_ord_no) {
                // console.log('send2', drinkno)
                const res = await fetch('./php/mem_getone_group_ord.php', {
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
                // 取回res值後，塞入data內
                this.follow_order_notyet_ord_info = res
            },

            //取得 單筆訂單的 所有飲料品項資料
            get_group_ord_item: async function (mem_no, group_ord_no) {
                // console.log('send2', drinkno)
                const res = await fetch('./php/mem_getone_follow_ord_item.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mem_no: mem_no,
                        group_ord_no: group_ord_no,
                    }),
                }).then(function (data) {
                    return data.json()
                })
                // 取回res值後，塞入data內
                this.follow_order_notyet_ord_item = res
            },

            // 判斷訂單的狀態
            checkstatuse(data) {
                if (data == 0) {
                    return '運送中'
                } else if (data == 1) {
                    return '已完成'
                }
            },
            // 判斷 目標杯數 為何
            check_goal_cup(data) {
                if (data == 20) {
                    return '20杯/九折優惠'
                } else if (data == 30) {
                    return '30杯/八折優惠'
                } else if (data == 40) {
                    return '40杯/七折優惠'
                } else if (data == 50) {
                    return '50杯/六折優惠'
                }
            },

            // 判斷 杯數折扣 為多少
            check_cup_dis(data) {
                if (data < 20) {
                    return '20杯以下/無優惠'
                } else if (20 <= data && data < 30) {
                    return '20杯以上/九折優惠'
                } else if (30 <= data && data < 40) {
                    return '30杯以下/八折優惠'
                } else if (40 <= data && data < 50) {
                    return '40杯以下/七折優惠'
                } else if (50 <= data) {
                    return '50杯以下/六折優惠'
                }
            },
        },
        created() {
            // this.get_mem(this.group_ord_no)
            // this.get_group_ord_item(this.mem_no, this.group_ord_no)
        },
        mounted() {
            this.get_mem(this.group_ord_no)
            this.get_group_ord_item(this.mem_no, this.group_ord_no)
        },
    })
    //-----------------------------------------------------

    // --- 跟團成功 詳情頁面 ---
    Vue.component('follow_order_done_page', {
        data() {
            return {
                follow_order_done_ord_info: '',
                follow_order_done_ord_item: '',
            }
        },
        props: ['mem_no', 'group_ord_no'],
        template: `
                <section class="group_order_done_page content">
                  <div class="tag_title">跟團詳情 - 跟團成功</div>
                  <div class="group_order_done_groupname">
                      <div>團名:</div>
                      <div>{{follow_order_done_ord_info.group_name}}</div>
                  </div>
                  <div class="group_order_done_info">
                      <div class="group_order_done_row">
                          <div>訂單編號</div>
                          <div>{{follow_order_done_ord_info.group_ord_no}}</div>
                      </div>
                      <div class="group_order_done_row">
                          <div>連絡電話</div>
                          <div>{{follow_order_done_ord_info.group_ord_phone}}</div>
                      </div>
                      <div class="group_order_done_row">
                          <div>給店家話</div>
                          <div>{{follow_order_done_ord_info.note}}</div>
                      </div>
                      <div class="group_order_done_row">
                          <div>目標杯數</div>
                          <div>{{check_goal_cup(follow_order_done_ord_info.goal_cup)}}</div>
                      </div>
                      <div class="group_order_done_row">
                          <div>總共杯數</div>
                          <div>{{follow_order_done_ord_info.now_cup}}</div>
                      </div>
                      <div class="group_order_done_row">
                          <div>杯數優惠</div>
                          <div>{{check_cup_dis(follow_order_done_ord_info.dis_count)}}</div>
                      </div>
                      <div class="group_order_done_row">
                          <div>預計送達時間</div>
                          <div>{{follow_order_done_ord_info.arrive_time}}</div>
                      </div>
                      <div class="group_order_done_row">
                          <div>取貨地點</div>
                          <div>{{follow_order_done_ord_info.group_adress}}</div>
                      </div>
                      <div class="group_order_done_row">
                          <div>應付金額</div>
                          <div>$ {{follow_order_done_ord_item.total_price_2 * follow_order_done_ord_info.dis_count}}</div>
                      </div>
                      <div class="group_order_done_row">
                          <div>訂單狀態</div>
                          <div>{{checkstatuse(follow_order_done_ord_info.group_ord_bs)}}</div>
                      </div>
                  </div>
                  <div id="order_list">
                      <!-- 每個人  -->
                      <div class="group_order_done_person" >
                          <div class="group_order_done_person_upbox">
                              <div class="group_order_done_person_img"><img :src="follow_order_done_ord_item.mem_img" /></div>
                              <div class="group_order_done_person_name">{{follow_order_done_ord_item.mem_name}}</div>
                          </div>
                          <div class="group_order_done_person_downbox">
                              <!-- 購買的 飲料 -->
                              <div class="group_order_done_person_drink" v-for="(value,key) in follow_order_done_ord_item.items">
                                <section id="drink_title_wrapper">
                                    <div class="group_order_done_person_drink_title">{{value.drink_title_ch}}-{{value.cup_no}}</div>
                                    <div class="group_order_done_person_drink_note" >{{value.set_info}}</div>
                                </section>
                                <section id="num_btn">
                                    <div id="num_feedback">{{value.ord_qua}}</div>
                                    <span>杯</span>
                                </section>
                                <section id="item_single_price">
                                    &#36{{value.total_price}}
                                </section>
                              </div>
                          </div>
                          <div class="group_order_done_person_total" >
                              <div>總計</div>
                              <div class="group_order_done_person_total_cup">{{follow_order_done_ord_item.total_cup}}杯</div>
                              <div class="group_order_done_person_total_price">&#36{{follow_order_done_ord_item.total_price_2}}</div>
                          </div>
                      </div>
                  </div>
                  <div class="group_order_done_total_box">
                      <div class="group_order_done_total">
                          <div>原價</div>
                          <div>$ {{follow_order_done_ord_item.total_price_2}}</div>
                      </div>
                      <div class="group_order_done_dis">
                          <div>杯數折扣</div>
                          <div>x {{follow_order_done_ord_info.dis_count}}</div>
                      </div>
                      <div class="group_order_done_finaltotal">
                          <div>總金額</div>
                          <div>$ {{follow_order_done_ord_item.total_price_2 * follow_order_done_ord_info.dis_count}}</div>
                      </div>
                  </div>
              </section>
    `,
        methods: {
            //取得 單筆訂單的 訂單資訊
            get_mem: async function (group_ord_no) {
                // console.log('send2', drinkno)
                const res = await fetch('./php/mem_getone_group_ord.php', {
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
                // 取回res值後，塞入data內
                this.follow_order_done_ord_info = res
            },

            //取得 單筆訂單的 所有飲料品項資料
            get_group_ord_item: async function (mem_no, group_ord_no) {
                // console.log('send2', drinkno)
                const res = await fetch('./php/mem_getone_follow_ord_item.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mem_no: mem_no,
                        group_ord_no: group_ord_no,
                    }),
                }).then(function (data) {
                    return data.json()
                })
                // 取回res值後，塞入data內
                this.follow_order_done_ord_item = res
            },
            // 判斷 目標杯數 為何
            check_goal_cup(data) {
                if (data == 20) {
                    return '20杯/九折優惠'
                } else if (data == 30) {
                    return '30杯/八折優惠'
                } else if (data == 40) {
                    return '40杯/七折優惠'
                } else if (data == 50) {
                    return '50杯/六折優惠'
                }
            },

            // 判斷 杯數折扣 為多少
            check_cup_dis(data) {
                if (data < 20) {
                    return '20杯以下/無優惠'
                } else if (20 <= data && data < 30) {
                    return '20杯以上/九折優惠'
                } else if (30 <= data && data < 40) {
                    return '30杯以下/八折優惠'
                } else if (40 <= data && data < 50) {
                    return '40杯以下/七折優惠'
                } else if (50 <= data) {
                    return '50杯以下/六折優惠'
                }
            },

            // 判斷訂單的狀態
            checkstatuse(data) {
                if (data == 0) {
                    return '準備中'
                } else if (data == 1) {
                    return '運送中'
                } else if (data == 2) {
                    return '已完成'
                }
            },
        },
        created() {
            this.get_mem(this.group_ord_no)
            this.get_group_ord_item(this.mem_no, this.group_ord_no)
        },
        mounted() {},
    })
    //-----------------------------------------------------

    // --- 自己訂 訂單 紀錄 ---
    Vue.component('self_order_box', {
        data() {
            return {
                per_ord_info: '',
                ord_state: 0,
            }
        },
        props: ['mem_no', 'per_ord_no'],
        template: `
      <section class="self_order_box content">
        <div class="tag_title">自己訂 | 訂單紀錄</div>
        <div class="order_box">
            <div class="type_box self_type_box">
                <div class="type_box_on" id="self_notyet_order_box" @click="changetype(0),changecolor($event)">未完成</div>
                <div id="self_done_order_box" @click="changetype(2),changecolor($event)">已完成</div>
            </div>
            <div class="self_order_list_box">
                <div class="self_notyet_order_box">
                  <div class="order_all" v-for="(value,key) in per_ord_info">
                      <div class="order_detail_box">
                          <div class="order_row">
                              <div class="order_row_title">訂單編號</div>
                              <div class="order_no">{{value.per_ord_no}}</div>
                          </div>
                          <div class="order_row">
                              <div class="order_row_title">訂單日期</div>
                              <div class="order_date">{{value.ord_time}}</div>
                          </div>
                          <div class="order_row">
                              <div class="order_row_title">訂單金額</div>
                              <div class="order_totalprice">$ {{value.ord_price_2}}</div>
                          </div>
                          <div class="order_row">
                              <div class="order_row_title">訂單狀態</div>
                              <div class="order_statuse">{{checkstatuse(value.ord_state)}}</div>
                          </div>
                          <div class="self_detail_btn detail_btn" id="self_order_page" @click="change(value.per_ord_no)">詳情</div>
                      </div>
                  </div>
                </div>
            </div>
        </div>
      </section>
    `,
        methods: {
            change(per_ord_no) {
                // 改變上層的 content
                this.$emit('changecontent', 'self_order_page')
                this.$emit('changeperordno', per_ord_no)
            },
            changegroupordno(group_ord_no) {
                this.$emit('changegroupordno', group_ord_no)
            },
            changecontent(data) {
                this.$emit('changecontent', data)
            },
            // 切換搜尋 訂單之類型
            changetype(data) {
                // 更改狀態值
                this.ord_state = data
                // 重新搜尋
                this.get_pre_ord()
            },

            //改變 被點擊的樣式
            changecolor(event) {
                document.querySelectorAll('.type_box>div').forEach(function (e) {
                    e.classList.remove('type_box_on')

                    // e.style.backgroundColor = '#fff'
                    // e.style.color = '#B3925B'
                })
                event.currentTarget.classList.add('type_box_on')

                // event.currentTarget.style.backgroundColor = '#B3925B'
                // event.currentTarget.style.color = '#fff'
            },

            //取得 訂單資料
            get_pre_ord: async function () {
                // console.log('send2', drinkno)
                const res = await fetch('./php/mem_get_onetype_per_ord.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mem_no: this.mem_no,
                        ord_state: this.ord_state,
                    }),
                }).then(function (data) {
                    return data.json()
                })
                // 取回res值後，塞入data內
                this.per_ord_info = res
            },
            // 判斷訂單的狀態
            checkstatuse(data) {
                if (data == 0) {
                    return '準備中'
                } else if (data == 1) {
                    return '運送中'
                } else if (data == 2) {
                    return '已完成'
                }
            },
        },
        created() {
            this.get_pre_ord(this.mem_no, this.ord_state)
        },
    })
    //-----------------------------------------------------

    // --- 自己訂 訂單 詳情頁面 ---
    Vue.component('self_order_page', {
        data() {
            return {
                per_ord_info: '',
                per_ord_item: '',
            }
        },
        props: ['mem_no', 'per_ord_no'],
        template: `
                  <section class="self_order_page content">
                    <div class="tag_title">自己訂 - 訂單詳情</div>
                    <div class="group_order_done_info">
                        <div class="group_order_done_row">
                            <div>訂單編號</div>
                            <div>{{per_ord_info.per_ord_no}}</div>
                        </div>
                        <div class="group_order_done_row">
                            <div>訂單日期</div>
                            <div>{{per_ord_info.ord_time}}</div>
                        </div>
                        <div class="group_order_done_row">
                            <div>總共杯數</div>
                            <div>{{per_ord_info.total_cup}}杯</div>
                        </div>
                        <div class="group_order_done_row">
                            <div>杯數優惠</div>
                            <div>{{check_cup_dis(per_ord_info.total_cup)}}</div>
                        </div>
                        <div class="group_order_done_row">
                            <div>優惠卷</div>
                            <div>{{per_ord_info.cou_text}}</div>
                        </div>
                        <div class="group_order_done_row">
                            <div>訂單金額</div>
                            <div>$ {{per_ord_info.ord_price_2}}</div>
                        </div>
                         <div class="group_order_done_row">
                            <div>外送地址</div>
                            <div>{{per_ord_info.adress}}</div>
                        </div>
                        <div class="group_order_done_row">
                            <div>訂單狀態</div>
                            <div>{{checkstatuse(per_ord_info.ord_state)}}</div>
                        </div>
                    </div>
                    <div id="order_list">
                      <!-- 每個人  -->
                      <div class="group_order_done_person">
                          <div class="group_order_done_person_upbox">
                              <div class="group_order_done_person_img"><img :src="per_ord_info.mem_img" /></div>
                              <div class="group_order_done_person_name">{{per_ord_info.mem_name}}</div>
                          </div>
                          <div class="group_order_done_person_downbox">
                              <!-- 購買的 飲料 -->
                              <div class="group_order_done_person_drink" v-for="(value,key) in per_ord_item">
                                <section id="drink_title_wrapper">
                                    <div class="group_order_done_person_drink_title">{{value.drink_title_ch}}-{{value.cup_no}}</div>
                                    <div class="group_order_done_person_drink_note" >{{value.set_info}}</div>
                                </section>
                                <section id="num_btn">
                                    <div id="num_feedback">{{value.ord_list_qua}}</div>
                                    <span>杯</span>
                                </section>
                                <section id="item_single_price">
                                    &#36{{value.total_price}}
                                </section>
                              </div>
                          </div>
                          <div class="group_order_done_person_total" >
                              <div>總計</div>
                              <div class="group_order_done_person_total_cup">{{per_ord_info.total_cup}}杯</div>
                              <div class="group_order_done_person_total_price">&#36{{per_ord_info.ord_price}}</div>
                          </div>
                      </div>
                    </div>
                    <div class="group_order_done_total_box">
                        <div class="group_order_done_total">
                            <div>原價</div>
                            <div>$ {{per_ord_info.ord_price}}</div>
                        </div>
                        <div class="group_order_done_dis">
                            <div>杯數折扣</div>
                            <div>x {{per_ord_info.dis_count}}</div>
                        </div>
                        <div class="group_order_done_total">
                            <div>杯數折扣後</div>
                            <div>$ {{per_ord_info.ord_price_1}}</div>
                        </div>
                        <div class="group_order_done_dis">
                            <div>優惠卷折扣</div>
                            <div>x {{per_ord_info.cou_discount}}</div>
                        </div>
                        <div class="group_order_done_finaltotal">
                            <div>總金額</div>
                            <div>$ {{per_ord_info.ord_price_2}}</div>
                        </div>
                    </div>
                    <div class="getitem_btn_box" v-if="per_ord_info.ord_state == 1"><div id="getitem_btn" @click="getitem">收到商品</div></div>
                  </section>
    `,
        methods: {
            //取得 單筆訂單的 訂單資訊
            get_mem: async function () {
                // console.log('send2', drinkno)
                const res = await fetch('./php/mem_getone_per_ord.php', {
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
                // 取回res值後，塞入data內
                this.per_ord_info = res
            },

            //取得 單筆訂單的 所有飲料品項資料
            get_group_ord_item: async function () {
                // console.log('send2', drinkno)
                const res = await fetch('./php/mem_getone_per_ord_item.php', {
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
                // 取回res值後，塞入data內
                this.per_ord_item = res
            },

            // 判斷 杯數折扣 為多少
            check_cup_dis(data) {
                if (data < 20) {
                    return '20杯以下/無優惠'
                } else if (20 <= data && data < 30) {
                    return '20杯以上/九折優惠'
                } else if (30 <= data && data < 40) {
                    return '30杯以下/八折優惠'
                } else if (40 <= data && data < 50) {
                    return '40杯以下/七折優惠'
                } else if (50 <= data) {
                    return '50杯以下/六折優惠'
                }
            },

            // 判斷訂單的狀態
            checkstatuse(data) {
                if (data == 0) {
                    return '準備中'
                } else if (data == 1) {
                    return '運送中'
                } else if (data == 2) {
                    return '已完成'
                }
            },
            //點擊 收到商品 跳出燈箱提示
            getitem: async function () {
                const res = await fetch('./php/mem_update_per_ord_status.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        per_ord_no: this.per_ord_no,
                    }),
                })

                //跳出燈箱
                bus.$emit('getAlert', '確實收到商品')
                //重撈資料
                this.get_mem()
            },
        },
        created() {
            this.get_mem()
            this.get_group_ord_item()
        },
        mounted() {},
    })
    //-----------------------------------------------------

    // --- 查看 優惠券  ---
    Vue.component('coupon_box', {
        data() {
            return {
                coupons: '',
                empty: false,
            }
        },
        props: ['mem_no'],
        template: `
    <section class="coupon_box content">
      <div class="title_box">
          <div class="tag_title">優惠券查看</div>
          <a href="./custom.html" class="coupon_link"><img src="./Images/coupon_list.png" /></a>
      </div>
      <div class="empty" v-if="empty == true ">
            <span>目前尚無任何優惠券，趕緊去玩小遊戲，取得優惠券吧 ~!!</span>
      </div>
      <div class="coupon_list" v-if=" empty == false">
          <div class="coupon_item" v-for="(value,key) in coupons">
              <div class="coupon_img"><img :src="value.img" /></div>
              <div class="coupon_info">
                  <div class="coupon_info_row">
                      <div>優惠券代碼:</div>
                      <div>{{value.cou_code}}</div>
                  </div>
                  <div class="coupon_info_row">
                      <div>折扣數:</div>
                      <div>{{value.cou_discount}}</div>
                  </div>
              </div>
          </div>
      </div>
    </section>
  `,
        methods: {
            async get_coupon() {
                const res = await fetch('./php/mem_get_coupon.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mem_no: this.mem_no,
                    }),
                }).then(function (data) {
                    return data.json()
                })
                // 取回res值後，呼叫另一隻函式

                if (res === '{}') {
                    this.empty = true
                } else {
                    this.coupons = res
                }
            },
        },
        created() {
            this.get_coupon()
        },
    })
    //-----------------------------------------------------

    // --- 發文紀錄  ---
    Vue.component('article_list', {
        data() {
            return {
                show: false, //是否開啟文章燈箱
                showNewArticleBox: false, //是否開啟投稿文章燈箱
                theClickArtNo: '', //被點擊的文章編號
                parentAlert: false,
                alertText: '',
                allArticle: [], //全部文章
                selected: 'art_time', //篩選排序
                anotherAllArticle: [],
                pagination: {
                    currentPage: '',
                    pageTotal: '',
                    per_page: '',
                    totalResult: '',
                },
                selectedArticle: [],
                theCurrentPage: 1,
                empty: false,
            }
        },
        props: ['mem_no'],
        template: `
        <section class="section_2">
            <div class="tag_title">發文紀錄</div>
            <div class="s2_hotitem_box">
                <div class="empty" v-if="empty == true ">
                    <span>目前尚無任何發文紀錄，趕緊去發表心得文章，告訴大家飲料有多麼好喝 ~!!</span>
                </div>
                <div v-if="empty == false" class="s2_hotitem" v-for="item in anotherAllArticle" :key="item.art_no" @click="clickWhichOne(item)">
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
            <!-- 文章詳情 -->
            <article_box :item="theClickArtNo" v-if="show" @childCloseArtBox="parentCloseArtBox" :mem_no="mem_no"></article_box>
            <!-- 警示視窗 -->
            <alert_lightbox :parentAlert_ = "parentAlert" :_alertText="alertText" @childSendCloseAlert="parentGetCloseAlert"></alert_lightbox>
          
        </section>`,
        methods: {
            //撈出所有 該會員發出的文章
            get_article: async function () {
                const res = await fetch('./php/mem_getone_article.php', {
                    method: 'POST',
                    mode: 'same-origin',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mem_no: this.mem_no,
                    }),
                }).then(function (data) {
                    return data.json()
                })
                // 取回res值後，呼叫另一隻函式
                // this.anotherAllArticle = res

                if (res == '{}') {
                    this.empty = true
                } else {
                    this.anotherAllArticle = res
                }
            },

            //文章內容顯示個字
            showWords(data, name_or_intro) {
                let theShowWords

                let showHowManyWords = name_or_intro == 'art_intro' ? 50 : 15
                if (data.length <= showHowManyWords) {
                    theShowWords = data
                } else {
                    theShowWords = data.substr(0, showHowManyWords) + '...'
                }
                return theShowWords
            },

            //點擊文章後，theClickArt存放被點擊的文章資料，並開啟文章燈箱
            clickWhichOne: async function (item) {
                console.log('in')
                if (this.mem_no === undefined) {
                    this.parentAlert = true
                    this.alertText = '請登入會員'
                } else {
                    console.log('22')
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
                this.get_article()
                this.show = false
            },
            parentCloseNewArtBox() {
                this.get_article()
                this.showNewArticleBox = false
            },
            openNewArticleBox() {
                if (this.mem_no === undefined) {
                    this.parentAlert = true
                    this.alertText = '請登入會員'
                } else {
                    this.showNewArticleBox = true
                }
            },
        },
        created() {
            this.get_article()
        },
    })
    //-----------------------------------------------------

    //文章內容燈箱
    Vue.component('article_box', {
        props: ['item', 'mem_no'], //上層傳來被點擊的文章資料
        data() {
            return {
                artMsgdata: [], //存放撈取的留言資料
                message: '', //留言區的留言
                parentAlert: false, //是否開啟警示視窗
                alertText: '', //警示視窗內的提示字
                artBoxData: '',
                parentReport: false,
                reportData: '',
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
                let xhr = new XMLHttpRequest()
                xhr.onload = function () {
                    that.artBoxData = JSON.parse(xhr.responseText)
                }
                xhr.open('get', `php/getArtBoxdata.php?art_no=${this.item}&mem_no=${this.mem_no}`, true)
                xhr.send(null)
            },
            //從資料庫撈取留言資料
            getArtMsgdata() {
                let that = this
                let xhr = new XMLHttpRequest()
                xhr.onload = function () {
                    that.artMsgdata = JSON.parse(xhr.responseText)
                }
                xhr.open('get', `php/getArtMsgdata.php?art_no=${that.item}`, true)
                xhr.send(null)
            },
            //點送出留言，會把parentAlert改成true，，此data變動會開啟警示視窗
            doubleCheck() {
                this.parentAlert = true

                //如果留言為空，則送出"請輸入留言"讓下層接收，若有值則送出"確定要送出留言?"
                if (this.message.trim() == '') {
                    this.alertText = '請輸入留言'
                } else {
                    this.alertText = '確定要送出?'
                }
            },
            //警示視窗點確認，往上層傳遞並呼叫此函式
            //如果是送出留言則呼叫postMsg方法，將留言送到後台，並關閉警示視窗
            //如果是沒輸入留言，按確認或關閉都只會關閉警示視窗
            parentGetCloseAlert(status) {
                if (status === 'toDo') {
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
                this.message = ''
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
                let now = `${dt.getFullYear()}-${
                    dt.getMonth() + 1
                }-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
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
                    return './Images/like_big.svg'
                } else {
                    return './Images/heart_gray.png'
                }
            },
            //點喜歡會更換愛心及喜歡文字的透明度
            like_btn_style() {
                if (this.everClickLike) {
                    return 'opacity: 1;'
                } else {
                    return 'opacity: 0.6;'
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

    // 警示視窗(檢視文章的)
    Vue.component('alert_lightbox', {
        //接收來自上層是"否開啟警示視窗"及"視窗內文字"的參數
        props: ['parentAlert_', '_alertText'],
        data() {
            return {}
        },
        methods: {
            //點選關閉視窗
            closeAlertLightbox() {
                this.$emit('childSendCloseAlert')
            },
            //如果是請使用者輸入留言的訊息，點選確認就呼叫父層組件childSendCloseAlert的方法，直接關閉視窗
            //若是確認送出，點確認就會傳遞toDo參數，父層組件會判斷是否有這個參數，才會執行送留言到資料庫的動作
            sureToDo() {
                if (this._alertText == '確定要送出?') {
                    this.$emit('childSendCloseAlert', 'toDo')
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
            },
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
        props: ['parentReport_', 'reportData_'],
        data() {
            return {
                reasonText: '',
                noChoose: false,
                x: {},
            }
        },
        methods: {
            //點選關閉視窗
            closeReportLightbox() {
                this.$emit('childSendCloseReport')
                this.reasonText = ''
            },

            sureToDo() {
                if (!this.reasonText) {
                    this.noChoose = true
                } else {
                    let dt = new Date()
                    let now = `${dt.getFullYear()}-${
                        dt.getMonth() + 1
                    }-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`
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
                    this.reasonText = ''
                }
            },
        },
        computed: {
            //下層由alertLightbox接收來自上層的parentAlert，若為true開啟燈箱，false則關閉
            reportLightbox() {
                return this.parentReport_
            },
            reportReason() {
                if (this.reportData_.msg_or_art == 'msg') {
                    return {
                        reason1: '此留言與該文章不相關',
                        reason2: '此留言為不當發言',
                        reason3: '此留言帶有污辱性文字',
                    }
                } else {
                    return {
                        reason1: '該文章為不實訊息',
                        reason2: '該文章含有暴力、色情內容',
                        reason3: '該文章帶有仇視言論',
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

    //警示視窗 (原本會員的)
    Vue.component('alert_lightbox_1', {
        data() {
            return {
                alertLightbox: false,
                alertText: '',
            }
        },
        methods: {
            closeAlertLightbox() {
                this.alertLightbox = false
                // if (this.alertText == '跟團時間已截止') {
                //     location.href = 'index.html'
                // }
            },
        },
        mounted() {
            bus.$on('getAlert', (_alertText) => {
                this.alertText = _alertText
                this.alertLightbox = true
            })
        },
        template: `
    <div class="alertLightbox_black" v-if="alertLightbox">
        <div class="alertLightboxWrapper">
            <div class="alertLightbox" >
                <div>{{alertText}}</div>
                <div @click="closeAlertLightbox">確定</div>
            </div>
        </div>
    </div>
    `,
    })
    //-----------------------------------------------------

    //New Vue
    new Vue({
        el: '#app',
        data: {
            content: 'mem_info',
            mem_no: '',
            group_ord_no: '',
            per_ord_no: '',
        },
        methods: {
            changecontent(data) {
                this.content = data
            },
            changecontentselect(data) {
                this.content = data
            },
            changegroupordno(data) {
                this.group_ord_no = data
            },
            changeperordno(data) {
                this.per_ord_no = data
            },
            changememno(data) {
                console.log('two')

                this.mem_no = data.mem_no

                // if ((this.mem_no === undefined) | (this.mem_no === '')) {
                //     location.href = `./homepage.html`
                // } else {
                // }
            },
            //進行會員判斷
            checked_mem(data) {
                console.log('會員判斷')
                if ((data != '') | (data != undefined)) {
                    this.mem_no = data.memNo
                } else {
                    location.href = `./homepage.html`
                }
                this.mem_no = data.mem_no
            },
        },
        components: {},
        created() {
            // member.$on('getmemberInfo', this.changememno)
            // console.log('創造')
            // this.checked_mem()
        },
        mounted() {
            // this.checked_mem()
            // this.content = 'mem_info'
        },
        beforeUpdate() {
            // this.content = 'mem_info'
        },
        beforeCreate() {},
        watch: {
            mem_no() {
                // console.log('監控')
                // this.checked_mem()
            },
        },
    })
})
