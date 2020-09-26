const docsState = [];

export function docs(state=docsState, action){
  switch(action.type){
    case "SUCCESS":
      return action.docs
    default:
      return state;
  }
};