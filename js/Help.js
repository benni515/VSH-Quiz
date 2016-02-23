//Function to create tags
function CreateTag(type, text, appendto, classname, id, clickfunc) {
	var tag = document.createElement(type);
	tag.innerHTML = text;
	tag.id = id;
	tag.className = classname;
	tag.onclick = clickfunc;
	document.getElementById(appendto).appendChild(tag);
}

//Cookies

//Set Cookies
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
//Get Cookies
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}