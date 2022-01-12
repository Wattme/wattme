import * as RNLocalize from "react-native-localize";
import languages from "../constants/languages";

const getLanguage = (initLang) => {
  if (!!initLang) {
    return initLang
  }

  const locales = RNLocalize.getLocales();
  const locale = locales?.[0]?.languageCode || "en";
  const lang = `${ locale.toLowerCase() }-${ locale.toUpperCase() }`;

  const isFindLang = Boolean((languages || []).find((t) => t.value === lang));
  if (!isFindLang) {
    return "en-EN"
  }

  return lang
}

export {
  getLanguage
}
