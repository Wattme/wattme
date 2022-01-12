import React, { Component } from "react";
import {} from "@mui/material";

class WattPurchaseAgreement extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount = () => {
        window.location.replace("/watt-purchase-agreement.pdf")
    }

    render() {
        return (
            <>

            </>
        );
    }
}

export default WattPurchaseAgreement
