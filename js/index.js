/**
 * Created by chenc on 2017/9/4.
 */
$(function () {

    //反馈框
    $("#issue_submit").on("click",function () {
        if($('#issue_title').val().length<5){
            $('#error_tips').text("问题概述不得少于5个字符！");
        }
        else{
            $('#issue_submit').text("提交中...");
            $.ajax({
                url:"",
                type:"POST",
                data:$('#form_issue').serialize(),
                success:function (response,status,xhr) {

                },
                error:function (xhr,errorText,errorType) {

                }
            }).always(function () {
                $('#issue').modal('hide');
                $('#form_issue')[0].reset();
                $('#error_tips').text("");
                $('#issue_submit').text("提交");
            });
        }

    });


    $(".main a").on('click',function () {
        $(this).attr("href",$(this).attr("href")+"?time="+Date.now());
    });

});