import React from "react";
import {Switch, Redirect} from "react-router-dom";
import {
    RouteWithLayout
} from "../components";
import {
    Authorization as AuthorizationLayouts
} from "../layouts";
import {
    Authorization as AuthorizationPage,

    ForgotPassword as ForgotPasswordPage,
    ForgotPasswordConfirm as ForgotPasswordConfirmPage,

    Registration as RegistrationPage,
    RegistrationConfirm as RegistrationConfirmPage,

    ProfileForm as ProfileFormPage
} from "../pages";

const pages = [
    {
        path: '/',
        component: AuthorizationPage,
        layout: AuthorizationLayouts,
        rules: [],
        exact: true
    },

    {
        path: '/forgot-password',
        component: ForgotPasswordPage,
        layout: AuthorizationLayouts,
        rules: [],
        exact: true
    },
    {
        path: '/forgot-password/confirm',
        component: ForgotPasswordConfirmPage,
        layout: AuthorizationLayouts,
        rules: [],
        exact: true
    },

    {
        path: '/registration',
        component: RegistrationPage,
        layout: AuthorizationLayouts,
        rules: [],
        exact: true
    },
    {
        path: '/registration/confirm',
        component: RegistrationConfirmPage,
        layout: AuthorizationLayouts,
        rules: [],
        exact: true
    },

    {
        path: '/profile-form',
        component: ProfileFormPage,
        layout: AuthorizationLayouts,
        rules: [],
        exact: true
    },
];

const LandingRoutes = () => {
    return (
        <Switch>
            {
                pages.map((page, idx) => (
                    <RouteWithLayout
                        key={'page-' + idx}
                        {...page}
                    />
                ))
            }

            <Redirect to="/"/>
        </Switch>
    );
};

export default LandingRoutes;
