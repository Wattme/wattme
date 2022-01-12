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
            <Box>

                <HeaderComponent/>

                <Box height="calc(100vh - 65px)" overflow="auto" boxSizing="border-box" position="relative" zIndex={1} className="custom-scroll-bar">
                    <Box minHeight="calc(100vh - 161px)">
                        { this.props.children }
                    </Box>


                    <FooterComponent/>
                </Box>

            </Box>
        )
    }
}

export default Minimal
