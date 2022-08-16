import HttpService from './HttpService';

// const authEndpoint = 'api';
const endpoint = 'auth';

async function login(credentails) {
  let userParams = JSON.stringify(credentails);
  console.log("fedsw",userParams);
  const user = await HttpService.post(`/auth/login`, userParams);
  console.log("user ",user);
  return _handleLogin(user);
}
async function signup(credentails) { 
//   console.log("credentails",credentails)
if (credentails.MatchingPasswords){
  delete credentails.password2
  delete credentails.MatchingPasswords
}  
  let userParams = JSON.stringify(credentails);
  
  let sheckStatus = {};
  const user = await HttpService.post(`/auth/signup`, userParams);
  // let sheckStatus = await JSON.parse(user)
  // sheckStatus = JSON.parse(user)
  
  console.log("user221 ----> ",sheckStatus)
  if(user.status === "OK"){
    // return _handleLogin(user)
    credentails.password = credentails.password1
    login(credentails)
    return user
      
  }else{

    return "ERORR";
  }
  // return user;
}

async function getClubsList( ) {
    
    const clubsList = await HttpService.get(`/clubs`);
    return clubsList;
}

async function logout() {
  // await HttpService.post(`${authEndpoint}/logout`);
  
  sessionStorage.clear();
  
}

function _handleLogin(user) {
  sessionStorage.setItem(endpoint, JSON.stringify(user));
  return user;
}

async function getById(id) {
  const user = await HttpService.get(`${endpoint}/${id}`);
  return user;
}

function getUserLoggedIn() {
  return sessionStorage.getItem('auth');
}

function checkConnection() {
  const currentUser = getUserLoggedIn();

  if (currentUser) {
    return true;
  } else return false;
}

async function saveEditedUser(editdUser){
  await console.log("editdUser",editdUser);
  const response = await HttpService.post("/auth/saveUser" ,editdUser )
  if (response.status ==="OK") {
    editdUser =  JSON.parse(editdUser);
    sessionStorage.setItem("auth", JSON.stringify(editdUser));

  }
  return response; 
}

export default {
  login,
  signup,
  logout,
  getById,
  checkConnection,
  getUserLoggedIn,
  getClubsList,
  saveEditedUser,
};
