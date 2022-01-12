import React from "react";
import {
    Box,
    Grid,
    Container,
    Typography
} from "@mui/material";
import {
    withStyles
} from "@mui/styles";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class SmartTrading extends React.PureComponent {
    render() {
        const {
            classes
        } = this.props;

        return (
            <Box className={classes.root}>
                <Container sx={{ position: "relative" }}>
                    <Grid container spacing={4} alignItems="center">

                        <Grid item sm={12} lg={6}>
                            <img src={require("../../../../../assets/png/landing/smart-trading-phones.png").default}/>
                        </Grid>

                        <Grid item sm={12} lg={6}>

                            <Typography
                                variant="h2"
                                dangerouslySetInnerHTML={{ __html: allTranslations(localization.landing.smartTrading.title) }}
                            />

                            <Box mt={3}/>

                            <Typography
                                dangerouslySetInnerHTML={{ __html: allTranslations(localization.landing.smartTrading.message1) }}
                            />

                            <Box mt={3}/>

                            <Typography
                                dangerouslySetInnerHTML={{ __html: allTranslations(localization.landing.smartTrading.message2) }}
                            />

                        </Grid>

                    </Grid>

                    <img
                        src={require("../../../../../assets/svg/landing/smart-trading-background.svg").default}
                        className={classes.background}
                    />
                </Container>
            </Box>
        );
    }
}

const styles = {
    root: {
        padding: "80px 0"
    },

    background: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }
}

export default withStyles(styles)(SmartTrading)
