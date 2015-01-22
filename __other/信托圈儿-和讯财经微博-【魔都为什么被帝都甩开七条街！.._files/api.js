
// JScript 文件
var ApiFile="/wbresponse.aspx";
var MsgFile="/msg/MsgResponse.aspx";
var Golbal_TimeSpan=15000;
var g_blinkswitch = 0; 
var g_blinktitle = document.title;
var blink;
function blinkNewMsg() 
{ 
   document.title = g_blinkswitch % 2==0 ? "【　　　】-" + g_blinktitle : "【新消息】-" + g_blinktitle; 
   g_blinkswitch++; 
} 

function createXmlHttp() 
{       
   var xmlreq = false;   
   if (window.XMLHttpRequest)
   {   
      xmlreq = new XMLHttpRequest();     
   } 
   else if (window.ActiveXObject) { 
      try 
      {                             
        xmlreq = new ActiveXObject("Msxml2.XMLHTTP");       
      } 
      catch (e1)
      {                                                   
          try 
          { 
              xmlreq = new ActiveXObject("Microsoft.XMLHTTP"); 
          } catch (e2) {} 
      } 
   } 
   return xmlreq; 
} 


function GetMsgHtml(curid,fromhome)
{     
     /* xmlreq.open("post",MsgFile+"?getMsg=1&curid="+curid);
      xmlreq.send();
      xmlreq.onreadystatechange=function()
      { 
          if (xmlreq.readyState==4)
          {
             if (xmlreq.status==200)
             {
                
             }
          }
     }*/       
    TotalLoad++;
    $.getIfModified(MsgFile,{getMsg:1,curid:curid,fromhome:fromhome},
    function(response)
    {
    
        if(response!=null)
        {
           var total=response.split('|')[0];
           var newMessage=response.split('|')[1];
           var aboutMe=response.split('|')[2];
           var newComment=response.split('|')[3];
           var newFollowingMe=response.split('|')[4];
           var newItem=response.split('|')[5];
           var curHtml="<h3><span onclick=\"document.getElementById('toolsB').style.display='none';IsClose=true;\" title=\"关闭\"></span>微博信息提示</h3>";
           curHtml+="<ul>";
           if(FirstLoad)
           {
              if(total>CurSum)
              {
                  ChangeFlag=true;
                  TotalChange++;
                  CurSum=total;
              }
              else
              {
                 ChangeFlag=false;
              }
           }
           else
           {
              if(total!=CurSum)
              {
                 ChangeFlag=true;
                 TotalChange++;
                 CurSum=total;
              }
              else
              {
                 ChangeFlag=false;
              }
           }
           if(newMessage>0)
           {
              curHtml+="<li id=\"limsg1\" name=\"limsg1\"><a href=\"http://t.hexun.com/list.aspx\"><strong><span id=\"spanmsg1\" name=\"spanmsg1\">"+newMessage+"</span></strong>新的短消息</a></li>";
           }
           else
           {
              curHtml+="<li id=\"limsg1\" name=\"limsg1\"><span id=\"spanmsg1\" name=\"spanmsg1\">"+newMessage+"</span><a href=\"http://t.hexun.com/list.aspx\" style=\"color:#999999\">新的短消息</a></li>";
           }
           if(aboutMe>0)
           {
              curHtml+="<li id=\"limsg2\" name=\"limsg2\"><a href=\"http://t.hexun.com/AtMy.html\"><strong><span id=\"spanmsg2\" name=\"spanmsg2\">"+aboutMe+"</span></strong>新的@你的文章</a></li>";
           }
           else
           {
              curHtml+="<li id=\"limsg2\" name=\"limsg2\"><span id=\"spanmsg2\" name=\"spanmsg2\">"+aboutMe+"</span><a href=\"http://t.hexun.com/AtMy.html\" style=\"color:#999999\">新的@你的文章</a></li>";
           }
              
          if(newComment>0)
          {
              curHtml+="<li id=\"limsg3\" name=\"limsg3\"><a href=\"http://t.hexun.com/comments.html\"><strong><span id=\"spanmsg3\" name=\"spanmsg3\">"+newComment+"</span></strong>新的评论</a></li>";
          }
          else
          {
              curHtml+="<li id=\"limsg3\" name=\"limsg3\"><span id=\"spanmsg3\" name=\"spanmsg3\">"+newComment+"</span><a href=\"http://t.hexun.com/comments.html\" style=\"color:#999999\">新的评论</a></li>";
          }
          if(newFollowingMe>0)
          {
              curHtml+="<li id=\"limsg4\" name=\"limsg4\"><a href=\"http://t.hexun.com/"+curid+"/FollowMy.html\"><strong><span id=\"spanmsg4\" name=\"spanmsg4\">"+newFollowingMe+"</span></strong>新的关注你的人</a></li>";
          }
          else
          {
              curHtml+="<li id=\"limsg4\" name=\"limsg4\"><span id=\"spanmsg4\" name=\"spanmsg4\">"+newFollowingMe+"</span><a href=\"http://t.hexun.com/"+curid+"/FollowMy.html\" style=\"color:#999999\">新的关注你的人</a></li>";
          }
          curHtml+="</ul>";
          E("toolsBcon").innerHTML=curHtml;
         
          if(ChangeFlag&&CurSum>0)
          {
             if(FirstLoad||IsClose)
             { 
                _message_tips_pop('up');
                if(IsClose)
                {
                   IsClose=false;
                   document.getElementById('toolsB').style.height="0";
                }
             }
             else
             {
                var showFlag=document.getElementById('toolsB').style.display;
                if(showFlag=="none")
                {
                   _message_tips_pop('up');
                }
                else
                {
                   document.getElementById('toolsB').style.display="";
                }
             }
             if(fromhome==1)
             {
                blink=setInterval(blinkNewMsg, 1000); 
             }
          }
          if(total==0)
          {
              document.getElementById('toolsB').style.display="none";
              if(blink!=null)
              {
                  window.clearInterval(blink);
              }
              if(fromhome==1)
              {
                 document.title="我的首页-和讯财经微博";
              }
          }
          if(!FirstLoad)
          {
             if(document.getElementById('hasnewLi')!=null)
             {
                if(newItem==0)
                {
                   document.getElementById('hasnewLi').style.display="none";
                }
                else
                {
                   document.getElementById('hasnewLi').style.display="";
                }
             }
          }
          if(FirstLoad)
          {
              window.clearInterval(showmsg);
              TimeSpan = Golbal_TimeSpan;
              window.setInterval('GetMsgHtml('+curid+','+fromhome+');',TimeSpan);
              FirstLoad=false;
          }
       }
    });
}
function AddFollow(watchid,loginid)
{
     $.getIfModified(ApiFile,{addfollow:1,watchid:watchid,loginid:loginid},
     function(response)
     { 
         //debugger;
         var flag=response.split('|')[0];
         var message=response.split('|')[1];
         if(flag==-1)
         {
             Url="http://t.hexun.com/home.html?wid="+watchid;
             document.location="http://t.hexun.com/login.aspx?gourl="+Url;
             return;
         }
         if(flag==3)
         {
             var html='<input type=button class="addbtn2" title="已关注" onclick="javascript:RemoveFollow('+watchid+','+loginid+');" />';
             $("#followlabel").html(html);
             //更新被关注数
             if(document.getElementById("followedFont") != null)
             {
                 var followedCount=parseInt(document.getElementById("followedFont").innerHTML);
                 followedCount=followedCount+1;
                 document.getElementById("followedFont").innerHTML=followedCount;
             }
             return;
         }
        
         if(flag == -2)
         {
             document.location="http://t.hexun.com/active2.aspx?IsWeibo=1&wid="+watchid;
             return;
         }
         else
         {
            if(message != undefined)
            {
                woopenError('turn2Window',360,230,message);
                return;
            }
         }
         
         
         
     });
}
function AddOtherFollow(watchid,loginid)
{
     $.getIfModified(ApiFile,{addfollow:1,watchid:watchid,loginid:loginid},
     function(response)
     {
         var flag=response.split('|')[0];
         var message=response.split('|')[1];
         if(flag==-1)
         {
             document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
             return;
         }
         if(flag==3)
         {
             var html="<span><a href=\"javascript:void(0);\" onclick=\"RemoveOtherFollow("+watchid+","+loginid+")\">取消</a>已关注</span>";
             var curP=E("otherFollowP");
             if(curP!=null)
             {
                curP.className="enduserp_yi";
                curP.innerHTML=html;
             }
             //更新被关注数
             var followedCount=parseInt(E("followedcFont").innerHTML);
             followedCount=followedCount+1;
             E("followedcFont").innerHTML=followedCount;
             return;
         }
         else
         {
            woopenError('turn2Window',360,230,message);
            return;
         }
         
     });
}
function FinAddF(watchid,loginid,isMe)
{
     var FnaA=E("FinFollowA_"+watchid);
     if(FnaA)
     {
        FnaA.innerHTML="已关注";
     }
     
    $.getIfModified(ApiFile,{addfollow:1,watchid:watchid,loginid:loginid},
    function(response)
    {        
        var flag=response.split('|')[0];
        var message=response.split('|')[1];
         if(flag==-1)
         {
             document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
             return;
         }
         if(flag==3)
         {
             if(isMe==1)
             {
                var f_M=E("followcFont");
                if(f_M!=null)
                {
                   var followCount=parseInt(f_M.innerHTML);
                   followCount=followCount+1;
                   f_M.innerHTML=followCount;
                }
                var f_b=E("followcFont_M");
                if(f_b!=null)
                {
                   var followCount=parseInt(f_b.innerHTML);
                   followCount=followCount+1;
                   f_b.innerHTML=followCount;
                }
             }
         }
         else
         {
             woopenError('turn2Window',360,230,message);
             return;
         }
         
     });
}

function FinAddFForRecommend(watchid,loginid,isMe)
{
     var FnaA=E("FinFollowA_"+watchid);
     if(FnaA)
     {
        FnaA.innerHTML="已关注Ta";
     }
     
    $.getIfModified(ApiFile,{addfollow:1,watchid:watchid,loginid:loginid},
    function(response)
    {        
        var flag=response.split('|')[0];
        var message=response.split('|')[1];
         if(flag==-1)
         {
             document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
             return;
         }
         if(flag==3)
         {
             if(isMe==1)
             {
                var f_M=E("followcFont");
                if(f_M!=null)
                {
                   var followCount=parseInt(f_M.innerHTML);
                   followCount=followCount+1;
                   f_M.innerHTML=followCount;
                }
                var f_b=E("followcFont_M");
                if(f_b!=null)
                {
                   var followCount=parseInt(f_b.innerHTML);
                   followCount=followCount+1;
                   f_b.innerHTML=followCount;
                }
             }
         }
         else
         {
             woopenError('turn2Window',360,230,message);
             return;
         }
         
     });
}

function FinAddFForRecommend4EveryDay(watchid,loginid,isMe)
{
    if (watchid==loginid)
    {
         alert("不能自己关注自己喔！");
         return;
    }
     
    $.getIfModified(ApiFile,{addfollow:1,watchid:watchid,loginid:loginid},
    function(response)
    {        
        var flag=response.split('|')[0];
        var message=response.split('|')[1];
         if(flag==-1)
         {
             document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
             return;
         }
         if(flag==3)
         {
//             if(isMe==1)
//             {
//                var f_M=E("followcFont");
//                if(f_M!=null)
//                {
//                   var followCount=parseInt(f_M.innerHTML);
//                   followCount=followCount+1;
//                   f_M.innerHTML=followCount;
//                }
//                var f_b=E("followcFont_M");
//                if(f_b!=null)
//                {
//                   var followCount=parseInt(f_b.innerHTML);
//                   followCount=followCount+1;
//                   f_b.innerHTML=followCount;
//                }
//             }
         }
         else
         {
//             woopenError('turn2Window',360,230,message);
//             return;
         }
         alert(message);
         
     });
}

function AddMyFollow(watchid,loginid,isMe)
{
     $.getIfModified(ApiFile,{addfollow:1,watchid:watchid,loginid:loginid},
     function(response)
     {
        var flag=response.split('|')[0];
             var message=response.split('|')[1];
             if(flag==-1)
             {
                 document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
                 return;
             }
             if(flag==3)
             {
                 if(isMe==1)
                 {
                     document.location.reload();
                     /* var wGz=E("gz_"+watchid);
                     if(wGz)
                     {
                        wGz.style.display="none";
                     }
                     var fF=E("followcFont");
                     if(fF)
                     {
                         var followCount=parseInt(fF.innerHTML);
                         followCount=followCount+1;
                         fF.innerHTML=followCount;
                     }
                     var TF=E("TotalFont");
                     if(TF)
                     {
                         var tfCount=parseInt(TF.innerHTML);
                         tfCount=tfCount+1;
                         TF.innerHTML=tfCount;
                     }*/
                 }
             }
             else
             {
                 woopenError('turn2Window',360,230,message);
                 return;
             }
         
     });
}
function AddMyFollowFromOther(watchid,loginid) //列表页，添加关注
{
   $.getIfModified(ApiFile,{addfollow:1,watchid:watchid,loginid:loginid},
   function(response)
   {
        var flag=response.split('|')[0];
             var message=response.split('|')[1];
             if(flag==-1)
             {
                 document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
                 return;
             }
             if(flag==3)
             {
                 var curDiv=E(watchid+"_MyA");
                 if(curDiv!=null)
                 {
                     curDiv.removeAttribute("href");
                     curDiv.setAttribute("onclick","");
                     curDiv.innerHTML="已关注";
                 }
             }
             else
             {
                 woopenError('turn2Window',360,230,message);
                 return;
             }
         
     });
}
function DelMyFollow(watchid,loginid,isMe)
{
   winconfirm("turn2Window",360,230,"取消关注确认","确定要取消对此人的关注？","delTbtn","delFbtn");
   var delTbtn= E("delTbtn");
   delTbtn.onclick=function()
    {
         $.getIfModified(ApiFile,{delfollow:1,watchid:watchid,loginid:loginid},
         function(response)
         {
             var flag=response.split('|')[0];
             var message=response.split('|')[1];
             if(flag==-1)
             {
                 document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
                 return;
             }
             if(flag==3)
             {
                 wclose("turn2Window");
                 if(isMe==1)
                 {
                     var wGz=E("gz_"+watchid);
                     if(wGz)
                     {
                        wGz.style.display="none";
                     }
                     var fF=E("followcFont");
                     if(fF)
                     {
                         var followCount=parseInt(fF.innerHTML);
                         followCount=followCount-1;
                         fF.innerHTML=followCount;
                     }
                     var TF=E("TotalFont");
                     if(TF)
                     {
                         var tfCount=parseInt(TF.innerHTML);
                         tfCount=tfCount-1;
                         TF.innerHTML=tfCount;
                     }
                     var hidTID=E("hidTid");
                     if(hidTID)
                     {
                         var curTeam=E("hidTid").value;                         
                         if(E("teamFont_"+curTeam) != null)
                         {
                             var ucount= E("teamFont_"+curTeam).innerHTML;
                             if(parseInt(ucount)>0)
                             {
                                 ucount=ucount-1;
                                 E("teamFont_"+curTeam).innerHTML=ucount;
                             }
                         }
                     }
                     var fT=E("followtFont");
                     if(fT)
                     {
                         var followCount=parseInt(fT.innerHTML);
                         followCount=followCount-1;
                         fT.innerHTML=followCount;
                     }
                 }
                 
             }
             else
             {
                 woopenError('turn2Window',360,230,message);
                 return;
             }
         });
      }
       var delFbtn= E("delFbtn");
       delFbtn.onclick=function()
       {
           wclose("turn2Window");
       }
}
//取消别人对我的关注
function DelFollowMy(other,my,isMe,othername)
{
   winconfirm("turn2Window",360,230,"阻止关注确认","你确认要阻止<strong>"+othername+"</strong>继续关注你么？","delTbtn","delFbtn","<input type=\"checkbox\" id=\"addblack\" name=\"addblack\" />同时加入黑名单");
   var delTbtn= E("delTbtn");
   delTbtn.onclick=function()
   {
         var addBlack=0;
         if(E("addblack")&&E("addblack").checked)
         {
             addBlack=1;
         }
         
         $.getIfModified(ApiFile,{delfolmy:1,my:my,other:other,addBlack:addBlack},
         function(response)
         {
             var flag=response.split('|')[0];
             var message=response.split('|')[1];
             if(flag==-1)
             {
                 document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
                 return;
             }
             if(flag==3)
             {   
              
                 wclose("turn2Window");
                 if(isMe==1)
                 {
                     var wGz=E("gz_"+other);
                     if(wGz)
                     {
                        wGz.style.display="none";
                     }
                     var fF=E("followedcFont");
                     if(fF)
                     {
                         var followCount=parseInt(fF.innerHTML);
                         followCount=followCount-1;
                         fF.innerHTML=followCount;
                     }
                     var TF=E("TotalFont");
                     if(TF)
                     {
                         var tfCount=parseInt(TF.innerHTML);
                         tfCount=tfCount-1;
                         TF.innerHTML=tfCount;
                     }
                    
                 }
                 
             }
             else
             {
                 woopenError('turn2Window',360,230,message);
                 return;
             }
         });
      }
      var delFbtn= E("delFbtn");
      delFbtn.onclick=function()
      {
           wclose("turn2Window");
      }
}
//阻止关注
function AvoidFollow(other,my,isMe,othername)
{
   winconfirm("turn2Window",360,230,"阻止关注确认","你确认要阻止<strong>"+othername+"</strong>继续关注你么？","delTbtn","delFbtn");
   var delTbtn= E("delTbtn");
   delTbtn.onclick=function()
   {
         var addBlack=0;
         $.getIfModified(ApiFile,{delfolmy:1,my:my,other:other,addBlack:addBlack},
         function(response)
         {
             var flag=response.split('|')[0];
             var message=response.split('|')[1];
             if(flag==-1)
             {
                 document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
                 return;
             }
             if(flag==3)
             {   
                
                 wclose("turn2Window");
                 var ogz = E("otherfollowlabel");
                 if(ogz)
                 {
                    ogz.style.display="none";
                 }
                 if(isMe==1)
                 {
                     var wGz=E("gz_"+other);
                     if(wGz)
                     {
                        wGz.style.display="none";
                     }
                     var fF=E("followedcFont");
                     if(fF)
                     {
                         var followCount=parseInt(fF.innerHTML);
                         followCount=followCount-1;
                         fF.innerHTML=followCount;
                     }
                     var TF=E("TotalFont");
                     if(TF)
                     {
                         var tfCount=parseInt(TF.innerHTML);
                         tfCount=tfCount-1;
                         TF.innerHTML=tfCount;
                     }
                    
                 }
                 
             }
             else
             {
                 woopenError('turn2Window',360,230,message);
                 return;
             }
         });
      }
      var delFbtn= E("delFbtn");
      delFbtn.onclick=function()
      {
           wclose("turn2Window");
      }
}
//加入黑名单
function AddBlacklist(other,my,isMe,othername)
{
   winconfirm("turn2Window",360,230,"加入黑名单确认","你确认要把<strong>"+othername+"</strong>加入你的黑名单么？","delTbtn","delFbtn");
   var delTbtn= E("delTbtn");
   delTbtn.onclick=function()
   {
         var addBlack=1;
         $.getIfModified(ApiFile,{delfolmy:2,my:my,other:other,addBlack:addBlack},
         function(response)
         {
             var flag=response.split('|')[0];
             var message=response.split('|')[1];
             if(flag==-1)
             {
                 document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
                 return;
             }
             if(flag==3)
             {   
                
                 wclose("turn2Window");
                 var ogz = E("otherfollowlabel");
                 if(ogz)
                 {
                    ogz.style.display="none";
                 }
                 if(isMe==1)
                 {
                     var wGz=E("gz_"+other);
                     if(wGz)
                     {
                        wGz.style.display="none";
                     }
                     var fF=E("followedcFont");
                     if(fF)
                     {
                         var followCount=parseInt(fF.innerHTML);
                         followCount=followCount-1;
                         fF.innerHTML=followCount;
                     }
                     var TF=E("TotalFont");
                     if(TF)
                     {
                         var tfCount=parseInt(TF.innerHTML);
                         tfCount=tfCount-1;
                         TF.innerHTML=tfCount;
                     }
                    
                 }
                confirmResult(true,'turn2Window',360,230,"加入黑名单确认：",message,"btnSucT_"+other,"(2秒后自动关闭)");
                var btnSucT=E("btnSucT_"+other);
                btnSucT.onclick=function(){
                    wclose('turn2Window');
                }
                setTimeout(function(){
                wclose('turn2Window');},2000);
                 
             }
             else if(flag==2)
             {
                  woopenError('turn2Window',360,230,message);
                  return;
             }
            else
            {
                 woopenError('turn2Window',360,230,message);
                 return;
             }
         });
      }
      var delFbtn= E("delFbtn");
      delFbtn.onclick=function()
      {
           wclose("turn2Window");
      }
}
function RemoveFollow(watchid,loginid)
{
     $.getIfModified(ApiFile,{delfollow:1,watchid:watchid,loginid:loginid},
     function(response)
     {
         var flag=response.split('|')[0];
         var message=response.split('|')[1];
         if(flag==-1)
         {
             document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
             return;
         }
         if(flag==3)
         {
             var html='<input type=button class="addbtn1" title="加关注" onclick="javscript:AddFollow('+watchid+','+loginid+');" />';
             $("#followlabel").html(html);
             //更新被关注数
             if(document.getElementById('followedFont')!=null)
             {
                 var followedCount=parseInt(E("followedFont").innerHTML);
                 followedCount=followedCount-1;
                 E("followedFont").innerHTML=followedCount;
             }
             return;
         }
         
        if(message != undefined)
        {
            woopenError('turn2Window',360,230,message);
            return;
         }
         
     });
}
function RemoveOtherFollow(watchid,loginid)
{
     $.getIfModified(ApiFile,{delfollow:1,watchid:watchid,loginid:loginid},
     function(response)
     {
         var flag=response.split('|')[0];
         var message=response.split('|')[1];
         if(flag==-1)
         {
             document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
             return;
         }
         if(flag==3)
         {
             var html="<label><input type=\"button\" name=\"Submit4\" onclick=\"AddOtherFollow("+watchid+","+loginid+")\" class=\"endjgz\" title=\"加关注\" /></label>";
             var curP=E("otherFollowP");
             if(curP!=null)
             {
                curP.className="enduserp";
                curP.innerHTML=html;
             }
             //更新被关注数
             if(E("followedcFont")!=null)
             {
                 var followedCount=parseInt(E("followedcFont").innerHTML);
                 if(followedCount>0)
                 {
                   followedCount=followedCount-1;
                   E("followedcFont").innerHTML=followedCount;
                 }
             }
             return;
         }
         else
         {
             woopenError('turn2Window',360,230,message);
             return;
         }
     });
}
delFollowTopic=function(uid,topic,oo)
{
   winconfirm("turn2Window",360,230,"删除关注话题确认","确定要删除关注话题“"+topic+"”？","delTbtn","delFbtn");
   var delTbtn= E("delTbtn");
   delTbtn.onclick=function()
   {
       $.getIfModified(ApiFile,{delFTopic:1,uid:uid,topic:escape(topic)},
       function(response)
       {
           var flag=response.split('|')[0];
           var message=response.split('|')[1];
           if(flag==-1)
           {
              document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
           }
           else if(flag==2) 
           {
                wclose("turn2Window");
                var liObj = oo.parentNode.parentNode;
                Element.remove(liObj);
	       }
	       else
	       {
	           woopenError('turn2Window',360,230,message);
	           return;
	       }
        })
   }
  var delFbtn= E("delFbtn");
  delFbtn.onclick=function()
  {
     wclose("turn2Window");
  }
}
delFollowStock=function(uid,stock,stockcode, stockType,oo)
{
   winconfirm("turn2Window",360,230,"删除关注股票确认","确定要删除关注股票“"+stock+"”？","delTbtn","delFbtn","删除后无法恢复");
   var delTbtn= E("delTbtn");
   delTbtn.onclick=function()
   {
       $.getIfModified(ApiFile,{delFStock:1,uid:uid,stock:escape(stockcode),codetype:escape(stockType)},
       function(response)
       {
           var flag=response.split('|')[0];
           var message=response.split('|')[1];
           if(flag==-1)
           {
              document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
           }
           else if(flag==2) 
           {
                wclose("turn2Window");
                var liObj = oo.parentNode.parentNode;
                Element.remove(liObj);
	       }
	       else
	       {
	           woopenError('turn2Window',360,230,message);
	           return;
	       }
        })
   }
  var delFbtn= E("delFbtn");
  delFbtn.onclick=function()
  {
     wclose("turn2Window");
  }
}
//设置插件皮肤AJAX
SetPlugSkin=function()
{
    //debugger;
    var plugW = document.getElementById("plugW").value;
    var plugH = document.getElementById("plugH").value;
    var userSelBkc = document.getElementById("userSelBkc").value;
    $.getIfModified(ApiFile,{SetPlugSkin:1,plugW:plugW,plugH:plugH,userSelBkc:userSelBkc},
     function(response)
     {
        if(response != null)
        {
            var flag=response.split('|')[0];
            var message=response.split('|')[1];
            var userID = response.split('|')[2];
            if(flag<=0)
            {
  　            alertPubError(message);
            }
            else
            {
                alertPub(message);
  　            E("jsScript").value = '<script language="javascript" src="http://shequ5.tool.hexun.com/Plugins/weiboplugins.aspx?id='+userID+'&w='+plugW+'&h='+plugH+'&t='+userSelBkc+'"></script>';
  　            E("flashScript").value = '<EMBED id="blog" name="blog" src="http://shequ5.tool.hexun.com/flash/blog.swf" width="'+plugW+'" height="'+plugH+'" type="application/x-shockwave-flash" wmode="transparent" quality="high" flashvars = "a=off&u='+userID+'&b=http://shequ5.tool.hexun.com/flash/data/bgData.xml&t=http://shequ5.tool.hexun.com/flash/data/txtDataxml.aspx&s=&k='+userSelBkc+'" devicefont = "false" play = "true" loop = "true"></EMBED>';
  　            //E("flashScript").value='http://shequ5.tool.hexun.com/flash/blog.swf?width='+plugW+'&height='+plugH+'&a=off&u='+userID+'&b=http://shequ5.tool.hexun.com/flash/data/bgData.xml&t=http://shequ5.tool.hexun.com/flash/data/txtDataxml.aspx&s=&k='+userSelBkc;
  　            window.open("http://shequ5.tool.hexun.com/TestPlugins.aspx?uid="+userID+"&w="+plugW+"&h="+plugH+"&t="+userSelBkc);
            }
        }
     });
}

//判断昵称重复
checkNickName=function(userId)
{
    var nickName =encodeURIComponent(document.getElementById("nickName").value);
    $.getIfModified(ApiFile,{checkNickName:1,nickName:nickName,userId:userId},
    function(response)
    {
        //alert(response);
        if(response=="0")
        {
           document.getElementById("nickNameerror").style.display="none";
           if(document.getElementById("hidflag")!=null)
                document.getElementById("hidflag").value = "1";
           return true; 
        }
        else if(response.split("|")[0]=="2")
        {
            var errmsg=response.split("|")[1];
            document.getElementById("nickNameerror").innerHTML = errmsg;
		    document.getElementById("nickNameerror").style.display="";
		    if(document.getElementById("oldNickName")!=null)
	            document.getElementById("nickName").value=document.getElementById("oldNickName").value;
	        if(document.getElementById("hidflag")!=null)
                document.getElementById("hidflag").value = "1";
            setTimeout(function(){
            document.getElementById("nickNameerror").style.display="none";},3000);
        }
        else
        {
            var errmsg=response.split("|")[1];
            document.getElementById("nickNameerror").innerHTML = errmsg;
		    document.getElementById("nickNameerror").style.display="";
		    
        	if(document.getElementById("hidflag")!=null)
                document.getElementById("hidflag").value = "0";
	        return false;
        }
    });
}

function WbSendSms(windowObj,w,h,content,uid)
{
    
     $.getIfModified(ApiFile,{GetSms:Math.random(),uid:uid},
     function(response)
     {
          var flag=response.split('|')[0];
          var message=response.split('|')[1];  
          if(flag==-1)
          {
              document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
          }
          else if(flag==1)
          {
              winconfirm(windowObj,w,h,"短信订阅",message,"btnT","btnF");
              var btnT=E("btnT");
              btnT.onclick=function()
              {
                   wclose(windowObj);
                   document.location="/SmsOrder.aspx";
                    
              }
              var btnF=E("btnF");
              btnF.onclick=function()
              {
                    wclose(windowObj);
              }
          }
          else if(flag==2)
          {
              confirmResult(false,windowObj,w,h,'短信订阅',message,'btnSucT','');
              var btnSucT=E("btnSucT");
              btnSucT.onclick=function(){
                  wclose(windowObj);
              }
          }
          else if(flag==3)
          {
                var limitN=response.split('|')[3];
                wopen(windowObj,w,h);
                var html="<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
                html+="<tr>";
	            html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
	            html+="</tr>";
	            html+="<tr>";
	            html+="	<td class=\"tdbgL\"></td>";
	            html+="	<td class=\"tdbgC\">";
	            html+="		<h3><span onclick=\"wclose('turn2Window');\"></span>发送微博订阅短信</h3>";
	            html+="		<form id=htmlfrm>";
	            html+="		<div class=\"win_con2\">";
            	html+="			<div class=\"win_con2_2\"><span id=\"tiptxSms\">(0条)</span><span id=\"tipInfoBoxSms\">还可以输入<strong>140</strong>个字</span></div>";
	            html+="			<p><textarea class=\"conBgtex_1\"  id=\"forwardtextarea_Sms\">"+content+"</textarea></p>";
	            html+="			<p class=\"fabup\">";
	            html+="			 <span style=\"float:left;color: rgb(204, 51, 0);\">您今日发送短信条数还有"+limitN+"条</span>	<span><input type=\"button\" id=\"forwardbtn_Sms\" value=\"确定\" class=\"conBgbtn_2\" /> &nbsp;<input type=\"button\" class=\"conBgbtn_2\" value=\"取消\" onclick=\"wclose('turn2Window');\" ></span>";
	            html+="			</p>";
	            html+="		</div>";
	            html+="		</form>";
	            html+="	</td>";
	            html+="	<td class=\"tdbgR\">&nbsp;</td>";
	            html+="</tr>";
	            html+="<tr>";
	            html+="	<td colspan=\"3\" class=\"tdbgT\"></td>";
	            html+="</tr>";
                html+="</table>";
               
               E(windowObj).innerHTML=html; 
               var mdforwardtextarea = E("forwardtextarea_Sms"); 
               
               forwardInputLimit(mdforwardtextarea,"Sms");
              
               mdforwardtextarea.onkeyup = function()
               {
                    forwardInputLimit(mdforwardtextarea,"Sms");
               }
               var forwardbtn=E("forwardbtn_Sms");
               forwardbtn.onclick = function() {
                   if (!forwardInputLimit(mdforwardtextarea,"Sms")) 
                   {
                      woopenError('turn2Window',w,h,"字数超过限制");
                      return false;
                   }
                   if(mdforwardtextarea.value==null||mdforwardtextarea.value=="")
                   {
                      woopenError('turn2Window',w,h,"内容不能为空");
                      return false;
                   }
                   forwardbtn.disabled=true;
                   var maxlen=280;
                   var contentFinal= mdforwardtextarea.value=leftB(mdforwardtextarea.value, 280);
                   ShortMsgSend(windowObj,w,h,contentFinal);
              }
          }
     });
}
ShortMsgSend=function(windowObj,w,h,content)
{
   
    $.getIfModified(ApiFile,{ShortMsg:Math.random(),content:escape(content)},
    function(response)
    {
        var flag=response.split('|')[0];
        var message=response.split('|')[1];
       if(flag==-1)
       {
          document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
       }
       else if(flag==1) 
       {
          wclose(windowObj);
          confirmResult(true,windowObj,w,h,'短信订阅',message,'btnSuccess','');
          var btnSuccess=E("btnSuccess");
          btnSuccess.onclick=function(){
              wclose(windowObj);
          }
       }
       else
       {
            woopenError(windowObj,w,h,message);
            return;
       }
    });
}
NewDYSms=function(uid,windowObj,w,h,cid)
{
    if(cid==0)
    {
        confirmResult(false,windowObj,w,h,'短信订阅','该用户还未开通短信订阅服务','btnSuccess','');
        var btnSuccess=E("btnSuccess");
        btnSuccess.onclick=function(){
                    wclose(windowObj);
        }
    }
    else
    {
       var newopen=window.open();
       newopen.location="http://vip.hexun.com/sms/subscribe.aspx?id="+cid;
    }
}
DYSms=function(uid,windowObj,w,h)
{
    
    
    $.getIfModified(ApiFile,{DYSms:Math.random(),uid:uid},
    function(response)
    {
       var flag=response.split('|')[0];
       var message=response.split('|')[1];
       if(flag==-1)
       {
         if(navigator.userAgent.indexOf("Gecko")>0||navigator.userAgent.indexOf("Safari")>0)
         {
            document.location.href="https://reg.hexun.com/login.aspx?gourl=http://vip.hexun.com/sms/subscribe.aspx?id="+message;
         }
         else
         {
            window.open("https://reg.hexun.com/login.aspx?gourl=http://vip.hexun.com/sms/subscribe.aspx?id="+message,"_blank");
         }
       }
       else if(flag==1) 
       {
         wclose(windowObj);
         if(navigator.userAgent.indexOf("Gecko")>0||navigator.userAgent.indexOf("Safari")>0)
         {
            document.location.href="http://vip.hexun.com/sms/subscribe.aspx?id="+message;
         }
         else
         {
            window.open("http://vip.hexun.com/sms/subscribe.aspx?id="+message,"_blank");
         }
       }
       else
       {
          confirmResult(false,windowObj,w,h,'短信订阅',message,'btnSuccess','');
          var btnSuccess=E("btnSuccess");
          btnSuccess.onclick=function(){
                    wclose(windowObj);
          }  
       }
    });
    
  
}


SmsApp=function(uid)
{
    $.getIfModified(ApiFile,{SmsApp:Math.random(),uid:uid,realname:escape(E("realname").value),hiddensex:E("hiddensex").value,idcard:E("idcard").value,email:escape(E("email").value),qq:E("qq").value,mobile:escape(E("mobile").value),curcom:escape(E("curcom").value),price:E("price").value,bankaccount:E("bankaccount").value,accoutname:escape(E("accoutname").value),bank:escape(E("bank").value),comadd:escape(E("comadd").value),comphone:escape(E("comphone").value),homeadd:escape(E("homeadd").value),homephone:escape(E("homephone").value),brief:escape(E("brief").value)},
    function(response)
    {
           var flag=response.split('|')[0];
           var message=response.split('|')[1];
           if(flag==-1)
           {
              document.location="http://t.hexun.com/login.aspx?gourl="+escape(window.document.location);
           }
           else if(flag==1) 
           {
              confirmResult(true,'turn2Window',360,230,'申请开通短信订阅','您的申请已经成功提交，请耐心等待和讯审核，我们将在5个工作日内给您审核结果<br/>感谢您对和讯的支持','btnSuccess','');
              var btnSuccess=E("btnSuccess");
              btnSuccess.onclick=function(){
                        wclose('turn2Window');
                        document.location.href='/smsorderlist.aspx';
              }
              setTimeout(function(){
                        wclose('turn2Window');
                        document.location.href='/smsorderlist.aspx';
                        
               },5000)
	       }
	       else
	       {
	          confirmResult(false,'turn2Window',360,230,'申请开通短信订阅',message,'btnSuccess','');
              var btnSuccess=E("btnSuccess");
              btnSuccess.onclick=function(){
                        wclose('turn2Window');
                        
                        }
              setTimeout(function(){
                        wclose('turn2Window');
                        
               },5000)
	       }
    });
}
