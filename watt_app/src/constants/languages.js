import allTranslations from "../localization/allTranslations";
import localization from "../localization/localization";

export default [
  {
    value: "ru-RU",
    label: allTranslations(localization.languages["ru-RU"]),
    icon: require("../assets/png/language/ru-RU.png")
  },
  {
    value: "en-EN",
    label: allTranslations(localization.languages["en-EN"]),
    icon: require("../assets/png/language/en-EN.png")
  }
]
