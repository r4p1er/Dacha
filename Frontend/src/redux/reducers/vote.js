const initialState = {
  vote: [],
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_VOTE":
      return {
        vote: [...state.vote, action.payload],
      };
    default:
      return state;
  }
};
