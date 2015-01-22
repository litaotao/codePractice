	function Browser() {
		this.IsIE = function() {
			try {
				return this.Test(document.all && !document.contains)!=false;
			} catch(e) {
				// for check IE 5.01
				if (document.all) return true;
				return false;
			}
		}
		this.Test = function(test) {
			if (test==undefined) {
				return false;
			} else {
				return test;
			}
		}
	}
	
	var brs = new Browser();
	
	var xmlHttp = false;
	if(window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
		if(xmlHttp.overrideMimeType) {
			xmlHttp.overrideMimeType('text/xml');
		}
	} else if(window.ActiveXObject) {
		var versions = ['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.7.0', 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
		for(var i=0; i<versions.length; i++) {
			try {
				xmlHttp = new ActiveXObject(versions[i]);
			} catch(e) {
			}
		}
	}
	
	try {
		try {
			if (!brs.IsIE() && netscape.security.PrivilegeManager.enablePrivilege) {
				netscape.security.PrivilegeManager.enablePrivilege('UniversalBrowserRead');
			}
		} catch (e) {
		}
		xmlHttp.open("GET", "http://www.51testing.com/index.php?uid/159438/action/viewspace/itemid/110804/php/1/modified/1417430235000", true);
		xmlHttp.onreadystatechange=function() {
			if (xmlHttp.readyState==4) {
			}
		}
		xmlHttp.send("");
	} catch (e) {
	}
