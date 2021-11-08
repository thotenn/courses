import React from "react";
import ReactDOM from 'react-dom';
import AuthProvider from "./kernel/auth/AuthProvider";
import "./kernel/style.css";
import PublicHome from "./public/PublicHome";

ReactDOM.render(
    <AuthProvider>
        <PublicHome />
    </AuthProvider>,
    document.getElementById('root')
);