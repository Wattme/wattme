import store from "../redux/store";
import russian from "../assets/lang/ru-RU.json";
import english from "../assets/lang/en-EN.json";

const dictionaries = {
  "ru-RU": russian,
  "en-EN": english,
};

const allTranslations = (key, props) => {
  const { global } = store.getState();
  const { language } = global;

  if (!key) {
    return "key-not-found"
  }

  const wordbook = dictionaries[language];
  const defaultWordbook = dictionaries["ru-RU"];

  let message = getText(key, wordbook, defaultWordbook);

  if (!props) {
    return message
  }

  Object.keys((props)).map((key) => {
    message = message.replace(`{{${key}}}`, props[key]);
  });

  return message;
};
const getText = (key, wordbook, defaultWordbook) => {
  return key.replace(/\[([^\]]+)]/g, '.$1').split('.').reduce(function (o, p) {
    if (!o || !o[p]) {
      return key.replace(/\[([^\]]+)]/g, '.$1').split('.').reduce(function (o, p) {
        if (!o || !o[p]) {
          return key
        }

        return o[p];
      }, defaultWordbook)
    }

    return o[p];
  }, wordbook);
}

export default allTranslations;
