Vue.component('hot_article', {
    template: `
    <section class="section_4">
    <div class="s2_title">
        <img src="./Images/hot.svg" alt="" />
        <div>熱門文章</div>
    </div>

    <div class="article_item">
        <div class="article_img"><img src="./Images/article/share_list/articlebar_2.png" alt="" /></div>
        <div class="article_right">
            <div class="article_time">2020/12/16 19:00</div>
            <div class="article_info">
                <div class="article_info_left">
                    <div class="article_memimg"><img src="./Images/user_big.svg" /></div>
                    <div class="article_memname">Yu Lee</div>
                </div>

            </div>
            <div class="article_count">
                <div>
                    <div class="article_icon"><img src="./Images/eyes_big.svg" /></div>
                    <span class="article_num">120</span>
                </div>
                <div>
                    <div class="article_icon"><img src="./Images/message_big.svg" /></div>
                    <span class="article_num">3</span>
                </div>
                <div>
                    <div class="article_icon"><img src="./Images/like_big.svg" /></div>
                    <span class="article_num">100</span>
                </div>
            </div>
            <div class="article_detail">
                <div class="article_title">QQㄋㄟㄋㄟ好喝到咩噗茶</div>
            </div>
            <div class="article_text">
                一大杯才50個人覺得蠻划算的，自己有喝過泰國的道地泰奶，雖然香濃好喝，不過到最後真的會很膩，這家的我覺得很符合歹丸郎的胃口，喝起來剛剛好！
            </div>
        </div>
    </div>
</section>
    `,
})


new Vue({
    el: ".body_box"
})
