export const initialState = {
  user: null,
  // Remove the messages array from the initial state
  // messages: [],
};
export const actionTypes = {
  SET_USER: "SET_USER",
  // Remove the SET_MESSAGES action type
  // SET_MESSAGES: "SET_MESSAGES",
};

const reducer = (state, action) => {
  console.log(action); // Debugging
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.user };
    // Remove the SET_MESSAGES case
    // case actionTypes.SET_MESSAGES:
    //   return { ...state, messages: action.messages };
    default:
      return state;
  }
};

export default reducer;
