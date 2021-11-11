import React from "react";
import useAuth from "../../kernel/auth/useAuth";
import CoursesController from "../../kernel/controllers/models/CoursesController";
import useCourses from "../../kernel/hooks/useCourses";
import PublicContext from "./PublicContext";


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

const PublicProvider = ({children}) => {
    const isMounted = React.useRef(true);
    const {state: authState} = useAuth();

    const [state, dispatch] = React.useReducer(publicReducer, [], () => initData());
    const [coursesState, coursesActions, coursesDispatch] = useCourses();

    React.useEffect(() => {
        if (!coursesState.loaded.courses){
            // Si los cursos aun no fueron cargados
            CoursesController.getCourses(isMounted.current, authState.csrfToken).then(data => {
                coursesDispatch({type: coursesActions.ADD_COURSES, payload: data});
            }).catch(error => {
                console.log(error);
            });
        }

        return () => {
            isMounted.current = false;
        }
    }, [coursesState.reload])

    return (
        <PublicContext.Provider value={{state, actions, dispatch, coursesState}}>{children}</PublicContext.Provider>
    )
}

export default PublicProvider;