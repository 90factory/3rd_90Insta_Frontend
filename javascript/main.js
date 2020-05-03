const header = document.querySelector("#header");
const sidebox = document.querySelector(".side_box");
const variableWidth = document.querySelectorAll(".contents_box .contents");
const delegation = document.querySelector(".contents_box");
const writings = document.querySelector(".contents .writings");


var loadedPost;
var start;
var cnt;
var post_index = 0;
var max_post


function loadTemplate(user_id, post_index, post_id, user_photo_url, user_nickname, photo, text) {

  contents = document.getElementsByClassName("contents")

  contents[post_index].id = post_id;
  contents[post_index].querySelector(
    "div.profile_img > img"
  ).src = user_photo_url;
  contents[post_index].querySelector("div.user_name > div.nick_name > a").innerText = user_nickname;
  contents[post_index].querySelector("div.nick_name > a").id = 'writer_' + user_id;
  contents[post_index].querySelector(
    "div.trans_inner > div > img"
  ).src = photo;
  contents[post_index].querySelector(
    "div.idName").innerText = user_nickname;
  contents[post_index].querySelector(
    "div.writings").innerText = text;
  contents[post_index].querySelector("button.deleteBtn").id = 'btn_' + post_id;

  post_index = post_index + 1

  return post_index

}



function getPost(loadedPost, index, cnt) {

  let user_photo_url;

  for (let i = index; i < index + cnt; i++) {
    const user_id = loadedPost[i].user.id;
    const user_nickname = loadedPost[i].user.nickname;
    const user_photo_path = loadedPost[i].user.user_profiles[0].image;
    if (user_photo_path === "" || user_photo_path === null) {
      user_photo_url =
        "http://192.168.1.71/img/default_profile_image.jpg";
    } else {
      user_photo_url =
        "http://192.168.1.71:8000/image/" + user_photo_path;
    }
    const post_id = loadedPost[i].id;
    const text = loadedPost[i].text;
    const photo = loadedPost[i].photos[0].photo; //일단 한 장의 사진만..

    loadTemplate(user_id, post_index, post_id, user_photo_url, user_nickname, photo, text);
    post_index = post_index + 1
  }

}

function delegationFunc(e) {
  let elem = e.target;

  while (!elem.getAttribute("data-name")) {
    elem = elem.parentNode;

    if (elem.nodeName === "BODY") {
      elem = null;
      return;
    }
  }

  if (elem.matches('[data-name="heartbeat"]')) {
    console.log("하트!");

    var pk = elem.getAttribute("name");

    $.ajax({
      type: "POST",
      url: "data/like.json",
      data: {
        pk
      },
      dataType: "json",
      success: function (response) {
        // 서버와 통신할때 var likeCount = document.querySelector('#like-count-' + pk);
        var likeCount = document.querySelector("#like-count-" + pk);
        likeCount.innerHTML = "좋아요" + response.like_count + "개";
      },

      error: function (request, status, error) {
        alert("로그인이 필요합니다.");
        window.location.replace("/accounts/login/");
      },
    });
  } else if (elem.matches('[data-name="bookmark"]')) {

    var pk = elem.getAttribute("name");

    $.ajax({
      type: "POST",
      url: "data/bookmark.json",
      data: {
        pk
      },
      dataType: "json",
      success: function (response) {
        // 서버와 통신할때 var bookmarkCount = document.querySelector('#bookmark-count-' + pk);
        var bookmarkCount = document.querySelector("#bookmark-count-" + pk);
        bookmarkCount.innerHTML = "";
      },
      error: function (request, status, error) {
        // alert("실패");
        alert("로그인이 필요합니다.");
        window.location.replace("/accounts/login/");
      },
    });
  } else if (elem.matches('[data-name="comment"]')) {
    console.log("댓글!");

    var content = document.querySelector("#addComment37>input[type=text]")
      .value;
    //.contents .comment_field .upload_btn 속성 pointer-event 끄기

    console.log(content);

    if (content.length > 140) {
      alert(
        "댓글은 최대 140자 입력 가능합니다. 현재 글자수 :" + content.length
      );
      return;
    }

    $.ajax({
      type: "GET",
      url: "http://fblogin.atstudio.co.kr/comment.php",
      data: {
        pk: pk,
        content: content,
      },
      dataType: "json",
      success: function (data, textStatus, jqXHR) {
        //무한 스크롤 댓글작성 기능부분
        document
          .querySelector("#comment" + "37")
          .insertAdjacentHTML("afterbegin", data); // 제일 상위 게시물에만 달림
        //elem.insertAdjacentHTML("afterbegin", data); // 게시물 버튼이 바뀜
      },
      error: function (request, status, error) {
        alert(
          "code:" +
          request.status +
          "\n" +
          "message:" +
          request.responseText +
          "\n" +
          "error:" +
          error
        );
        alert("문제가 발생했습니다.");
      },
    });

    document.querySelector("#addComment37>input[type=text]").value = "";
  } else if (elem.matches('[data-name="comment_delete"]')) {
    console.log("삭제!");

    $.ajax({
      type: "POST",
      url: "data/delete.json",
      data: {
        pk: pk,
      },
      dataType: "json",
      success: function (response) {
        if (response.status) {
          let comt = document.querySelector(".comment-detail");
          comt.remove();
        }
      },
      error: function (request, status, error) {
        alert(
          "code:" +
          request.status +
          "\n" +
          "message:" +
          request.responseText +
          "\n" +
          "error:" +
          error
        );
        alert("문제가 발생했습니다.");
      },
    });
  } else if (elem.matches('[data-name="follow"]')) {
    var pk = elem.getAttribute("name");

    $.ajax({
      type: "POST",
      url: "data/follow.json",
      data: {
        pk: pk,
      },
      dataType: "json",
      success: function (response) {
        if (response.status) {
          document.querySelector("input.follow").value = "팔로잉";
          // $("input.follow[name="+pk+"]").val("팔로잉");
        } else {
          document.querySelector("input.follow").value = "팔로우";
          // $("input.follow[name="+pk+"]").val("팔로우");
        }
      },
      error: function (request, status, error) {
        alert("로그인이 필요합니다.");
        window.location.replace("/accounts/login/");
      },
    });
  }

  elem.classList.toggle("on");
}

function moreClick() {
  moreWatch.classList.add("on");
} //더보기


function resizeFunc() {
  // console.log('resize!!');
  if (pageYOffset >= 10) {
    let calcWidth = window.innerWidth * 0.5 + 167;
    // console.log(window.innerWidth * 0.5);

    sidebox.style.left = calcWidth + "px";
  }

  if (matchMedia("screen and (max-width : 800px)").matches) {
    for (let i = 0; i < variableWidth.length; i++) {
      variableWidth[i].style.width = window.innerWidth - 20 + "px";
    }
  } else {
    for (let i = 0; i < variableWidth.length; i++) {
      if (window.innerWidth > 600) {
        variableWidth[i].removeAttribute("style");
      }
    }
  }
}

function scrollFunc() {


  let scrollHeight = window.innerHeight + window.scrollY;
  let documentHeight = document.body.offsetHeight - 1;

  if (scrollHeight >= documentHeight) {
    if (page > max_post) {
      return false;
    } // 무한스크롤 기능 200페이지까지 수용가능
    var page = document.querySelector("#page").value;
    document.querySelector("#page").value = parseInt(page) + 1;

    callMorePostAjax(page);
  }
}

function callMorePostAjax(page) {
  if (page > max_post) {
    return false;
  } //무한 스크롤 기능 ajax 200페이지까지 수용가능

  $.ajax({
    url: "../post.html",
    data: {
      'page': page,
    },
    success: addMorePostAjax,
    dataType: 'html',
    error: function (request, status, error) {
      alert('오류가 발생했습니다.');

    },
  });
}

function addMorePostAjax(data, textStatus, jqXHR) {

  $('.contents_box').append(data)
  getPost(loadedPost, post_index, 1);
}

setTimeout(function () {
  scrollTo(0, 0);
}, 100);

if (delegation) {
  delegation.addEventListener("click", delegationFunc);
}


window.addEventListener("resize", resizeFunc);
window.addEventListener("scroll", scrollFunc);