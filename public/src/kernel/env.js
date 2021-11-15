// const PUBLIC_URL = window.location.protocol + "//" + window.location.host;
const PUBLIC_URL = window.location.protocol + "//" + window.location.host.slice(0, -4) + '8001';
// const PUBLIC_URL = "http://localhost:8001";

const env = {
    URLS: {
        home: '/',
        login: '/login',
        error: {
            default: '/error',
            notFound: '/error/404',
            unAuthorized: '/error/401',
        },
        APIS: {
            base: PUBLIC_URL + '/api/app/courses/apirestbase/'
        },
        public: {
            home: '/home',
            identify: '/identify',
            APIS: {
                cursos: PUBLIC_URL + '/api/app/courses/courses/',
                inscriptions: PUBLIC_URL + '/api/app/courses/inscriptions/',
            }
        }
    }
}

export default env;