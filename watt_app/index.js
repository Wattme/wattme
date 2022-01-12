import 'react-native-url-polyfill/auto';
import "./shim";
import crypto from "crypto";
import Bugsnag from "@bugsnag/react-native";
Bugsnag.start();

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native/index';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
