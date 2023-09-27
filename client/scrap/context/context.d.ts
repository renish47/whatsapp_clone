interface StateProviderProps {
  initialState: {};
  reducer: Reducer<State, Action>;
  children: ReactNode;
}

interface State {
  userInfo: undefined | userInfo;
  newUser: boolean;
}

interface Action {
  type: string;
  payload: {};
}
