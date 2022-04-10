import { game, auth, alert } from "../constants";
import { getRequest, postRequest } from "../../utils/request";

export const generate_number = (token) => async (dispatch) => {
    try {
        const res = await getRequest("game/generate_number", token);

        dispatch({ type: game.GENERATE_NUMBER, payload: res.data.number });
    } catch (err) {
        console.log(err);

        dispatch({ type: alert.ALERT, payload: { error: err.response.data.msg } });

        throw new Error(err);
    }
}

export const play_game = (data, token, user, currentBet) => async (dispatch) => {
    try {
        dispatch({ type: alert.ALERT, payload: { showing_result_card_process: true } });

        const res = await postRequest("game/play_game", data, token);
        setTimeout(async () => {
            dispatch({ type: auth.AUTH, payload: { ...user, coins: res.data.coins } });

            dispatch({ type: alert.ALERT, payload: { showing_result_card_process: false } });

            dispatch({ type: game.PLAY_GAME, payload: { win: res.data.win, currentBet } });

            if (res.data.win) {
                dispatch({ type: alert.ALERT, payload: { success: "You won!" } })
            } else {
                dispatch({ type: alert.ALERT, payload: { error: "You lost :(" } })
            }

            setTimeout(() => dispatch({ type: game.PLAY_GAME, payload: { win: null, currentBet: null } }), 1500);
        }, 5000)

    } catch (err) {
        console.log(err);

        dispatch({ type: alert.ALERT, payload: { error: err.response.data.msg } });

        throw new Error(err);
    }
}