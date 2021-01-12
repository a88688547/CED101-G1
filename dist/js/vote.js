const vm = new Vue();
Vue.component("vote-item", {
    data() {
        return {
            texts: ["一", "二", "三"],
            drinks: [],
        };
    },
    methods: {
        lightBoxToggle(id, index) {
            vm.$emit("lightBoxToggle", id, index);
        },
        fetchData() {
            fetch("./php/menu2.php", {
                method: "GET",
            })
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    this.drinks = res;
                    // console.log(this.drinks);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    mounted() {
        this.fetchData();
        vm.$on("votedSus", this.fetchData);
    },
    computed: {},
    template: `
                <div class="vote-bot" >
                    <div class="vote-wrap" v-for="(voteType, i) in drinks">
                        <div class="vote-title">
                            <h3>{{voteType.drink_type_title}}&nbsp;<span>{{voteType.drink_type_text_en}}</span></h3>
                        </div>
                        <div v-for="(item,index) in voteType.itemList" :class="[index===0?'vote-first':'vote-second', 'vote-item']">
                            <div class="vote-rank">本周第{{texts[index]}}</div>
                            <div class="vote-pic">
                                <img :src="item.imgSrc" />
                            </div>
                            <div class="vote-txt">
                                <div class="vote-name">{{item.drink_title_ch}}</div>
                                <div class="vote-votes">
                                    <img src="./Images/vote_big.svg" alt="votes" />
                                    總票數 |
                                    <div class="votes">{{item.vote_count_now}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="vote-button">
                        <button class="voteLightboxBtn color-1" @click="lightBoxToggle(voteType.drink_type_no,i)">
                            <img src="./Images/drink.svg" alt="" />
                            <h6>投票去</h6>
                        </button>
                    </div>
                    </div>
                </div>
                `,
});
Vue.component("vote-form", {
    data() {
        return {
            showVote: false,
            type: "vote",
            textId: ["milkTea", "milkTea1", "milkTea2", "milkTea3", "milkTea4"],
            dirnkVote: [],
            votenow: false,
            checkRadio: "",
            drinkIndex: "",
            nowVote: "",
            nowVoteCount: "",
            activeIndex: -1,
            voted: [false, false, false],
            votedValue: [null, null, null],
            votedName: ["", "", ""],
            selected: false,
            textIndex: "",
        };
    },
    mounted() {
        vm.$on("lightBoxToggle", this.toggleLightBox);
    },
    methods: {
        toggleLightBox(id, index) {
            if (this.voted[index]) {
                this.type = "voteok";
            }
            this.showVote = true;
            this.drinkIndex = index;
            fetch("./php/menu1.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    // console.log(res);
                    this.dirnkVote = res;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        votingHandler(e) {
            e.preventDefault();
            if (this.activeIndex === -1) {
                return (this.$refs.alertvote.innerText = "請投票!!");
            }
            fetch("./php/menu3.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    vote_count_now: this.dirnkVote[this.activeIndex].vote_count_now,
                    drink_no: this.dirnkVote[this.activeIndex].drink_no,
                }),
            })
                .then((res) => {
                    this.voted[this.drinkIndex] = true;
                    this.votedValue[this.drinkIndex] = this.dirnkVote[
                        this.activeIndex
                    ].vote_count_now;
                    this.votedName[this.drinkIndex] = this.dirnkVote[
                        this.activeIndex
                    ].drink_title_ch;
                    this.type = "voteok";
                    vm.$emit("votedSus");
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        closeLightbox(val) {
            this.activeIndex = -1;
            this.type = "vote";
            this.showVote = false;
            if (val === this.selected) {
                this.selected;
            } else {
                this.selected = val;
            }
        },

        nowVoteName(index, textIdIndex) {
            if (this.activeIndex !== -1) {
                this.dirnkVote[this.activeIndex].vote_count_now--;
            }
            this.activeIndex = index;
            this.dirnkVote[this.activeIndex].vote_count_now++;
            if (this.activeIndex !== -1) {
                return (this.$refs.alertvote.innerText = "");
            }
            this.textIndex = textIdIndex;
        },
    },
    template: `
                        <form class="voteLightbox-wrap" v-show="showVote" >
                            <div class="voting">
                                <div class="pic"></div>
                                <div class="voting-txt" v-if="type=='vote'">
                                    <div class="voting-title">
                                        <h2>本周茶類飲品票選</h2>
                                        <small>點選您最喜歡的茶類飲品並送出投票</small>
                                    </div>
                                    <div class="voting-btn">
                                        <div v-for="(item,index) in dirnkVote">
                                            <input
                                                type="radio"
                                                name="milkTea"
                                                class="milkTea"
                                                :id="textId[index]"
                                                :checked="selected===textId[index]"
                                                @click.stop="nowVoteName(index,textId[index])"
                                            />
                                            <label :for="textId[index]" class="vote-radio" >
                                                <div class="radiobtn"></div>
                                                <div class="btn-txt">{{item.drink_title_ch}}</div>
                                                <small>{{item.vote_count_now}}</small>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="vote-sub">
                                        <button type="submit" class="submit color-1" @click="votingHandler">
                                            送出投票
                                            <small id="alertvote" ref="alertvote"></small>
                                        </button>
                                    </div>
                                </div>
                                <div class="voting-ok" v-if="type =='voteok'">
                                    <h2>投票成功</h2>
                                    <p>你最愛的<small>"{{this.votedName[this.drinkIndex]}}"</small>本週目前票數為:</p>
                                    <div class="vote-count">
                                        <img src="./Images/vote_big.svg" alt="votes" />
                                        {{this.votedValue[this.drinkIndex]}}票
                                    </div>
                                </div>
                                <div class="vote-close" @click="closeLightbox(this.textIndex)">
                                    <i class="fas fa-times-circle closeBlock"></i>
                                </div>
                            </div>
                        </form>
                `,
});
new Vue({
    el: "#app",
});
