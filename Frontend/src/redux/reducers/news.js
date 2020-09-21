const newsState = [];

export function news(state=newsState, action){
  switch(action.type){
    case "SUCCESS":
      return action.news
    default:
      return state;
  }
};
