// yourfeed
let btn_ban = document.querySelector('.btn-ban');
let modal = document.querySelector('.modal');
let overlay = modal.querySelector('.md_overlay');
let btn_close = modal.querySelector('.btn_close');
// 팔로우
// let btn_follow = document.querySelector('.btn-follow');
// let btn_unfollow = document.querySelector('.btn-unfollow');

// 동작함수
let openModal = () => {
    modal.classList.remove('hidden');
}

let closeModal = () => {
    modal.classList.add('hidden');
}

// 팔로우 버튼
// let unfollow = () => {
//     btn_follow.classList.add('unfollow');
// }

// let follow = () => {
//     btn_follow.classList.remove('unfollow');
// }

btn_ban.addEventListener("click", openModal);
btn_close.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// btn_follow.addEventListener("click", unfollow);
// btn_unfollow.addEventListener("click", follow);
