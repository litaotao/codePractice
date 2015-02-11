var admin_user_cookie = "";
function readCosBetaCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return unescape( decodeURI(c.substring(nameEQ.length,c.length)));
	}
	return '';
}
function setovalue(o,v){
	if(document.getElementById(o)  !=null )document.getElementById(o).value=v.replace('+',' ');
}
function setCommForm(){
if (admin_user_cookie.length > 2) {
		setovalue('author',admin_user_cookie.split("|")[0]);
		setovalue('email',adminmail.replace("{_}","@") );
		setovalue('url',adminurl );
	}
else if(readCosBetaCookie(author_cookie).length>2){		
		setovalue('author',readCosBetaCookie(author_cookie) );
		setovalue('email',readCosBetaCookie(email_cookie) );
		setovalue('url',readCosBetaCookie(url_cookie) );
	}
	else{
		setovalue('author','');setovalue('email','');setovalue('url','');
	}
}