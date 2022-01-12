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
    withStyles
} from "@mui/styles";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import {Formik} from "formik";
import * as Yup from "yup";
import agent from "../../../agent/agent";
import urls from "../../../constants/urls";
import queryString from "query-string";
import {
    Notification,
    notificationTypes
} from "../../../common/Notification";
import theme from "../../../theme";

class ForgotPasswordConfirm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initForm: {
                password: ""
            },
        };

        this.innerRef = React.createRef();
    }

    onSubmit = async (form) => {
        await this.setState({ isShowBackdrop: true });

        const parseSearch = queryString.parse(this.props.location?.search) || {};

        const response = await agent.get(`${ urls.userConfirmRestorePassword }?id=${parseSearch.restoration}&code=${form.password}&newPassword=${form.password}`).then((res) => {
            return res.data
        }).catch((err) => {
            return { error: err.response }
        })
        if (response.error) {
            this.setState({ isShowBackdrop: false });

            const message = allTranslations(localization.forgotPasswordConfirm.errors?.[response.error?.data?.code] || localization.errors["internal-error"]);
            Notification({
                message: message,
                type: notificationTypes.error
            });

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
                        { allTranslations(localization.forgotPasswordConfirm.h3) }
                    </Typography>

                    <Typography
                        variant="caption"
                        className={classes.caption}
                        dangerouslySetInnerHTML={{__html: allTranslations(localization.forgotPasswordConfirm.caption)}}
                    />

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
                                                value={values.password}

                                                label={allTranslations(localization.forgotPasswordConfirm.form.passwordLabel)}
                                                placeholder={allTranslations(localization.forgotPasswordConfirm.form.passwordPlaceholder)}
                                                error={Boolean(touched['password'] && errors['password'])}
                                                helperText={touched.password && errors.password}

                                                variant="outlined"
                                                name="password"

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
                                                { allTranslations(localization.forgotPassword.form.buttonSubmit) }
                                            </Button>
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
    caption: {
        maxWidth: 450,
        margin: "25px auto 0",
        textAlign: "center",
        display: "block"
    },
    formContent: {
        maxWidth: 450,
        margin: "45px auto 0",

        [theme.breakpoints.down('md')]: {
            margin: "24px auto 0",
        }
    }
};
const validationSchema = Yup.object().shape({
    password: Yup.string().nullable().min(6, allTranslations(localization.yup.min, { min: 8 })).required(allTranslations(localization.yup.required))
});

export default withStyles(styles)(ForgotPasswordConfirm)
