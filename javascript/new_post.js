// 이미지 첨부시 보이게
$(function () {
    $(".pick").on('change', function () {
        readURL(this);
    });
});

var i = 0;

// for문을 돌려도 하나씩 안된다.
function readURL(input) {
    if (input.files && input.files[i]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.item' + (i + 1)).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[i]);
    }
}
var abc = document.querySelector('.pick');