const cheerio = require('cheerio');
const request = require('superagent');
import url from 'url';
import EventProxy from 'eventproxy';
const EventEmitter = require('events');

const BASE_URL = 'http://ac.qq.com';

//CasperJs http://blog.csdn.net/kiwi_coder/article/details/36248353
//http://cnodejs.org/topic/5450e433d0c2f0fe2f5339dc
class App {
    constructor() {
        console.log(`constuctor...`)
        this.ep = new EventProxy();
        this.ep.after('html-data', 1, (html) => {

            console.log(`got a html-data event`)
            // console.log(html);
            this.parse(html[0])
        })

        this.eventer = new EventEmitter();
        this.eventer.on('html', (html) => {
            console.log(`got a html event`)
            console.log(html);
            // this.parse(html)
        })
    }

    start() {
        request.get('http://ac.qq.com/ComicView/index/id/545388/cid/1')
            .end((err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    // this.parse(res && res.text);

                    this.ep.emit('html-data', res.text);
                    // this.eventer.emit('html', res.text);
                }
            });
    }

    parse(html) {
        const $ = cheerio.load(html);
        $('#catalogueListWrap li > a').each((idx, item) => {
            // console.log($(item).attr('href'));
            let title = $(item).attr('title');
            let href = $(item).attr('href');
            console.log(`${title} - ${url.resolve(BASE_URL,href)}`)
        });
    }
}

let app = new App();
app.start();