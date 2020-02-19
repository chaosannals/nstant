var form = document.body.querySelector('.login-box form');
listenSubmit(form, function(e) {
    console.log(e);
}, function(e) {
    console.log(e);
});