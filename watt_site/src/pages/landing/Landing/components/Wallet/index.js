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

class Wallet extends React.PureComponent {
    render() {
        const {
            classes
        } = this.props;

        return (
            <Box className={classes.root}>
                <Container>
                    <Grid container spacing={4} alignItems="center">

                        <Grid item xs={12} lg={6}>

                            <Typography variant="h2">
                                { allTranslations(localization.landing.wallet.title) }
                            </Typography>

                            <Box mt={3}/>

                            <Typography
                                dangerouslySetInnerHTML={{ __html: allTranslations(localization.landing.wallet.message1) }}
                            />

                            <Box mt={3}/>

                            <Typography
                                dangerouslySetInnerHTML={{ __html: allTranslations(localization.landing.wallet.message2) }}
                            />

                            <Box mt={3}/>

                            <Typography
                                dangerouslySetInnerHTML={{ __html: allTranslations(localization.landing.wallet.message3) }}
                            />

                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <img src={require("../../../../../assets/png/landing/wallet-phone.png").default}/>
                        </Grid>

                    </Grid>
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

    image: {

    },
};

export default withStyles(styles)(Wallet)
