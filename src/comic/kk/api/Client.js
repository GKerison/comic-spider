import axios from 'axios';
import cheerio from 'cheerio';
import http from 'http';
import { SERVER, URLS } from './Config';

const URL = 'http://www.kuaikanmanhua.com/web/comic/16411/'
// const DOUBAN_URL = 'http://huaban.com/'

export default class Client {

    constructor() {
        // this.http = axios.create({ baseURL: SERVER, responseType: 'text', timeout: 15000, headers: {} });
    }

    start(url = URL) {
        console.log(`开始快看漫画加载...`)
        this.open(url);
    }

    open(url) {
        http.get(url, (res) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            let error;
            if (statusCode !== 200) {
                error = new Error('Request Failed.\n' +
                    `Status Code: ${statusCode}`);
            }
            if (error) {
                console.error(error.message);
                // consume response data to free up memory
                res.resume();
                return;
            }
            res.setEncoding('utf8');
            let html = '';
            res.on('data', (chunk) => { html += chunk; });
            res.on('end', () => {
                try {
                    // console.log(html);
                    this.parse(html)
                } catch (e) {
                    console.error(e.message);
                }
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    }

    parse(html) {
        console.log(`开始快看漫画解析...`)
        // console.log(html)
        console.log(this.parseChapters(html));
        this.parseContent(html);
    }

    /**
     * 解析章节
     * @param {*页面内容} html 
     */
    parseChapters(html) {
        console.log(`解析章节...`)
        const $ = cheerio.load(html);
        let chapters = $('.chapter-list li a').map((i, item) => {
            let link = $(item);
            return {
                title: link.attr('title'),
                link: link.attr('href'),
            };
        }).toArray();
        return chapters;
    }

    /**
     * 解析正文
     * @param {*页面内容} html 
     */
    parseContent(html) {
        console.log(`解析内容...`);
    }
}