var webpage = require('webpage'),
    page = webpage.create();

// page.viewportSize = {     width: 1024,     height: 800 }; page.clipRect = {
// top: 0,     left: 0,     width: 1024,     height: 800 }; page.settings = {
// javascriptEnabled: false,     loadImages: true,     userAgent: 'Mozilla/5.0
// (Windows NT 6.1) AppleWebKit/537.31 (KHTML, like Gecko) PhantomJS/19' +
// '.0' }; const url = 'https://www.baidu.com';

page.onConsoleMessage = function (msg) {
    console.log('CONSOLE: ' + msg);
};

page.onResourceRequested = function (request) {
    // console.log('Request ' + JSON.stringify(request, undefined, 4));
};
page.onResourceReceived = function (response) {
    // console.log('Receive ' + JSON.stringify(response, undefined, 4));
};

const url = 'http://ac.qq.com/ComicView/index/id/545388/cid/94';
console.log(`open ${url}`)
page.open(url, function (status) {
    console.log("Status: " + status);
    if (status === 'fail') {
        console.log('open page fail!');
    } else {
        var title = page.evaluate(function () {
            window.scroll(0,window.innerHeight)
            return document.title;
        });
        console.log('Page title is ' + title);

        console.log(`render --> ./snapshot/test.png`)
        page.render('./snapshot/test.png');
    }
    page.close();
    phantom.exit();
});