window.addEventListener('load', function () {
    let drink_add_btns = document.querySelectorAll('.drink_item')
    let light_box_wrapper = document.getElementById('light_box_wrapper')
    for (let i = 0; i < drink_add_btns.length; i++) {
        drink_add_btns[i].addEventListener('click', function () {
            light_box_wrapper.style.display = 'block'
            console.log('a')
        }

        )
    }

    let cacel_shop_btn = document.getElementById('cancel_shop_btn')
    cacel_shop_btn.addEventListener('click', function () {
        light_box_wrapper.style.display = 'none'
    }

    )
}
) 