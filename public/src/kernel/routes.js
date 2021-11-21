import React from "react";
import env from "./env";

export const publicRoutes = [
    {
        path: env.URLS.public.home,
        exact: true,
        // component: React.lazy(() => import('../public/views/Identify/Identify.js')),
        component: React.lazy(() => import('../public/views/SelectCourse/SelectCourse.js')),
    },
    {
        path: env.URLS.public.identify,
        exact: true,
        component: React.lazy(() => import('../public/views/Identify/Identify.js')),
    },
    {
        path: env.URLS.public.profile,
        exact: true,
        component: React.lazy(() => import('../public/views/Student/Profile.js')),
    },
];

export const publicRedirectsRoutes = [
    {   
        path: env.URLS.home,
        exact: false,
        // component: React.lazy(() => import('../public/PublicHome.js')),
        // component: React.lazy(() => import('../public/views/Identify/Identify.js')),
        // component: React.lazy(() => import('../public/views/SelectCourse/SelectCourse.js')),
        component: React.lazy(() => import('../public/views/Student/Profile.js')),
    },
    {
        path: '*',
        exact: true,
        redirect: env.URLS.error.notFound
    },
]