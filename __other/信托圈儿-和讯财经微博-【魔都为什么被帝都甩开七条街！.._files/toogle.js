// JavaScript Document
function id(obj){
	return document.getElementById(obj);
}
function navToogle(){
 var toogle_nav=id("toogle_nav");
 var toogle_content=id("toogle_content");

  toogle_content.style.display = "block";
  toogle_nav.className="toogle_nav_hover";
 
}
function navTogle(){
 var toogle_nav=id("toogle_nav");
 var toogle_content=id("toogle_content");

  toogle_content.style.display = "none";
  toogle_nav.className="toogle_nav";
 
}
function navToogle2(){
 var toogle_topic=id("toogle_topic");
 var toogle_content2=id("toogle_content2");

  toogle_content2.style.display = "block";
  toogle_topic.className="toogle_topic_hover";
 
}
function navTogle2(){
 var toogle_topic=id("toogle_topic");
 var toogle_content2=id("toogle_content2");

  toogle_content2.style.display = "none";
  toogle_topic.className="toogle_topic";
 
}    
    if(id("m_keyword") != null)
    {        
	    var m_keyword = id("m_keyword");
	    var m_keyword_tip = id("m_keyword_tip");
	    var m_keyword_tip_blog = id("m_keyword_tip_blog");
	    var m_keyword_tip_author = id("m_keyword_tip_author");
	    var m_keyword_tip_stock = id("m_keyword_tip_stock");
	    //单击m_keyword
	    m_keyword.onclick=function(){
		    var val = m_keyword.value;
		    if( val == "搜索微博、找人...")
			    m_keyword.value = "";
		    if( val != "搜索微博、找人..."&& val != "")
			    m_keyword_tip.style.display = "block";
	    };
	    //m_keyword失去焦点;
	    m_keyword.onblur=function(){
		    setTimeout(function(){
                    if(m_keyword_tip.style.display == "block"){
			    m_keyword_tip.style.display = "none";
		        }},500);
	    }
	    //m_keyword的键盘事件
	    m_keyword.onkeyup=function(e){
	            //debugger;
	             var e = e || window.event;
                 var keyCode = e.keyCode || e.which;
                 if(keyCode==13)
                 {
                    if(m_keyword_tip_blog!=null)
                        defaultSub0();                       
                    else
                        defaultSub1();                        
                 }
		    m_keyword_tip.style.display="block";
		    //给第一项添加classname;
		    initList_top(0);
		    //判断如果默认值是否为初始值
		    if(m_keyword.value!=("搜索微博、找人...")){
		    //alert(m_keyword_tip_blog);
		      if(m_keyword_tip_blog != null)
		        m_keyword_tip_blog.innerHTML = m_keyword.value;
		      m_keyword_tip_author.innerHTML = m_keyword.value;
		      m_keyword_tip_stock.innerHTML = m_keyword.value;
		    }
		    if(m_keyword.value==("")){
			    m_keyword_tip.style.display="none";
		    }
		     if(m_keyword_tip_blog != null && m_keyword_tip_blog.innerHTML.replace(/[^\x00-\xff]/g, '** ').length>9){
			    var m_keyword_tip_elp=id("m_keyword_tip_elp");
			     m_keyword_tip_elp.style.display="block";
			     m_keyword_tip_blog.style.width="4em";
  	         };
		     if(m_keyword_tip_blog != null && m_keyword_tip_blog.innerHTML.replace(/[^\x00-\xff]/g, '** ').length<=9){
			 	    var m_keyword_tip_elp=id("m_keyword_tip_elp");
			     m_keyword_tip_elp.style.display="none";
			     m_keyword_tip_blog.style.width="";
		     }
		     if(m_keyword_tip_author.innerHTML.replace(/[^\x00-\xff]/g, '** ').length>9){
			    var m_keyword_tip_elp=id("m_keyword_tip_elp1");
			     m_keyword_tip_elp.style.display="block";
			     m_keyword_tip_author.style.width="4em";
  	         };
		      if(m_keyword_tip_author.innerHTML.replace(/[^\x00-\xff]/g, '** ').length<=9){
			    var m_keyword_tip_elp=id("m_keyword_tip_elp1");
			     m_keyword_tip_elp.style.display="none";
			     m_keyword_tip_author.style.width="";
  	         };
		      if(m_keyword_tip_stock.innerHTML.replace(/[^\x00-\xff]/g, '** ').length>9){
			    var m_keyword_tip_elp=id("m_keyword_tip_elp2");
			     m_keyword_tip_elp.style.display="block";
			     m_keyword_tip_stock.style.width="4em";
  	         };
		      if(m_keyword_tip_stock.innerHTML.replace(/[^\x00-\xff]/g, '** ').length<=9){
			    var m_keyword_tip_elp=id("m_keyword_tip_elp2");
			     m_keyword_tip_elp.style.display="none";
			     m_keyword_tip_stock.style.width="";
  	         };
	    }
}
	//初始化列表项
	function initList_top(num){
		ulRoot = id("m_keyword_tip_content");
		for (i=0; i<ulRoot.childNodes.length; i++) {
			 node = ulRoot.childNodes[i];
			 if(num && num == i){
			 	node.className += "cur";
			 };
			 if(node.nodeName=="LI"){
				node.onmouseover=function(){
					this.className = '';
					this.className += "cur";
				}
				node.onmouseout=function(){
					this.className=this.className.replace("cur","");
				}
				if(id("li_blog")!=null)
				{
			        id("li_blog").onclick=function()
				    {
				        defaultSub0();
				    }
				}
				id("li_author").onclick=function()
				{
				    defaultSub1();
				}
				if(id("li_stock")!=null)
				{
				    id("li_stock").onclick=function()
				    {
				        var toUrl="/g/"+escape(m_keyword.value)+".html";
				        defaultSub2();
				    }	
				}
			}
		};
	};

 var   currentLine=0;
if(id("m_keyword") != null)
{
    document.onkeydown = function (e)   
    {
        e = window.event || e;

        if(document.activeElement.id=="m_keyword")
        {
            switch   (e.keyCode)   
            {
                case   38:
                    currentLine--;
                    changeItem();			
                    break;
                case   40:
                    currentLine++;
                    changeItem();
                    break;
                case   13:
                    switch(currentLine)
                    {
                        case 0:
                            //defaultSub0();
                            if(m_keyword_tip_blog!=null)
                                defaultSub0();                       
                            else
                                defaultSub1();
                            break;
                        case 1:
                            defaultSub1();
                            break;
                        case 2:
                            defaultSub2();
                            break;
                        default   :
                            break;

                    }
                    break;
                default   :
                    break;
            }
        }
    }
}

function   changeItem()
{
	var it = document.getElementById('m_keyword_tip_content').getElementsByTagName('li');
    for (i=0; i<it.length; i++) {		
		{
                 it[i].className= "";
				 if(currentLine<0){
                 currentLine = it.length - 1;
				 }
                 if   (currentLine == it.length){
                  currentLine =0;}
			     }
                 it[currentLine].className="cur";
            }
 }
 function defaultSub()
 {
     
     if(m_keyword_tip_blog!=null)
       defaultSub0();                       
     else
       defaultSub1();    
 }
function defaultSub0()
{
    var goUrl="http://t.hexun.com/k/topic.html?value="+escape(m_keyword.value);
    if(WeiboWatchUserTemplate==36)
        window.location.href=goUrl;
    else
		window.open(goUrl);
}
 function defaultSub1()
{
    var goUrl="http://t.hexun.com/inviteAndFriend/searchlist.aspx?textuserNameOrMail="+escape(m_keyword.value)+"&type=1";
    if(WeiboWatchUserTemplate==36)
        window.location.href=goUrl;
    else
		window.open(goUrl);
}
function defaultSub2()
{
    var goUrl="http://t.hexun.com/Stocks.aspx?value="+escape(m_keyword.value);
    if(WeiboWatchUserTemplate==36)
        window.location.href=goUrl;
    else
		window.open(goUrl);
}
if(id("m_keyword") != null)
{
	    initList_top();
}
