Vue.component('game', {
    data() {
        return {
            members: "",
        }
    },
    methods: {
        gerMemberInfo(data) {
            this.members = data;
        },
    },
    mounted() {
        member.$on("memberInfo", this.gerMemberInfo);
    },
    template: `
    <div>
        <main>
            <div class="title">
                <h3><a href="./custom.html"><i class="fas fa-arrow-circle-left"></i>回到客製化</a></h3>
                <h2><i class="fas fa-gamepad"></i>接珍珠小遊戲</h2>
            </div>
            <div id="animation_container" style="
                        background-color: rgba(255, 255, 255, 1);
                        width: 960px;
                        height: 600px;
                    ">
                <div class="playBtn">START</div>
                <h2 id="score"><i class="fas fa-star"></i>0</h2>
                <div class="hp">
                    <h2>Hp</h2>
                    <div class="hpbox">
                        <div class="hpbar"></div>
                    </div>
                </div>
                <canvas id="canvas" width="960" height="600" style="
                            position: absolute;
                            display: block;
                            background-color: rgba(255, 255, 255, 1);
                        "></canvas>
                <div id="dom_overlay_container" style="
                            pointer-events: none;
                            overflow: hidden;
                            width: 960px;
                            height: 600px;
                            position: absolute;
                            left: 0px;
                            top: 0px;
                            display: block;
                        "></div>
            </div>
        </main>
        <div class="lightbox">
            <div class="lightbox-wrap">
                <div class="game-close">
                    <img src="./Images/cancel.svg" alt="cancel" />
                </div>
                <h2>遊戲結束</h2>
                <p>總得分:<small id="totalscore">0</small>/300</p>
                <p id="getcoupon">獲得:珍珠兌換券一張
                <p id="coupon"></p>
                </p>
                <div class="buttons">
                    <button id="again">再玩一次</button>
                    <button>
                        <a href="./member.html">查看優惠券</a>
                    </button>
                </div>
            </div>
        </div>
    </div>
    `
});
new Vue({
    el: "#app",
});