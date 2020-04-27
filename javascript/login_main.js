$(function () {
    $("#login_pw").on('input', function () {
        if ($("login_pw").val() == '')
            $("#login_request").attr("disabled", true);
        else
            $("#login_request").attr("disabled", false);
    });
})

var obTimeOut; // clearTimeout() 함수를 이용하여 Timeout 을 취소하기위해 사용됨
var imgAry = ["./img/image01.jpg", "./img/image02.jpg", "./img/image03.jpg", "./img/image04.jpg"];

var index = -1;

// 스스로 자신을 호출하는 재귀함수 (Recursive Function)
function ShowDefaultRotate() {
    index++;
    // 배열의 갯수 이내일때만 실행
    if (index < imgAry.length) {
        document.getElementById("img_phone").src = imgAry[index];
        // 1초후에 자기자신을 호출 
        obTimeOut = setTimeout("ShowDefaultRotate()", 3000);
    } else {
        // 배열의 갯수만큼 반복하여 변환시킨 후에는 Timeout 을 중지시킨다 
        index = -1;
        // 다시 반복
        ShowDefaultRotate();
        // clearTimeout(obTimeOut);
    }
}

function transImg() {
    // 윈도우 로드 후 0.1초 후에 반복함수를 호출
    obTimeOut = window.setTimeout(ShowDefaultRotate, 100);
}

// 윈도우 로드시 이미지 변환함수 실행
window.onload = transImg();


// 비밀번호 표시 / 미표시
let show_pw = document.getElementById('show_pw');
let login_pw = document.getElementById('login_pw');

function show_password() {
    console.log(login_pw.type);
    login_pw.type = 'text';
};

login_pw.addEventListener('click', show_password);