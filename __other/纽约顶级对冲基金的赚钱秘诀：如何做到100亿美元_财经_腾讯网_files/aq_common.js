//ver 1.3 2014-08-12
function AQ_SECAPI_ESCAPE(Url,map){
    var tmpArr = new Array;
    for(var m=0; m<Url.length; m++){
        if(Url.charAt(m) == '&'){
            var keyLen = [3,4,5,9];
            var matchFlag = 0;
            for(var n in keyLen){
                var l = keyLen[n];
                if(m+l <= Url.length){
                    var subLow = Url.substr(m,l).toLowerCase();
                    if(map[subLow]){
                        tmpArr.push(map[subLow]);
                        m = m+l-1;
                        matchFlag = 1;
                        break;
                    }
                }
            }
            if(matchFlag == 0){
                tmpArr.push(Url.charAt(m));
            }
        }else{
            tmpArr.push(Url.charAt(m));
        }
    }
    return tmpArr.join("");
}

function AQ_SECAPI_CheckXss(){
    var map = new Object();
    var escapeChars = "'\"<>`script:daex/hml;bs64,";
    for(var i=0;i<escapeChars.length;i++){
        var cha = escapeChars.charAt(i);
        var dec = cha.charCodeAt(); 
        var dec7 = dec;
        var hex = dec.toString(16);
        for(var j = 0; j<(7-dec.toString().length);  j++){
           dec7 = "0" + dec7;
        }

        map["&#" + dec +";"] = cha;
        map["&#" + dec7] = cha;
        map["&#x" + hex] = cha;
    }
    map["&lt"] = "<";
    map["&gt"] = ">";
    map["&quot"] = "\"";

    var Url = location.href;
    var Refer = document.referrer;
    Url = decodeURIComponent( AQ_SECAPI_ESCAPE(Url, map) );
    Refer = decodeURIComponent( AQ_SECAPI_ESCAPE(Refer, map));
    var XssPattern = new RegExp("['\"<>`]|script:|data:text/html;base64,");
    
    if(XssPattern.test(Url) || XssPattern.test(Refer)){
        var version = '1.3'
            , cgi = 'http://zyjc.sec.qq.com/dom'
            , img = new Image();
        img.src = cgi + "?v="+version+"&u=" + encodeURIComponent(Url)+"&r="+encodeURIComponent(Refer);
        Url = Url.replace(/['\"<>`]|script:/gi,'');
        Url = Url.replace(/data:text\/html;base64,/gi,'data:text/plain;base64,');
        location.href=Url;
    }
}

AQ_SECAPI_CheckXss();