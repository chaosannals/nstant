var output = document.body.querySelector('.output-area');
var form = document.body.querySelector('.form');
var textarea = form.querySelector('textarea');
var submitButton = form.querySelector('button');
var host = window.location.host;
var ws = new WebSocket('ws://' + host);

ws.onopen = function () {
    if (!hasCookie('token')) {
        ws.close();
        window.location.href = '/';
    }
};

ws.onmessage = function (m) {
    var content = JSON.parse(m.data);
    var p = document.createElement('p');
    p.className = 'another';
    p.innerText = content.user + ':' + content.message;
    output.appendChild(p);
    output.scrollTo(0, output.scrollHeight);
}

ws.onclose = function () {
    console.log('close');
}

submitButton.addEventListener('click', function () {
    if (ws.readyState != 1) return;
    var message = textarea.value;
    textarea.disabled = true;
    submitButton.disabled = true;
    ws.send(JSON.stringify({
        message: message
    }));
    var p = document.createElement('p');
    p.className = 'myself';
    p.innerText = message;
    output.appendChild(p);
    textarea.value = '';
    textarea.disabled = false
    submitButton.disabled = false;
    output.scrollTo(0, output.scrollHeight);
});