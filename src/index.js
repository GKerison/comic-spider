const cheerio = require('cheerio');
import EventProxy from 'eventproxy';
import ACApi from './ACApi';

const EventEmitter = require('events');

// const BASE_URL = 'http://ac.qq.com'; CasperJs
// http://blog.csdn.net/kiwi_coder/article/details/36248353
// http://cnodejs.org/topic/5450e433d0c2f0fe2f5339dc
class App {
    constructor() {
        this.ACApi = new ACApi();
        // this.ep = new EventProxy(); this.ep.after('html-data', 1, (html) => {
        // console.log(`got a html-data event`)     // console.log(html);
        // this.parse(html[0]) }) this.eventer = new EventEmitter();
        // this.eventer.on('html', (html) => {     console.log(`got a html event`)
        // console.log(html);     // this.parse(html) })
    }

    start() {
        // request     .get('http://ac.qq.com/ComicView/index/id/545388/cid/1')
        // .end((err, res) => {         if (err) {             console.log(err) } else {
        //             // this.parse(res && res.text);             this         .ep
        // .emit('html-data', res.text);             // this.eventer.emit('html',
        // res.text);         }     });
        this
            .ACApi
            .getComicChapters('545388')
            .then((res) => {
                this.parse(res && res.data);
            })
            .catch((err) => {
                console.error(err)
            });
    }

    parse(html) {
        const $ = cheerio.load(html);
        $('#catalogueListWrap li > a').each((idx, item) => {
            let title = $(item).attr('title');
            let href = $(item).attr('href');
            console.log(`${title} - ${this.ACApi.checkLink(href)}`)
        });
    }
    

    downloadImages(){
        this.ACApi.getComicImages(`http://ac.qq.com/ComicView/index/id/545388/cid/94`);
    }
}

let app = new App();  
// app.start();
app.downloadImages();