import React from 'react';
import env from "../../kernel/env";
import {useHistory, useLocation} from "react-router-dom";
import {MdArrowBack} from "react-icons/md"

const GoBack = () => {
    const history = useHistory();
    const location = useLocation();

    return (
        location.pathname !== env.URLS.home
            ? <div
                className="flex justify-center md:justify-end"
                style={{cursor: "pointer"}}
                onClick={() => history.goBack()}
            >
                <div className="w-9 h-9 rounded-full border-2 border-white hover:border-primary-hover"><MdArrowBack
                    color="white" size="2rem"/></div>
            </div>
            : <></>
    );
}

export default GoBack;
