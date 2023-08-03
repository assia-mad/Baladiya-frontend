import { createStore } from 'redux';

const initialState = {
    email: null,
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'setEmail':
        return {
          ...state,
          email: action.payload,
        };
      default:
        return state;
    }
  }

  const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  export default store ;