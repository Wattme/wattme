import React from "react";
import {Switch, Redirect} from "react-router-dom";
import {
    RouteWithLayout
} from "../components";
import {
    Minimal as MinimalLayouts
} from "../layouts";
import {
    Landing as LandingPage,

    PrivacyPolicy as PrivacyPolicyPage,
    UserAgreement as UserAgreementPage,
    LitePaper as LitePaperPage,
    WattPurchaseAgreement as WattPurchaseAgreementPage
} from "../pages";

const pages = [
    {
        path: '/',
        component: LandingPage,
        layout: MinimalLayouts,
        rules: [],
        exact: true
    },
    {
        path: '/privacy-policy',
        component: PrivacyPolicyPage,
        layout: MinimalLayouts,
        rules: [],
        exact: true
    },
    {
        path: '/user-agreement',
        component: UserAgreementPage,
        layout: MinimalLayouts,
        rules: [],
        exact: true
    },
    {
        path: '/lite-paper',
        component: LitePaperPage,
        layout: MinimalLayouts,
        rules: [],
        exact: true
    },
    {
        path: '/watt-purchase-agreement',
        component: WattPurchaseAgreementPage,
        layout: MinimalLayouts,
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
