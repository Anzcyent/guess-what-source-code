import { auth } from "../constants";

const initialState = {
    user: null
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case auth.AUTH:
            return {
                ...state,
                user: action.payload
            };

        default:
            return state;
    }
}