/**
 * Obtiene la Cookie actual
 * @param {String} name Nombre del parametro en la Cookie
 * @return {String}
 */
 export const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

/**
 * Obtiene el CSRF Token actual
 * @return {String}
 */
export const getCsrfToken = () => {
    return getCookie('csrftoken');
};
/*
const checkStatus = resp => {
    if (resp.status >= 200 && resp.status < 300){
        return resp;
    }
}*/

/**
 * @param {String} urlFetch Es la url para la consulta.
 * @param {String} csrftoken Es el csrftoken del formulario o consulta
 * @param {String} usertoken Es el token del usuario que realiza la consulta
 * @param {Object} jsonDict El json a enviar.
 * @param {String} method El tipo de consulta.
 *
 * @return {Promise}
 */
export const getFetchJsonDict = (urlFetch, csrftoken = null, usertoken = null, jsonDict = null, method = 'POST') => {
    let headerObj = {'Content-type': 'application/json'};
    if (csrftoken !== null) {
        headerObj['X-CSRFToken'] = csrftoken;
    }
    if (usertoken !== null) {
        headerObj['Authorization'] = `Token ${usertoken}`;
    }
    return fetch(urlFetch, {
        method: method,
        headers: headerObj,
        body: jsonDict != null ? JSON.stringify(jsonDict) : undefined
    });
};

export const getFetchPdf = (urlFetch,
                            csrftoken = null,
                            usertoken = null,
                            jsonDict = null,
                            method = 'POST',
                            fnState = null,
                            name = 'download.pdf'
) => {
    let headerObj = {'Content-type': 'application/pdf'};
    if (csrftoken !== null) {
        headerObj['X-CSRFToken'] = csrftoken;
    }
    if (usertoken !== null) {
        headerObj['Authorization'] = `Token ${usertoken}`;
    }
    return fetch(urlFetch, {
        method: method,
        headers: headerObj,
        body: jsonDict != null ? JSON.stringify(jsonDict) : undefined
    }).then(response => {
        if (response.status >= 200) {
            return response.blob();
        } else {
            console.log('error');
            if (fnState != null) {
                fnState(false);
            }
            return null;
        }
    }).then(blob => {
        if (blob === null) {
            if (fnState != null) {
                fnState(false);
            }
            return null;
        }
        const url = window.URL.createObjectURL(
            new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.setAttribute(
            'download',
            name,
        );

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
        if (fnState != null) {
            fnState(false);
        }
    }).catch(err => {
        console.log(err);
        if (fnState != null) {
            fnState(false);
        }
    });
};