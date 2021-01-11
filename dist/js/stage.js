var tl = new TimelineMax({
    onComplete: updown
});

// var a = TweenMax.to(".f_orange", 2, { scale: 1, rotation: 360, ease: "circ.out" });


tl.add([a, b, c, d, e, f, g, i, j, k, l, m, n, o, p, q]);
function updown() {
    TweenMax.to('.f_orange', 2, {
        y: '+=20',
        repeat: -1,
        yoyo: true,

    })
    TweenMax.to('.f_banana', 1.6, {
        y: '+=20',
        repeat: -1,
        yoyo: true,

    })
    TweenMax.to('.f_greenapple', 1.8, {
        y: '+=20',
        repeat: -1,
        yoyo: true,

    })
    TweenMax.to('.f_apple', 2.2, {
        y: '+=20',
        repeat: -1,
        yoyo: true,

    })
    TweenMax.to('.f_pear', 2.4, {
        y: '+=20',
        repeat: -1,
        yoyo: true,

    })
    TweenMax.to('.f_halforange', 2.1, {
        y: '+=20',
        repeat: -1,
        yoyo: true,

    })
    TweenMax.to('.f_waxapple', 1.7, {
        y: '+=20',
        repeat: -1,
        yoyo: true,

    })
    TweenMax.to('.f_halfapple', 2.7, {
        y: '+=20',
        repeat: -1,
        yoyo: true,

    })
    TweenMax.to('.planet', 1, {
        y: '+=20',
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"

    })

    TweenMax.to('.lightspot', 1.2, {
        scale: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",

    })



}