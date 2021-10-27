const env = {
    URLS: {
        home: '/',
        login: '/login',
        error: {
            default: '/error',
            notFound: '/error/404',
            unAuthorized: '/error/401',
        },
        public: {
            home: '/home'
        }
    }
}

export default env;