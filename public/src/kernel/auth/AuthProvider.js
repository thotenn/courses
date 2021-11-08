import React, { Children } from 'react';
import { getCsrfToken } from '../controllers/server/ApiCommons';
import AuthContext from './AuthContext';

const initData = () => {
    return {
        csrfToken: '',
        user: {},
    }
};

const actionsAuth = {
    INIT: 'INIT'
};

function authReducer(state, action) {
    switch (action.type) {
        case actionsAuth.INIT:
            return {
                ...state,
                csrfToken: getCsrfToken()
            }
    
        default:
            return {
                ...initData()
            }
    }
    
}

const AuthProvider = ({children}) => {
    const [state, dispatch] = React.useReducer(authReducer, [], () => initData());

    React.useEffect(() => {
        dispatch({type: actionsAuth.INIT})
    }, []);

    return (
        <AuthContext.Provider value={{state, dispatch, actionsAuth}}>{children}</AuthContext.Provider>
    )
};

export default AuthProvider;