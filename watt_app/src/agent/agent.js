import axios from "axios";
import urls from "../constants/urls";
import Bugsnag from "@bugsnag/react-native";

const axiosInstance = axios.create({
  baseURL: urls.prodHost
});

axiosInstance.interceptors.response.use((res) => res, (err, data) => {
  (async () => {
    let errorMessage = Boolean(err?.response) ?
      `Код ошибки - ${err?.response?.data?.['error-code']},\n
      Домен - ${err?.response?.config?.['baseURL']},\n
      URL - ${err?.response?.config?.['url']},\n` : "Сервер недоступен";

    await Bugsnag.notify({
      name: "AXIOS",
      message: errorMessage
    });
  })();

  throw err;
})

export default axiosInstance;
