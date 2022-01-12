import { setItem } from "../common/Storage";

const UPDATE_CURRENCY_INFO = "WalletConnectHome/UPDATE_CURRENCY_INFO";
const UPDATE_FAVORITES = "WalletConnectHome/UPDATE_FAVORITES";

const initialState = {
  currencyInfo: [],

  favorites: [],
};

export function updateCurrencyInfo(currencyInfo) {
  return {
    type: UPDATE_CURRENCY_INFO,
    currencyInfo,
  };
}
export function updateFavorites(favorites) {

  ( async () => {
    await setItem(JSON.stringify(favorites), "wallet-connect-favorites")
  })();

  return {
    type: UPDATE_FAVORITES,
    favorites,
  };
}

export default function UserInfo(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_CURRENCY_INFO: {
      let currencyInfo = action.currencyInfo;

      return {
        ...state,
        currencyInfo
      };
    }
    case UPDATE_FAVORITES: {
      let favorites = action.favorites;

      return {
        ...state,
        favorites
      };
    }
    default:
      return state;
  }
}


// Пример
const walletConnectFavoriteItem = {
  uri: "",
};


export {
  walletConnectFavoriteItem
}
