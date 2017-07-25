import url from 'url';

class LinkHelper {

    check(link) {
        return /^http.*/.test(link)
    }

    complete(base, link) {
        if (this.check(link)) {
            return link;
        }
        return url.resolve(base, link);
    }
}

const helper = new LinkHelper();
export default helper;