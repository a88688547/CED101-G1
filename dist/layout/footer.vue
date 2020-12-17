new Vue({ 
   el: '#footer',
  data: {

  },
  components: {
     'my-footer': {
       template: `
            <nav>
                <img class="logo" src="./Images/footer_logo.svg" alt="" />
                <div class="nav_list_block">
                    <div class="nav_list">
                        <ul>
                            <li>菜單</li>
                            <li>揪團喝</li>
                            <li>飲品排名</li>
                            <li>分享區</li>
                            <li>小遊戲</li>
                            <li>關於揪飲</li>
                        </ul>
                    </div>
                    <p>Copyright © Join drink inc.</p>
                </div>
                <div class="icon">
                    <img src="./Images/fb.svg" alt="" />
                    <img src="./Images/email.svg" alt="" />
                </div>
            </nav>
        `,
       },
      },

   })
