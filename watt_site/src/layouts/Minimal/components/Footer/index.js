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
import allTranslations from "../../../../localization/allTranslations";
import localization from "../../../../localization/localization";
import {Link} from "react-router-dom";

class Footer extends React.PureComponent {
    render() {
        const {
            classes
        } = this.props;

        return (
            <Box className={classes.root}>
                <Container>
                    <Box className={classes.content}>
                        <Grid container spacing={24} alignItems="center" justifyContent="center">
                            <Grid item>
                                <Link to="/user-agreement">
                                    <Typography className={classes.link}>
                                        { allTranslations(localization.footer.termsOfUse) }
                                    </Typography>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/privacy-policy">
                                    <Typography className={classes.link}>
                                        { allTranslations(localization.footer.privacyPolicy) }
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        );
    }
}

const styles = {
    root: {
        backgroundColor: "#1C1C1C",
        overflow: "hidden"
    },
    content: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 96,

        "@media (max-width: 800px)": {
            flexDirection: "column",
            "& > div": {
                marginLeft: "-24px"
            },
            "& > div > .MuiGrid-item": {
                paddingLeft: 24
            },
        }
    },

    link: {
        fontSize: 14,
        lineHeight: '17px',
        textAlign: "center",
        color: "#9C9C9C",
        textDecoration: "underline",

        "&:hover": {
            color: "white"
        }
    },
}

export default withStyles(styles)(Footer)
