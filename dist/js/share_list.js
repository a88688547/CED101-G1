window.addEventListener('load', function () {
    // 點擊文章 開啟 文章詳情
    $('.article_item').click(function () {
        $('.article_box').css({
            display: 'block',
        })
        console.log('0 0 ')
    })

    $('.s2_hotitem_box').click(function () {
        $('.article_box').css({
            display: 'block',
        })
        console.log('0 0 ')
    })

    //  文章詳情 內的 叉叉 關閉文章詳情
    $('#close_btn').click(function () {
        $('.article_box').css({
            display: 'none',
        })
        console.log('111')
    })

    //  點擊 發表新文章 按紐 開啟 頁面
    $('.write_article_btn').click(function () {
        $('.new_article').css({
            display: 'block',
        })
    })

    //  點擊 發表文章 內的叉叉 按鈕 關閉頁面

    $('.close_img').click(function () {
        $('.new_article').css({
            display: 'none',
        })
    })

    // 點擊 發表文章 內的 發送 ，建立新的文章
    $('.sendform_btn').click(function () {
        //代更新
    })
})
