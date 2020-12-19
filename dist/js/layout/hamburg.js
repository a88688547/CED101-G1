$(document).ready(function () {
    // 漢堡圖示 點擊時 切換Class 名稱
    // 以及 選單向下滑出
    $('.hamburg_btn').click(function () {
        $(this).toggleClass('btn-on')
        $('#header_nav').slideToggle(300)
    })
})
