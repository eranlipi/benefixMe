const initialState = {
    isLoading: false,
  };
  
  export default function(state = initialState, action = {}) {
    switch (action.type) {
      case 'LOADING_START':
        return { ...state, isLoading: true };
      case 'LOADING_DONE':
        return { ...state, isLoading: false };
      default:
        return state;
    }
  }
  