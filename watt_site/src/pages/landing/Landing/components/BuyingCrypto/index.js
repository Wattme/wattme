import React from "react";
import {
    Box,
    Grid,
    Typography,

    Container
} from "@mui/material";
import {
    withStyles
} from "@mui/styles";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class BuyingCrypto extends React.PureComponent {
    render() {
        const {
            classes
        } = this.props;

        return (
            <Box className={classes.root}>
                <Container sx={{ position: "relative", zIndex: 1 }}>
                    <Grid container spacing={4} alignItems="center">

                        <Grid item xs={12} lg={6}>

                            <Typography variant="h2">
                                { allTranslations(localization.landing.buyingCrypto.title) }
                            </Typography>

                            <Box mt={3}/>

                            <Typography>
                                { allTranslations(localization.landing.buyingCrypto.message) }
                            </Typography>

                        </Grid>

                        <Grid item xs={12} lg={6}>

                            <img
                                src={ require("../../../../../assets/png/landing/buying-crypto-phones.png").default }
                            />

                        </Grid>

                    </Grid>


                    <img
                        src={require("../../../../../assets/svg/landing/buying-crypto-currencies.svg").default}
                        className={classes.backgroundCurrencies}
                    />
                </Container>
            </Box>
        );
    }
}

const styles = {
    root: {
        padding: "80px 0",
        backgroundColor: "#1C1C1C"
    },
    image: {},

    backgroundCurrencies: {
        position: "absolute",
        top: "50%",
        transform: "translate(-70px, -50%)",
        zIndex: -1
    },
}

export default withStyles(styles)(BuyingCrypto)
