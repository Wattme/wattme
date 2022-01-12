const UPDATE_USER = 'app/UPDATE_USER'
const UPDATE_LANGUAGE = 'app/UPDATE_LANGUAGE'

const initialState = {
    user: {},
    language: localStorage.getItem("language") || "ru-RU"
};

export function setUser(user) {
    return {
        type: UPDATE_USER,
        user
    }
}
export function setLanguage(language) {

    localStorage.setItem("language", language);

    return {
        type: UPDATE_LANGUAGE,
        language
    }
}

export default function AppState(state = initialState, action = {}) {
    switch (action.type) {
        case UPDATE_USER: {
            let user = action.user

            return {
                ...state,
                user
            }
        }
        case UPDATE_LANGUAGE: {
            let language = action.language

            return {
                ...state,
                language
            }
        }
        default:
            return state;
    }
}
