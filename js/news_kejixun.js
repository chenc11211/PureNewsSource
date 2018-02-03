/**
 * Created by chenc on 2017/9/14.
 */
$(function () {
    function get_news(page) {
        news_contents = "";
        return $.ajax({
            url: "php/start_kejixun.php",
            type: "GET",
            data: {"page": page},
            success: function (response, status, xhr) {
                news_contents = response;
            },
            error: function (xhr, errorText, errorType) {
                news_contents = "加载失败：" + errorText + "尝试刷新！";
            }
        });
    }


    var news_contents="";
    var page=0;
    $("#loading").on("click",function () {
        $(this).html('<img src="img/loading.gif" alt="加载中">');
        page++;
        get_news(page).always(function () {
            $(news_contents).insertBefore($("#loading").parent()).find(".pics").remove();
            $(".list-con").parent().find(".imgbox").remove();
            $.each($(".keywords a"),function (key,value) {
                $(value).replaceWith("<span>"+$(value).text()+"</span>");
            });
            $.each($('.list-box a'),function (key,value) {
                var href='php/kejixun_news_detail.php?href='+$(value).attr("href");
                $(value).attr({'href':href,"target":"_blank"});
            });
            $("#loading").html('<a href="javascript:void(0);">加载更多>></a>');

        });

    });

    //顶部导航栏滚动固定
    var before_top=$(window).scrollTop();
    $(window).on('scroll',function () {
        var after_top=$(window).scrollTop();
        if(after_top-before_top>0){
            $("#header_nav").css("position","absolute");
        }else {
            $("#header_nav").css("position","fixed");
        }
        before_top=after_top;
    });

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


    $("#loading").click();

});