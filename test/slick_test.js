window.addEventListener('load', function () {
    Vue.component('vue-slick-carousel', {
        data() {
            return {
                // settings: {
                //     autoplay: true,
                //     dots: true,
                //     focusOnSelect: true,
                //     infinite: true,
                //     speed: 500,
                //     slidesToShow: 3,
                //     slidesToScroll: 3,
                //     touchThreshold: 5,
                // },
            }
        },
        methods: {},
        mounted() {},
        created() {},
        template: `
<div>
  <!-- <div class="slide-1 slide">
      <p>Slide 1</p>
  </div>
  <div class="slide-2 slide">
      <p>Slide 2</p>
  </div>
  <div class="slide-3 slide">
      <p>Slide 3</p>
  </div>
  <div class="slide-4 slide">
      <p>Slide 4</p>
  </div> -->
  <div class="item">
      <div class="item-inner">
          <div class="vote_info">
              <h4>TOP1</h4>
              <h5>大正紅茶</h5>
              <div class="vote_number">
                  <img src="./Images/vote_medium.svg" alt="" />
                  <span>350</span>票
              </div>
          </div>
          <img src="./Images/drinkitem_15/drinkitem_15/index_vote/index_vote_tea-1@2x.png" alt="" />
          <div class="triangle"></div>
      </div>
  </div>

  <div class="item">
      <div class="item-inner">
          <div class="vote_info">
              <h4>TOP2</h4>
              <h5>四季春茶</h5>
              <div class="vote_number">
                  <img src="./Images/vote_medium.svg" alt="" />
                  <span>350</span>票
              </div>
          </div>
          <img src="./Images/drinkitem_15/drinkitem_15/index_vote/index_vote_tea-2@2x.png" alt="" />
          <div class="triangle"></div>
      </div>
  </div>

  <div class="item">
      <div class="item-inner">
          <div class="vote_info">
              <h4>TOP3</h4>
              <h5>烏龍綠茶</h5>
              <div class="vote_number">
                  <img src="./Images/vote_medium.svg" alt="" />
                  <span>350</span>票
              </div>
          </div>
          <img src="./Images/drinkitem_15/drinkitem_15/index_vote/index_vote_tea-3@2x.png" alt="" />
          <div class="triangle"></div>
      </div>
  </div>
  <!-- 奶茶類 ------------------------------------------------------------------->
  <div class="item">
      <div class="item-inner">
          <div class="vote_info">
              <h4>TOP1</h4>
              <h5>鮮奶茶</h5>
              <div class="vote_number">
                  <img src="./Images/vote_medium.svg" alt="" />
                  <span>350</span>票
              </div>
          </div>
          <img src="./Images/drinkitem_15/drinkitem_15/index_vote/index_vote_milktea-1@2x.png" alt="" />
          <div class="triangle"></div>
      </div>
  </div>

  <div class="item">
      <div class="item-inner">
          <div class="vote_info">
              <h4>TOP2</h4>
              <h5>紅茶拿鐵</h5>
              <div class="vote_number">
                  <img src="./Images/vote_medium.svg" alt="" />
                  <span>350</span>票
              </div>
          </div>
          <img src="./Images/drinkitem_15/drinkitem_15/index_vote/index_vote_milktea-2@2x.png" alt="" />
          <div class="triangle"></div>
      </div>
  </div>

  <div class="item">
      <div class="item-inner">
          <div class="vote_info">
              <h4>TOP3</h4>
              <h5>烏龍拿鐵</h5>
              <div class="vote_number">
                  <img src="./Images/vote_medium.svg" alt="" />
                  <span>350</span>票
              </div>
          </div>
          <img src="./Images/drinkitem_15/drinkitem_15/index_vote/index_vote_milktea-3@2x.png" alt="" />
          <div class="triangle"></div>
      </div>
  </div>
  <!-- 果茶類 ------------------------------------------------------------->
  <div class="item">
      <div class="item-inner">
          <div class="vote_info">
              <h4>TOP1</h4>
              <h5>蜜桃紅茶</h5>
              <div class="vote_number">
                  <img src="./Images/vote_medium.svg" alt="" />
                  <span>350</span>票
              </div>
          </div>
          <img src="./Images/drinkitem_15/drinkitem_15/index_vote/index_vote_fruit-1@2x.png" alt="" />
          <div class="triangle"></div>
      </div>
  </div>

  <div class="item">
      <div class="item-inner">
          <div class="vote_info">
              <h4>TOP2</h4>
              <h5>芒果冰茶</h5>
              <div class="vote_number">
                  <img src="./Images/vote_medium.svg" alt="" />
                  <span>350</span>票
              </div>
          </div>
          <img src="./Images/drinkitem_15/drinkitem_15/index_vote/index_vote_fruit-2@2x.png" alt="" />
          <div class="triangle"></div>
      </div>
  </div>

  <div class="item">
      <div class="item-inner">
          <div class="vote_info">
              <h4>TOP3</h4>
              <h5>水果茶</h5>
              <div class="vote_number">
                  <img src="./Images/vote_medium.svg" alt="" />
                  <span>350</span>票
              </div>
          </div>
          <img src="./Images/drinkitem_15/drinkitem_15/index_vote/index_vote_fruit-3@2x.png" alt="" />
          <div class="triangle"></div>
      </div>
  </div>
</div>`,
    })
    //-----------------------------------------------------

    var app = new Vue({
        el: '#app',
        components: {
            VueSlickCarousel: window['vue-slick-carousel'],
        },
        data: {
            settings: {
                autoplay: true,
                dots: true,
                focusOnSelect: true,
                infinite: true,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 3,
                touchThreshold: 5,
            },
        },
        methods: {},
    })
})
