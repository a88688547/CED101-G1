Vue.component('my-footer', {
    data() {
        return {
            data: '',
        }
    },
    template: `
    <nav>
        <div class="footer_up">
            <a href="./homepage.html"><img class="logo" src="./Images/footer_logo.svg" alt="" /></a>
            <div class="nav_list_block">
                <div class="nav_list">
                    <ul>
                        <li><a href="./menu_self.html">菜單</a></li>
                        <li><a href="./join_list.html">揪團喝</a></li>
                        <li><a href="./vote.html">飲品排名</a></li>
                        <li><a href="./share_article.html">分享區</a></li>
                        <li><a href="./custom.html">小遊戲</a></li>
                        <li><a href="./brandStory-repair-flex.html">關於揪飲</a></li>
                    </ul>
                </div>
            </div>
            <div class="icon">
                <a href=""><img src="./Images/fb.svg" alt="" /></a>
                <a href=""><img src="./Images/email.svg" alt="" /></a>
            </div>
        </div>
        <div class="tibame footer_down">
            <p>©2021 CED101G1 Join drink inc. </p>
            <p>本網站為緯育TibaMe_前端設計工程師班第63期學員專題成果作品</p>
            <p>參考資源 :</p>
            <ul>
                <li><a href="https://order.nidin.shop/">NIDIN</a></li>
                <li><a href="https://www.ubereats.com/tw-en">Uber Eats</a></li>
                <li><a href="https://www.wootea.com/">WooTea</a></li>
                <li><a href="https://menupapa.com/">Menu爸</a></li>
                <li><a href="https://www.chume.cc/">Chume</a></li>
            </ul>
            <p><a href="https://tibamef2e.com">此</a>為緯育TibaMe提供給[Web/APP前端設計工程師養成班]學員展示作品之平台</p>
            <p>若有侵權疑慮，請私訊［TibaMe-前端設計工程師養成班］</p>
            <p><a href="https://www.facebook.com/webindex/">TibaMe-前端設計工程師養成班</a></p>

        </div>
    </nav>
    `,
})
