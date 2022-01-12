import React, { Component } from "react";
import {
    Box,
    Container,
    Typography
} from "@mui/material";
import {
    withStyles
} from "@mui/styles";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";

class UserAgreement extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount = () => {
        window.location.replace("/user-agreement.pdf")
    }

    render() {
        const {
            classes
        } = this.props;

        return (
            <Box className={classes.root}>

                <Container>

                    <Typography variant="h2">
                        { allTranslations(localization.userAgreement.title) }
                    </Typography>

                    <Box mt={3}/>

                    <Typography
                        dangerouslySetInnerHTML={{ __html: allTranslations(localization.userAgreement.message) }}
                    />

                </Container>

            </Box>
        );
    }
}

const styles = {
    root: {
        padding: "80px 0"
    }
};

export default withStyles(styles)(UserAgreement)
