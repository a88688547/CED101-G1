var tl = new TimelineMax({
    onComplete: updown,
})

var a = TweenMax.to('.logo', 0.8, { scale: 1, rotation: -360, ease: 'circ.out' })
var b = TweenMax.to('.strawberrymilkshake', 1, { opacity: 1, ease: 'circ.out', delay: 0.5 })
var c = TweenMax.to('.greentea', 0.5, { opacity: 1, ease: 'circ.out', delay: 0.5 })
var d = TweenMax.to('.bubbletea', 0.5, { opacity: 1, ease: 'circ.out', delay: 0.5 })
TweenMax.to('.l1', 1.2, {
    scale: 1.8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
})

TweenMax.to('.l2', 0.8, {
    scale: 2.4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
})

TweenMax.to('.l3', 0.6, {
    scale: 1.2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
})
TweenMax.to('.l4', 1.4, {
    scale: 2.2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
})
TweenMax.to('.l5', 1.6, {
    scale: 2.8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
})
TweenMax.to('.l6', 1.8, {
    scale: 3.2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
})
TweenMax.to('.l7', 1.2, {
    scale: 1.8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
})

tl.add([a, b, c, d])
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
        ease: 'sine.inOut',
    })

    TweenMax.to('.l1', 1.2, {
        scale: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
    })

    TweenMax.to('.l2', 0.8, {
        scale: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
    })

    TweenMax.to('.l3', 0.6, {
        scale: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
    })
    TweenMax.to('.l4', 1.4, {
        scale: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
    })
    TweenMax.to('.l5', 1.6, {
        scale: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
    })
    TweenMax.to('.l6', 1.8, {
        scale: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
    })
    TweenMax.to('.l7', 1.2, {
        scale: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
    })
}
