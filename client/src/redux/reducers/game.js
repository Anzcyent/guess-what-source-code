import { game } from "../constants";

const initialState = {
    number: null,
    win: null,
    currentBet: null
}

export default function gameReducer(state = initialState, action) {
    switch (action.type) {
        case game.GENERATE_NUMBER:

            return {
                ...state,
                number: action.payload
            };

        case game.PLAY_GAME:
            return {
                ...state,
                win: action.payload.win,
                currentBet: action.payload.currentBet
            }
        default:
            return state;
    }
}