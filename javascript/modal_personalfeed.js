
let setting = document.querySelector('.more_info');
let modal4 = document.querySelector('.modal4');
let overlay4 = modal4.querySelector('.md_overlay4');
let btn = modal4.querySelector('.btn_close4');

let openModal4 = () => {
    modal4.classList.remove('hidden4');
}

let closeModal4 = () => {
    modal4.classList.add('hidden4');
}

setting.addEventListener("click", openModal4);
overlay4.addEventListener("click", closeModal4);
btn.addEventListener("click", closeModal4);
