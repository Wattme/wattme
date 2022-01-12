import React, { Component } from "react";
import {
    Box,
    Grid,
    Typography,

    TextField,
    Button,

    Backdrop,
    CircularProgress,

    FormControlLabel,
    Checkbox
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
import {Link} from "react-router-dom";
import theme from "../../../theme";

class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initForm: {
                email: "",
            },

            isAcceptPrivacyPolicy: false,
            isAcceptTermsUse: false
        };

        this.innerRef = React.createRef();
    }

    onSubmit = async (form) => {
        await this.setState({ isShowBackdrop: true })

        const response = await agent.post(urls.userCreate, {
            email: form.email
        }).then((res) => {
            return res.data
        }).catch((err) => {
            return { error: err.response }
        })
        if (response.error) {
            await this.setState({ isShowBackdrop: false })

            const errorMessage = allTranslations(localization.registration.errors[ response?.error?.data?.code ] || localization.errors["internal-error"]);
            Notification({
                message: errorMessage,
                type: notificationTypes.error
            });

            return null
        }

        this.props.history.push(`/registration/confirm?verification=${ response.verificationId }&email=${ form.email }`);

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
            isShowBackdrop,

            isAcceptPrivacyPolicy,
            isAcceptTermsUse
        } = this.state;

        return (
            <Box className={classes.root}>

                <Box className={classes.content}>

                    <Typography variant="h3">
                        { allTranslations(localization.registration.h3) }
                    </Typography>

                    <Typography variant="caption" className={classes.caption}>
                        { allTranslations(localization.registration.caption) }
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
                                            <Typography variant="caption">
                                                { allTranslations(localization.registration.captionPrivacyPolicy) }
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Grid container spacing={1} justifyContent="center">
                                                <Grid item sx={{marginLeft: "24px"}}>
                                                    <FormControlLabel
                                                        value={isAcceptPrivacyPolicy}
                                                        control={<Checkbox />}
                                                        label={<Link to="#" style={{color: "#282828"}}>{allTranslations(localization.registration.form.privacyPolicy)}</Link>}
                                                        onChange={() => this.setState({isAcceptPrivacyPolicy: !isAcceptPrivacyPolicy})}
                                                    />
                                                </Grid>
                                                <Grid item sx={{marginLeft: "24px"}}>
                                                    <FormControlLabel
                                                        value={isAcceptTermsUse}
                                                        control={<Checkbox />}
                                                        label={<Link to="#" style={{color: "#282828"}}>{allTranslations(localization.registration.form.termsUse)}</Link>}
                                                        onChange={() => this.setState({isAcceptTermsUse: !isAcceptTermsUse})}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                disabled={Boolean(!isAcceptTermsUse || !isAcceptPrivacyPolicy)}
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

export default withStyles(styles)(Registration)
