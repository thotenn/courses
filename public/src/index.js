import React from "react";
import ReactDOM from 'react-dom';
import AuthProvider from "./kernel/auth/AuthProvider";
import "./kernel/style.css";
import PublicHome from "./public/PublicHome";

ReactDOM.render(
    <div className="bg-gradient-to-r from-pink-500 via-red-300 to-pink-300">
        <AuthProvider>
            <PublicHome />
        </AuthProvider>
    </div>,
    document.getElementById('root')
);