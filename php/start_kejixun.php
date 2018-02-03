<?php
if($_GET['page']<2){
	$url="http://www.kejixun.com/news/";
}
else{
	$url="http://www.kejixun.com/news/".$_GET['page'].".html";
}
$html=file_get_contents($url);

$html=mb_convert_encoding($html,"UTF-8","GB2312");
//echo $html;

$str_1='<div class="list-box">';
$str_2='</section>';
$pot_1=strpos($html,$str_1);
$pot_2=strpos($html,$str_2);
$contents=substr($html,$pot_1,$pot_2-$pot_1);
$contents=str_replace("iconfont icon-biaoqian","glyphicon glyphicon-tags",$contents);
echo $contents;


?>