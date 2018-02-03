<?php

$href=$_GET["href"];
//echo $href;
$html=file_get_contents($href);
$html=mb_convert_encoding($html,"UTF-8","GB2312");
$title_pos_1=strpos($html,'article-main')+41;
$title_pos_2=strpos($html,'</h1>
            <div class="articleInfo');
$title=substr($html,$title_pos_1,$title_pos_2-$title_pos_1);
//echo $title;


$cal_pos_1=strpos($html,'articleInfo')+30;
$cal_pos_2=strpos($html,'                <div class="comment');
$cal=substr($html,$cal_pos_1,$cal_pos_2-$cal_pos_1);
//echo $cal;
$content_pos_1=strpos($html,'<div class="detail_content');
$content_pos_2=strpos($html,'<script>',$content_pos_1);
$content=substr($html,$content_pos_1,$content_pos_2-$content_pos_1);
//echo $content;

$content_arr=array("title"=>$title,"cal"=>$cal,"content"=>$content);
//print_r($content_arr);
$jsoncontents=JSON_ENCODE($content_arr,JSON_UNESCAPED_UNICODE);
//print_r($jsoncontents);
//echo $jsoncontents;

//echo $html;

?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>news</title>
<link rel="shortcut icon" href="../favicon.ico" type="image/x-icon">
<link rel="stylesheet" href="../css/main.css">
<link rel="stylesheet" href="../css/bootstrap.min.css">
<link rel="stylesheet" href="../css/news_detail.css">
<script src="../js/jquery-3.2.1.js"></script>

</head>
<body>
<!--顶部导航条-->
<div class="header">
    <div class="navbar navbar-default navbar-fixed-top" id="header_nav">
        <div class="container">
            <div class="navbar-header">
                <button style="float: left;" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-nav">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a href="#" class="navbar-brand visible-xs-inline-block"><img src="../img/logo.png" alt="" id="logo_img"></a>
                <a href="#" class="navbar-brand hidden-xs">
                   <img src="../img/logo_mini.png" alt="">
                </a>
            </div>
            <div class="navbar-collapse collapse" id="navbar-nav">
                <ul class="nav navbar-nav">
                    <li><a href="../index.html">首页</a></li>
                    <li><a href="../news_kuaikeji.html">快科技</a></li>
                    <li><a href="../news_ithome.html">IT之家</a></li>
                    <li class="active"><a href="../news_kejixun.html">科技讯</a></li>
                </ul>
                <form action="" class="navbar-form">
                    <div class="input-group">
                        <input type="text" class="form-control">
                        <div class="input-group-btn">
                            <input type="submit" class="btn btn-default" value="查找">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<!--巨幕标题-->
<div class="jumbotron" style="background:#1a0640 url('../img/kejixun.jpg') no-repeat center 20px">
    <div class="container hidden-xs" style="color:white;">
        <h3>科技讯</h3>
        <p>最新、最有趣的科技资讯</p>
    </div>
</div>
<!--路径-->
<div class="path container hidden-xs">
    <ol class="breadcrumb">
        <li><a href="../index.html">首页</a></li>
        <li><a href="../news_kejixun.html">科技讯新闻</a></li>
        <li class="active"></li>
    </ol>
</div>


 <div class="news">
   <div class="container">
    <div class="news_title">
	   <h2 id="title">

	   </h2>
	   <div id="date">
	   </div>
	</div>
	<hr>
	<div id="news_content">

	</div>
	</div>

 </div>

<div class="footer">
    <p><a href="#">联系我们</a> | <a href="#issue" data-toggle="modal">问题反馈</a> | <a href="#">返回顶部</a></p>
    <p>Copyright &copy; 2017-09-05</p>
</div>

<!--反馈框-->
<div class="modal fade" id="issue">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">

                <h4>问题反馈 <span class="close" data-dismiss="modal">&times;</span></h4>
            </div>
            <div class="modal-body">
                <div id="error_tips" style="color: #e00"></div>
                <form action="" method="post" id="form_issue">
                    <div class="input-group">
                        <div class="input-group-btn">
                            <label class="btn btn-default" for="issue_title">概述：</label>
                        </div>
                        <input type="text" id="issue_title" class="form-control" name="issue_title">
                    </div>

                        <label class="" for="issue_content">详情：</label>
                        <textarea name="issue_content" class="form-control" id="issue_content" rows="6" style="width:100%;resize: none"></textarea>

                    <div class="input-group">
                        <div class="input-group-btn">
                            <label class="btn btn-default" for="contact">联系方式：</label>
                        </div>
                        <input type="text" id="contact" class="form-control" name="contact">
                    </div>

                </form>

            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" id="issue_submit" style="width: 100%">提交</button>
            </div>
        </div>
    </div>
</div>


<script src="../js/bootstrap.min.js"></script>

<script>
$(function (){

	var content=<?php echo $jsoncontents ?>;
	$("#title").html(content.title);
	$("#date").html(content.cal);
	$("#news_content").html(content.content);

	$(".path .active").html($("#title").text());
	$("#news_content img").removeAttr("style").wrap('<div class="thumbnail"></div>');
	// 图片链接纠错
     /*
	$.each($("#news_content img"),function(key,value){
		$(value).attr("src",$(value).attr("data-original"));
	});
*/

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


});




</script>
</body>
</html>



