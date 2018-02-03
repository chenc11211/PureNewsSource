;
window.onload=function(){

    var oTitle=document.getElementById("title"),
     oDate=document.getElementById("date"),
     oContent=document.getElementById("news_content");
    oTitle.innerHTML=content.title;
    oDate.innerHTML=content.cal;
    oContent.innerHTML=content.content;

    $(".path .active").html($("#title").text());
    $("#news_content img").removeAttr("style").wrap('<div class="thumbnail"></div>');


    //获取评论
    function get_comment(comment){
        $.each(comment.All,function(key,value){
            let name=value.UserName,     //评论人
             content=value.Content,   //评论内容
             support=value.Support,    //支持数
             oppose=value.Oppose,     //反对数
             date=value.PostDate,     //时间
             ip_add=value.IPAdd,      //地址
             reply_name=value.RevertUserName,   //回复人
             reply_content=value.RevertContent,  //回复内容
             reply="";
            if(reply_name!='') {
                reply="<div class='reply'><div class='reply_user'>"+reply_name+"原贴 </div><div class='reply_content'>"+reply_content+"</div></div>";
            }
            $('#news_comment').append('<div class="comment_item"> <div class="comment_info"> <span class="user_name">'+name+'</span> <span class="user_from">'+ip_add+'</span> <span class="comment_time">'+date+'</span> </div> <div class="comment_content"> <div class="content">'+content+'</div>'+reply+' <div class="attitude"> <span>支持['+support+']</span><span>反对['+oppose+']</span> </div> </div> </div>');
        });
    }
    get_comment(comment);

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

};
