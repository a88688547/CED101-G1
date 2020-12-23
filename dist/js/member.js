$(document).ready(function () {
    // 會員專區 左邊 點擊 分頁TAG
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
                color: 'rgb(161, 161, 161)',
            })
        })
        $(this).css({
            opacity: 1,
            color: '#013B4F',
        })
    })
    // 揪團紀錄  --- 點擊 揪團類別 按鈕
    $('.group_type_box>div').click(function () {
        //切換 按鈕圖示
        $('.group_type_box>div').each(function () {
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
    // 揪團紀錄  ---  點擊 已成團 詳情 按鈕
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

    // 跟團紀錄  ---  點擊 "類別" 按鈕
    $('.follow_type_box>div').click(function () {
        //切換 按鈕圖示
        $('.follow_type_box>div').each(function () {
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
        $('.follow_order_list_box>div').each(function () {
            $(this).css({
                display: 'none',
            })
        })
        let id = $(this).attr('id')
        $(`.${id}`).css({
            display: 'block',
        })
    })

    // 跟團紀錄  --- 點擊 跟團中 "詳情" 按鈕
    $('.follow_notyet_detail_btn').click(function () {
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

    // 跟團紀錄  --- 點擊 跟團成功 "詳情" 按鈕
    $('.follow_done_detail_btn').click(function () {
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

    // 自己訂 | 訂單紀錄  ---  點擊 "類別" 按鈕
    $('.self_type_box>div').click(function () {
        //切換 按鈕圖示
        $('.self_type_box>div').each(function () {
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
        $('.self_order_list_box>div').each(function () {
            $(this).css({
                display: 'none',
            })
        })
        let id = $(this).attr('id')
        $(`.${id}`).css({
            display: 'block',
        })
    })

    // 自己訂 | 訂單紀錄  --- 點擊 未完成&已完成 "詳情" 按鈕
    $('.self_detail_btn').click(function () {
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

    // 發文紀錄 -- 點擊 叉叉 刪除按鈕
    $('.cancel_btn').click(function () {
        $(this).parent().remove()
    })
})
