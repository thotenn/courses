import React from "react";
import CoursesController from "../../../../kernel/controllers/models/CoursesController";

const initData = () => {
    return {
        loaded: {
            courses: false,
            categories: false
        },
        reload: true,
        categories: [],
        courses: []
    }
};

const actions = {
    INIT: 'INIT',
    RELOAD: 'RELOAD',
    ADD_COURSES: 'ADD_COURSES'
};

function coursesReducer(state, action) {
    switch (action.type) {
        case actions.INIT:
            
            break;
        case actions.RELOAD:
            return {...state, reload: !state.reload}
        case actions.ADD_COURSES:
            return {...state, loaded: {...state.loaded, courses: true}, courses: action.payload}
        default:
            return {...initData()};
    }
}

export default function useCourses(isMounted) { 
    const [state, dispatch] = React.useReducer(coursesReducer, [], () => initData());
    console.log('yea')
    const coursesController = new CoursesController();

    React.useEffect(() => {
        console.log('en useEffect: ', state.reload);
        if (state.reload) {
            coursesController.getCourses().then(data => {
                dispatch({type: actions.ADD_COURSES, payload: data});
            }).catch(error => {
                console.log(error);
            });
            dispatch({type: actions.RELOAD});
        }
    }, [state.reload]);

    return [
        state,
        actions,
        dispatch
    ]

}