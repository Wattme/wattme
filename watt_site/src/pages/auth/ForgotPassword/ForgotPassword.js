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
import {
    Notification,
    notificationTypes
} from "../../../common/Notification";
import theme from "../../../theme";

class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initForm: {
                email: ""
            },
        };

        this.innerRef = React.createRef();
    }

    onSubmit = async (form) => {
        await this.setState({ isShowBackdrop: true })

        const response = await agent.post(`${ urls.userRestorePassword }?email=${ form.email }`, {}).then((res) => {
            return res.data;
        }).catch((err) => {
            return { error: err.response };
        });
        if (response.error) {
            this.setState({ isModalLoading: false });

            const errorMessage = allTranslations(Boolean(localization.authorization.errors[response?.error?.data?.code]) ? localization.authorization.errors[response?.error?.data?.code] : allTranslations(localization.errors["internal-error"]));
            Notification({
                message: errorMessage,
                type: notificationTypes.error
            })

            return null;
        }

        this.props.history.push(`/forgot-password/confirm?email=${ form.email }&restoration=${ response.restorationId }`);

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
                        { allTranslations(localization.forgotPassword.h3) }
                    </Typography>

                    <Typography variant="caption" className={classes.caption}>
                        { allTranslations(localization.forgotPassword.caption) }
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
        margin: "25px auto 0"
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
    email: Yup.string().nullable().email(allTranslations(localization.yup.email)).required(allTranslations(localization.yup.required))
});

export default withStyles(styles)(ForgotPassword)
