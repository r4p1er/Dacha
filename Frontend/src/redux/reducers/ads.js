const adsState = [];

export function adverts(state=adsState, action){
  switch(action.type){
    case "SUCCESS":
      return action.adverts
    default:
      return state;
  };
};
