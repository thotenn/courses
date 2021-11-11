import env from "../../env";
import { getFetchJsonDict } from "../server/ApiCommons";


export default class InscriptionsController {
    /**
     * @param isMounted {boolean}
     * @param csrfToken {string}
     * @returns {Promise<Array<{pk: number, nombre: string, descripcion: string, categoria: string, habilitado: boolean}>>|Promise<Object>}
     */
    static isEnrolled = (identificador, course_pk, isMounted, csrfToken) => {
        const body = {
            type: "ins_is_enrolled",
            payload: {identificador, course_pk}
        };
        return new Promise((resolve, reject) => {
            getFetchJsonDict(
                env.URLS.public.APIS.inscriptions,
                csrfToken,
                null,
                body,
                'POST'
            ).then(response => {
                if (response.status > 299) reject({});
                return response.json()
            }).then(data => {
                if (isMounted) {
                    resolve(data);
                } else reject({});
            }).catch(error => {
                console.log('Error en InscriptionsController.isEnrolled: ', error);
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
    static getNameByPk = (pk, courses) => {
        for (const item of courses){
            if (item.pk === pk){
                return item.nombre
            }
        }
        return null;
    }
}