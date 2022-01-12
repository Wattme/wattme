import React from "react";
import {
    Box,
    Grid,
    Typography,

    Container
} from "@mui/material";
import {
    makeStyles
} from "@mui/styles";
import {Link} from "react-router-dom";
import {compose} from "recompose";
import {connect} from "react-redux";
import clsx from "clsx";
import {setLanguage} from "../../../../states/global";

const Header = (props) => {
    const {language} = props;
    const classes = useStyles();

    const handleChangeLanguage = async (lang) => {
        await props.setLanguage(lang);

        window.location.reload();
    }

    return (
        <Box
            className={classes.root}
        >
            <Container>
                <Grid container alignItems="center" justifyContent="space-between" className={classes.content}>
                    <Grid item>
                        <Link to="/">
                            <Box className={classes.logo}>
                                <Box className={classes.logoIcon}>
                                    <img
                                        src={require("../../../../assets/logos/logo-header.svg")?.default}
                                        width="100%"
                                        height="100%"
                                    />
                                </Box>
                                <svg width="74" height="13" viewBox="0 0 74 13" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.32 0.799999H3.36L4.88 7.744L6.64 0.799999H9.36L11.328 7.776L12.96 0.799999H15.68L12.8 12H9.92L7.92 4.768L6.08 12H3.2L0.32 0.799999ZM22.517 9.856H18.773L18.005 12H15.285L19.365 0.799999H22.245L26.325 12H23.285L22.517 9.856ZM19.589 7.648H21.701L20.645 4.32L19.589 7.648ZM29.1194 3.168H25.6794V0.799999H35.4394V3.168H31.9994V12H29.1194V3.168ZM40.01 3.168H36.57V0.799999H46.33V3.168H42.89V12H40.01V3.168ZM47.5913 12.208C47.1646 12.208 46.8019 12.064 46.5033 11.776C46.2153 11.4773 46.0713 11.1147 46.0713 10.688C46.0713 10.2613 46.2153 9.904 46.5033 9.616C46.8019 9.31733 47.1646 9.168 47.5913 9.168C48.0179 9.168 48.3753 9.31733 48.6633 9.616C48.9619 9.904 49.1113 10.2613 49.1113 10.688C49.1113 11.1147 48.9619 11.4773 48.6633 11.776C48.3753 12.064 48.0179 12.208 47.5913 12.208ZM51.2763 0.799999H54.2203L57.3243 6.48L60.3963 0.799999H63.2763V12H60.3963V5.584L58.0763 9.84H56.4763L54.1562 5.584V12H51.2763V0.799999ZM65.5106 0.799999H73.6706V3.008H68.3906V5.2H73.1906V7.28H68.3906V9.792H73.6706V12H65.5106V0.799999Z"
                                        fill="white"/>
                                </svg>
                            </Box>
                        </Link>
                    </Grid>

                    <Grid item>
                        <Grid container spacing={1}>
                            <Grid item>
                                <div
                                    className={clsx({
                                        [classes.buttonLanguage]: true,
                                        [classes.buttonLanguageActive]: Boolean(language === "en-EN"),
                                    })}
                                    onClick={() => handleChangeLanguage("en-EN")}
                                >
                                    EN
                                </div>
                            </Grid>
                            <Grid item>
                                <div
                                    className={clsx({
                                        [classes.buttonLanguage]: true,
                                        [classes.buttonLanguageActive]: Boolean(language === "ru-RU"),
                                    })}
                                    onClick={() => handleChangeLanguage("ru-RU")}
                                >
                                    RU
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

const useStyles = makeStyles((theme) => ({

    root: {
        backgroundColor: "rgba(41, 41, 41, 0.23)",
        backdropFilter: "blur(4px)",
        position: "relative",
        zIndex: 999
    },
    content: {
        height: 65
    },

    logo: {
        display: "flex",
        alignItems: "center"
    },
    logoIcon: {
        width: 32,
        height: 32,
        borderRadius: 999,
        marginRight: 24,
        position: "relative",

        "&:after": {
            content: "''",
            position: "absolute",
            width: 260,
            height: 260,
            backgroundColor: theme.palette.primary.main,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(138px)',
            opacity: 0.17,
            zIndex: -1
        },
    },
    logoLabel: {
        fontSize: 16,
        lineHeight: '19px',
        color: "white",
        fontWeight: "600"
    },

    buttonLanguage: {
        height: 26,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 8px",
        borderRadius: 8,
        cursor: "pointer",

        fontSize: 13,
        lineHeight: "16px",
        color: "#8E8E8E",

        "&:hover": {
            backgroundColor: "rgb(246 217 98 / 30%)"
        }
    },
    buttonLanguageActive: {
        backgroundColor: "#F6D962",
        color: "#282828"
    }

}));

export default compose(
    connect(
        state => ({
            language: state.global?.language || "ru-RU"
        }),
        dispatch => ({
            setLanguage: (lang) => dispatch(setLanguage(lang))
        }),
    ),
)(Header);
