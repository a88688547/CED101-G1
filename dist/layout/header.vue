new Vue({ 
   el: '#header',
  data: {

  },
  components: {
     'my-header': {
       template: `
            <nav>
                <button class="hamburg_btn">
                    <div class="hamburg_line line_1"></div>
                    <div class="hamburg_line line_2"></div>
                    <div class="hamburg_line line_3"></div>
                </button>
                <a href="#" class="logo_img"><img class="logo" src="./Images/logo-header.svg" alt="" /></a>

                <div class="nav_list" id="header_nav">
                    <ul>
                        <a href="#"><img src="./Images/drop-header.svg" alt="" />菜單</a>
                        <a href="#"><img src="./Images/drop-header.svg" alt="" />揪團喝</a>
                        <a href="#"><img src="./Images/drop-header.svg" alt="" />飲品排名</a>
                        <a href="#"><img src="./Images/drop-header.svg" alt="" />分享區</a>
                        <a href="#"><img src="./Images/drop-header.svg" alt="" />小遊戲</a>
                        <a href="#"><img src="./Images/drop-header.svg" alt="" />關於揪飲</a>
                    </ul>
                    <a href="#" class="user_logo_img_web"><img class="user_logo" src="./Images/login.svg" alt="" /></a>
                </div>
                <a href="#" class="user_logo_img_phone"><img class="user_logo" src="./Images/login.svg" alt="" /></a>
                <div class="lightbox-container">
                    <div class="lightbox-wrap">
                        <div class="lightbox-top">
                            <div class="sign-up-tab">
                                <h3>註冊</h3>
                            </div>
                            <div class="login-tab">
                                <h3>登入</h3>
                            </div>
                            <div class="close">
                                <i class="fas fa-times-circle"></i>
                                <!-- <i class="far fa-times-circle"></i> -->
                            </div>
                        </div>
                        <div class="lightbox-bot">
                            <div class="sign-up">
                                <div class="name">
                                    <label for="name">姓名</label>
                                    <input type="text" id="name" />
                                </div>
                                <div class="email">
                                    <label for="email">信箱</label>
                                    <input type="email" id="email" />
                                </div>
                                <div class="password">
                                    <label for="password">密碼</label>
                                    <input type="password" id="password" />
                                </div>
                                <div class="password_two">
                                    <label for="password_two">確認密碼</label>
                                    <input type="password" id="password_two" />
                                </div>
                                <div class="phone">
                                    <label for="phone">手機號碼</label>
                                    <input type="number" id="phone" />
                                </div>
                                <div class="sure-cancel">
                                    <button>取消</button>
                                    <button>確認</button>
                                </div>
                            </div>
                            <div class="login">
                                <div class="login-email">
                                    <label for="login-email">信箱</label>
                                    <input type="email" id="login-email" />
                                </div>
                                <div class="login-password">
                                    <label for="login_password">密碼</label>
                                    <input type="login_password" id="login_password" />
                                </div>
                                <div class="sure-cancel">
                                    <button>取消</button>
                                    <button>確認</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>`,
       },
      },

   })
