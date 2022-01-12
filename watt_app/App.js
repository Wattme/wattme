import React from "react";
import AppView from "./src/AppView";
import {StatusBar} from "react-native/index";
import {Provider} from "react-redux";
import {store} from "./src/store/store";
import ErrorPage from "./src/components/ErrorPage";
import Bugsnag from '@bugsnag/react-native';
import "./src/utils/ethers/optimization";

Bugsnag.start({codeBundleId: "1.1.5"});

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)

export default function App() {
    return (
      <ErrorBoundary FallbackComponent={ErrorContainer}>
        <AppContainer/>
      </ErrorBoundary>
    );
}

const AppContainer = () => {
  return (
    <>

      <StatusBar translucent backgroundColor="white" barStyle="dark-content"/>

      <Provider store={store}>

        <AppView/>

      </Provider>

    </>
  )
}
const ErrorContainer = () => {
  return (
    <ErrorPage/>
  )
}
