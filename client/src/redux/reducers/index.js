import { combineReducers } from "redux";
import authReducer from "./auth";
import alertReducer from "./alert";
import gameReducer from "./game";

const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    game: gameReducer
});

export default rootReducer;