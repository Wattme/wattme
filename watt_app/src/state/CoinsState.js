import { setItem } from "../common/Storage";

const SET_ERC20 = "CoinsState/SET_ERC20";
const SET_BEP20 = "CoinsState/SET_BEP20";
const SET_POLYGON = "CoinsState/SET_POLYGON";

const initialState = {

  erc20: [],
  bep20: [],
  polygon: [],

};

export function setErc20(erc20) {
  return {
    type: SET_ERC20,
    erc20,
  };
}
export function setBep20(bep20) {
  return {
    type: SET_BEP20,
    bep20,
  };
}
export function setPolygon(polygon) {
  return {
    type: SET_POLYGON,
    polygon,
  };
}

export default function UserInfo(state = initialState, action = {}) {
  switch (action.type) {

    case SET_ERC20: {
      let erc20 = action.erc20;

      return {
        ...state,
        erc20
      };
    }
    case SET_BEP20: {
      let bep20 = action.bep20;

      return {
        ...state,
        bep20
      };
    }
    case SET_POLYGON: {
      let polygon = action.polygon;

      return {
        ...state,
        polygon
      };
    }

    default:
      return state;
  }
}
