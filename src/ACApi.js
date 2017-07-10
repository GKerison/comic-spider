import axios from 'axios';
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

    getComicImages() {}
}