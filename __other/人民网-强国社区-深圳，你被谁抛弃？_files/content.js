function doZoom(size){
	document.getElementById('zoom').style.fontSize=size+'px'
//	setTailPosition()
	return false;
}

function checkboard(){
	var res = true;
	if (form1.content.value==null || form1.content.value=="") {
		alert("发言内容不能为空！");
		res = false;
	}
	return res;
}

function doPrint() {
	if (window.print) {
		var p_title       = document.all.p_title.innerHTML;
		var p_publishtime = document.all.p_publishtime.innerHTML;
		var p_navigator   = document.all.p_navigator.innerHTML;
		var p_content     = document.all.p_content.innerHTML;
		var p_editor      = document.all.p_editor.innerHTML;
		var p_origin      = document.all.p_origin.innerHTML;
		
		var css = '<style type="text/css">' +
				  'p {  line-height: 140%}' +
				  '.fsubtitle {  line-height: 140%}' +
				  '.ftitle {  line-height: 140%; font-size: 24px; color: #000000}' +
				  'td {  font-size: 12px; color: #000000}' +
				  '</style>' ;

		var head ='<table width="600" border="0">' +
				  ' <tr> ' +
				  '    <td><img src="/img/logo.gif" width="173" height="60"> </td>' +
				  '  </tr>' +
				  '</table>';

		var nav  ='<table width="600" border="0" cellspacing="0" cellpadding="5"> ' +
			      '  <tr> ' +
			      '    <td width="605">' + p_navigator + '</td>' +
			      '    <td width="155" align="right">' + p_publishtime + '</td>' +
			      '  </tr>' +
			      '</table>' +
			      '<img src="/img/dot_red.gif" width="600" height="1" vspace="1"><br>' ;

		var body ='<table width="600" border="0" cellspacing="0" cellpadding="5">' +
			  	  '  <tr> ' +
			  	  '    <td  class="fbody" colspan="2"> ' +
			  	  '      <div align="center" class=fsubtitle>' + p_title + '</div>' + p_content + 
			  	  '    </td>' +
			  	  '  </tr>' +
			  	  '  <tr>' +
			      '    <td width="50%" height="50">' + p_origin + '</td>' +
			      '    <td align="right">' + p_editor + '</td>' +
			      '  </tr>' +
			  	  '</table>';

		var tail ='<img src="/img/dot_red.gif" width="600" height="1" vspace="1"><br>' +
				  '<table width="600" border="0" cellpadding="10">' +
				  '  <tr> ' +
				  '    <td align="center">人 民 网 版 权 所 有 ，未 经 书 面 授 权 禁 止 使 用<br>' +
				  '      Copyright &copy; 2002 www.people.com.cn. All rights reserved </td>' +
				  '  </tr>' +
				  '</table>';
	
		document.body.innerHTML = '<center>' + css + head + nav + body + tail + '</center>';
		window.print();
	}
}
