import React, { Component } from "react";
import queryString from "query-string";

class LitePaper extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount = () => {
        const searchObject = queryString.parse(this.props?.location?.search || "");
        const globalLanguage = (this.props?.language || "").split("-")?.[0] || "ru";
        const lang = searchObject?.lang || globalLanguage || "ru";

        window.location.replace(`/lite-paper/lite-paper-${ lang }.pdf`)
    }

    render() {
        return (
            <>

            </>
        );
    }
}

export default LitePaper
