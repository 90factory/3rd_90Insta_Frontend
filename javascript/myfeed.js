// myfeed

let setting = document.querySelector('.btn_setting');
let modal2 = document.querySelector('.modal2');
let overlay2 = modal2.querySelector('.md_overlay2');
let btn = modal2.querySelector('.btn_close2');

// 프로필 사진 
let img_profile = document.getElementById('img_profile');

let openModal2 = () => {
    modal2.classList.remove('hidden2');
}

let closeModal2 = () => {
    modal2.classList.add('hidden2');
}
// 프로필 사진 편집
let openModal3 = () => {
    modal3.classList.remove('hidden3');
}

let closeModal3 = () => {
    modal3.classList.add('hidden3');
}

// myfeed
setting.addEventListener("click", openModal2);
overlay2.addEventListener("click", closeModal2);
btn.addEventListener("click", closeModal2);

// 프로필 사진 편집 모달
img_profile.addEventListener("click", openModal3);