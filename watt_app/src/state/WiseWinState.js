import { setItem } from "../common/Storage";

const SET_PROFILE = "WiseWinState/SET_PROFILE";

const initialState = {
  profile: {}
};

export function setProfile(profile) {
  return {
    type: SET_PROFILE,
    profile,
  };
}

export default function UserInfo(state = initialState, action = {}) {
  switch (action.type) {

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
