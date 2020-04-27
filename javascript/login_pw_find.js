$(function(){
    $("#pw_find").on('input', function(){
        if($("pw_find").val()=='')
        $("#pw_send").attr("disabled", true);
        else
            $("#pw_send").attr("disabled", false);
    });
})

// 이미지 첨부시 보이게
$(function() {
    $("#small_img").on('change', function(){
        readURL(this);
    });
});

function readURL(input) {
    if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }

      reader.readAsDataURL(input.files[0]);
    }
}
