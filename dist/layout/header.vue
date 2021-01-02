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
                <a href="./index.html" class="logo_img"><img class="logo" src="./Images/logo-header.svg" alt="" /></a>

                <div class="nav_list" id="header_nav">
                    <ul>
                        <a href="./menu_self.html"><img src="./Images/drop-header.svg" alt="" />菜單</a>
                        <a href="./join_list.html"><img src="./Images/drop-header.svg" alt="" />揪團喝</a>
                        <a href="./vote.html"><img src="./Images/drop-header.svg" alt="" />飲品排名</a>
                        <a href="./share_list.html"><img src="./Images/drop-header.svg" alt="" />分享區</a>
                        <a href="./custom.html"><img src="./Images/drop-header.svg" alt="" />小遊戲</a>
                        <a href=""><img src="./Images/drop-header.svg" alt="" />關於揪飲</a>
                    </ul>
                    <a  class="user_logo_img_web"
                        ><img class="user_logo" src="./Images/login.svg" alt=""
                    /></a>
                </div>
                <a  class="user_logo_img_phone"
                    ><img class="user_logo" src="./Images/login.svg" alt=""
                /></a>

                <div class="lightbox-container">
                    <div class="lightbox-wrap">
                        <div class="lightbox-top">
                            <div class="tab tabbackgroud">
                                <h3 class="h3 textcolor">登入</h3>
                            </div>
                            <div class="tab">
                                <h3 class="h3">註冊</h3>
                            </div>
                            <div class="close">
                                <i class="fas fa-times-circle closeBlock"></i>
                                <i class="far fa-times-circle"></i>
                            </div>
                        </div>
                        <form class="lightbox-bot" action="">
                            <div class="login tabBody tabBodyNone">
                                <div class="login-email">
                                    <label for="login-email">信箱</label>
                                    <input type="email" id="login-email" />
                                </div>
                                <div class="login-password">
                                    <label for="password">密碼</label>
                                    <input type="password" id="login-password" />
                                </div>
                            </div>
                            <div class="sign-up tabBody">
                                <div class="name">
                                    <label for="name">姓名</label>
                                    <input type="text" id="name" required />
                                </div>
                                <div class="email">
                                    <label for="email">信箱</label>
                                    <input type="email" id="email" required />
                                </div>
                                <div class="password">
                                    <label for="sign-password">密碼</label>
                                    <input type="password" id="sign-password" required />
                                </div>
                                <div class="password_two">
                                    <label for="password_two">確認密碼</label>
                                    <input type="password" id="password_two" required />
                                </div>
                                <div class="phone">
                                    <label for="phone">手機號碼</label>
                                    <input type="tel" id="phone" required />
                                </div>
                            </div>
                            <div class="sure-cancel">
                                <button type="reset">清除</button>
                                <button type="submit" id="sub">確認</button>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
            `,
       },
      },

   })
