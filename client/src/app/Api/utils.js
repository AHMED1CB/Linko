const utils = {
    url: import.meta.env.VITE_API_URL,
    server: {
        paths: {
            register: "/auth/register",
            login: "/auth/login",
            profile: "/auth/profile",
            user: "/users",
            updateProfile: "/auth/profile/update",
            requests: "/requests",
            friend: "/friends",
            'friends.search': "/friends/search",

            getRequestPath: (name, ...more) => {
                return utils.url + utils.server.paths[name] + '/' + more.join('/');
            }
        }
    }
}

export default utils