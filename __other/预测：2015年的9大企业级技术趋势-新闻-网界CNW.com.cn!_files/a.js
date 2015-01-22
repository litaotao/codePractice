
//热点排行切换
$(function(){
	$(".right3 h2 ul li").each(function(index){//找到live下的每个li
	$(this).mouseover(function(){//当鼠标点击的时候
	$(".paihang").addClass("none");//隐藏
	$(".paihang:eq("+index+")").removeClass("none")//使li与paihang相对应。
	$(".right3 h2 ul li").removeClass("hover");//去除边框，先显示。
	$(this).addClass("hover")//再隐藏。
	})
	})
	
	
	
})

//文章页切换
$(function(){
	$(".ContTabTitle ul li a").each(function(index){//找到live下的每个li
	$(this).mouseover(function(){//当鼠标点击的时候
	$(".ContTabCont").addClass("none");//隐藏
	$(".ContTabCont:eq("+index+")").removeClass("none")//使li与paihang相对应。
	$(".ContTabTitle ul li a").removeClass("ContTabTitleOne");//去除边框，先显示。
	$(this).addClass("ContTabTitleOne")//再隐藏。
	})
	})
	
	
	$(".qiehuan2Title ul li a").each(function(index){//找到live下的每个li
	$(this).mouseover(function(){//当鼠标点击的时候
	$(".qiehuan2Cont").addClass("none");//隐藏
	$(".qiehuan2Cont:eq("+index+")").removeClass("none")//使li与paihang相对应。
	$(".qiehuan2Title ul li a").removeClass("QiehuannumOne");//去除边框，先显示。
	$(this).addClass("QiehuannumOne")//再隐藏。
	})
	})
	
	
	
	/*加载更多

		
	$(".main3-leftList .jiazai1").click(
			function(){
				$(".main3-leftList .jiazaiCont1").removeClass("none")
				$(".main3-leftList .jiazai1").css("display","none");//隐藏
				
				}
	)
	$(".main3-leftList .jiazai2").click(
			function(){
				$(".main3-leftList .jiazaiCont2").removeClass("none")
				$(".main3-leftList .jiazai2").css("display","none");//隐藏
				
				}
	)
	*/
	/*行业应用加载更多
	
	$(".ContBox .jiazai3").click(
			function(){
				$(".ContBox2").removeClass("none")
				$(".ContBox .jiazai3").css("display","none");//隐藏
				
				}
	)
	$(".ContBox .jiazai4").click(
			function(){
				$(".ContBox3").removeClass("none")
				$(".ContBox .jiazai4").css("display","none");//隐藏
				
				}
	)
	*/
	/*新闻加载更多
	$(".ContBox .jiazai5").click(
			function(){
				$(".ContBox4").removeClass("none")
				$(".ContBox .jiazai5").css("display","none");//隐藏
				
				}
	)
	$(".ContBox .jiazai6").click(
			function(){
				$(".ContBox5").removeClass("none")
				$(".ContBox .jiazai6").css("display","none");//隐藏
				
				}
	)
		*/
		
		
		
/*首页模拟翻页
$(".IndexTuijian0 .TuijianFanye span").each(function(index){//找到live下的每个li
	$(this).click(function(){//当鼠标点击的时候
	$(".IndexCont").addClass("none");//隐藏
	$(".IndexCont:eq("+index+")").removeClass("none")//使li与paihang相对应。
	$(".IndexTuijian0 .TuijianFanye span").removeClass("FanyeOn");//去除边框，先显示。
	$(this).addClass("FanyeOn")//再隐藏。
	$(".IndexTuijian2 .TuijianFanye span").removeClass("FanyeOn");//去除边框，先显示。
	$(".IndexTuijian2 .TuijianFanye span:eq("+index+")").addClass("FanyeOn")//再隐藏。
	})
	})
	
$(".IndexTuijian2 .TuijianFanye span").each(function(index){//找到live下的每个li
	$(this).click(function(){//当鼠标点击的时候
	$(".IndexCont").addClass("none");//隐藏
	$(".IndexCont:eq("+index+")").removeClass("none")//使li与paihang相对应。
	$(".IndexTuijian .TuijianFanye span").removeClass("FanyeOn");//去除边框，先显示。
	$(this).addClass("FanyeOn")//再隐藏。
	$(".IndexTuijian0 .TuijianFanye span").removeClass("FanyeOn");//去除边框，先显示。
	$(".IndexTuijian0 .TuijianFanye span:eq("+index+")").addClass("FanyeOn")//再隐藏。
	})
	})
	
	
	*/
})

function search()
{
	document.form1.action = "http://search.cnw.com.cn/searchview.aspx";
	document.form1.submit();
	return false;
}



