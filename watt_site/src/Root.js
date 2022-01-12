import React, {Component} from "react";
import {ThemeProvider} from "@mui/material/styles";
import {StylesProvider, jssPreset} from "@mui/styles";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import {LocalizationProvider} from "@mui/lab";
import {create} from 'jss';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import theme from "./theme";
import storeRedux from "./redux/store";
import Router from "./router";
import ruLocale from 'date-fns/locale/ru';

const localeMap = {
    ru: ruLocale
};

const styleNode = document.createComment('jss-insertion-point');
document.head.insertBefore(styleNode, document.head.firstChild);
const jss = create({
    ...jssPreset(),
    insertionPoint: document.getElementById('jss-insertion-point'),
});

class App extends Component {

    render() {
        return (
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap.ru}>
                <ThemeProvider theme={theme}>
                    <StylesProvider jss={jss}>
                        <Provider store={storeRedux}>
                            <BrowserRouter>
                                <Router/>
                            </BrowserRouter>

                            <ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                pauseOnHover
                            />
                        </Provider>
                    </StylesProvider>
                </ThemeProvider>
            </LocalizationProvider>
        )
    }
}

export default App
