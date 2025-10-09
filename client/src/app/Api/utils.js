const utils = {
    url: import.meta.env.VITE_API_URL,
    server: {
        paths: {
            register: "/auth/register",
            login: "/auth/login",
            profile: "/auth/profile",

            getRequestPath: (name) => {
                return utils.url + utils.server.paths[name];
            }
        }
    }
}

export default utils