function setCookie(tokenObject) {
  let tokenString = JSON.stringify(tokenObject);
  setCookieLocal('eCommSample', tokenString, 1);
}

function getCookie() {
  let tokenString = getCookieLocal('eCommSample');
  let tokenObject = JSON.parse(tokenString ? tokenString : '{}');
  return tokenObject;
}

function isLoggedIn() {
  let tokenString = getCookieLocal('eCommSample');
  let tokenObject = JSON.parse(tokenString ? tokenString : '{}');
  return tokenObject && tokenObject.token ? true : false;
}

function clearCookie() {
  let domainUrl = window.location.hostname;
  document.cookie = "eCommSample=; expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;Domain=" + domainUrl + ";";
}

function setCookieLocal(cName, cValue, expDays) {
  let domainUrl = window.location.hostname;
  let d = new Date();
  d.setTime(d.getTime() + (expDays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cName + "=" + cValue + ";" + expires + ";path=/;Domain=" + domainUrl + ";";
}

function getCookieLocal(cName) {
  var name = cName + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) / 1 === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


module.exports = {
  setCookie,
  getCookie,
  clearCookie,
  isLoggedIn
}
