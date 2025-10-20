export default class Converter {
    static Username(txt) {
        const pattern = /\W+/ig;
        return txt.replaceAll(pattern, '').toLowerCase()
    }
}