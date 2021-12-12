import { createStore, combineReducers } from "redux";
import {ticketsReudeucer} from "./ticketsReducer";
import { composeWithDevTools } from "redux-devtools-extension";



const rootReducer = combineReducers({
    tickets: ticketsReudeucer,
})


export const store = createStore(rootReducer, composeWithDevTools())
