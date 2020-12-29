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
                            <li @click="changeTag($event)" id="group">揪團訂單管理</li>
                            <li @click="changeTag($event)" id="self" >一般訂單管理</li>
                            <li @click="changeTag($event)" id="article">文章檢舉審核</li>
                            <li @click="changeTag($event)" id="message">留言檢舉審核</li>
                          </ul>
                        </aside>`,
        methods: {
            changeTag(event) {
                //獲取被點擊的 ID值
                this.show = event.currentTarget.id
                //傳送至上層 (new Vue)
                this.$emit('change', this.show)
            },
        },
    })
    //-----------------------------------------------------

    //管理員帳號管理 -- 組件
    Vue.component('manager', {
        data() {
            return {
                //切換Tag
                // show: 'show',
                //撈出來的 會員資料
                managers: [
                    { mar_no: 1, mar_id: '213dss', mar_psw: '2112ija', mar_name: '安安你好', mar_status: 1 },
                    { mar_no: 2, mar_id: 'vjrres42', mar_psw: 'ffd232a', mar_name: 'QQ咩咩', mar_status: 1 },
                    { mar_no: 2, mar_id: 'vjrres42', mar_psw: 'ffd232a', mar_name: 'QQ咩咩', mar_status: 1 },
                    { mar_no: 2, mar_id: 'vjrres42', mar_psw: 'ffd232a', mar_name: 'QQ咩咩', mar_status: 1 },
                    { mar_no: 2, mar_id: 'vjrres42', mar_psw: 'ffd232a', mar_name: 'QQ咩咩', mar_status: 1 },
                    { mar_no: 2, mar_id: 'vjrres42', mar_psw: 'ffd232a', mar_name: 'QQ咩咩', mar_status: 1 },
                    { mar_no: 2, mar_id: 'vjrres42', mar_psw: 'ffd232a', mar_name: 'QQ咩咩', mar_status: 1 },
                    { mar_no: 2, mar_id: 'vjrres42', mar_psw: 'ffd232a', mar_name: 'QQ咩咩', mar_status: 1 },
                    { mar_no: 2, mar_id: 'vjrres42', mar_psw: 'ffd232a', mar_name: 'QQ咩咩', mar_status: 1 },
                    { mar_no: 2, mar_id: 'vjrres42', mar_psw: 'ffd232a', mar_name: 'QQ咩咩', mar_status: 1 },
                    { mar_no: 2, mar_id: 'vjrres42', mar_psw: 'ffd232a', mar_name: 'QQ咩咩', mar_status: 1 },
                    { mar_no: 2, mar_id: 'vjrres42', mar_psw: 'ffd232a', mar_name: 'QQ咩咩', mar_status: 1 },
                ],
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
            get_mar: async function () {
                const res = await fetch('XML_JSON_CSV/bookData.json', {
                    // mode: 'cors',
                    // cache: 'no-cache',
                    // headers: { 'Content-Type': 'application/json; charset=utf-8' },
                    // method: 'post',
                    // headers: { 'Content-Type': 'application/json' },
                }).then(function (res) {
                    console.log('res', res.json())
                    return res.json()
                })
            },
        },
        created() {
            this.get_mar()
        },
    })
    //-----------------------------------------------------

    //會員帳號管理 -- 組件
    Vue.component('member', {
        data() {
            return {
                //切換Tag
                // show: 'show',
                //撈出來的 會員資料
                members: [
                    {
                        mem_no: 1,
                        mem_id: '213dss',
                        mem_psw: '2112ija',
                        mem_name: '安安你好',
                        mem_status: 1,
                        mem_email: 'a88688547@gmail.com',
                        mem_phone: '0963328003',
                    },
                    {
                        mem_no: 1,
                        mem_id: '213dss',
                        mem_psw: '2112ija',
                        mem_name: '安安你好',
                        mem_status: 1,
                        mem_email: 'a88688547@gmail.com',
                        mem_phone: '0963328003',
                    },
                    {
                        mem_no: 1,
                        mem_id: '213dss',
                        mem_psw: '2112ija',
                        mem_name: '安安你好',
                        mem_status: 1,
                        mem_email: 'a88688547@gmail.com',
                        mem_phone: '0963328003',
                    },
                    {
                        mem_no: 1,
                        mem_id: '213dss',
                        mem_psw: '2112ija',
                        mem_name: '安安你好',
                        mem_status: 1,
                        mem_email: 'a88688547@gmail.com',
                        mem_phone: '0963328003',
                    },
                    {
                        mem_no: 1,
                        mem_id: '213dss',
                        mem_psw: '2112ija',
                        mem_name: '安安你好',
                        mem_status: 1,
                        mem_email: 'a88688547@gmail.com',
                        mem_phone: '0963328003',
                    },
                    {
                        mem_no: 1,
                        mem_id: '213dss',
                        mem_psw: '2112ija',
                        mem_name: '安安你好',
                        mem_status: 1,
                        mem_email: 'a88688547@gmail.com',
                        mem_phone: '0963328003',
                    },
                ],
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
        methods: {},
    })
    //-----------------------------------------------------

    //商品管理 -- 組件
    Vue.component('drink', {
        data() {
            return {
                //切換Tag
                // show: 'show',
                drinkno: 0,
                //撈出來的 會員資料
                drinks: [
                    {
                        drink_no: 1,
                        drink_title_ch: 'QQ咩咩',
                        drink_type: '奶類',
                        drink_status: 1,
                        drink_big_price: '60',
                        drink_small_price: '50',
                    },
                    {
                        drink_no: 2,
                        drink_title_ch: '阿屋',
                        drink_type: '奶類',
                        drink_status: 1,
                        drink_big_price: '60',
                        drink_small_price: '50',
                    },
                    {
                        drink_no: 3,
                        drink_title_ch: '基八',
                        drink_type: '奶類',
                        drink_status: 1,
                        drink_big_price: '60',
                        drink_small_price: '50',
                    },
                    {
                        drink_no: 4,
                        drink_title_ch: '你好',
                        drink_type: '奶類',
                        drink_status: 1,
                        drink_big_price: '60',
                        drink_small_price: '50',
                    },
                    {
                        drink_no: 5,
                        drink_title_ch: '安安',
                        drink_type: '奶類',
                        drink_status: 1,
                        drink_big_price: '60',
                        drink_small_price: '50',
                    },
                    {
                        drink_no: 6,
                        drink_title_ch: '幾歲',
                        drink_type: '奶類',
                        drink_status: 1,
                        drink_big_price: '60',
                        drink_small_price: '50',
                    },
                ],
            }
        },
        props: ['show'],

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
                            <div>{{value.drink_type}}</div>
                            <div>{{value.drink_big_price}}</div>
                            <div>{{value.drink_small_price}}</div>
                            <div class="toggle">
                                <input checked type="checkbox" :id="key" />
                                <label :for="key"></label>
                            </div>
                            <div class="edit_btn" @click="drinkno = value.drink_no" @click="changeTag" @click="changedrinkno">編輯</div>
                        </div>
                    </div>
                  </section>`,
        methods: {
            //切換至 編輯商品頁面
            changeTag() {
                //獲取被點擊的 ID值
                this.show = 'drink_edit'
                //傳送至上層 (new Vue)
                this.$emit('change', this.show)
            },
            //傳送點擊飲料編號
            changedrinkno() {
                this.$emit('changedrinkno', this.drinkno)
                console.log('changedrinkno', this.drinkno)
            },
            //切換至 新增商品頁面
            additem() {
                this.show = 'drink_add'
                //傳送至上層 (new Vue)
                this.$emit('change', this.show)
            },
        },
    })
    //-----------------------------------------------------

    //---  編輯商品 -- 組件
    Vue.component('drink_edit', {
        data() {
            return {
                //切換Tag
                // show: 'show',
                drinkno: 'drinkno',
                //撈出來的 會員資料
                drinks: [
                    {
                        drink_no: 1,
                        drink_title_ch: 'QQ咩咩',
                        drink_type: '奶類',
                        drink_status: 1,
                        drink_big_price: '60',
                        drink_small_price: '50',
                        drink_img: 'http://fakeimg.pl/600x400',
                    },
                    {
                        drink_no: 2,
                        drink_title_ch: '阿屋',
                        drink_type: '奶類',
                        drink_status: 1,
                        drink_big_price: '60',
                        drink_small_price: '50',
                        drink_img: 'http://fakeimg.pl/200x400',
                    },
                    {
                        drink_no: 3,
                        drink_title_ch: '基八',
                        drink_type: '奶類',
                        drink_status: 1,
                        drink_big_price: '60',
                        drink_small_price: '50',
                        drink_img: 'http://fakeimg.pl/430x220',
                    },
                    {
                        drink_no: 4,
                        drink_title_ch: '你好',
                        drink_type: '奶類',
                        drink_status: 1,
                        drink_big_price: '60',
                        drink_small_price: '50',
                        drink_img: 'http://fakeimg.pl/230x140',
                    },
                    {
                        drink_no: 5,
                        drink_title_ch: '安安',
                        drink_type: '奶類',
                        drink_status: 1,
                        drink_big_price: '60',
                        drink_small_price: '50',
                        drink_img: 'http://fakeimg.pl/500x500',
                    },
                    {
                        drink_no: 6,
                        drink_title_ch: '幾歲',
                        drink_type: '奶類',
                        drink_status: 1,
                        drink_big_price: '60',
                        drink_small_price: '50',
                        drink_img: 'http://fakeimg.pl/300x450',
                    },
                ],
            }
        },
        props: ['show', 'drinkno'],

        template: `
                  <section v-if=" show === 'drink_edit' ">
                    <h1 class="title">商品編輯 -- {{drinks[drinkno - 1].drink_title_ch}}</h1>
                    <div class="return_btn_box"><div class="return_btn" @click="changeTag">返回商品列表</div></div>
                    <form class="drink_edit_box">
                      <div>
                        <div class="drink_edit_row">
                            <label>飲料編號</label>
                            <div>{{drinks[drinkno - 1].drink_no}}</div>
                        </div>
                        <div class="drink_edit_row">
                            <label for="name_ch">飲料名稱</label>
                            <input type="text" id="name_ch" :value="drinks[drinkno - 1].drink_title_ch" />
                        </div>
                        <div class="drink_edit_row">
                            <label for="type">飲料類別</label>
                            <input type="text" id="type" :value="drinks[drinkno - 1].drink_type" />
                        </div>
                        <div class="drink_edit_row">
                            <label for="big_price">大杯金額</label>
                            <input type="text" id="big_price" :value="drinks[drinkno - 1].drink_big_price" />
                        </div>
                        <div class="drink_edit_row">
                            <label for="small_price">小杯金額</label>
                            <input type="text" id="small_price" :value="drinks[drinkno - 1].drink_small_price" />
                        </div>
                      </div>
                      <div class="addinfo_right_box">
                        <div>
                          <label for="upFile">上傳飲料照片</label>
                          <input type="file" id="upFile" name="upFile" @change="changeimg($event)"/><br />
                        </div>
                        <div class="upFile_img_box">
                          <img :src="drinks[drinkno - 1].drink_img" alt="請上傳飲料照片" id="image" />
                        </div>
                      </div>
                      <button class="drink_edit_btn">確認修改</button>
                    </form>
                  </section>`,
        methods: {
            changeTag() {
                this.show = 'drink'
                //傳送至上層 (new Vue)
                this.$emit('change', this.show)
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
                        <div class="drink_edit_row">
                            <label for="note">飲料敘述</label>
                            <textarea name="note" id="note" cols="30" rows="10" style=" resize : none;"></textarea>
                        </div>
                      </div>
                      <div class="addinfo_right_box">
                        <div>
                          <label for="upFile">上傳飲料照片</label>
                          <input type="file" id="upFile" name="upFile" @change="changeimg($event)"/><br />
                        </div>
                        <div class="upFile_img_box">
                          <img src="http://fakeimg.pl/600x400" alt="請上傳飲料照片" id="image" />
                        </div>
                      </div>
                      <button class="drink_add_btn">新增商品</button>
                    </form>
                  </section>`,
        methods: {
            changeTag_drink() {
                this.show = 'drink'
                //傳送至上層 (new Vue)
                this.$emit('change', this.show)
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

    //New Vue
    new Vue({
        el: '#app',
        data: {
            show: 'manager',
            drinkno: 0,
        },
        methods: {
            //接受到 下層傳遞的值 變更data值
            changeTag(show) {
                this.show = show
            },
            changedrinkno(drinkno) {
                this.drinkno = drinkno
            },
        },
        components: {},
    })
    //--------------------------------------------
})
