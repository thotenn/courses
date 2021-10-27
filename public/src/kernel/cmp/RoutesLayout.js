import React from "react";
import {Redirect, Route} from "react-router-dom";
import env from "../env";

const RoutesLayout = (route) => {
    return (
        !route.redirect
            ? route.isPublic
                ? <Route
                    path={route.path}
                    render={props => (
                        <route.component {...props} routes={route.routes}/>
                    )}
                />
                : <Route path={route.path}>
                    {
                        route.isLogged
                            ? <route.component routes={route.routes} routeProps={route?.routeProps}/>
                            : <Redirect to={{
                                pathname: env.URLS.login,
                                state: {from: route.location}
                            }}/>
                    }
                </Route>
            : <Route path={route.path}><Redirect to={route.redirect} /></Route>
    );
};

export default RoutesLayout;