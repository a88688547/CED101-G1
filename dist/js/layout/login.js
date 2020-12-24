$(document).ready(function () {
    //點擊 觸發 登入燈箱
    $('.user_logo_img_web').click(function () {
        $('.lightbox-container').css({
            display: 'flex',
        })
    })
    $('.user_logo_img_phone').click(function () {
        $('.lightbox-container').css({
            display: 'flex',
        })
    })

    let lightbox = document.querySelector('.lightbox-container')
    let loginBtn = document.querySelector('.user_logo_img_web')
    let loginBtn_1 = document.querySelector('.user_logo_img_phone')
    let close = document.querySelector('.close')
    let Tabs = document.querySelectorAll('.tab')
    let tabTexts = document.querySelectorAll('h3')
    let tabBodys = document.querySelectorAll('.tabBody')
    let closeIcons = document.querySelectorAll('.fa-times-circle')
    let phone = document.querySelector('#phone')

    function lightBox() {
        lightbox.style.display = 'flex'
    }
    loginBtn.addEventListener('click', lightBox)
    loginBtn_1.addEventListener('click', lightBox)

    close.addEventListener('click', function () {
        lightbox.style.display = 'none'
    })
    let activeindex = 0
    for (let i = 0; i < Tabs.length; i++) {
        Tabs[i].addEventListener('click', function () {
            Tabs[activeindex].classList.remove('tabbackgroud')
            tabBodys[activeindex].classList.remove('tabBodyNone')
            tabTexts[activeindex].classList.remove('textcolor')
            closeIcons[activeindex].classList.remove('closeBlock')

            activeindex = i
            Tabs[activeindex].classList.add('tabbackgroud')
            tabBodys[activeindex].classList.add('tabBodyNone')
            tabTexts[activeindex].classList.add('textcolor')
            closeIcons[activeindex].classList.add('closeBlock')
        })
    }

    function phoneNum(e) {
        if (isNaN(e.target.value)) {
            e.target.value = ''
        }
    }
    phone.addEventListener('input', phoneNum)
})
