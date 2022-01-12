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

class Dashboard extends React.PureComponent {
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
                                src={require("../../../../../assets/png/landing/dashboard-phone.png").default}
                                className={classes.image}
                            />
                        </Grid>

                        <Grid item xs={12} lg={6}>

                            <Typography variant="h2">
                                { allTranslations(localization.landing.dashboard.title) }
                            </Typography>

                            <Box mt={3}/>

                            <Typography>
                                { allTranslations(localization.landing.dashboard.message1) }
                            </Typography>

                            <Box mt={3}/>

                            <Typography>
                                { allTranslations(localization.landing.dashboard.message2) }
                            </Typography>

                        </Grid>

                    </Grid>
                </Container>
            </Box>
        );
    }
}

const styles = {
    root: {
     padding: "80px 0"
    },

    image: {
        position: "relative",
        // right: -75,
        // bottom: -5
    },
};

export default withStyles(styles)(Dashboard)
