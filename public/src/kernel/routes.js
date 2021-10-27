import React from "react";
import env from "./env";

export const publicRoutes = [
    {
        path: env.URLS.public.home,
        exact: true,
        component: React.lazy(() => import('../public/views/SelectCourse/SelectCourse.js')),
    },
];

export const publicRedirectsRoutes = [
    {   
        path: env.URLS.home,
        exact: true,
        // component: React.lazy(() => import('../public/PublicHome.js')),
        component: React.lazy(() => import('../public/views/SelectCourse/SelectCourse.js')),
    },
    {
        path: '*',
        exact: true,
        redirect: env.URLS.error.notFound
    },
]