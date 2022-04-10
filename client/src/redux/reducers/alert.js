import { alert } from "../constants"

const initialState = {};

export default function alertReducer(state = initialState, action) {
    switch (action.type) {
        case alert.ALERT:
            return action.payload;
        default:
            return state;
    }
}

