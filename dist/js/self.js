function doFirst() {

    //刪除button
    let delebtn = document.getElementsByClassName("order_delete_btn");
    let i;
    for (i = 0; i < delebtn.length; i++) {
        delebtn[i].onclick = function () {
            this.parentNode.remove()
        }
    }


}


window.addEventListener('load', doFirst);
