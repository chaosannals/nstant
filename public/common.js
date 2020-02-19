/**
 * 创建一个请求对象。
 * 
 * @param {*} url 
 * @param {*} method 
 * @param {*} callback 
 */
function newRequest(url, method, callback) {
    var request = new XMLHttpRequest();
    request.open(method, url, true);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            callback(request);
        }
    }
    return request;
}

/**
 * post 请求。
 * 
 * @param {*} url 
 * @param {*} data 
 * @param {*} resolve 
 * @param {*} reject 
 */
function post(url, data, resolve, reject) {
    var request = newRequest(url, 'POST', function (request) {
        if (request.status < 300) {
            var result = request.responseText;
            if (request.responseType.indexOf('json') !== -1) {
                result = JSON.parse(result);
            }
            resolve(result);
        } else {
            reject();
        }
    });
    request.send(data);
}

/**
 * get 请求。
 * 
 * @param {*} path 
 * @param {*} param 
 * @param {*} resolve 
 * @param {*} reject 
 */
function get(path, param, resolve, reject) {
    var query = [];
    Object.keys(param).forEach(function (i) {
        query.push(i + '=' + param[i]);
    });
    var url = path + '?' + query.join('&');
    var request = newRequest(url, 'GET', function (request) {
        if (request.status < 300) {
            var result = request.responseText;
            if (request.responseType.indexOf('json') !== -1) {
                result = JSON.parse(result);
            }
            resolve(result);
        } else {
            reject();
        }
    });
    request.send(null);
}

/**
 * 
 * @param {*} name 
 */
function getCookie(name) {
    var key = encodeURIComponent(name).replace(/[-.+*]/g, "\\$&");
    var pattern = "(?:(?:^|.*;)\\s*" + key + "\\s*\\=\\s*([^;]*).*$)|^.*$";
    var value = document.cookie.replace(new RegExp(pattern), "$1");
    return decodeURIComponent(value) || null;
}

/**
 * 
 * @param {*} name 
 */
function hasCookie(name) {
    var key = encodeURIComponent(name).replace(/[-.+*]/g, "\\$&");
    var pattern = "(?:^|;\\s*)" + key + "\\s*\\=?";
    return new RegExp(pattern).test(document.cookie);
}

/**
 * 
 * @param {*} name 
 * @param {*} value 
 * @param {*} expires 
 * @param {*} domain 
 * @param {*} path 
 * @param {*} secure 
 */
function setCookie(name, value, expires, domain, path, secure) {
    if (name && /^(?:expires|max\-age|path|domain|secure)$/i.test(name)) {
        var key = encodeURIComponent(name);
        var content = key + "=" + encodeURIComponent(value);
        if (expires) {
            switch (expires.constructor) {
                case Number:
                    content += expires === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + expires;
                    break;
                case String:
                    content += "; expires=" + expires;
                    break;
                case Date:
                    content += "; expires=" + expires.toUTCString();
                    break;
            }
        }
        if (domain) {
            content += "; domain=" + domain;
        }
        if (path) {
            content += "; path=" + path;
        }
        if (secure) {
            content += "; secure";
        }
        document.cookie = content;
        return true;
    }
    return false;
}

/**
 * 
 * @param {*} name 
 * @param {*} domain 
 * @param {*} path 
 */
function removeCookie(name, domain, path) {
    if (name && hasCookie(name)) {
        var key = encodeURIComponent(name);
        var content = key + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        if (domain) {
            content += "; domain=" + domain;
        }
        if (path) {
            content += "; path=" + path;
        }
        document.cookie = content;
        return true;
    }
    return false;
}

/**
 * 
 * @param {*} element 
 * @param {*} resolve 
 * @param {*} reject 
 */
function listenSubmit(element, resolve, reject) {
    element.addEventListener('submit', function (e) {
        var fields = element.querySelectorAll('[name]');
        var data = new FormData();
        fields.forEach(function (i) {
            data.append(i.name, i.value);
        });
        e.preventDefault();
        e.stopPropagation();
        post(e.target.action, data, resolve, reject);
    });
}