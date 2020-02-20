var form = document.body.querySelector('.login-box form');
listenSubmit(form, function(e) {
    showMessage('登录成功。');
    window.location.href = '/panel';
}, function(e) {
    showMessage('登录失败。');
});