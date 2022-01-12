import React, { Component } from "react";
import {
    Banner as BannerComponent,
    Dashboard as DashboardComponent,
    Wallet as WalletComponent,
    NftCollection as NftCollectionComponent,
    BuyingCrypto as BuyingCryptoComponent,
    SmartTrading as SmartTradingComponent,
    WattMe as WattMeComponent
} from "./components";

class Landing extends Component {
    render() {
        return (
            <div style={{overflow: "hidden"}}>

                <BannerComponent/>

                <DashboardComponent/>

                <WalletComponent/>

                <NftCollectionComponent/>

                <BuyingCryptoComponent/>

                <SmartTradingComponent/>

                <WattMeComponent/>

            </div>
        );
    }
}

export default Landing
