// 입력창이 입력됐을 때만 활성화

$(function () {

    $("#join_pw").on('input', function () {
        if ($("join_pw").val() == '')
            // $("join_email").val() == '' &&
            // $("join_name").val() == '' &&
            // $("join_nickname").val() == '' &&
            $("#join_complete").attr("disabled", true);
        else
            $("#join_complete").attr("disabled", false);
    });
})

// function openWelcome(){
//     location.href="./join_welcome.html";
// };