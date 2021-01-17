window.onload = function () {
    let closeBtn = document.querySelector(".rule-close");
    let characters = document.querySelectorAll(".character");
    let wraps = document.querySelectorAll(".wrap-item");
    let char = document.querySelector("#char");
    let start = document.getElementById("start");
    let storage = sessionStorage;

    closeBtn.addEventListener("click", function () {
        document.querySelector(".rule").style.display = "none";
    });
    function clickCharacter() {
        // console.log(this);

        const myCharacter = document.querySelector('input[name="character"]:checked')
            .value;

        const myWrap = document.querySelector('input[name="wrap"]:checked').value;
        console.log(myCharacter);
        const imgSrc = `${myCharacter}${myWrap}`;
        console.log(imgSrc);
        char.src = `./images/${imgSrc}.png`;
    }
    start.addEventListener("click", function (e) {
        e.preventDefault();

        const myCharacter = document.querySelector('input[name="character"]:checked')
            .value;
        const myWrap = document.querySelector('input[name="wrap"]:checked').value;
        mywrap = myWrap.charAt(0).toUpperCase() + myWrap.slice(1)

        // console.log(mywrap)

        let charc = `${myCharacter}${mywrap}`;

        storage["char"] = charc;

        window.location = "./game.html";
    });
    characters.forEach((character) =>
        character.addEventListener("click", clickCharacter)
    );
    wraps.forEach((wrap) => wrap.addEventListener("click", clickCharacter));
};
