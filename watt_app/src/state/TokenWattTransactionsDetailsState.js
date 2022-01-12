const NAME_METHOD = 'TokenWattTransactionsDetails/NAME_METHOD'

const initialState = {};

export function nameFunction(data) {
    return {
        type: NAME_METHOD,
        data
    }
}

export default function UserInfo(state = initialState, action = {}) {
    switch (action.type) {
        case NAME_METHOD:{
            let data = action.data

            return {
                ...state
            }
        }
        default:
            return state;
    }
}
