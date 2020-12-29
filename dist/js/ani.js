var tl = new TimelineMax({
    onComplete: updown
});

var a = TweenMax.to(".cheersleft", 0.8, { x: "320px", y: "-30px", rotation: 20, ease: "circ.out" });
var b = TweenMax.to(".cheersleft", 0.1, { opacity: 0, delay: 0.8 });
var c = TweenMax.to(".cheersright", 0.8, { x: "-320px", y: "-50px", rotation: -20, ease: "circ.out" });
var d = TweenMax.to(".cheersright", 0.1, { opacity: 0, delay: 0.8 });
var e = TweenMax.to(".box_top", 1, { height: 0, borderRadius: "0, 0, 50%, 50%", ease: "circ.out", delay: 0.8 });
var f = TweenMax.to(".blacktea", 1.5, { x: "-100px", y: "50px", width: "600px", ease: "circ.out", delay: 0.8 });
var g = TweenMax.to(".bubble", 1.5, { x: "250px", y: "200px", width: "850px", ease: "circ.out", delay: 0.8 });
var h = TweenMax.to(".juice", 1.5, { opacity: 1, y: 0, delay: 1.3 });
var i = TweenMax.to(".orange", 1, { scale: 1, x: "-680px", y: "10px", ease: "circ.out", delay: 1 }, { translateY: "80px", repeat: -1, yoyo: true, delay: 4.5 });
// TweenMax.to(".orange", 2, { Y: "80px", ease: "back.out(1.7)", delay: 2.5, repeat: -1, yoyo: true });
var j = TweenMax.to(".sliced_orange", 1, { scale: 1, x: "250px", y: "220px", ease: "circ.out", delay: 1 });
// TweenMax.to(".sliced_orange", 2, { Y: "80px", ease: "back.out(1.7)", delay: 2.5, repeat: -1, yoyo: true });
var k = TweenMax.to(".strawberry", 1, { scale: 1, x: "-250px", y: "-80px", ease: "circ.out", delay: 1 });
// TweenMax.to(".strawberry", 2, { Y: "80px", ease: "back.out(1.7)", delay: 2.5, repeat: -1, yoyo: true });
var l = TweenMax.to(".sliced_strawberry", 1, { scale: 1, x: "100px", y: "-20px", ease: "circ.out", delay: 1 });
var m = TweenMax.to(".sliced_lemon", 1, { scale: 1, x: "-100px", y: "350px", ease: "circ.out", delay: 1 });
var n = TweenMax.to(".leaf1", 1, { scale: 1, x: "350px", y: "350px", ease: "circ.out", delay: 1 });
var o = TweenMax.to(".leaf2", 1, { scale: 1, x: "-450px", y: "300px", ease: "circ.out", delay: 1 });
var p = TweenMax.to(".leaf3", 1, { scale: 1, x: "-620px", y: "-180px", ease: "circ.out", delay: 1 });
var q = TweenMax.to(".leaf4", 1, { scale: 1, x: "850px", y: "-30px", ease: "circ.out", delay: 1 });
// TweenMax.to(".orange", 2, { y: "80px", ease: "back.out(1.7)", delay: 0.5, repeat: -1, yoyo: true, delay: 2.2 });
// TweenMax.to(".sliced_orange", 2, { y: "20px", ease: "back.out(1.7)", delay: 0.5, repeat: -1, yoyo: true, delay: 2.2 });
var r = TweenMax.to(".content", 1.5, { x: "350px", y: "80px", ease: "power2.in", delay: 0.8 });

tl.add([a, b, c, d, e, f, g, i, j, k, l, m, n, o, p, q]);
function updown() {
    TweenMax.to('.orange', 2, {
        y: '+=30',
        repeat: -1,
        yoyo: true,

    })
    TweenMax.to('.sliced_orange', 1.6, {
        y: '+=30',
        repeat: -1,
        yoyo: true,

    })
    TweenMax.to('.strawberry', 1.8, {
        y: '+=30',
        repeat: -1,
        yoyo: true,

    })
    TweenMax.to('.sliced_strawberry', 2.2, {
        y: '+=30',
        repeat: -1,
        yoyo: true,

    })
    TweenMax.to('.sliced_lemon', 2.4, {
        y: '+=30',
        repeat: -1,
        yoyo: true,

    })
    TweenMax.to('.leaf1', 2.1, {
        y: '+=30',
        repeat: -1,
        yoyo: true,

    })
    TweenMax.to('.leaf2', 1.7, {
        y: '+=30',
        repeat: -1,
        yoyo: true,

    })
    TweenMax.to('.leaf3', 2.7, {
        y: '+=30',
        repeat: -1,
        yoyo: true,

    })
    TweenMax.to('.leaf4', 2.9, {
        y: '+=30',
        repeat: -1,
        yoyo: true,

    })



}