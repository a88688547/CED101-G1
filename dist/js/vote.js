// const member = new Vue();

function fomateTime(timeStr) {
    console.log(timeStr)
    return dateFns.parse(timeStr, 'YYYY-MM-DD hh:mm:ss', new Date())
}


Vue.component("vote-item", {
    data() {
        return {
            texts: ["一", "二", "三"],
            drinks: [],
        };
    },
    methods: {
        lightBoxToggle(id, index) {
            member.$emit("lightBoxToggle", id, index);
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
        member.$on("votedSus", this.fetchData);
    },
    template: `
                <div class="vote-bot" >
                    <div class="vote-wrap" v-for="(voteType, i) in drinks">
                        <div class="vote-title">
                            <h3>{{voteType.drink_type_title}}&nbsp</h3>
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
            group: "",
            textId: ["milkTea", "milkTea1", "milkTea2", "milkTea3", "milkTea4"],
            dirnkVote: [],
            votenow: false,
            drinkIndex: "",
            nowVote: "",
            nowVoteCount: "",
            activeIndex: -1,
            voted: [false, false, false],
            votedValue: [null, null, null],
            votedName: ["", "", ""],
            selected: false,
            textIndex: "",
            members: "",
            voteTime: "",
            drink_type_no: "",
            lightBoxImg: ['./Images/drinkitem_15/drinkitem_15/milktea/milktea_item-1.png',
                './Images/drinkitem_15/drinkitem_15/tea/tea_item-1.png',
                './Images/drinkitem_15/drinkitem_15/fruit/Fruit_item-3.png'
            ],
        };
    },
    mounted() {
        member.$on("lightBoxToggle", this.toggleLightBox);
        member.$on("memberInfo", this.gerMemberInfo);
    },
    methods: {
        getNowTime() {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            let strHours = date.getHours();
            let strMinutes = date.getMinutes();
            let srtSeconds = date.getSeconds();

            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            if (strHours >= 0 && strHours <= 9) {
                strHours = "0" + strHours;
            }
            if (strMinutes >= 0 && strMinutes <= 9) {
                strMinutes = "0" + strMinutes;
            }
            if (srtSeconds >= 0 && srtSeconds <= 9) {
                srtSeconds = "0" + srtSeconds;
            }

            this.voteTime = `${year}-${month}-${strDate} ${strHours}-${strMinutes}-${srtSeconds}`
        },
        gerMemberInfo(data) {
            this.members = data;
        },
        toggleLightBox(id, index) {
            this.type = 'vote'
            if (this.members === "") {
                return member.$emit("plsLogin")
            }
            if (this.voted[index]) {
                this.type = "voteok";
            }
            const groupMap = {
                1: 'milk_vote',
                2: 'tea_vote',
                3: 'fruit_vote'
            }
            this.group = groupMap[id]
            this.showVote = true;
            this.drinkIndex = index;
            this.drink_type_no = id;
            // console.log(this.drink_type_no)
            const votedTime = fomateTime(this.members[this.group])
            if (this.members[this.group] && dateFns.isSameWeek(votedTime, new Date())) {
                this.type = 'done'
                return
            }

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
            this.getNowTime()

            fetch("./php/menu3.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mem_no: this.members.mem_no,
                    vote_count_now: this.dirnkVote[this.activeIndex].vote_count_now,
                    drink_no: this.dirnkVote[this.activeIndex].drink_no,
                    dirnk_type_no: this.drink_type_no,
                    vote_time: this.voteTime,
                }),
            })
                .then(() => {
                    this.voted[this.drinkIndex] = true;
                    this.votedValue[this.drinkIndex] = this.dirnkVote[
                        this.activeIndex
                    ].vote_count_now;
                    this.votedName[this.drinkIndex] = this.dirnkVote[
                        this.activeIndex
                    ].drink_title_ch;

                    this.type = "voteok";
                    this.members[this.group] = this.voteTime
                    // member.$emit("update_voteTime")

                    member.$emit("votedSus");
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
        closeAlert() {
            this.showVote = false
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
                                <div class="pic">
                                    <img :src="lightBoxImg[this.drinkIndex]" />
                                </div>
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
                            <div class="alertLightbox_black" v-if="type=='done'">
                                <div class="alertLightboxWrapper">
                                    <div class="alertLightbox" >
                                        <div>本周已經投過票了</div>
                                        <div @click="closeAlert">確定</div>
                                    </div>
                                </div>
                            </div>
                        </form>
                `,
});
new Vue({
    el: "#app",
});
