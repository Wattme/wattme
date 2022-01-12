import axios from "axios";
import urls from "../constants/urls";

const coinCup = axios.create({
  baseURL: urls.coinCup
});

export default coinCup;
