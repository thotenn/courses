import env from "../../env";
import useAuth from "../../auth/useAuth";
// import coursesConfig from "../../configs/courses";
import { getFetchJsonDict } from "../server/ApiCommons";


export default class CoursesController {
    constructor(isMounted=true) {
        this.auth = useAuth();
        this.isMounted = isMounted;
        console.log('COURSESCONTROLLER CONSTRUCTOR');
    }

    getCourses = () => {
        return new Promise((resolve, reject) => {
            getFetchJsonDict(
                env.URLS.public.APIS.cursos,
                this.auth.state.csrfToken,
                null,
                null,
                'GET'
            ).then(response => {
                if (response.status > 299) reject({});
                return response.json()
            }).then(data => {
                if (this.isMounted) {
                    resolve(data);
                } else reject({});
            }).catch(error => {
                console.log('Error en CoursesController.getCourses: ', error);
                reject({});
            })
        })
    }
}