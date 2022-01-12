import React, { Component } from "react";
import {
    Box,
    Grid,
    Typography,

    TextField,
    Button,

    Backdrop,
    CircularProgress
} from "@mui/material";
import {
    withStyles,
    withTheme
} from "@mui/styles";
import { Formik } from "formik";
import {Link} from "react-router-dom";
import {
    Notification,
    notificationTypes
} from "../../../common/Notification"
import * as Yup from "yup";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import agent from "../../../agent/agent";
import urls from "../../../constants/urls";
import theme from "../../../theme";

class Authorization extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initForm: {
                email: "",
                password: "",
            },

            isShowBackdrop: false
        };

        this.innerRef = React.createRef();
    }

    onSubmit = async (form) => {
        await this.setState({ isShowBackdrop: true })

        const response = await agent.post(urls.userAuth, {
            email: form.email,
            password: form.password,
        }).then((res) => {
            return res.data
        }).catch((err) => {
            return { error: err?.response }
        })
        if (response.error) {
            this.setState({ isShowBackdrop: false });

            const errorMessage = Boolean(localization.authorization.errors[ response?.error?.data?.code ]) ? allTranslations(localization.authorization.errors[ response?.error?.data?.code ]) : allTranslations(localization.errors["internal-error"]);
            Notification({
                message: errorMessage,
                type: notificationTypes.error
            })


            return null
        }

        localStorage.setItem("jwt", response.jwt);
        agent.defaults.headers["x-auth-token"] = response.jwt;

        const account = await agent.get(urls.userMe).then((res) => {
            return res.data?.user
        }).catch((err) => {
            return {}
        })
        this.props.setUser(account);

        await this.setState({ isShowBackdrop: false })
    }

    changeForm = ({target}) => {
        const { name, value } = target;

        let newForm = {...this.innerRef.current.values};
        newForm[name] = value;

        this.innerRef.current.setValues(newForm);
    }

    render() {
        const {
            classes
        } = this.props;
        const {
            initForm,
            isShowBackdrop
        } = this.state;

        return (
            <Box className={classes.root}>
                <Box className={classes.content}>

                    <Typography variant="h3">
                        { allTranslations(localization.authorization.h3) }
                    </Typography>

                    <Box className={classes.formContent}>
                        <Formik
                            innerRef={this.innerRef}
                            initialValues={{ ...initForm }}
                            validationSchema={validationSchema}
                            onSubmit={this.onSubmit}
                        >
                            {(props) => {
                                const {
                                    values,
                                    touched,
                                    errors,
                                    handleSubmit
                                } = props;

                                return (
                                    <Grid container spacing={3}>

                                        <Grid item xs={12}>
                                            <TextField
                                                value={values.email}

                                                label={allTranslations(localization.authorization.form.emailLabel)}
                                                placeholder={allTranslations(localization.authorization.form.emailPlaceholder)}
                                                error={Boolean(touched['email'] && errors['email'])}
                                                helperText={touched.email && errors.email}

                                                variant="outlined"
                                                name="email"

                                                fullWidth

                                                onChange={this.changeForm}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                value={values.password}

                                                label={allTranslations(localization.authorization.form.passwordLabel)}
                                                placeholder={allTranslations(localization.authorization.form.passwordPlaceholder)}
                                                error={Boolean(touched['password'] && errors['password'])}
                                                helperText={touched.password && errors.password}

                                                variant="outlined"
                                                name="password"
                                                type="password"

                                                fullWidth

                                                onChange={this.changeForm}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                onClick={handleSubmit}
                                            >
                                                { allTranslations(localization.authorization.form.buttonSubmit) }
                                            </Button>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Link to="/forgot-password">
                                                        <Typography className={classes.buttonFargotPassword}>
                                                            { allTranslations(localization.authorization.form.buttonFargotPassword) }
                                                        </Typography>
                                                    </Link>
                                                </Grid>
                                                <Grid item>
                                                    <Link to="/registration">
                                                        <Typography className={classes.buttonRegistration}>
                                                            { allTranslations(localization.authorization.form.buttonRegistration) }
                                                        </Typography>
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                )
                            }}
                        </Formik>
                    </Box>

                </Box>

                <Backdrop open={isShowBackdrop}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Box>
        );
    }
}

const styles = {
    root: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        [theme.breakpoints.down('md')]: {
            padding: "0 16px"
        }
    },

    content: {
        background: "#FFFFFF",
        borderRadius: 10,

        width: "100%",
        maxWidth: 690,

        padding: 45,

        [theme.breakpoints.down('md')]: {
            padding: 16
        }
    },
    formContent: {
        maxWidth: 450,
        margin: "45px auto 0",

        [theme.breakpoints.down('md')]: {
            margin: "24px auto 0",
        }
    },

    buttonFargotPassword: {
        fontSize: 16,
        lineHeight: "19px",
        textAlign: "center",
        color: "#8E8E8E",
        padding: "6px 16px"
    },
    buttonRegistration: {
        fontSize: 16,
        lineHeight: "19px",
        textAlign: "center",
        color: "#282828",
        padding: "6px 16px"
    },
}

const validationSchema = Yup.object().shape({
    email: Yup.string().nullable().email(allTranslations(localization.yup.email)).required(allTranslations(localization.yup.required)),
    password: Yup.string().nullable().min(6, allTranslations(localization.yup.min, { min: 8 })).required(allTranslations(localization.yup.required))
});

export default withStyles(styles)(Authorization)
