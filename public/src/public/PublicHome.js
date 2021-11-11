import React, { Suspense } from "react";
import {
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import { publicRoutes, publicRedirectsRoutes } from "../kernel/routes";
import LoadingScreen from './cmp/LoadingScreen';
import RoutesLayout from '../kernel/cmp/RoutesLayout';
import PublicProvider from "./providers/PublicProvider";
import NavBar from "./cmp/NavBar";

const PublicHome = ({}) => {
    return (
        <div className="container mx-3 py-3">
            <PublicProvider>
                    <Router>
                        <NavBar />
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
            </PublicProvider>
        </div>
    )
}

export default PublicHome;