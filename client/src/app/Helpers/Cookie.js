export default class Cookie {
    static set(name, value, days = 7, path = "/") {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=${path}`;
    }

    static get(name) {
        const cookies = document.cookie ? document.cookie.split("; ") : [];
        for (const cookie of cookies) {
            const [key, val] = cookie.split("=");
            if (decodeURIComponent(key) === name) {
                return decodeURIComponent(val);
            }
        }
        return null;
    }

    static has(name) {
        return this.get(name) !== null;
    }

    static delete(name, path = "/") {
        document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
    }

    static getAll() {
        const cookies = {};
        document.cookie.split("; ").forEach(cookie => {
            if (cookie) {
                const [key, val] = cookie.split("=");
                cookies[decodeURIComponent(key)] = decodeURIComponent(val);
            }
        });
        return cookies;
    }
}
