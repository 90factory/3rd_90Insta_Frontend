// yourfeed
let btn_ban = document.querySelector('.btn-ban');
let modal = document.querySelector('.modal');
let overlay = modal.querySelector('.md_overlay');
let btn_close = modal.querySelector('.btn_close');


// 동작함수
let openModal = () => {
    modal.classList.remove('hidden');
}

let closeModal = () => {
    modal.classList.add('hidden');
}

btn_ban.addEventListener("click", openModal);
btn_close.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);