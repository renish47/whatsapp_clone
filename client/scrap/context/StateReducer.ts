import { Reducer } from "react";
import { actions } from "./constants";

interface userInfo {
  name: string;
}

export const initialState: State = {
  userInfo: undefined,
  newUser: false,
};

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case actions.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case actions.SET_NEW_USER:
      return {
        ...state,
        userInfo: undefined,
        newUser: false,
      };
    default:
      return state;
  }
};

export default reducer;
