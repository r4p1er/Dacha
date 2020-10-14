import {
    ADD_ACCOUNT,
    ADD_ACCOUNT_LOADING,
    DELETE_ACCOUNT,
    EDIT_ACCOUNT,
    FETCH_ACCOUNTS,
    FETCH_ACCOUNTS_LOADING,
  } from "../actions/actionTypes";
  
  const initialState = {
    accounts: [],
    isLoading: true
  };
  
  const accountsReducer = (state = initialState, action) => {    
    switch(action.type) {
        case ADD_ACCOUNT:            
            return { ...state, accounts: [ ...state.accounts, action.payload ]}; 
        case ADD_ACCOUNT_LOADING:
            return { ...state, isLoading: action.payload }         
        case EDIT_ACCOUNT:            
            const updatedAccount = state.accounts.filter(account => account.id !== action.payload.id);    
            return { ...state, accounts: [...updatedAccount, action.payload ]};   
        case DELETE_ACCOUNT:
            const filteredAccounts = state.accounts.filter(account => account.id !== action.payload.id);
            return { ...state, accounts: filteredAccounts };
        case FETCH_ACCOUNTS:  
            return { ...state, accounts: action.payload }
        case FETCH_ACCOUNTS_LOADING:
            return { ...state, isLoading: action.payload }
        default:
            return state;
    }
  };
  
  export default accountsReducer;