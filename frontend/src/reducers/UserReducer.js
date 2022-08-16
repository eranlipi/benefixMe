import reducerUtility from './reducerUtilities';

let localLoggedUser = null;
const initialState = {
  loggedInUser: localLoggedUser,
  clubs: [],
  selectedClubs:[],
};

if (sessionStorage.user) localLoggedUser = JSON.parse(sessionStorage.user);


const UserReducer = reducerUtility.createReducer(initialState, {
  SET: load,
  ADD: add,
  ADD_CLUBS:addClubs,
  ADD_SELECTED_CLUBS:addSelectedClubs
});

function load(state, action) {
  return { ...state, loggedInUser: action.user };
}

function add(state, action) {
  return { ...state, loggedInUser: action.user };
}

function addClubs(state, action) {
  return {
    ...state,
    clubs: [...action.clubs],
  };
}
function addSelectedClubs(state, action) {
  // _deleteSelectedClubs(state);
  // console.log("action",action)

  return {
    ...state,
    selectedClubs: [...action.selectedClubs],
  };
}

export default UserReducer;
