var chinazTopBarMenu = {
    create: function (target, menucontents) {
        if (!document.getElementById(menucontents)) {
            return;
        }
        var contents_wrap = document.getElementById(menucontents);
        var contents = contents_wrap.innerHTML;
        target.className += " hover";
        var dropdownmenu_wrap = document.createElement("div");
        dropdownmenu_wrap.className = "dropdownmenu-wrap";
        var dropdownmenu = document.createElement("div");
        dropdownmenu.className = "dropdownmenu";
        dropdownmenu.style.width = "auto";
        var dropdownmenu_inner = document.createElement("div");
        dropdownmenu_inner.className = "dropdownmenu-inner";
        dropdownmenu_wrap.appendChild(dropdownmenu);
        dropdownmenu.appendChild(dropdownmenu_inner);
        dropdownmenu_inner.innerHTML = contents;
        if (target.getElementsByTagName("div").length == 0) {
            target.appendChild(dropdownmenu_wrap);
        }
    },
    clear: function (target) {
        target.className = target.className.replace("hover", "");
    }
}

function setOpenLinkBlank(id){
    if (!document.getElementById(id)) return;
    var links = document.getElementById(id).getElementsByTagName("a");
    if (links) {
        for (var i = 0; i<links.length; i++) {
            links[i].setAttribute("target", "_blank");
        }
    }
}

var max_tab = function (objid) {
    var obj = document.getElementById(objid);
    var uls = obj.getElementsByTagName("ul");
    var liarr;
    var tabindex;
    var th = this;
    this.Tabs = [];
    this.List = [];
    liarr = uls[0].getElementsByTagName("li");
    for (var i = 0; i < liarr.length; i++) {
        liarr[i].onmousemove = function (e) { th.tab_swith(e) };
        this.Tabs.push(liarr[i]);
    }
    for (var i = 1; i < uls.length; i++)
        this.List.push(uls[i]);
}

max_tab.prototype.tab_swith = function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;

    while (target.nodeName.toLowerCase() != "li")
        target = target.parentNode;

    if (target.childNodes[0].className == "current") return;

    var tabindex = -1;
    for (var i = 0; i < this.Tabs.length; i++) {
        if (this.Tabs[i] == target)
            tabindex = i;
        this.Tabs[i].childNodes[0].className = tabindex == i ? "current" : "";
    }

    for (var i = 0; i < this.List.length; i++)
        this.List[i].style.display = i == tabindex ? "" : "none";
}

function writeCookie(name, value, hours) {
    var expire = "";
    if (hours) {
        expire = new Date((new Date()).getTime() + hours * 3600000);
        expire = "; expires=" + expire.toGMTString();
    }
    document.cookie = name + "=" + escape(value) + expire;
}

function deleteCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    document.cookie = name + "=; expires=" + exp.toGMTString();
}

function readCookie(name) {
    var cookieValue = "";
    var search = name + "=";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1) end = document.cookie.length;
            cookieValue = unescape(document.cookie.substring(offset, end))
        }
    }
    return cookieValue;
}