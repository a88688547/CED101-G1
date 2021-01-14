Vue.component('my-footer', {
    data() {
        return {
            data: '',
        }
    },
    template: `
        <nav>
            <a href="./index.html"><img class="logo" src="./Images/footer_logo.svg" alt="" /></a>
            <div class="nav_list_block">
                <div class="nav_list">
                    <ul>
                        <li><a href="./menu.html">菜單</a></li>
                        <li><a href="./join_list.html">揪團喝</a></li>
                        <li><a href="./vote.html">飲品排名</a></li>
                        <li><a href="./share_list.html">分享區</a></li>
                        <li><a href="./custom.html">小遊戲</a></li>
                        <li><a href="#">關於揪飲</a></li>
                    </ul>
                </div>
            </div>
            <div class="icon">
                <a href="#"><img src="./Images/fb.svg" alt="" /></a>
                <a href="#"><img src="./Images/email.svg" alt="" /></a>
            </div>
            <p class="footer_cmp">Copyright © Join drink inc.</p>
        </nav>
    `,
})
