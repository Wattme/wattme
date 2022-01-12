import React from "react";
import {
    Box,
    Grid,
    Button,
    Container,
    Typography,
} from "@mui/material";
import {
    withStyles
} from "@mui/styles";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class WattMe extends React.PureComponent {

    openLitePaper = () => {
        window.open("/lite-paper")
    }

    render() {
        const {
            classes
        } = this.props;

        return (
            <Box className={classes.root}>
                <Container>

                    <Box className={classes.content}>

                        <Typography variant="h2">
                            { allTranslations(localization.landing.wattMe.title) }
                        </Typography>

                        <Box mt={3}/>

                        <Typography sx={{maxWidth: 450}}>•&nbsp;&nbsp;&nbsp;{ allTranslations(localization.landing.wattMe.li1) }</Typography>

                        <Box mt={3}/>

                        <Typography sx={{maxWidth: 450}}>•&nbsp;&nbsp;&nbsp;{ allTranslations(localization.landing.wattMe.li2) }</Typography>

                        <Box mt={5}/>

                        <Button
                            color="primary"
                            variant="contained"
                            className={classes.button}
                            onClick={this.openLitePaper}
                        >
                            { allTranslations(localization.landing.wattMe.whitePaper) }
                        </Button>

                        <img src={require("../../../../../assets/png/landing/watt-me-phones.png").default} className={classes.phones}/>
                        <img src={require("../../../../../assets/svg/landing/watt-me-background.svg").default} className={classes.background}/>

                    </Box>

                    <Box mt={10}/>

                    <Typography color="white" textAlign="center">
                        { allTranslations(localization.landing.wattMe.downloadTitle) }
                    </Typography>

                    <Box mt={3}/>

                    <Grid container spacing={3} alignItems="center" justifyContent="center">
                        <Grid item>
                            <a href="https://apps.apple.com/ru/app/watt-me/id1594847330" target="_blank">
                                <img src={require("../../../../../assets/svg/landing/button-app-store.svg").default}/>
                            </a>
                        </Grid>
                        <Grid item>
                            <a href="https://play.google.com/store/apps/details?id=watt.wallet&hl=ru&gl=US" target="_blank">
                                <img src={require("../../../../../assets/svg/landing/button-google-play.svg").default}/>
                            </a>
                        </Grid>
                    </Grid>

                </Container>
            </Box>
        );
    }
}

const styles = {
    root: {
        paddingBottom: "80px"
    },

    content: {
        background: "rgba(28, 28, 28, 0.7)",
        backdropFilter: "blur(4px)",
        borderRadius: 10,
        padding: 80,
        overflow: "hidden",
        position: "relative"
    },

    button: {
        width: 335,
        height: 47,
        color: "black",
        textTransform: "initial",
        fontWeight: "600",
        position: "relative",
        zIndex: 2
    },

    background: {
        position: "absolute",
        left: 52,
        top: 65
    },

    phones: {
        position: "absolute",
        right: -190,
        top: -77
    },
}

export default withStyles(styles)(WattMe)
