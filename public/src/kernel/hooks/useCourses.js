import React from "react";

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

export default function useCourses() { 
    const [state, dispatch] = React.useReducer(coursesReducer, [], () => initData());

    return [
        state,
        actions,
        dispatch
    ]

}