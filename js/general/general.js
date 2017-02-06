function loading(status, timer) {
    console.log('called');
    if (!timer) {
        timer = 10000;
    };
    if (status) {
        $('.loader-modal').fadeIn();
        setTimeout(function() {
            $('.loader-modal').fadeOut();
        }, timer);
    } else {
        $('.loader-modal').fadeOut();
    };
};