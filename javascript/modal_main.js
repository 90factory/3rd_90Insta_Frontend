document.querySelector('.contents_box').addEventListener('mousedown', function (e) {
    console.log(e.path[1])
    var root = e.path[1]

    var openButton = root.querySelector('button#open')
    var modal = root.querySelector('div.modal')
    var overlay = root.querySelector("div.modalOverlay");
    var closeBtn = root.querySelector("button.cancel");

    var openModal = function () {
        modal.classList.remove("hidden");


        $('.modal_content').css({
            "top": (($(window).height() - $(".modal_content").outerHeight()) / 4.8 + $(window).scrollTop()) + "px",
            "left": (($(window).width() - $(".modal_content").outerWidth()) / 3.9 + $(window).scrollLeft()) + "px",
        });

        $('.editBtn').css({
            'color': "blue"
        })

        $('.deleteBtn').css({
            'color': "red"
        })

        $("body").css("overflow", "hidden"); //body 스크롤바 없애기

    };

    var closeModal = function () {
        modal.classList.add("hidden");

        $("body").css("overflow", "auto"); //body 스크롤바 생성
    };

    openButton.addEventListener("click", openModal);
    overlay.addEventListener("click", closeModal);
    closeBtn.addEventListener("click", closeModal);
});