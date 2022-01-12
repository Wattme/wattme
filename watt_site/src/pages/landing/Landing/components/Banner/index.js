import React from "react";
import {
    Box,
    Grid,
    Typography,

    Container
} from "@mui/material";
import {
    withStyles
} from "@mui/styles"
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class Banner extends React.PureComponent {
    render() {
        const {
            classes
        } = this.props;

        return (
            <Box className={classes.root}>

                <Container>

                    <Grid container spacing={4}>

                        <Grid item xs={12} lg={6}>

                            <Typography className={classes.title}>
                                { allTranslations(localization.landing.banner.title) }
                                <Typography component="span" className={classes.caption}>
                                    { allTranslations(localization.landing.banner.caption) }
                                </Typography>
                            </Typography>

                            <Typography className={classes.message}>
                                { allTranslations(localization.landing.banner.message) }
                            </Typography>

                            <ul className={classes.list}>
                                <li>
                                    <Typography>•&nbsp;&nbsp;&nbsp;{ allTranslations(localization.landing.banner.li1) }</Typography>
                                </li>
                                <li>
                                    <Typography>•&nbsp;&nbsp;&nbsp;{ allTranslations(localization.landing.banner.li2) }</Typography>
                                </li>
                                <li>
                                    <Typography>•&nbsp;&nbsp;&nbsp;{ allTranslations(localization.landing.banner.li3) }</Typography>
                                </li>
                                <li>
                                    <Typography>•&nbsp;&nbsp;&nbsp;{ allTranslations(localization.landing.banner.li4) }</Typography>
                                </li>
                            </ul>

                            <Grid className={classes.links} container spacing={2}>
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

                        </Grid>

                        <Grid item xs={12} lg={6}>

                            <img
                                src={require("../../../../../assets/png/landing/banner-phones.png").default}
                                className={classes.imageRight}
                            />

                        </Grid>

                    </Grid>

                </Container>


                <img
                    src={require("../../../../../assets/svg/landing/banner-footer.svg").default}
                    className={classes.imageFooter}
                />

            </Box>
        );
    }
}

const styles = {
    root: {
        padding: "80px 0",
        position: "relative",
        overflow: "hidden",
        zIndex: 1,
        backgroundColor: "#1C1C1C"
    },

    title: {
        fontSize: 55,
        lineHeight: "66px",
        color: "white",
        fontWeight: "600"
    },
    caption: {
        fontSize: 21,
        lineHeight: "25px",
        color: "white",
        marginLeft: 12
    },

    message: {
        marginTop: 8,
        fontSize: 20,
        lineHeight: "30px",
        color: "#DADADA",
        maxWidth: 470
    },

    list: {
        marginTop: 18
    },

    links: {
        marginTop: 85
    },

    imageRight: {
        marginLeft: -50,
        marginTop: -24
    },

    imageFooter: {
        position: "absolute",
        zIndex: -1,
        left: 0,
        right: 0,
        bottom: -100,
        width: "100%",
        height: 290,
        objectFit: "cover",
        objectPosition: "top"
    }
};

export default withStyles(styles)(Banner)
