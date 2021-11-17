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
import Modal from "../plugins/windreact/src/cmp/Modal/Modal";

const PublicHome = ({}) => {
    const [show, setShow] = React.useState(false);
    return (
        <div className="container mx-3 py-3">
            <PublicProvider>
                    <Router>
                        <NavBar />
                        <button
                            className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShow(true)}
                        >
                            Open small modal
                        </button>
                        <Modal show={show} closeModal={() => setShow(false)} />
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