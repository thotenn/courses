import React from "react";

const initData = () => {
    return {
        identificador: '',
        course: {
            selected: false,
            pk: 0
        },
        user: {
            saved: false,
            registered: false,  // Si ya contamos con los datos a partir de la ci
            data: {
                ci: '',
                nombre: '',
                apellido: '',
                contacto: '',
                correo: ''
            },
            courses: {}  // Seria un object en el cual [pk]: {nombreCurso: '', fechaRegistro: '', estado: ''}
        }
    }
};

const actions = {
    SELECT_COURSE: 'SELECT_COURSE',
    SET_CI: 'SET_CI'
};

function publicReducer(state, action) {
    switch (action.type) {
        case actions.SELECT_COURSE:
            return {...state, course: 
                {selected: true, pk: action.payload}
            }
    
        default:
            break;
    }
}

export default function usePublic(isMounted) {
    const [state, dispatch] = React.useReducer(publicReducer, [], () => initData());

    return [
        state,
        actions,
        dispatch
    ]
}