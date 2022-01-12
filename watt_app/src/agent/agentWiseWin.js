import axios from "axios";
import urls from "../constants/urls";
import Bugsnag from "@bugsnag/react-native";

const agentWiseWin = axios.create({
  baseURL: urls.prodHostWiseWin
});

export default agentWiseWin;
