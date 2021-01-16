var tl = new TimelineMax({
    onComplete: size,
})

tl.add([a, b, c, d])
function size() {
    TweenMax.to('.light1', 2, {
        scale: 1.2,
        repeat: -1,
        yoyo: true,
    })

    TweenMax.to('.light2', 2.2, {
        scale: 0.7,
        repeat: -1,
        yoyo: true,
    })

    TweenMax.to('.light3', 1.6, {
        scale: 1.4,
        repeat: -1,
        yoyo: true,
    })

    TweenMax.to('.light4', 1.4, {
        scale: 0.8,
        repeat: -1,
        yoyo: true,
    })

}
