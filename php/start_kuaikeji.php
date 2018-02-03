<?php
$url="http://www.mydrivers.com/";
$html=file_get_contents($url);
$html=mb_convert_encoding($html ,'UTF-8','GB2312');
if($_GET['page']>1){
if($_GET['page']<9){
	//echo $_GET['page'];
$str_1='<div class="news_info news_blue" id="news_content_'.$_GET['page'].'" style="display:none;">';
$str_2='<div class="news_info news_blue" id="news_content_'.($_GET['page']+1).'" style="display:none;">';
$pot_1=strpos($html,$str_1);
$pot_2=strpos($html,$str_2);
$contents=substr($html,$pot_1,$pot_2-$pot_1);
preg_match_all("/<li>(.*)<\/li>/U",$contents,$attrcontents);
//print_r($attrcontents[0]);
$jsoncontents=json_encode($attrcontents[0],JSON_UNESCAPED_UNICODE);
//$jsoncontents=stripcslashes($jsoncontents);
echo $jsoncontents;
//echo gettype($jsoncontents);
}
else{
//echo $_GET['page'];
$str_1='<div class="news_info news_blue" id="news_content_'.$_GET['page'].'" style="display:none;">';
$str_2='<div class="module_page" id="news_content_page">';
$pot_1=strpos($html,$str_1);
$pot_2=strpos($html,$str_2);
$contents=substr($html,$pot_1,$pot_2-$pot_1);
preg_match_all("/<li>(.*)<\/li>/U",$contents,$attrcontents);
//print_r($attrcontents[0]);
$jsoncontents=json_encode($attrcontents[0],JSON_UNESCAPED_UNICODE);
//$jsoncontents=stripcslashes($jsoncontents);
echo $jsoncontents;
//echo gettype($jsoncontents);
}
}
else{

	$str_1='<div class="news_info news_blue" id="news_content_1">';
$str_2='<div class="news_info news_blue" id="news_content_2" style="display:none;">';
$pot_1=strpos($html,$str_1);
$pot_2=strpos($html,$str_2);
$contents=substr($html,$pot_1,$pot_2-$pot_1);
//echo $pot_1;
//echo $pot_2;
//echo $str_1;
//echo $contents;
preg_match_all("/<li>(.*)<\/li>/U",$contents,$attrcontents);
//print_r($attrcontents[0]);
$jsoncontents=json_encode($attrcontents[0],JSON_UNESCAPED_UNICODE);
//$jsoncontents=stripcslashes($jsoncontents);
echo $jsoncontents;
//echo gettype($jsoncontents);
}
?>