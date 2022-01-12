import { setItem } from "../common/Storage";

const UPDATE_WALLET = "GlobalState/UPDATE_WALLET";
const UPDATE_WALLETS_LIST = "GlobalState/UPDATE_WALLETS_LIST";//old
const UPDATE_WALLETS_LIST_ARRAY = "GlobalState/UPDATE_WALLETS_LIST_ARRAY";
const UPDATE_WALLETS_LIST_NAME = "GlobalState/UPDATE_WALLETS_LIST_NAME";
const UPDATE_ACCOUNT = "GlobalState/UPDATE_ACCOUNT";
const UPDATE_CURRENCIES = "GlobalState/UPDATE_CURRENCIES";
const UPDATE_USER_CURRENCIES = "GlobalState/UPDATE_USER_CURRENCIES";
const UPDATE_FIATS = "GlobalState/UPDATE_FIATS";
const UPDATE_WALLET_CONNECT_HISTORY = "GlobalState/UPDATE_WALLET_CONNECT_HISTORY";
const UPDATE_PASS_CODE = "GlobalState/UPDATE_PASS_CODE";
const UPDATE_FIAT = "GlobalState/UPDATE_FIAT";
const UPDATE_MOON_PAY_SETTINGS = "GlobalState/UPDATE_MOON_PAY_SETTINGS";
const UPDATE_LANGUAGE = "GlobalState/UPDATE_LANGUAGE";
const UPDATE_SETTINGS_TOUCH_ID = "GlobalState/UPDATE_SETTINGS_TOUCH_ID";
const UPDATE_SHOWING_APPLICATION_GREETING = "GlobalState/UPDATE_SHOWING_APPLICATION_GREETING";
const UPDATE_WALLET_IMPORT_INFO = "GlobalState/UPDATE_WALLET_IMPORT_INFO";

const initialState = {

  appVersion: "1.12.0",

  wallet: {}, // Активный кошелек пользователя
  wallets: [], // Список колшелькой, токенов и тд TODO ВЫПЕЛИТЬ В ДАЛЬНЕЙШЕМ
  walletsList: {}, // Список колшелькой, токенов и тд
  walletImportInfo: {}, // Настройки по импорта кошельков

  account: {}, // Пользовательский аккаунт
  settingsTouchId: {
    entrance: true,
    transactionSignature: false,
  },

  currencies: [],
  userCurrencies: [],
  fiats: [],
  walletConnectHistory: [],

  passCode: "",
  fiat: "USD",
  walletsName: "MULTI",
  language: "ru-RU",

  isShowingApplicationGreeting: false
};


export function updateWallet (wallet = {}) {
  (async () => {
    await setItem(JSON.stringify(wallet), "wallet");
  })();

  return {
    type: UPDATE_WALLET,
    wallet,
  };
}

// OLD VERSION
export function updateWallets(wallets) {}

export function updateWalletsList(walletsList) {

  (async () => {
    await setItem(JSON.stringify(walletsList), "wallets-list");
  })();

  return {
    type: UPDATE_WALLETS_LIST_ARRAY,
    walletsList,
  };
}

export function updateWalletsListName(walletsName) {

  (async () => {
    await setItem(walletsName, "wallets-list-name");
  })();

  return {
    type: UPDATE_WALLETS_LIST_NAME,
    walletsName,
  };
}

export function updateAccount(account) {
  return {
    type: UPDATE_ACCOUNT,
    account,
  };
}

export function updateCurrencies(currencies) {
  return {
    type: UPDATE_CURRENCIES,
    currencies,
  };
}

export function updateUserCurrencies(userCurrencies) {

  ( async () => {
    await setItem(JSON.stringify(userCurrencies), "user-currencies");
  })();

  return {
    type: UPDATE_USER_CURRENCIES,
    userCurrencies,
  };
}

export function updateFiats(fiats) {
  return {
    type: UPDATE_FIATS,
    fiats,
  };
}

export function updateWalletConnectHistory(walletConnectHistory) {

  (async () => {
    await setItem(JSON.stringify(walletConnectHistory), "wallet-connect-history");
  })();

  return {
    type: UPDATE_WALLET_CONNECT_HISTORY,
    walletConnectHistory,
  };
}

export function updatePassCode(passCode) {
  return {
    type: UPDATE_PASS_CODE,
    passCode,
  };
}

export function updateFiat(fiat) {
  return {
    type: UPDATE_FIAT,
    fiat,
  };
}

export function updateLanguage(language) {
  return {
    type: UPDATE_LANGUAGE,
    language,
  };
}

export function updateSettingsTouchId(settingsTouchId) {

  (async () => {
    await setItem(JSON.stringify(settingsTouchId), 'settings-touch-id');
  })();

  return {
    type: UPDATE_SETTINGS_TOUCH_ID,
    settingsTouchId,
  };
}

export function updateMoonPaySettings(moonPaySettings) {
  return {
    type: UPDATE_MOON_PAY_SETTINGS,
    moonPaySettings,
  };
}

export function updateShowingApplicationGreeting (isShowingApplicationGreeting) {
  return {
    type: UPDATE_SHOWING_APPLICATION_GREETING,
    isShowingApplicationGreeting,
  };
}

export function updateWalletImportInfo (walletImportInfo) {
  return {
    type: UPDATE_WALLET_IMPORT_INFO,
    walletImportInfo,
  };
}

// Reducer
export default function GlobalState(state = initialState, action = {}) {
  switch (action.type) {

    case UPDATE_WALLET: {
      let wallet = action.wallet;

      return {
        ...state,
        wallet,
      };
    }
    case UPDATE_WALLETS_LIST: {
      let wallets = action.wallets;

      return {
        ...state,
        wallets,
      };
    }
    case UPDATE_WALLETS_LIST_ARRAY: {
      let walletsList = action.walletsList;

      return {
        ...state,
        walletsList,
      };
    }
    case UPDATE_ACCOUNT: {
      let account = action.account;

      return {
        ...state,
        account,
      };
    }
    case UPDATE_CURRENCIES: {
      let currencies = action.currencies;

      return {
        ...state,
        currencies,
      };
    }
    case UPDATE_USER_CURRENCIES: {
      let userCurrencies = action.userCurrencies;

      return {
        ...state,
        userCurrencies,
      };
    }
    case UPDATE_FIATS: {
      let fiats = action.fiats;

      return {
        ...state,
        fiats,
      };
    }
    case UPDATE_WALLET_CONNECT_HISTORY: {
      let walletConnectHistory = action.walletConnectHistory;

      return {
        ...state,
        walletConnectHistory,
      };
    }
    case UPDATE_PASS_CODE: {
      let passCode = action.passCode;

      return {
        ...state,
        passCode,
      };
    }
    case UPDATE_FIAT: {
      let fiat = action.fiat;

      return {
        ...state,
        fiat,
      };
    }
    case UPDATE_MOON_PAY_SETTINGS: {
      let moonPaySettings = action.moonPaySettings;

      return {
        ...state,
        moonPaySettings,
      };
    }
    case UPDATE_WALLETS_LIST_NAME: {
      let walletsName = action.walletsName;

      return {
        ...state,
        walletsName,
      };
    }
    case UPDATE_LANGUAGE: {
      let language = action.language;

      return {
        ...state,
        language,
      };
    }
    case UPDATE_SETTINGS_TOUCH_ID: {
      let settingsTouchId = action.settingsTouchId;

      return {
        ...state,
        settingsTouchId,
      };
    }
    case UPDATE_SHOWING_APPLICATION_GREETING: {
      let isShowingApplicationGreeting = action.isShowingApplicationGreeting;

      return {
        ...state,
        isShowingApplicationGreeting,
      };
    }
    case UPDATE_WALLET_IMPORT_INFO: {
      let walletImportInfo = action.walletImportInfo;

      return {
        ...state,
        walletImportInfo,
      };
    }

    default:
      return state;
  }
}
