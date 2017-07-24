import axios from 'axios';
// import phantom from 'phantom';
import webpage from 'webpage';
import url from 'url';

const BASE_URL = 'http://ac.qq.com';

export default class ACApi {

    constructor() {
        this.axios = axios.create({baseURL: BASE_URL, responseType: 'text', timeout: 15000, headers: {}});
    }

    checkLink(link) {
        if (/^http.*/.test(link)) {
            return link;
        }
        return url.resolve(BASE_URL, link);
    }

    getComicList() {}

    getComicDetail() {}

    getComicChapters(commicId) {
        let api = `/ComicView/index/id/${commicId}/cid/1`;
        return this
            .axios
            .get(api);
    }

    async getComicImages(link) {
        // const instance = await phantom.create(); const page = await
        // instance.createPage(); await page.on("onResourceRequested", function
        // (requestData) {     console.info('Requesting', requestData.url) }); const
        // status = await page.open(link); console.log(status); const content = await
        // page.property('content'); console.log(content); await instance.exit();

        var page = webpage.create();
        page.open(link, function (status) {
            var data;
            if (status === 'fail') {
                console.log('open page fail!');
            } else {
                console.log(page.content); //打印出HTML内容
            }
            page.close(); //关闭网页
            phantom.exit(); //退出phantomjs命令行
        });

    }
}