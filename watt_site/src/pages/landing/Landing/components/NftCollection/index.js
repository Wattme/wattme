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

class NftCollection extends React.PureComponent {
    render() {
        const {
            classes
        } = this.props;

        return (
            <Box className={classes.root}>
                <Container>
                    <Grid container spacing={4} alignItems="center">

                        <Grid item xs={12} lg={6}>

                            <img
                                src={require("../../../../../assets/png/landing/nft-collection-phone.png").default}
                                className={classes.image}
                            />

                        </Grid>

                        <Grid item xs={12} lg={6}>

                            <Typography variant="h2">
                                { allTranslations(localization.landing.nftCollection.title) }
                            </Typography>

                            <Box mt={3}/>

                            <Typography>
                                { allTranslations(localization.landing.nftCollection.message) }
                            </Typography>

                        </Grid>

                    </Grid>
                </Container>

                <img
                    src={require("../../../../../assets/svg/landing/nfc-collection-background.svg").default}
                    className={classes.background}
                />
            </Box>
        );
    }
}

const styles = {
    root: {
        padding: "80px 0",
        position: "relative"
    },
    image: {},

    background: {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        width: 1360
    }
}

export default withStyles(styles)(NftCollection)
