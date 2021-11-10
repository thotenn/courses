import env from "../../env";
import { getFetchJsonDict } from "../server/ApiCommons";


export default class CoursesController {
    constructor(csrfToken, isMounted=true) {
        this.isMounted = isMounted;
        this.csrfToken = csrfToken;
    }

    /**
     * 
     * @returns {Promise<Array<{pk: number, nombre: string, descripcion: string, categoria: string, habilitado: boolean}>>|Promise<Object>}
     */
    getCourses = () => {
        return new Promise((resolve, reject) => {
            getFetchJsonDict(
                env.URLS.public.APIS.cursos,
                this.csrfToken,
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

    /**
     * Obtiene el nombre de un curso por el pk enviado
     * @param pk {number}
     * @param courses {Array<{pk: number, nombre: string, descripcion: string, categoria: string, habilitado: boolean}>}
     * @returns {string|null}
     */
    getNameByPk = (pk, courses) => {
        for (const item of courses){
            if (item.pk === pk){
                return item.nombre
            }
        }
        return null;
    }
}