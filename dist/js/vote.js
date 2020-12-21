let voteLightboxBtns = document.querySelectorAll(".voteLightboxBtn");
let voteLightbox = document.querySelector(".voteLightbox-wrap");
let closeBtn = document.querySelector(".vote-close");
let submit = document.querySelector(".submit");
let voting = document.querySelector(".voting-txt");
let votingOK = document.querySelector(".voting-ok");

submit.addEventListener("click", function (e) {
    const checkBtn = document.querySelector('input[type="radio"]:checked');
    e.preventDefault();
    if (!checkBtn) {
        return;
    }
    voting.style.display = "none";
    votingOK.style.display = "block";
});
closeBtn.addEventListener("click", function () {
    voteLightbox.style.display = "none";
});
voteLightboxBtns.forEach((voteLightboxBtn) => {
    voteLightboxBtn.addEventListener("click", function () {
        voteLightbox.style.display = "flex";
    });
});
