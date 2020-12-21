$(document).ready(function () {
    // 點擊 分頁TAG
    $('.tag_big>li').click(function () {
        // 點擊 分頁TAG 切換 內容
        $('section').each(function () {
            $(this).css({
                display: 'none',
            })
        })

        let id = $(this).attr('id')
        $(`.${id}`).css({
            display: 'block',
        })
        // 點擊 分頁TAG 切換 透明度
        $('.tag_big>li').each(function () {
            $(this).css({
                opacity: 0.6,
            })
        })
        $(this).css({
            opacity: 1,
        })
    })
    // 點擊 揪團類別 按鈕
    $('.type_box>div').click(function () {
        //切換 按鈕圖示
        $('.type_box>div').each(function () {
            $(this).css({
                backgroundColor: '#fff',
                color: '#B3925B',
            })
        })
        $(this).css({
            color: '#fff',
            backgroundColor: '#B3925B',
        })
        //切換 顯示揪團類型
        $('.order_list_box>div').each(function () {
            $(this).css({
                display: 'none',
            })
        })
        let id = $(this).attr('id')
        $(`.${id}`).css({
            display: 'block',
        })
    })
    // 點擊 已成團 詳情 按鈕
    $('.done_order_detail_btn').click(function () {
        // 點擊 詳情 切換 內容
        $('section').each(function () {
            $(this).css({
                display: 'none',
            })
        })

        let id = $(this).attr('id')
        $(`.${id}`).css({
            display: 'block',
        })
        console.log('00')
    })
})
