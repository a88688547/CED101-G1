window.onload = function () {
    let closeBtn = document.querySelector(".rule-close");
    let characters = document.querySelectorAll(".character");
    let wraps = document.querySelectorAll(".wrap-item");
    let char = document.querySelector("#char");
    let start = document.getElementById("start");
    let ability = document.querySelector('.ability-wrap');
    let storage = sessionStorage;

    closeBtn.addEventListener("click", function () {
        document.querySelector(".rule").style.display = "none";
    });
    function clickCharacter() {
        const myCharacter = document.querySelector('input[name="character"]:checked')
            .value;

        const myWrap = document.querySelector('input[name="wrap"]:checked').value;
        // console.log(myCharacter);
        const imgSrc = `${myCharacter}${myWrap}`;
        char.src = `./Images/${imgSrc}.png`;
        // console.log(imgSrc);

        switch (imgSrc) {
            case 'peacup':
                ability.setAttribute("class", "ability-wrap")
                ability.classList.add(`${imgSrc}`)
                return
            case 'peacap':
                ability.setAttribute("class", "ability-wrap")
                ability.classList.add(`${imgSrc}`)
                return
            case 'peamug':
                ability.setAttribute("class", "ability-wrap")
                ability.classList.add(`${imgSrc}`)
                return
            case 'redcup':
                ability.setAttribute("class", "ability-wrap")
                ability.classList.add(`${imgSrc}`)
                return
            case 'redcap':
                ability.setAttribute("class", "ability-wrap")
                ability.classList.add(`${imgSrc}`)
                return
            case 'redmug':
                ability.setAttribute("class", "ability-wrap")
                ability.classList.add(`${imgSrc}`)
                return
            case 'tancup':
                ability.setAttribute("class", "ability-wrap")
                ability.classList.add(`${imgSrc}`)
                return
            case 'tancap':
                ability.setAttribute("class", "ability-wrap")
                ability.classList.add(`${imgSrc}`)
                return
            case 'tanmug':
                ability.setAttribute("class", "ability-wrap")
                ability.classList.add(`${imgSrc}`)
                return

        }
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
