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
        // console.log(input.files)
        // ㄴ확인하면 파일이 전부 들어가있음
        // FileList {0: File, 1: File, 2: File, 3: File, 4: File, length: 5}
        //>> 0: File {name: "add-on.png", lastModified: 1586347901224, lastModifiedDate: Wed Apr 08 2020 21:11:41 GMT+0900 (대한민국 표준시), webkitRelativePath: "", size: 543, 
    }
}
var abc = document.querySelector('.pick');
console.log(abc.files);


///////////////////////////////

// form data 처리 

//1. form객체가 존재할때
// var newF =  $('#newF').val();
// var formData = new FormData($('#fileForm')[0]);

// console.log(newF);
// console.log(formData);

// 2. form 객체 존재하지 않을때
// var data = new FormData();
// jQuery.each(jQuery('#file')[0].files, function(i, file) {
//     data.append('file-'+i, file);
// });
// 모르겠다
// let message = $('#newF').val();
// let photos = $('.pick').files();
// console.log(message);
// console.log(photos);

// $.ajax({
// type: "POST",
// enctype: 'multipart/form-data', // 필수
// url: '/abc', //임시로 입력 //필수
// dataType: 'JSON', //"json",
// data: formData, // 필수
// // data: 'data',
// processData: false, // 필수
// contentType: false, // 필수
// cache: false,

// success: function (response) {
//     console.log('통신 성공!');
//     console.log(response);
// },
// error: function (request, status, error) {
//     console.log(
//         "code:" +
//         request.status +
//         "\n" +
//         "message:" +
//         request.responseText +
//         "\n" +
//         "error:" +
//         error
//     );
//     console.log(typeof request.responseJSON);
// }
// });