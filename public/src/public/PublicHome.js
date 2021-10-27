import React, { Suspense } from "react";
import {
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import { publicRoutes, publicRedirectsRoutes } from "../kernel/routes";
import LoadingScreen from './cmp/LoadingScreen';
import RoutesLayout from '../kernel/cmp/RoutesLayout';

const PublicHome = ({}) => {
    return (
        <Router>
            <Suspense fallback={<LoadingScreen />}>
                <Switch>
                    {publicRoutes.map((route, i) => (
                        <RoutesLayout key={i} {...route} isPublic={true}/>
                    ))}
                    {publicRedirectsRoutes.map((route, i) => (
                        <RoutesLayout key={i} {...route} isPublic={true}/>
                    ))}
                </Switch>
            </Suspense>
        </Router>
    )
}

export default PublicHome;