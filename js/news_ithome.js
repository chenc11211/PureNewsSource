/**
 * Created by chenc on 2017/9/14.
 */
$(function () {

    function get_news(page) {
        news_contents="";
        return $.ajax({
            url:"php/start_ithome.php",
            type:"GET",
            data:{"page":page},
            success:function (response,status,xhr) {
                var oJson=JSON.parse(response);
                //alert(oJson);
                $.each(oJson,function (key,value) {
                    news_contents=news_contents+value;
                });
            },
            error:function (xhr,errorText,errorType) {
                news_contents="加载失败："+errorText+"请尝试刷新！";
            }
        })
    }

    var page=1;
    var news_contents="";
    $('.pagination li').on('click',function () {
        page=$(this).text();
        $('.pagination li').removeClass("active");
        $(this).addClass("active");
        get_news(page).always(function () {
            $('#all-news-list').html(news_contents);
            $.each($('#all-news-list a'),function (key,value) {
                var href='php/ithome_news_detail.php?href='+$(value).attr("href");
                $(value).attr({'href':href});
            });
            $('#all-news-list li').wrap("<div class='col-md-6'></div>");

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


    $('#pagination-first').click();


});