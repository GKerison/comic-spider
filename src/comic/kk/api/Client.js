// import axios from 'axios';
import cheerio from 'cheerio';
// import http from 'http';
import fetch from 'node-fetch';
import path from 'path';
import fs from 'fs';
import {
    SERVER,
    URLS
} from './Config';
import LinkHelper from '../../../common/LinkHelper';

import phantom from 'phantom';

const URL = 'http://www.kuaikanmanhua.com/web/comic/16411/'
// const DOUBAN_URL = 'http://huaban.com/'

export default class Client {

    constructor() {}

    start(url = URL) {
        console.log(`开始快看漫画加载...`)
        this.open(url);
    }

    open(url) {
        // fgit
        //     .then(res => res.text())
        //     .then(html => this.parse(html))
        //     .catch(console.log);
        this.parseContent(url);
    }

    parse(html) {
        console.log(`开始快看漫画解析...`)
        // console.log(html)
        // console.log(this.parseChapters(html));
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
                link: LinkHelper.complete(SERVER, link.attr('href')),
            };
        }).toArray();
        return chapters;
    }

    /**
     * 解析正文
     * @param {*页面内容} html 
     */
    async parseContent(url) {
        console.log(`解析内容...`);
        const instance = await phantom.create(['--ignore-ssl-errors=yes', '--load-images=yes'], {
            logLevel: 'error',
        });
        const page = await instance.createPage();
        // await page.on("onResourceRequested", function (requestData) {
        //     console.info('Requesting', requestData.url)
        // });
        await page.setting('javascriptEnabled');
        const status = await page.open(url);
        // console.log(status);
        const content = await page.property('content');
        // console.log(content);

        const $ = cheerio.load(content);
        let images = $('.comic-imgs img').map((index, item) => {
            let img = $(item);
            // console.log(img.data('kksrc'));
            return {
                index: index,
                title: img.attr('title'),
                src: img.data('kksrc'),
                h: img.attr('h'),
            };
        });

        // let title = page.evaluate(() => {
        //     window.scroll(0, window.innerHeight)
        //     return window.title;
        // });
        // console.log('Page title is ' + title);
        // page.render('./snapshot/test.png');

        // page.evaluate(function () {
        //     return document.querySelector('.comic-imgs').innerHTML;
        // }).then(function (html) {
        //     console.log(`_________________________________________________`);
        //     console.log(html);
        //     console.log(`_________________________________________________`);
        // });
        await instance.exit();
        // this.saveImages(images);
    }

    saveImages(images) {
        images && images.each((index, item) => {
            console.log(item)
            fetch(item.src)
                .then((res) => {
                    let fileName = `${item.title}_${item.index}.jpg`;
                    let filePath = path.resolve(__dirname, fileName);
                    console.log(`save file to  ---> ${filePath}`);
                    let dest = fs.createWriteStream(filePath);
                    res.body.pipe(dest);
                }).catch(err => console.error);
        });
    }
}