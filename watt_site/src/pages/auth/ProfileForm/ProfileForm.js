import React, { Component } from "react";
import {
    Box,
    Grid,
    Typography,

    Tooltip,

    IconButton,

    TextField,
    Button
} from "@mui/material";
import {
    withStyles
} from "@mui/styles";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import {Formik} from "formik";
import * as Yup from "yup";

class ProfileForm extends Component {
    constructor(props) {
        super(props);

        console.log("user", props.user)

        this.state = {
            initForm: {...props.user}
        };

        this.innerRef = React.createRef();
    }

    componentDidMount = () => {}


    _userExit = () => {}
    _userName = () => {
        const name = "Имя";
        const surname = "Фамилия";

        return `${name} ${surname}`
    }

    _changeForm = ({ target }) => {
        const { name, value } = target;

        let newValues = this.innerRef.current.values || {};
        newValues[name] = value;

        this.innerRef.current.setValues(newValues);
    }

    render() {
        const {
            classes
        } = this.props;
        const {
            initForm
        } = this.state;

        return (
            <Box className={classes.root}>
                <Box className={classes.content}>

                    <Grid className={classes.header} container alignItems="center" justifyContent="space-between">
                        <Grid item sx={{width: 58}}/>
                        <Grid item>
                            <Typography variant="h3">
                                { allTranslations(localization.profileForm.title) }
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Tooltip title={allTranslations(localization.profileForm.exitTooltip)} arrow>
                                <IconButton onClick={this._userExit}>
                                    <img src={require("../../../assets/svg/common/sign-in.svg").default}/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>

                    <Box className={classes.userContent}>
                        <Box className={classes.userContentAvatar}>
                            <img src={require("../../../assets/png/users/user-pug.png").default} className={classes.userContentAvatarImage}/>
                            <IconButton className={classes.userContentAvatarButton}>
                                <img src={require("../../../assets/svg/common/camera.svg").default}/>
                            </IconButton>
                        </Box>
                        <Typography className={classes.userContentName}>{ this._userName() }</Typography>
                    </Box>

                    <Typography
                        variant="caption"
                        dangerouslySetInnerHTML={{__html: allTranslations(localization.profileForm.caption)}}
                        sx={{display: "block"}}
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

                                        <Grid item xs={6} lg={12}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} lg={6}>
                                                    <Box className={classes.formItemHeader}>
                                                        <Typography className={classes.formItemLabel}>
                                                            { allTranslations(localization.profileForm.form.emailLabel) }
                                                            <Typography sx={{color: "#F5386A", marginLeft: 1, lineHeight: "18px"}}>*</Typography>
                                                        </Typography>
                                                    </Box>
                                                    <TextField
                                                        value={values.email}
                                                        className={classes.formItemInput}
                                                        placeholder={allTranslations(localization.profileForm.form.emailPlaceholder)}
                                                        error={Boolean(touched['email'] && errors['email'])}
                                                        helperText={touched.email && errors.email}
                                                        name="email"
                                                        disabled
                                                        fullWidth

                                                        onChange={this._changeForm}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} lg={6}>
                                                    <Box className={classes.formItemHeader}>
                                                        <Typography className={classes.formItemLabel}>
                                                            { allTranslations(localization.profileForm.form.wisewinPatronCodeLabel) }
                                                        </Typography>
                                                        <Typography className={classes.formItemLabelCaption}>
                                                            { allTranslations(localization.profileForm.form.wisewinPatronCodeLabelCaption) }
                                                        </Typography>
                                                    </Box>
                                                    <TextField
                                                        value={values.wisewinPatronCode}
                                                        className={classes.formItemInput}
                                                        placeholder={allTranslations(localization.profileForm.form.wisewinPatronCodePlaceholder)}
                                                        error={Boolean(touched['wisewinPatronCode'] && errors['wisewinPatronCode'])}
                                                        helperText={touched.wisewinPatronCode && errors.wisewinPatronCode}
                                                        name="wisewinPatronCode"
                                                        fullWidth

                                                        onChange={this._changeForm}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={6} lg={12}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} lg={6}>
                                                    <Box className={classes.formItemHeader}>
                                                        <Typography className={classes.formItemLabel}>
                                                            { allTranslations(localization.profileForm.form.firstNameLabel) }
                                                            <Typography sx={{color: "#F5386A", marginLeft: 1, lineHeight: "18px"}}>*</Typography>
                                                        </Typography>
                                                        <Typography className={classes.formItemLabelCaption}>
                                                            { allTranslations(localization.profileForm.form.firstNameLabelCaption) }
                                                        </Typography>
                                                    </Box>
                                                    <TextField
                                                        value={values.firstName}
                                                        className={classes.formItemInput}
                                                        placeholder={allTranslations(localization.profileForm.form.firstNamePlaceholder)}
                                                        error={Boolean(touched['firstName'] && errors['firstName'])}
                                                        helperText={touched.firstName && errors.firstName}
                                                        name="firstName"
                                                        fullWidth

                                                        onChange={this._changeForm}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} lg={6}>
                                                    <Box className={classes.formItemHeader}>
                                                        <Typography className={classes.formItemLabel}>
                                                            { allTranslations(localization.profileForm.form.lastNameLabel) }
                                                            <Typography sx={{color: "#F5386A", marginLeft: 1, lineHeight: "18px"}}>*</Typography>
                                                        </Typography>
                                                        <Typography className={classes.formItemLabelCaption}>
                                                            { allTranslations(localization.profileForm.form.lastNameLabelCaption) }
                                                        </Typography>
                                                    </Box>
                                                    <TextField
                                                        value={values.lastName}
                                                        className={classes.formItemInput}
                                                        placeholder={allTranslations(localization.profileForm.form.lastNamePlaceholder)}
                                                        error={Boolean(touched['lastName'] && errors['lastName'])}
                                                        helperText={touched.lastName && errors.lastName}
                                                        name="lastName"
                                                        fullWidth

                                                        onChange={this._changeForm}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={6} lg={12}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} lg={6}>
                                                    <Box className={classes.formItemHeader}>
                                                        <Typography className={classes.formItemLabel}>
                                                            { allTranslations(localization.profileForm.form.middleNameLabel) }
                                                            <Typography sx={{color: "#F5386A", marginLeft: 1, lineHeight: "18px"}}>*</Typography>
                                                        </Typography>
                                                        <Typography className={classes.formItemLabelCaption}>
                                                            { allTranslations(localization.profileForm.form.middleNameLabelCaption) }
                                                        </Typography>
                                                    </Box>
                                                    <TextField
                                                        value={values.middleName}
                                                        className={classes.formItemInput}
                                                        placeholder={allTranslations(localization.profileForm.form.middleNamePlaceholder)}
                                                        error={Boolean(touched['middleName'] && errors['middleName'])}
                                                        helperText={touched.middleName && errors.middleName}
                                                        name="middleName"
                                                        fullWidth

                                                        onChange={this._changeForm}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} lg={6}>
                                                    <Box className={classes.formItemHeader}>
                                                        <Typography className={classes.formItemLabel}>
                                                            { allTranslations(localization.profileForm.form.dobLabel) }
                                                            <Typography sx={{color: "#F5386A", marginLeft: 1, lineHeight: "18px"}}>*</Typography>
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={6} lg={12}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} lg={6}>
                                                    <Box className={classes.formItemHeader}>
                                                        <Typography className={classes.formItemLabel}>
                                                            { allTranslations(localization.profileForm.form.firstNameLabel) }
                                                            <Typography sx={{color: "#F5386A", marginLeft: 1, lineHeight: "18px"}}>*</Typography>
                                                        </Typography>
                                                        <Typography className={classes.formItemLabelCaption}>
                                                            { allTranslations(localization.profileForm.form.firstNameLabelCaption) }
                                                        </Typography>
                                                    </Box>
                                                    <TextField
                                                        value={values.firstName}
                                                        className={classes.formItemInput}
                                                        placeholder={allTranslations(localization.profileForm.form.firstNamePlaceholder)}
                                                        error={Boolean(touched['firstName'] && errors['firstName'])}
                                                        helperText={touched.firstName && errors.firstName}
                                                        name="firstName"
                                                        fullWidth

                                                        onChange={this._changeForm}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} lg={6}>
                                                    <Box className={classes.formItemHeader}>
                                                        <Typography className={classes.formItemLabel}>
                                                            { allTranslations(localization.profileForm.form.lastNameLabel) }
                                                            <Typography sx={{color: "#F5386A", marginLeft: 1, lineHeight: "18px"}}>*</Typography>
                                                        </Typography>
                                                        <Typography className={classes.formItemLabelCaption}>
                                                            { allTranslations(localization.profileForm.form.lastNameLabelCaption) }
                                                        </Typography>
                                                    </Box>
                                                    <TextField
                                                        value={values.lastName}
                                                        className={classes.formItemInput}
                                                        placeholder={allTranslations(localization.profileForm.form.lastNamePlaceholder)}
                                                        error={Boolean(touched['lastName'] && errors['lastName'])}
                                                        helperText={touched.lastName && errors.lastName}
                                                        name="lastName"
                                                        fullWidth

                                                        onChange={this._changeForm}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                )
                            }}
                        </Formik>
                    </Box>

                </Box>
            </Box>
        );
    }
}

const styles = {
    root: {
        flex: 1,
        padding: "45px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
    },

    content: {
        background: "#FFFFFF",
        borderRadius: 10,

        width: "100%",
        maxWidth: 925,

        padding: 45
    },
    caption: {
        maxWidth: 450,
        margin: "25px auto 0"
    },
    formContent: {
        maxWidth: 840,
        margin: "30px auto 0"
    },

    header: {
        marginBottom: 45
    },

    userContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        margin: "45px auto 30px"
    },
    userContentAvatar: {
        width: 80,
        height: 80,
        borderRadius: 999,
        marginBottom: 16,
        position: "relative",

        border: "2px solid #282828"
    },
    userContentAvatarImage: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        borderRadius: 999
    },
    userContentAvatarButton: {
        width: 30,
        height: 30,
        backgroundColor: "#282828",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right: -4,
        bottom: -4,
        zIndex: 10,

        "&:hover": {
            backgroundColor: "#282828",
        }
    },
    userContentName: {
        fontWeight: "500",
        fontSize: 20,
        lineHeight: "24px",
        color: "#282828"
    },

    formItemHeader: {
        display: "flex",
        alignItems: "center",
        padding: "0 12px 8px"
    },
    formItemLabel: {
        fontSize: 16,
        lineHeight: "19px",
        color: "#282828",
        display: "flex",
        alignItems: "center",
    },
    formItemLabelCaption: {
        fontSize: 16,
        lineHeight: "19px",
        color: "#8e8e8e",
        marginLeft: 8
    },
    formItemInput: {},

};
const validationSchema = Yup.object().shape({
    email: Yup.string().nullable().email(allTranslations(localization.yup.email)).required(allTranslations(localization.yup.required)),
    firstName: Yup.string().nullable().required(allTranslations(localization.yup.required)),
    lastName: Yup.string().nullable().required(allTranslations(localization.yup.required)),
    country: Yup.string().nullable().required(allTranslations(localization.yup.required)),
    city: Yup.string().nullable().required(allTranslations(localization.yup.required)),
    phone: Yup.string().nullable().required(allTranslations(localization.yup.required)),
    telegramUsername: Yup.string().nullable().required(allTranslations(localization.yup.required)),
});

export default withStyles(styles)(ProfileForm)
