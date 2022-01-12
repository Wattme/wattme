import { setItem } from "../common/Storage";

const SET_KEYS = "BinanceState/SET_KEYS";
const SET_LIST_KEYS = "BinanceState/SET_LIST_KEYS";
const SET_PROFILE = "BinanceState/SET_PROFILE";

// keys = {
//   "name": "",
//   "apiKey": "",
//   "secret": "",
// }

const initialState = {

  profile: {},

  keys: {},

  listKeys: [],

};

export function setKeys(keys) {

  ( async () => {
    await setItem(JSON.stringify(keys), "trading-keys");
  })();

  return {
    type: SET_KEYS,
    keys,
  };
}
export function setListKeys(listKeys) {
  return {
    type: SET_LIST_KEYS,
    listKeys,
  };
}
export function setProfile(profile) {
  return {
    type: SET_PROFILE,
    profile,
  };
}

export default function UserInfo(state = initialState, action = {}) {
  switch (action.type) {

    case SET_KEYS: {
      let keys = action.keys;

      return {
        ...state,
        keys
      };
    }

    case SET_LIST_KEYS: {
      let listKeys = action.listKeys;

      return {
        ...state,
        listKeys
      };
    }

    case SET_PROFILE: {
      let profile = action.profile;

      return {
        ...state,
        profile
      };
    }

    default:
      return state;
  }
}
