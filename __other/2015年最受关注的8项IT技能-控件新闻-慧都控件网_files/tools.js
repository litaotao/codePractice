function arrayContains(array, item) {
    if (!array || array.length == 0) {
        return false;
    }

    for (var index = 0; index < array.length; index++) {
        if (item == array[index]) {
            return true;
        }
    }

    return false;
}

function is_email(message){
    if(isNullOrEmpty(message)){
        return false;
    }
			
    var regex = /^\s*[a-zA-Z0-9_\+-]+(\.[a-zA-Z0-9_\+-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.([a-zA-Z]{2,4})\s*$/;
    if(!regex.test(message)){
        return false;
    }
			
    return true;
}

function is_mobile(message) {
    if (isNullOrEmpty(message)) {
        return false;
    }

    var regex = /^1\d{10}$/;
    if (!regex.test(message)) {
        return false;
    }

    return true;
}

function tryGetCookieValue(name, defaultValue) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) {
        return decodeURIComponent(arr[2]);
    }
    return defaultValue;
}

function HTMLEncode(text) {
    if (!text)
        return '';

    text = text.replace(/&/g, '&amp;');
    text = text.replace(/</g, '&lt;');
    text = text.replace(/>/g, '&gt;');

    return text;
}

function arrayContains(array, item) {
    if (!array || array.length == 0) {
        return false;
    }

    for (var index = 0; index < array.length; index++) {
        if (item == array[index]) {
            return true;
        }
    }

    return false;
}

function isNullOrEmpty(str) {
    return str == null || str.length == 0;
}

function isNullOrWhitespace(str) {
    if(isNullOrEmpty(str)) {
        return true;
    }

    for (var index = 0; index < str.length; index++) {
        if(!isNullOrEmpty(str[index])) {
            return false;
        }
    }

    return true;
}

function setCommentCookie(commentId,key) {
    var commentIds = tryGetCookieValue(key);
    if (commentIds == '') {
        setCookie(key, commentId, 24 * 1000 * 60 * 60 * 7);
    } else {
        setCookie(key, (commentIds + "," + commentId), 24 * 1000 * 60 * 60 * 7);
    }
}

function arrayKeyContains(array, key) {
    if (!array || array.length == 0) {
        return false;
    }
    for (var index = 0; index < array.length; index++) {
        if (key == array[index].key) {
            return true;
        }
    }

    return false;
}

function arrayRemoveAt(array, item) {

    if (!array || array.lenth == 0) {
        return array;
    }

    for (var index = 0; index < array.length; index++) {
        if (array[index] == item) {
            array.splice(index, 1);
        }
    }

    return array;
}

function arrayRemoveAtkey(array, key) {

    if (!array || array.lenth == 0) {
        return array;
    }

    for (var index = 0; index < array.length; index++) {
        if (array[index].key == key) {
            array.splice(index, 1);
        }
    }

    return array;
}



String.prototype.StringFormat = function () {
    if (arguments.length == 0) {
        return this;
    }
    for (var StringFormat_s = this, StringFormat_i = 0; StringFormat_i < arguments.length; StringFormat_i++) {
        StringFormat_s = StringFormat_s.replace(new RegExp("\\{" + StringFormat_i + "\\}", "g"), arguments[StringFormat_i]);
    }
    return StringFormat_s;
};
