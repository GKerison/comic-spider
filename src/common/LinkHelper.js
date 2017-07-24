import url from 'url';
export default class LinkHelper {

    check(link) {
        return /^http.*/.test(link)
    }

    complete(base, link) {
        if (check(link)) {
            return link;
        }
        return url.resolve(BASE_URL, link);
    }
}