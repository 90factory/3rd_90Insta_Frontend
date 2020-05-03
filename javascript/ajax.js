var DJANGO_URL = location.protocol + "//" + location.hostname;
var NODEJS_URL = "http://192.168.1.75";

var WRITER_ID;
var WRITER_NICKNAME;
var WRITER_POSTS;

console.log("DJANGO_URL: " + DJANGO_URL);
console.log("NODEJS_URL: " + NODEJS_URL);

// 여기서부터는 Django API 요청
// Login Ajax
function logIn() {
    var email = $("#login_email").val();
    var password = $("#login_password").val();

    // console.log(url);
    console.log(email);
    console.log(password);

    $.ajax({
        type: "POST",
        url: DJANGO_URL + ":8000/users/sign-in/",

        data: {
            email: email,
            password: password,
        },
        dataType: "json",

        success: function (response) {
            console.log("통신 성공했습니다.");
            console.log(response);

            $(".error-msg").html("로그인 완료");
            localStorage.setItem("token", response.token);
            localStorage.setItem("user_id", response.id);
            window.location.replace("/");
        },
        error: function (request, status, error) {
            $(".error-msg").html(request.responseJSON.message);
        },
    });
}

// LogOut은 localstorage에서 토큰 삭제
function logOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('writer_id')

    location.replace('../login-main.html')
}

// SignUp Ajax
function signUp() {
    var email = $("#join_email").val();
    var nickname = $("#join_nickname").val();
    var password = $("#join_password").val();
    console.log(email);
    console.log(nickname);
    console.log(password);
    $.ajax({
        type: "POST",
        url: DJANGO_URL + ":8000/users/sign-up/",
        data: {

            email: email,
            nickname: nickname,
            password: password,

        },
        dataType: "json",

        success: function (response) {
            console.log("통신 성공했습니다.");
            console.log(response);
            location.replace("./join_welcome.html");
            $(".error-msg").html(response.message);
        },
        error: function (request, status, error) {
            $(".error-msg").html(request.responseJSON.message);
        },
    });
}

// PasswordSearch Ajax
function passwordSearch() {
    var email = $(".login--input").val();

    console.log(email);

    $.ajax({
        type: "POST",
        url: DJANGO_URL + ":8000/users/password-search/",
        data: {
            email: email,
        },
        dataType: "json", // 주고 받을 데이터의 형식

        success: function (response) {
            $(".error-msg").html(response.message);
        },
        error: function (request, status, error) {
            $(".error-msg").html(request.responseJSON.message);
        },
    });
}

//ProfileGet Ajax (비밀번호 변경 페이지에서 필요.)
function profileGet_pw() {
    console.log("프로필 이미지 요청합니다.");
    $.ajax({
        type: "GET",
        url: DJANGO_URL + ":8000/users/profile-edit/",
        headers: {
            Authorization: localStorage.getItem("token"),
        },
        dataType: "json",
        success: function (response) {

            var image = document.querySelector("#my_image");
            var nickname = document.querySelector("#my_nickname");
            var header_image = document.querySelector(".icon_myprofile"); // 상단 프로필 이미지

            nickname.innerText = response.data.nickname;

            if (response.data.image == "") {
                image.src = "./img/default_profile_image.jpg"; // DB에 저장된 프로필 이미지가 없다면 default 이미지로 설정
                header_image.src = "./img/default_profile_image.jpg";
            } else {
                image.src = response.data.image;
                header_image.src = response.data.image;
            }
        },
        error: function (response) {
            console.log("통신 실패했습니다.logo");
        },
    });
}

//PasswordChange Ajax
function passwordChange() {
    var prev_password = $("#prev_password").val();
    var new_password = $("#new_password").val();
    var new_password_check = $("#new_password_check").val();

    $.ajax({
        type: "POST",
        url: DJANGO_URL + ":8000/users/password-change/",
        headers: {
            Authorization: localStorage.getItem("token"),
        },
        data: {
            prev_password: prev_password,
            new_password: new_password,
            new_password_check: new_password_check,
        },
        dataType: "json",

        success: function (response) {

            $(".error-msg").html(response.message);
        },
        error: function (request, status, error) {
            $(".error-msg").html(request.responseJSON.message);
        },
    });
}

//ProfileGet Ajax (프로필 변경 페이지에서 필요.)
function profileGet_pofile() {
    $.ajax({
        type: "GET",
        url: DJANGO_URL + ":8000/users/profile-edit/",
        headers: {
            Authorization: localStorage.getItem("token"),
        },
        dataType: "json",
        success: function (response) {
            var image = document.querySelector("#my_image");
            var my_nickname = document.querySelector("#my_nickname");

            var name = document.querySelector(".set_name");
            var nickname = document.querySelector("#set_nickname");
            var intro = document.querySelector("#set_info");
            var header_image = document.querySelector(".icon_myprofile"); // 상단 프로필 이미지

            my_nickname.innerText = response.data.nickname;

            if (response.data.image == "") {
                image.src = "./img/default_profile_image.jpg"; // DB에 저장된 프로필 이미지가 없다면 default 이미지로 설정
                header_image.src = "./img/default_profile_image.jpg";
            } else {
                image.src = response.data.image;
                header_image.src = response.data.image;
            }
            name.value = response.data.name;
            nickname.value = response.data.nickname;
            intro.innerText = response.data.intro;
        },
        error: function (response) {
            console.log("통신 실패했습니다.logo");
        },
    });
}

// ProfileChange Ajax
function profileChange() {
    var form = $("#profile_form")[0];
    var data = new FormData(form);

    $.ajax({
        type: "POST",
        url: DJANGO_URL + ":8000/users/profile-edit/",
        headers: {
            Authorization: localStorage.getItem("token"),
        },
        enctype: "multipart/form-data",
        processData: false,
        contentType: false,
        data: data,

        success: function (response) {
            $(".error-msg").html(response.message);
            location.reload(); // 프로필이 정상적으로 업데이트되면 새로고침!
        },
        error: function (response, request, status, error) {
            console.log("통신 실패했습니다.");
        },
    });
}

//ProfileGet Ajax (메인 페이지에서 필요.)
function profileGet_main() {
    $.ajax({
        type: "GET",
        url: DJANGO_URL + ":8000/users/profile-edit/",
        headers: {
            Authorization: localStorage.getItem("token"),
        },
        dataType: "json",
        success: function (response) {
            console.log("profileGet 통신 성공했습니다.");

            var header_image = document.querySelector(".icon_myprofile"); // 상단 프로필 이미지

            if (response.data.image == "") {
                // DB에 저장된 프로필 이미지가 없다면 default 이미지로 설정
                header_image.src = "./img/default_profile_image.jpg";
            } else {
                header_image.src = response.data.image;
            }
        },
        error: function (response) {
            console.log("통신 실패했습니다.logo");
            location.replace("./login-main.html");
        },
    });
}

// 여기서부터는 NodeJS API 요청
//MainLoading Ajax
function mainLoading() {
    console.log("메인 페이지 요청합니다.");
    $.ajax({
        type: "GET",
        url: NODEJS_URL + ":3000/posts/",
        headers: {
            Authorization: localStorage.getItem("token"),
        },
        dataType: "json",
        success: function (response) {
            loadedPost = response;
            max_post = loadedPost.length - 3;
            getPost(loadedPost, 0, 2);
        },
        error: function (response) {
            console.log("통신 실패했습니다.logo");
            location.replace("./login-main.html");
        },
    });
}

//DeletePost Ajax
function deletePost(e) {
    var clickBtnId = e.target.id;
    var post_id = clickBtnId.split("_")[1]; // 클린한 삭제 버튼으로부터 해당 게시물의 PK(id)를 얻어낸다.

    console.log(post_id);
    $.ajax({
        type: "DELETE",
        url: NODEJS_URL + ":3000/posts",
        headers: {
            Authorization: localStorage.getItem("token"),
        },
        data: {
            // json 형식으로 서버에 데이터 전달
            post_id: post_id,
        },
        dataType: "json", // 주고 받을 데이터의 형식

        success: function (response) {
            location.reload();
        },
        error: function (request) {
            console.log("에러: ", request);
            var errorMsg = e.path[1].lastElementChild
            errorMsg.innerText = request.responseText;
        },
    });
}


//CreatePost Ajax
function createPost() {
    var form = $("#fileForm")[0];
    var data = new FormData(form);

    $.ajax({
        type: "POST",
        url: NODEJS_URL + ":3000/posts/",
        headers: {
            Authorization: localStorage.getItem("token"),
        },
        enctype: "multipart/form-data",
        processData: false,
        contentType: false,
        data: data,
        success: function (response) {
            location.replace("./index.html");
        },
        error: function (response) {
            console.log("통신 실패했습니다.logo");
            //location.replace("./login-main.html")
        },
    });
}


//ProfileGet Ajax (프로필 변경 페이지에서 필요.)
function profileGet_myfeed() {
    $.ajax({
        type: "GET",
        url: DJANGO_URL + ":8000/users/profile-edit/",
        headers: {
            Authorization: localStorage.getItem("token"),
        },
        dataType: "json",
        success: function (response) {

            var image = document.querySelector("#img_profile");
            var my_nickname = document.querySelector(".mypro_id");
            var name = document.querySelector(".mypro_name");
            var intro = document.querySelector(".mypro_info");
            var header_image = document.querySelector(".icon_myprofile"); // 상단 프로필 이미지



            my_nickname.innerText = response.data.nickname;
            name.innerText = response.data.name;
            intro.innerText = response.data.intro;

            if (response.data.image == "") {
                image.src = "./img/default_profile_image.jpg"; // DB에 저장된 프로필 이미지가 없다면 default 이미지로 설정
                header_image.src = "./img/default_profile_image.jpg";
            } else {
                image.src = response.data.image;
                header_image.src = response.data.image;
            }

        },
        error: function (response) {
            console.log("통신 실패했습니다.logo");
            location.replace('../login-main.html')
        },
    });
}

// myfeed 페이지에서 게시물 개수만큼 태그 구조 추가
function addFeed(count, posts) {

    var feed_count = document.querySelector(".feed_number")
    feed_count.innerText = count;

    for (var i = 0; i < count; i++) {
        $.ajax({
            url: "../feed.html",
            dataType: "html",
            success: function (data) {
                $(".feed_content").append(data);
            },
        }).then(() => {
            var contents = document.getElementsByClassName("feed_mine");
            for (var j = 0; j < count; j++) {
                console.log("j번 째 myfeed: ", j);
                console.log("contents[j]: ", contents[j]);
                console.log("posts[j]: ", posts[count - j - 1]);

                contents[j].id = posts[count - j - 1].id;
                img_url = posts[count - j - 1].photos[0].photo;

                console.log("이미지 url: ", img_url);

                contents[j].querySelector("a.myfeed").style.backgroundImage =
                    "url(" + img_url + ")";
            }
        });
    }
}


//MyfeedGet Ajax (myfeed 페이지)
function myfeedGet() {
    $.ajax({
        type: "GET", // Request 전송 방식
        url: NODEJS_URL + ":3000/posts/myfeed", // 해당 Request를 보낼 주소
        headers: {
            Authorization: localStorage.getItem("token"), // 로그아웃 상태에서의 요청이므로 JWT 필요없다.
        },
        dataType: "json",
        success: function (response) {
            console.log("통신 성공했습니다.");
            console.log("from nodejs: ", response);
            var count = response.posts.length;
            var posts = response.posts;
            if (count != 0) {
                addFeed(count, posts);
            }
        },
        error: function (request) {
            console.log("에러: ", request);

        },
    });
}

//YourfeedGet Ajax (yourfeed 페이지)
function insertWriterId(e) {

    writer_id = e.target.id.split('_')[1]
    user_id = localStorage.getItem('user_id')
    localStorage.setItem('writer_id', writer_id)


    if (user_id == writer_id) {
        location.href = DJANGO_URL + '/myfeed.html'
    } else {
        location.href = DJANGO_URL + '/yourfeed.html'
    }
}

//로그인 유저 프로필 사진 삽입  (yourfeed 페이지 헤더)
function profileGet_yourfeed() {

    $.ajax({
        type: "GET", // Request 전송 방식
        url: DJANGO_URL + ":8000/users/profile-edit/", // 해당 Request를 보낼 주소
        headers: {
            Authorization: localStorage.getItem("token"), // 로그아웃 상태에서의 요청이므로 JWT 필요없다.
        },
        dataType: "json",
        success: function (response) {
            console.log("통신 성공했습니다.");
            console.log(response);
            console.log(response.data.image);

            var header_image = document.querySelector(".icon_myprofile"); // 상단 프로필 이미지

            if (response.data.image == "") {
                header_image.src = "./img/default_profile_image.jpg";
            } else {
                header_image.src = response.data.image;
            }
        },
        error: function (response) {
            console.log("통신 실패했습니다.logo");
            location.replace('../login-main.html')
        },
    });
}

//yourfeedGet Ajax (yourfeed 페이지)
function yourfeedGet() {

    user_id = localStorage.getItem('user_id');
    writer_id = localStorage.getItem('writer_id');

    $.ajax({
        type: "GET",
        url: NODEJS_URL + ":3000/posts/yourfeed/" + writer_id,
        headers: {
            Authorization: localStorage.getItem("token"),
        },
        dataType: "json",
        success: function (response) {
            var feed_number = document.querySelector('.feed_number')

            var nickname = document.querySelector('.mypro_id')
            var pro_img = document.querySelector('.pro_img > img')
            var name = document.querySelector('.mypro_name')
            var intro = document.querySelector('.mypro_info')


            var count = response.posts.length
            var writer_posts = response.posts
            var writer_nickname = response.nickname
            var writer_image = response.user_profiles[0].image
            var writer_name = response.user_profiles[0].name
            var writer_intro = response.user_profiles[0].intro

            if (writer_image == "") {
                // DB에 저장된 프로필 이미지가 없다면 default 이미지로 설정
                pro_img.src = "./img/default_profile_image.jpg";
            } else {
                pro_img.src = DJANGO_URL + ':8000/image/' + writer_image;
            }

            feed_number.innerText = count
            nickname.innerText = writer_nickname
            name.innerText = writer_name
            intro.innerText = writer_intro

            if (count != 0) {
                addFeed(count, writer_posts);
            }
        },
        error: function (response) {
            console.log("에러: ", response);

        },
    });

}