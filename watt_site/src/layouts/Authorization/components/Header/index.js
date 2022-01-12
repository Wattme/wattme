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

    return (
        <Box
            className={classes.root}
        >
            <Grid container alignItems="center" justifyContent="space-between" className={classes.content}>
                <Grid item>
                    <svg width="53" height="22" viewBox="0 0 53 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.36 5.4H3.78L5.49 13.212L7.47 5.4H10.53L12.744 13.248L14.58 5.4H17.64L14.4 18H11.16L8.91 9.864L6.84 18H3.6L0.36 5.4ZM25.3316 15.588H21.1196L20.2556 18H17.1956L21.7856 5.4H25.0256L29.6156 18H26.1956L25.3316 15.588ZM22.0376 13.104H24.4136L23.2256 9.36L22.0376 13.104ZM32.7593 8.064H28.8893V5.4H39.8693V8.064H35.9993V18H32.7593V8.064ZM45.0113 8.064H41.1413V5.4H52.1213V8.064H48.2513V18H45.0113V8.064Z"
                            fill="#282828"/>
                    </svg>
                </Grid>
            </Grid>
        </Box>
    )
}

const useStyles = makeStyles((theme) => ({

    root: {
        backgroundColor: "#FFFFFF",
        filter: "drop-shadow(0px 2px 8px rgba(126, 126, 126, 0.1))"
    },
    content: {
        height: 65,
        padding: "0 22px"
    },

    logoTitle: {},

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
