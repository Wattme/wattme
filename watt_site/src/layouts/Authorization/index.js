import React from "react";
import {
    Box
} from "@mui/material";
import {
    withStyles
} from "@mui/styles";
import {
    Header as HeaderComponent,
    Footer as FooterComponent
} from "./components";

class Minimal extends React.Component {

    render () {
        const {
            classes
        } = this.props;

        return (
            <Box bgcolor="#F2F2F6">

                <HeaderComponent/>

                <Box
                    height="calc(100vh - 65px)"
                    overflow="auto"
                    boxSizing="border-box"
                    position="relative"
                    className="custom-scroll-bar"
                    display="flex"
                    flexDirection="column"

                    zIndex={1}
                >
                    { this.props.children }
                </Box>

            </Box>
        )
    }
}

export default Minimal
