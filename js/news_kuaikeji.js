/**
 * Created by chenc on 2017/9/14.
 */
$(function () {


    //连接服务器获取数据
    function get_news(page) {
        str="";
        return $.ajax({
            url:"php/start_kuaikeji.php",
            type:"GET",
            data:{"page":page},
            success:function (response,status,xhr) {
                var oJson=JSON.parse(response);
                $.each(oJson,function (key,value) {
                    str=str+value;
                });

            },
            error:function (xhr,errorText,errorType) {
                var str="加载失败："+errorText+"请尝试刷新！";
            }
        });
    }

    var page=1;
    var str="";
    $('.pagination li').on('click',function () {
        page=$(this).text();
        $('.pagination li').removeClass("active");
        $(this).addClass("active");
        get_news(page).always(function () {
            $('#all-news-list').html(str);
            $('#all-news-list font').removeAttr("color");
            $.each($('#all-news-list a'),function (key,value) {
                var href='php/kuaikeji_news_detail.php?href='+$(value).attr("href");
                $(value).attr({'href':href,"target":"_blank"});
            });
            $('#all-news-list li').wrap("<div class='col-md-6'></div>");

        });
    });


    $("#all").on("click",function () {
        $('#classify-name').text("全部");
        $("#classify-nav li").removeClass("active");
        $('#all-nav').addClass('active');
    });

    $('#hardware').on('click',function () {

        $('#classify-name').text("硬件");
        $("#classify-nav li").removeClass("active");
        $('#hardware-nav').addClass('active');

        page=6;
        get_news(page).always(function () {
            $('#hardware-news-list').html(str);
            $('#hardware-news-list font').removeAttr("color");
            $.each($('#hardware-news-list a'),function (key,value) {
                var href='php/kuaikeji_news_detail.php?href='+$(value).attr("href");
                $(value).attr({'href':href,"target":"_blank"});
            });
            $('#hardware-news-list li').wrap("<div class='col-md-6'></div>");

        });
    });

    $('#software').on('click',function () {

        $('#classify-name').text("软件");
        $("#classify-nav li").removeClass("active");
        $('#software-nav').addClass('active');

        page=7;
        get_news(page).always(function () {
            $('#software-news-list').html(str);
            $('#software-news-list font').removeAttr("color");
            $.each($('#software-news-list a'),function (key,value) {
                var href='php/kuaikeji_news_detail.php?href='+$(value).attr("href");
                $(value).attr({'href':href,"target":"_blank"});
            });
            $('#software-news-list li').wrap("<div class='col-md-6'></div>");

        });
    });

    $('#phone').on('click',function () {

        $('#classify-name').text("手机");
        $("#classify-nav li").removeClass("active");
        $('#phone-nav').addClass('active');

        page=8;
        get_news(page).always(function () {
            $('#phone-news-list').html(str);
            $('#phone-news-list font').removeAttr("color");
            $.each($('#phone-news-list a'),function (key,value) {
                var href='php/kuaikeji_news_detail.php?href='+$(value).attr("href");
                $(value).attr({'href':href,"target":"_blank"});
            });
            $('#phone-news-list li').wrap("<div class='col-md-6'></div>");

        });
    });

    $('#science').on('click',function set_news() {

        $('#classify-name').text("科学");
        $("#classify-nav li").removeClass("active");
        $('#science-nav').addClass('active');

        page=9;
        get_news(page).always(function () {
            $('#science-news-list').html(str);
            $('#science-news-list font').removeAttr("color");
            $.each($('#science-news-list a'),function (key,value) {
                var href='php/kuaikeji_news_detail.php?href='+$(value).attr("href");
                $(value).attr({'href':href,"target":"_blank"});
            });
            $('#science-news-list li').wrap("<div class='col-md-6'></div>");

        });
    });

    $("#all-nav").on("click",function () {
        scrollTo(0,0);
        $('#all a').trigger("click");
    });

    $("#hardware-nav").on("click",function () {
        scrollTo(0,0);
        $('#hardware a').trigger("click");
    });

    $("#software-nav").on("click",function () {
        scrollTo(0,0);
        $('#software a').trigger("click");
    });

    $("#phone-nav").on("click",function () {
        scrollTo(0,0);
        $('#phone a').trigger("click");
    });

    $("#science-nav a").on("click",function () {
        scrollTo(0,0);
        $('#science a').trigger("click");
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

