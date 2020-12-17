new Vue({ 
   el: '#header',
  data: {

  },
  components: {
     'my-header': {
       template: `<nav>
                <img class="logo" src="./Images/logo-header.svg" alt="" />

                <div class="nav_list">
                    <ul>
                        <li><img src="./Images/drop-header.svg" alt="" />菜單</li>
                        <li><img src="./Images/drop-header.svg" alt="" />揪團喝</li>
                        <li><img src="./Images/drop-header.svg" alt="" />飲品排名</li>
                        <li><img src="./Images/drop-header.svg" alt="" />分享區</li>
                        <li><img src="./Images/drop-header.svg" alt="" />小遊戲</li>
                        <li><img src="./Images/drop-header.svg" alt="" />關於揪飲</li>
                    </ul>
                    <img class="user_logo" src="./Images/login.svg" alt="" />
                </div>
            </nav>`,
       },
      },

   })
